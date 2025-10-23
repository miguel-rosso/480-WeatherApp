/**
 * ForecastService - Servicio para obtener el pronóstico de 5 días desde OpenWeatherMap API
 */

import { API_CONFIG, getWeatherEmoji } from '@/src/services/config';
import { OpenWeatherForecastResponse } from '@/src/models/ApiResponses';
import { Forecast } from '@/src/models/ForecastModel';
import { HourlyForecast } from '@/src/models/HourlyForecastModel';
import {
  getLocalDateString,
  getLocalDayOfWeek,
  getLocalHours,
  getLocalTime
} from '@/src/utils/helpers';

/**
 * Hace una única llamada al API de forecast y devuelve ambos: daily y hourly
 */
export const getForecastData = async (
  city: string,
  timezone: number = 0,
  currentTemperature?: number,
  currentWeather?: { 
    weatherId: number; 
    description: string;
    temperature: number; 
    feelsLike: number;
    icon: string;
    humidity: number;
    windSpeed: number;
    cloudiness: number;
    visibility?: number;
  }
): Promise<{ daily: Forecast[]; hourly: HourlyForecast[] }> => {
    const url = `${API_CONFIG.BASE_URL}/forecast?q=${city}&units=metric&appid=${API_CONFIG.API_KEY}`;

    console.log("🌐 [Forecast] Fetching URL:", url);
    console.log("🕐 [Forecast] Timezone offset:", timezone, "seconds");
    if (currentTemperature !== undefined) {
      console.log("🌡️ [Forecast] Current temperature provided:", currentTemperature);
    }
    if (currentWeather) {
      console.log("🌦️ [Forecast] Current weather provided:", currentWeather);
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherForecastResponse = await response.json();
      
      // Procesar ambos tipos de datos
      const daily = processDailyForecast(data, timezone, currentTemperature, currentWeather);
      const hourly = processHourlyForecast(data, timezone, currentWeather);
      
      return { daily, hourly };
    } catch (error) {
      console.error("❌ [ForecastAPI] Error fetching forecast:", error);
      throw error;
    }
};

/**
 * Procesa los datos del API para obtener el forecast diario
 */
const processDailyForecast = (
  data: OpenWeatherForecastResponse,
  timezone: number,
  currentTemperature?: number,
  currentWeather?: { weatherId: number; description: string }
): Forecast[] => {
      console.log("📊 [Forecast] Processing daily forecast");
      console.log("📅 Forecast entries:", data.list.length);
      console.log("🗓️ Forecast first result:", data.list.slice(0, 1))
      // Transformar a modelos
      // Agrupar por día y calcular máximas y mínimas usando hora LOCAL de la ciudad
      const dailyData: { [key: string]: {
        temps: number[];
        date: Date;
        weatherIds: { id: number; description: string; hour: number }[];
      }} = {};
      
      data.list.forEach((item) => {
        // Convertir a hora local de la ciudad
        const localDate = getLocalTime(item.dt, timezone);
        const dateKey = getLocalDateString(localDate); // Usar YYYY-MM-DD en lugar de toDateString()
        const hour = getLocalHours(localDate);
        
        // Crear entrada si no existe
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            temps: [],
            date: localDate,
            weatherIds: [],
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].weatherIds.push({
          id: item.weather[0].id,
          description: item.weather[0].description,
          hour: hour,
        });
      });
      
      // Convertir a array y ordenar por fecha (mostrar todos los días disponibles, no solo 5)
      const sortedDays = Object.values(dailyData)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      
      console.log(`📊 [Forecast] Total days available: ${sortedDays.length}`);
      
      // Si tenemos la temperatura actual, agregarla al primer día (hoy) para calcular el máximo correcto
      if (currentTemperature !== undefined && sortedDays.length > 0) {
        console.log("🔧 [Forecast] Adjusting first day with current temperature");
        console.log("   ├─ Original temps:", sortedDays[0].temps);
        console.log("   ├─ Current temp:", currentTemperature);
        sortedDays[0].temps.push(currentTemperature);
        console.log("   └─ Updated temps:", sortedDays[0].temps);
      }
      
      // Devolver objetos que implementan la interfaz Forecast
      return sortedDays.map((day, index) => {
        const fullDate = getLocalDateString(day.date);
        const dayOfWeek = getLocalDayOfWeek(day.date);
        
        // CASO ESPECIAL: Primer día (HOY) - usar clima actual si se proporcionó
        if (index === 0 && currentWeather) {
          console.log(`\n📅 [Forecast Day ${index}] Day ${dayOfWeek} (TODAY - using current weather)`);
          console.log(`   ├─ Full Date: ${fullDate}`);
          console.log(`   ├─ Current WeatherId: ${currentWeather.weatherId}`);
          console.log(`   ├─ Current Description: ${currentWeather.description}`);
          console.log(`   └─ Icon: ${getWeatherEmoji(currentWeather.weatherId, true)}`);
          
          return {
            date: String(dayOfWeek),
            fullDate: fullDate,
            maxTemp: Math.round(Math.max(...day.temps)),
            minTemp: Math.round(Math.min(...day.temps)),
            description: currentWeather.description,
            weatherId: currentWeather.weatherId,
            icon: getWeatherEmoji(currentWeather.weatherId, true),
          };
        }
        
        // DÍAS FUTUROS: Buscar el weatherId más representativo
        // 1. Preferir horas del mediodía (12:00-15:00) ya que son más representativas del día
        const middayWeather = day.weatherIds.find(w => w.hour >= 12 && w.hour <= 15);
        
        // 2. Si no hay datos del mediodía, usar el más frecuente
        let representativeWeather = middayWeather;
        if (!representativeWeather) {
          const weatherCounts = day.weatherIds.reduce((acc, w) => {
            acc[w.id] = (acc[w.id] || 0) + 1;
            return acc;
          }, {} as Record<number, number>);
          
          const mostFrequentId = parseInt(
            Object.entries(weatherCounts).sort((a, b) => b[1] - a[1])[0][0]
          );
          representativeWeather = day.weatherIds.find(w => w.id === mostFrequentId)!;
        }
        
        // Log para depuración
        console.log(`\n📅 [Forecast Day ${index}] Day ${dayOfWeek}`);
        console.log(`   ├─ Full Date: ${fullDate}`);
        console.log(`   ├─ Weather IDs del día:`, day.weatherIds.map(w => `${w.hour}h:${w.id}`).join(', '));
        console.log(`   ├─ Representative WeatherId: ${representativeWeather.id}`);
        console.log(`   ├─ Description: ${representativeWeather.description}`);
        console.log(`   └─ Icon: ${getWeatherEmoji(representativeWeather.id, true)}`);
        
        
        return {
          date: String(dayOfWeek),
          fullDate: fullDate,
          maxTemp: Math.round(Math.max(...day.temps)),
          minTemp: Math.round(Math.min(...day.temps)),
          description: representativeWeather.description,
          weatherId: representativeWeather.id,
          icon: getWeatherEmoji(representativeWeather.id, true),
        };
      });
};

/**
 * Procesa los datos del API para obtener el forecast horario
 */
const processHourlyForecast = (
  data: OpenWeatherForecastResponse,
  timezone: number,
  currentWeather?: { 
    temperature: number; 
    feelsLike: number;
    description: string; 
    weatherId: number; 
    icon: string;
    humidity: number;
    windSpeed: number;
    cloudiness: number;
    visibility?: number;
  }
): HourlyForecast[] => {
      console.log("⏰ [Hourly Forecast] Processing hourly forecast");
      console.log("📊 [Hourly Forecast] Total entries:", data.list.length);
      console.log("🕐 [Hourly Forecast] Timezone offset:", timezone, "seconds");
      
      const now = Date.now();
      
      // Transformar todas las entradas (hasta 5 días) en objetos HourlyForecast
      const hourlyForecasts = data.list
        .filter(item => {
          const itemTime = item.dt * 1000;
          return itemTime >= now;
        })
        .map((item, index) => {
          // Convertir a hora local usando helper centralizado
          const localTime = getLocalTime(item.dt, timezone);
          const hours = getLocalHours(localTime);
          const formattedTime = index === 0 ? 'Now' : `${hours.toString().padStart(2, '0')}:00`;
          
          // Calcular si es de día
          const isDay = hours >= 6 && hours < 20;
          
          // Obtener el día de la semana y fecha completa usando helpers
          const dayOfWeek = getLocalDayOfWeek(localTime);
          const fullDate = getLocalDateString(localTime);
          
          // Si es el primer ítem y tenemos datos del clima actual, usar esos datos
          if (index === 0 && currentWeather) {
            console.log(`\n🔄 [Hourly ${index}] Using current weather data for "Now"`);
            console.log(`   ├─ Temperature: ${currentWeather.temperature}°C (from current weather)`);
            console.log(`   ├─ Description: ${currentWeather.description}`);
            console.log(`   ├─ Weather ID: ${currentWeather.weatherId}`);
            console.log(`   └─ Icon: ${currentWeather.icon}`);
            
            return {
              time: formattedTime,
              timestamp: item.dt,
              temperature: currentWeather.temperature,
              feelsLike: currentWeather.feelsLike,
              description: currentWeather.description,
              weatherId: currentWeather.weatherId,
              icon: currentWeather.icon,
              pop: 0,
              humidity: currentWeather.humidity,
              windSpeed: currentWeather.windSpeed,
              windDeg: undefined, // Not available in current weather
              clouds: currentWeather.cloudiness,
              visibility: currentWeather.visibility,
              rain: undefined, // Not available in current weather
              dayName: String(dayOfWeek),
              fullDate: fullDate,
            };
          }
          
          // Obtener el ícono
          const icon = getWeatherEmoji(item.weather[0].id, isDay);
          
          // Log detallado para los primeros 10 elementos
          if (index < 10) {
            console.log(`\n🔍 [Hourly ${index}] ${formattedTime} (Day ${dayOfWeek})`);
            console.log(`   ├─ UTC Time: ${new Date(item.dt * 1000).toISOString()}`);
            console.log(`   ├─ Local Time: ${localTime.toISOString()}`);
            console.log(`   ├─ Local Hour: ${hours}:00`);
            console.log(`   ├─ Full Date: ${fullDate}`);
            console.log(`   ├─ Day of Week: ${dayOfWeek}`);
            console.log(`   ├─ Is Day? ${isDay ? '☀️ YES' : '🌙 NO'} (6am-8pm)`);
            console.log(`   ├─ Weather ID: ${item.weather[0].id}`);
            console.log(`   ├─ Description: ${item.weather[0].description}`);
            console.log(`   ├─ PoP (Precipitation): ${(item.pop || 0) * 100}%`);
            console.log(`   └─ Icon: ${icon}`);
          }
          
          // Devolver objeto que implementa la interfaz HourlyForecast
          return {
            time: formattedTime,
            timestamp: item.dt,
            temperature: item.main.temp,
            feelsLike: item.main.feels_like,
            description: item.weather[0].description,
            weatherId: item.weather[0].id,
            icon: icon,
            pop: item.pop || 0, // Probability of precipitation (0-1)
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            windDeg: item.wind.deg,
            clouds: item.clouds.all,
            visibility: item.visibility,
            rain: item.rain?.['3h'],
            dayName: String(dayOfWeek),
            fullDate: fullDate, // Para agrupar por día (formato YYYY-MM-DD)
          };
        });
      
      console.log(`\n✅ [Hourly Forecast] Returning ${hourlyForecasts.length} hourly forecasts\n`);
      
      return hourlyForecasts;
};



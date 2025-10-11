/**
 * ForecastService - Servicio para obtener el pronóstico de 5 días desde OpenWeatherMap API
 */

import { API_CONFIG, getWeatherEmoji } from '@/src/api/config';
import { OpenWeatherForecastResponse } from '@/src/api/models/ApiResponses';
import { Forecast } from '@/src/api/models/ForecastModel';
import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import {
  getLocalDateString,
  getLocalDayOfWeek,
  getLocalHours,
  getLocalTime
} from '@/src/utils/helpers';

/**
 * Convierte el día de la semana a formato corto traducido
 */
const getDayName = (localDate: Date, lang: string): string => {
  const days: { [key: string]: string[] } = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
  const dayIndex = getLocalDayOfWeek(localDate);
  return days[lang]?.[dayIndex] || days.en[dayIndex];
};

/**
 * Obtiene el pronóstico de 5 días y devuelve un array de modelos
 * @param city Nombre de la ciudad
 * @param lang Idioma ('es' o 'en')
 */
export const getForecast = async (city: string, lang: string = "es"): Promise<Forecast[]> => {
    const url = `${API_CONFIG.BASE_URL}/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_CONFIG.API_KEY}`;

    console.log("🌐 [Forecast] Fetching URL:", url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherForecastResponse = await response.json();

      console.log("📊 [Forecast] Response received for", city);
      console.log("📅 Forecast entries:", data.list.length);
      console.log("🗓️ Forecast first result:", data.list.slice(0, 1))
      // Transformar a modelos
      // Agrupar por día y calcular máximas y mínimas
      const dailyData: { [key: string]: {
        temps: number[];
        date: Date;
        weather: { id: number; description: string };
      }} = {};
      
      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        // Crear entrada si no existe
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            temps: [],
            date: date,
            weather: {
              id: item.weather[0].id,
              description: item.weather[0].description,
            },
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
      });
      
      // Convertir a array y ordenar por fecha
      // Devolver objetos que implementan la interfaz Forecast
      return Object.values(dailyData)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5)
        .map(day => ({
          date: getDayName(day.date, lang),
          maxTemp: Math.round(Math.max(...day.temps)),
          minTemp: Math.round(Math.min(...day.temps)),
          condition: day.weather.description,
          icon: getWeatherEmoji(day.weather.id, true),
        }));
    } catch (error) {
      console.error("❌ [ForecastAPI] Error fetching forecast:", error);
      throw error;
    }
};

/**
 * Obtiene el pronóstico por hora (hasta 5 días)
 * @param city Nombre de la ciudad
 * @param lang Idioma ('es' o 'en')
 * @param timezone Zona horaria de la ciudad en segundos (para convertir a hora local)
 * @param currentWeather Datos del clima actual (opcional) - si se proporciona, el primer ítem usará estos datos
 */
export const getHourlyForecast = async (
  city: string,
  lang: string = "es",
  timezone: number = 0,
  currentWeather?: { temperature: number; condition: string; weatherId: number; icon: string }
): Promise<HourlyForecast[]> => {
    const url = `${API_CONFIG.BASE_URL}/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_CONFIG.API_KEY}`;

    console.log("🌐 [HourlyForecast] Fetching URL:", url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherForecastResponse = await response.json();

      console.log("⏰ [Hourly Forecast] Response received for", city);
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
          
          // Obtener el nombre del día y fecha completa usando helpers
          const dayName = getDayName(localTime, lang);
          const fullDate = getLocalDateString(localTime);
          
          // Si es el primer ítem y tenemos datos del clima actual, usar esos datos
          if (index === 0 && currentWeather) {
            console.log(`\n🔄 [Hourly ${index}] Using current weather data for "Now"`);
            console.log(`   ├─ Temperature: ${currentWeather.temperature}°C (from current weather)`);
            console.log(`   ├─ Condition: ${currentWeather.condition}`);
            console.log(`   ├─ Weather ID: ${currentWeather.weatherId}`);
            console.log(`   └─ Icon: ${currentWeather.icon}`);
            
            return {
              time: formattedTime,
              timestamp: item.dt,
              temperature: currentWeather.temperature,
              condition: currentWeather.condition,
              weatherId: currentWeather.weatherId,
              icon: currentWeather.icon,
              pop: 0,
              dayName: dayName,
              fullDate: fullDate,
            };
          }
          
          // Obtener el ícono
          const icon = getWeatherEmoji(item.weather[0].id, isDay);
          
          // Log detallado para los primeros 10 elementos
          if (index < 10) {
            console.log(`\n🔍 [Hourly ${index}] ${formattedTime} (${dayName})`);
            console.log(`   ├─ UTC Time: ${new Date(item.dt * 1000).toISOString()}`);
            console.log(`   ├─ Local Time: ${localTime.toISOString()}`);
            console.log(`   ├─ Local Hour: ${hours}:00`);
            console.log(`   ├─ Full Date: ${fullDate}`);
            console.log(`   ├─ Day Name: ${dayName}`);
            console.log(`   ├─ Is Day? ${isDay ? '☀️ YES' : '🌙 NO'} (6am-8pm)`);
            console.log(`   ├─ Weather ID: ${item.weather[0].id}`);
            console.log(`   ├─ Condition: ${item.weather[0].description}`);
            console.log(`   └─ Icon: ${icon}`);
          }
          
          // Devolver objeto que implementa la interfaz HourlyForecast
          return {
            time: formattedTime,
            timestamp: item.dt,
            temperature: item.main.temp,
            condition: item.weather[0].description,
            weatherId: item.weather[0].id,
            icon: icon,
            pop: 0, // OpenWeather free no incluye pop en todos los endpoints
            dayName: dayName,
            fullDate: fullDate, // Para agrupar por día (formato YYYY-MM-DD)
          };
        });
      
      console.log(`\n✅ [Hourly Forecast] Returning ${hourlyForecasts.length} hourly forecasts\n`);
      
      return hourlyForecasts;
    } catch (error) {
      console.error("❌ [Hourly ForecastAPI] Error fetching hourly forecast:", error);
      throw error;
    }
};

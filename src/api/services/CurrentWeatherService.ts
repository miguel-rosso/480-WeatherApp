/**
 * CurrentWeatherService - Servicio para obtener el clima actual desde OpenWeatherMap API
 */

import { API_CONFIG, getWeatherEmoji } from '@/src/api/config';
import { OpenWeatherResponse } from '@/src/api/models/ApiResponses';
import { CurrentWeather } from '@/src/api/models/CurrentWeatherModel';
import {
  formatLocalTime,
  formatLocalTimeWithSeconds,
  getLocalTime
} from '@/src/utils/helpers';

/**
 * Obtiene el clima actual de una ciudad y devuelve un objeto
 * @param city Nombre de la ciudad
 * @param lang Idioma ('es' o 'en')
 */
export const getCurrentWeather = async (city: string, lang: string = "es"): Promise<CurrentWeather> => {
    const url = `${API_CONFIG.BASE_URL}/weather?q=${city}&units=metric&lang=${lang}&appid=${API_CONFIG.API_KEY}`;

    console.log("🌐 [CurrentWeather] Fetching URL:", url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherResponse = await response.json();

      // Calcular horas locales usando helpers centralizados
      const sunriseLocal = getLocalTime(data.sys.sunrise, data.timezone);
      const sunsetLocal = getLocalTime(data.sys.sunset, data.timezone);
      const localTime = getLocalTime(Date.now(), data.timezone);

      console.log("📊 [CurrentWeather] Full response:", JSON.stringify(data, null, 2));
      console.log("✅ City:", data.name);
      console.log("🌡️ Temperature:", data.main.temp, "°C");
      console.log("☁️ Condition:", data.weather[0].description);
      console.log("💧 Humidity:", data.main.humidity, "%");
      console.log("💨 Wind Speed:", data.wind.speed, "m/s");
      console.log("🌅 Sunrise (local):", formatLocalTime(sunriseLocal));
      console.log("🌇 Sunset (local):", formatLocalTime(sunsetLocal));
      console.log("⏰ Timezone offset:", data.timezone, "seconds", `(GMT+${data.timezone / 3600})`);
      console.log("🕐 Local time:", formatLocalTimeWithSeconds(localTime));
      console.log("-----------------------------------");

      // Transformar a modelo
      const currentTime = Date.now() / 1000;
      // Incluir afternoon period: hasta 1 hora después del sunset se considera "día"
      const AFTERNOON_BUFFER = 3600; // 1 hora en segundos
      const isDay = currentTime >= data.sys.sunrise && currentTime < (data.sys.sunset + AFTERNOON_BUFFER);

      // Devolver objeto que implementa la interfaz CurrentWeather
      const weatherData: CurrentWeather = {
        city: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        condition: data.weather[0].description,
        weatherMain: data.weather[0].main,
        weatherId: data.weather[0].id,
        weatherDescription: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s a km/h
        pressure: data.main.pressure,
        cloudiness: data.clouds.all,
        visibility: data.visibility,
        icon: getWeatherEmoji(data.weather[0].id, isDay),
        timestamp: new Date(data.dt * 1000),
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        timezone: data.timezone,
      };
      
      return weatherData;
    } catch (error) {
      console.error("❌ [CurrentWeatherAPI] Error fetching current weather:", error);
      throw error;
    }
};

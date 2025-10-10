/**
 * CurrentWeatherService - Servicio para obtener el clima actual desde OpenWeatherMap API
 */

import { API_CONFIG, getWeatherEmoji } from '@/src/api/config';
import { OpenWeatherResponse } from '@/src/api/models/ApiResponses';
import { CurrentWeatherModel } from '@/src/api/models/CurrentWeatherModel';

export class CurrentWeatherService {
  /**
   * Obtiene el clima actual de una ciudad y devuelve un modelo
   * @param city Nombre de la ciudad
   * @param lang Idioma ('es' o 'en')
   */
  static async getCurrentWeather(city: string, lang: string = "es"): Promise<CurrentWeatherModel> {
    const url = `${API_CONFIG.BASE_URL}/weather?q=${city}&units=metric&lang=${lang}&appid=${API_CONFIG.API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherResponse = await response.json();

      // Calcular horas locales correctamente
      const sunriseLocal = new Date(data.sys.sunrise * 1000 + data.timezone * 1000);
      const sunsetLocal = new Date(data.sys.sunset * 1000 + data.timezone * 1000);
      const localTime = new Date(Date.now() + data.timezone * 1000);

      console.log("📊 [CurrentWeather] Full response:", JSON.stringify(data, null, 2));
      console.log("✅ City:", data.name);
      console.log("🌡️ Temperature:", data.main.temp, "°C");
      console.log("☁️ Condition:", data.weather[0].description);
      console.log("💧 Humidity:", data.main.humidity, "%");
      console.log("💨 Wind Speed:", data.wind.speed, "m/s");
      console.log("🌅 Sunrise (local):", `${sunriseLocal.getUTCHours()}:${sunriseLocal.getUTCMinutes().toString().padStart(2, "0")}`);
      console.log("🌇 Sunset (local):", `${sunsetLocal.getUTCHours()}:${sunsetLocal.getUTCMinutes().toString().padStart(2, "0")}`);
      console.log("⏰ Timezone offset:", data.timezone, "seconds", `(GMT+${data.timezone / 3600})`);
      console.log(
        "🕐 Local time:",
        `${localTime.getUTCHours()}:${localTime.getUTCMinutes().toString().padStart(2, "0")}:${localTime.getUTCSeconds().toString().padStart(2, "0")}`
      );
      console.log("-----------------------------------");

      // Transformar a modelo
      const currentTime = Date.now() / 1000;
      // Incluir afternoon period: hasta 1 hora después del sunset se considera "día"
      const AFTERNOON_BUFFER = 3600; // 1 hora en segundos
      const isDay = currentTime >= data.sys.sunrise && currentTime < (data.sys.sunset + AFTERNOON_BUFFER);

      return new CurrentWeatherModel({
        city: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].description,
        weatherMain: data.weather[0].main,
        weatherId: data.weather[0].id,
        weatherDescription: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s a km/h
        pressure: data.main.pressure,
        icon: getWeatherEmoji(data.weather[0].id, isDay),
        timestamp: new Date(data.dt * 1000),
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        timezone: data.timezone,
      });
    } catch (error) {
      console.error("❌ [CurrentWeatherAPI] Error fetching current weather:", error);
      throw error;
    }
  }
}

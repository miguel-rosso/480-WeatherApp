/**
 * CurrentWeatherService - Servicio para obtener el clima actual desde OpenWeatherMap API
 */

import { API_CONFIG } from '@/src/api/config';

export interface OpenWeatherResponse {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  timezone: number; // Desplazamiento en segundos desde UTC
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

export class CurrentWeatherService {
  /**
   * Obtiene el clima actual de una ciudad
   * @param city Nombre de la ciudad
   * @param lang Idioma ('es' o 'en')
   */
  static async getCurrentWeather(city: string, lang: string = "es"): Promise<OpenWeatherResponse> {
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

      return data;
    } catch (error) {
      console.error("❌ [CurrentWeatherAPI] Error fetching current weather:", error);
      throw error;
    }
  }
}

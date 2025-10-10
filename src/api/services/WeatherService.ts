/**
 * WeatherService - Servicio para obtener datos del clima desde OpenWeatherMap API
 */

const API_KEY = "87655b869cadbf38738f8ee1e0aa5fd4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

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

export interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
}

export class WeatherService {
  /**
   * Obtiene el clima actual de una ciudad
   * @param city Nombre de la ciudad
   * @param lang Idioma ('es' o 'en')
   */
  static async getCurrentWeather(city: string, lang: string = "es"): Promise<OpenWeatherResponse> {
    const url = `${BASE_URL}/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;

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

      console.log("📊 Full response:", JSON.stringify(data, null, 2));
      console.log("✅City:", data.name);
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
      console.error("❌ [WeatherAPI] Error fetching current weather:", error);
      throw error;
    }
  }

  /**
   * Obtiene el pronóstico de 5 días (intervalos de 3 horas)
   * @param city Nombre de la ciudad
   * @param lang Idioma ('es' o 'en')
   */
  static async getForecast(city: string, lang: string = "es"): Promise<OpenWeatherForecastResponse> {
    const url = `${BASE_URL}/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherForecastResponse = await response.json();

      return data;
    } catch (error) {
      console.error("❌ [WeatherAPI] Error fetching forecast:", error);
      throw error;
    }
  }

  /**
   * Mapea el código de condición de OpenWeatherMap a un emoji
   * @param weatherId ID de la condición del clima
   * @param isDay Si es de día o de noche
   */
  static getWeatherEmoji(weatherId: number, isDay: boolean = true): string {
    // Rangos de IDs de OpenWeatherMap:
    // 2xx: Tormenta
    // 3xx: Llovizna
    // 5xx: Lluvia
    // 6xx: Nieve
    // 7xx: Atmósfera (niebla, etc.)
    // 800: Despejado
    // 80x: Nubes

    if (weatherId >= 200 && weatherId < 300) {
      return "⛈️"; // Tormenta
    } else if (weatherId >= 300 && weatherId < 400) {
      return "🌦️"; // Llovizna
    } else if (weatherId >= 500 && weatherId < 600) {
      return "🌧️"; // Lluvia
    } else if (weatherId >= 600 && weatherId < 700) {
      return "❄️"; // Nieve
    } else if (weatherId >= 700 && weatherId < 800) {
      return "🌫️"; // Niebla/Atmósfera
    } else if (weatherId === 800) {
      return isDay ? "☀️" : "🌙"; // Despejado
    } else if (weatherId === 801) {
      return isDay ? "🌤️" : "☁️"; // Pocas nubes
    } else if (weatherId === 802) {
      return "⛅"; // Nubes dispersas
    } else if (weatherId >= 803) {
      return "☁️"; // Muy nublado
    }

    return "🌈"; // Default
  }
}

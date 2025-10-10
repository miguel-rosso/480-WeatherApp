/**
 * ForecastService - Servicio para obtener el pronóstico de 5 días desde OpenWeatherMap API
 */

import { API_CONFIG } from '@/src/api/config';

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

export class ForecastService {
  /**
   * Obtiene el pronóstico de 5 días (intervalos de 3 horas)
   * @param city Nombre de la ciudad
   * @param lang Idioma ('es' o 'en')
   */
  static async getForecast(city: string, lang: string = "es"): Promise<OpenWeatherForecastResponse> {
    const url = `${API_CONFIG.BASE_URL}/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_CONFIG.API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherForecastResponse = await response.json();

      console.log("📊 [Forecast] Response received for", city);
      console.log("📅 Forecast entries:", data.list.length);

      return data;
    } catch (error) {
      console.error("❌ [ForecastAPI] Error fetching forecast:", error);
      throw error;
    }
  }
}

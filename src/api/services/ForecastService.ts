/**
 * ForecastService - Servicio para obtener el pronóstico de 5 días desde OpenWeatherMap API
 */

import { API_CONFIG, getWeatherEmoji } from '@/src/api/config';
import { OpenWeatherForecastResponse } from '@/src/api/models/ApiResponses';
import { Forecast, ForecastModel } from '@/src/api/models/ForecastModel';

/**
 * Convierte el día de la semana a formato corto traducido
 */
const getDayName = (date: Date, lang: string): string => {
  const days: { [key: string]: string[] } = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
  return days[lang]?.[date.getDay()] || days.en[date.getDay()];
};

export class ForecastService {
  /**
   * Obtiene el pronóstico de 5 días y devuelve un array de modelos
   * @param city Nombre de la ciudad
   * @param lang Idioma ('es' o 'en')
   */
  static async getForecast(city: string, lang: string = "es"): Promise<Forecast[]> {
    const url = `${API_CONFIG.BASE_URL}/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_CONFIG.API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: OpenWeatherForecastResponse = await response.json();

      console.log("📊 [Forecast] Response received for", city);
      console.log("📅 Forecast entries:", data.list.length);

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
      return Object.values(dailyData)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5)
        .map(day => new ForecastModel({
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
  }
}

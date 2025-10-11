/**
 * HourlyForecast Model - Representa los datos del pronóstico por hora
 */

export interface HourlyForecast {
  time: string; // Hora formateada (ej: "14:00" o "Now")
  timestamp: number; // Timestamp unix
  temperature: number;
  condition: string;
  weatherId: number;
  icon: string;
  pop: number; // Probability of precipitation (0-1)
  dayName?: string; // Nombre del día (ej: "Lun", "Mar")
  fullDate?: string; // Fecha completa para agrupar por día
}

export class HourlyForecastModel implements HourlyForecast {
  time: string;
  timestamp: number;
  temperature: number;
  condition: string;
  weatherId: number;
  icon: string;
  pop: number;
  dayName?: string;
  fullDate?: string;

  constructor(data: HourlyForecast) {
    this.time = data.time;
    this.timestamp = data.timestamp;
    this.temperature = data.temperature;
    this.condition = data.condition;
    this.weatherId = data.weatherId;
    this.icon = data.icon;
    this.pop = data.pop;
    this.dayName = data.dayName;
    this.fullDate = data.fullDate;
  }

  /**
   * Obtiene la temperatura formateada
   */
  getFormattedTemp(): string {
    return `${Math.round(this.temperature)}°`;
  }

  /**
   * Obtiene el porcentaje de probabilidad de lluvia formateado
   */
  getFormattedPop(): string {
    return `${Math.round(this.pop * 100)}%`;
  }

  /**
   * Lógica de validación del modelo
   */
  isValid(): boolean {
    return (
      this.time.length > 0 &&
      this.temperature !== undefined &&
      this.timestamp > 0
    );
  }
}

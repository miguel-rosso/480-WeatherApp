/**
 * Forecast Model - Representa los datos del pronóstico del clima
 * y pequeñas utilidades relacionadas
 */

export interface Forecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
}

export class ForecastModel implements Forecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;

  constructor(data: Forecast) {
    this.date = data.date;
    this.maxTemp = data.maxTemp;
    this.minTemp = data.minTemp;
    this.condition = data.condition;
    this.icon = data.icon;
  }

  /**
   * Obtiene la temperatura máxima formateada
   */
  getFormattedMaxTemp(): string {
    return `${Math.round(this.maxTemp)}°`;
  }

  /**
   * Obtiene la temperatura mínima formateada
   */
  getFormattedMinTemp(): string {
    return `${Math.round(this.minTemp)}°`;
  }

  /**
   * Obtiene el rango de temperatura formateado
   */
  getFormattedTempRange(): string {
    return `${this.getFormattedMaxTemp()} / ${this.getFormattedMinTemp()}`;
  }

  /**
   * Lógica de validación del modelo
   */
  isValid(): boolean {
    return (
      this.date.length > 0 &&
      this.maxTemp !== undefined &&
      this.minTemp !== undefined &&
      this.maxTemp >= this.minTemp // La máxima debe ser mayor o igual que la mínima
    );
  }
}

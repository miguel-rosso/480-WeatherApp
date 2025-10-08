/**
 * Model - Representa los datos del clima
 * En MVVM, el Model solo contiene datos y lógica de validación básica
 */

export interface Weather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timestamp: Date;
}

export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
}

export class WeatherModel implements Weather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timestamp: Date;

  constructor(data: Weather) {
    this.city = data.city;
    this.temperature = data.temperature;
    this.condition = data.condition;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.icon = data.icon;
    this.timestamp = data.timestamp;
  }

  // Lógica de validación del modelo
  isValid(): boolean {
    return (
      this.city.length > 0 &&
      this.temperature !== undefined &&
      this.condition.length > 0
    );
  }

  // Formatear temperatura
  getFormattedTemp(): string {
    return `${Math.round(this.temperature)}°C`;
  }
}

/**
 * Model - Representa los datos del clima
 * En MVVM, el Model solo contiene datos y lógica de validación básica
 */

export interface Weather {
  city: string;
  temperature: number;
  feelsLike: number; // Sensación térmica
  condition: string;
  weatherMain: string; // Main de la API (Clear, Clouds, Rain, etc.)
  weatherId: number; // ID numérico del weather (ej: 800=clear, 804=overcast)
  weatherDescription: string; // Description de la API (para mostrar al usuario)
  humidity: number;
  windSpeed: number;
  pressure: number; // Presión atmosférica en hPa
  icon: string;
  timestamp: Date;
  sunrise: Date;
  sunset: Date;
  timezone: number; // Desplazamiento en segundos desde UTC
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
  feelsLike: number;
  condition: string;
  weatherMain: string;
  weatherId: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
  timestamp: Date;
  sunrise: Date;
  sunset: Date;
  timezone: number;

  constructor(data: Weather) {
    this.city = data.city;
    this.temperature = data.temperature;
    this.feelsLike = data.feelsLike;
    this.condition = data.condition;
    this.weatherMain = data.weatherMain;
    this.weatherId = data.weatherId;
    this.weatherDescription = data.weatherDescription;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.pressure = data.pressure;
    this.icon = data.icon;
    this.timestamp = data.timestamp;
    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
    this.timezone = data.timezone;
  }
  
  /**
   * Determina si actualmente es de día según sunrise/sunset
   */
  isDaytime(): boolean {
    const now = new Date().getTime();
    return now >= this.sunrise.getTime() && now < this.sunset.getTime();
  }
  
  /**
   * Obtiene la hora local de la ciudad (0-23) usando timezone
   * @param currentTime Tiempo actual (opcional, por defecto usa Date.now())
   */
  getLocalHour(currentTime?: Date): number {
    const nowUTC = currentTime ? currentTime.getTime() : Date.now();
    const localTime = new Date(nowUTC + (this.timezone * 1000));
    const hour = localTime.getUTCHours();
    console.log(`🕐 [${this.city}] Local hour calculation:`, {
      nowUTC: new Date(nowUTC).toISOString(),
      timezone: this.timezone / 3600,
      localHour: hour,
      localFullTime: `${localTime.getUTCHours()}:${localTime.getUTCMinutes()}`,
    });
    return hour;
  }
  
  /**
   * Obtiene la hora local formateada (HH:MM)
   * @param currentTime Tiempo actual (opcional, por defecto usa Date.now())
   */
  getFormattedLocalTime(currentTime?: Date): string {
    const nowUTC = currentTime ? currentTime.getTime() : Date.now();
    const localTime = new Date(nowUTC + (this.timezone * 1000));
    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  /**
   * Obtiene la hora del sunset en hora local (0-23)
   */
  getSunsetHour(): number {
    const sunsetUTC = this.sunset.getTime();
    const localSunsetTime = new Date(sunsetUTC + (this.timezone * 1000));
    const hour = localSunsetTime.getUTCHours();
    console.log(`🌇 [${this.city}] Sunset calculation:`, {
      sunsetUTC: new Date(sunsetUTC).toISOString(),
      timezone: this.timezone / 3600,
      localSunsetHour: hour,
    });
    return hour;
  }
  
  /**
   * Obtiene la hora del sunrise en hora local (0-23)
   */
  getSunriseHour(): number {
    const sunriseUTC = this.sunrise.getTime();
    const localSunriseTime = new Date(sunriseUTC + (this.timezone * 1000));
    const hour = localSunriseTime.getUTCHours();
    console.log(`🌅 [${this.city}] Sunrise calculation:`, {
      sunriseUTC: new Date(sunriseUTC).toISOString(),
      timezone: this.timezone / 3600,
      localSunriseHour: hour,
    });
    return hour;
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

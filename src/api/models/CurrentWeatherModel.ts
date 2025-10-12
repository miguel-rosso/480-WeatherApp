/**
 * CurrentWeather Model - Representa los datos del clima actual 
 * y pequeñas utilidades relacionadas
 */

export interface CurrentWeather {
  city: string;
  temperature: number;
  feelsLike: number; // Sensación térmica
  tempMin: number; // Temperatura mínima
  tempMax: number; // Temperatura máxima
  description: string; // Description de la API (ej: "clear sky", "overcast clouds")
  weatherMain: string; // Main de la API (Clear, Clouds, Rain, etc.)
  weatherId: number; // ID numérico del weather (ej: 800=clear, 804=overcast)
  humidity: number;
  windSpeed: number;
  pressure: number; // Presión atmosférica en hPa
  cloudiness: number; // Porcentaje de nubosidad (0-100)
  visibility?: number; // Visibilidad en metros (opcional)
  icon: string;
  timestamp: Date;
  sunrise: Date;
  sunset: Date;
  timezone: number; // Desplazamiento en segundos desde UTC
}

export class CurrentWeatherModel implements CurrentWeather {
  city: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
  weatherMain: string;
  weatherId: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudiness: number;
  visibility?: number;
  icon: string;
  timestamp: Date;
  sunrise: Date;
  sunset: Date;
  timezone: number;

  constructor(data: CurrentWeather) {
    this.city = data.city;
    this.temperature = data.temperature;
    this.feelsLike = data.feelsLike;
    this.tempMin = data.tempMin;
    this.tempMax = data.tempMax;
    this.description = data.description;
    this.weatherMain = data.weatherMain;
    this.weatherId = data.weatherId;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.pressure = data.pressure;
    this.cloudiness = data.cloudiness;
    this.visibility = data.visibility;
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
   * Formatea una fecha específica en hora local (HH:MM)
   * Útil para sunrise/sunset
   * @param date Fecha a formatear
   */
  formatDateToLocalTime(date: Date): string {
    const localTime = new Date(date.getTime() + (this.timezone * 1000));
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

  /**
   * Lógica de validación del modelo
   */
  isValid(): boolean {
    return (
      this.city.length > 0 &&
      this.temperature !== undefined &&
      this.description.length > 0
    );
  }

  /**
   * Formatear temperatura
   */
  getFormattedTemp(): string {
    return `${Math.round(this.temperature)}°C`;
  }

  /**
   * Obtiene el icono de humedad según el porcentaje
   */
  getHumidityIcon(): string {
    if (this.humidity < 30) {
      return '☀️'; // Seco
    } else if (this.humidity < 70) {
      return '💧'; // Normal
    } else {
      return '💦'; // Húmedo
    }
  }

  /**
   * Obtiene la descripción de la humedad
   */
  getHumidityDescription(t: (key: string) => string): string {
    if (this.humidity < 30) {
      return t('weather.humidityLow') || 'Low';
    } else if (this.humidity < 70) {
      return t('weather.humidityNormal') || 'Normal';
    } else {
      return t('weather.humidityHigh') || 'High';
    }
  }

  /**
   * Obtiene la descripción del "Feels Like" comparando con la temperatura real
   */
  getFeelsLikeDescription(t: (key: string) => string): string {
    const diff = this.feelsLike - this.temperature;

    if (Math.abs(diff) < 2) {
      return t('weather.feelsLikeSimilar') || 'Similar';
    } else if (diff >= 2) {
      return t('weather.feelsLikeWarmer') || 'Warmer';
    } else {
      return t('weather.feelsLikeCooler') || 'Cooler';
    }
  }

  /**
   * Obtiene la descripción del viento
   */
  getWindDescription(t: (key: string) => string): string {
    if (this.windSpeed < 10) {
      return t('weather.windLight') || 'Light breeze';
    } else if (this.windSpeed < 30) {
      return t('weather.windModerate') || 'Moderate wind';
    } else {
      return t('weather.windStrong') || 'Strong wind';
    }
  }

  /**
   * Obtiene la descripción de la presión atmosférica
   */
  getPressureDescription(t: (key: string) => string): string {
    if (this.pressure < 1013) {
      return t('weather.pressureLow') || 'Low pressure';
    } else if (this.pressure > 1020) {
      return t('weather.pressureHigh') || 'High pressure';
    } else {
      return t('weather.pressureNormal') || 'Normal';
    }
  }

  /**
   * Obtiene la descripción de la nubosidad
   */
  getCloudinessDescription(t: (key: string) => string): string {
    if (this.cloudiness < 20) {
      return t('weather.cloudinessClear') || 'Clear sky';
    } else if (this.cloudiness < 50) {
      return t('weather.cloudinessPartly') || 'Partly cloudy';
    } else if (this.cloudiness < 85) {
      return t('weather.cloudinessMostly') || 'Mostly cloudy';
    } else {
      return t('weather.cloudinessOvercast') || 'Overcast';
    }
  }

  /**
   * Obtiene la descripción de la visibilidad
   */
  getVisibilityDescription(t: (key: string) => string): string {
    if (!this.visibility) return '';
    
    if (this.visibility >= 10000) {
      return t('weather.visibilityExcellent') || 'Excellent';
    } else if (this.visibility >= 5000) {
      return t('weather.visibilityGood') || 'Good';
    } else if (this.visibility >= 2000) {
      return t('weather.visibilityModerate') || 'Moderate';
    } else {
      return t('weather.visibilityPoor') || 'Poor';
    }
  }

  /**
   * Obtiene la visibilidad formateada en km
   */
  getFormattedVisibility(): string {
    if (!this.visibility) return '';
    return (this.visibility / 1000).toFixed(1);
  }
}

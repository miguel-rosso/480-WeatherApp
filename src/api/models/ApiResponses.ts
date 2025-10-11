/**
 * API Response Types - OpenWeatherMap
 * 
 * Interfaces de TypeScript que definen las respuestas de la API de OpenWeatherMap
 * Estas interfaces representan los contratos de la API externa
 */

/**
 * Respuesta de la API de clima actual
 */
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
  visibility?: number; // Visibilidad en metros (opcional)
  dt: number;
  timezone: number; // Desplazamiento en segundos desde UTC
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

/**
 * Respuesta de la API de pronóstico de 5 días
 */
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

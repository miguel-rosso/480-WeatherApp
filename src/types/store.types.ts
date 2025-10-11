/**
 * Models - Redux State Types
 * 
 * Interfaces y tipos relacionados con el estado de Redux
 * Definen la forma del estado global de la aplicación
 */

import { CurrentWeather } from '@/src/api/models/CurrentWeatherModel';
import { Forecast } from '@/src/api/models/ForecastModel';
import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';

/**
 * Estado del clima para una ciudad específica
 * Almacena objetos planos (serializables) en lugar de instancias de clase
 */
export interface CityWeatherState {
  weather: CurrentWeather | null;
  forecast: Forecast[];
  hourlyForecast: HourlyForecast[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * Estado completo del slice de weather
 */
export interface WeatherState {
  cities: {
    [cityName: string]: CityWeatherState;
  };
}

/**
 * Estado del fondo dinámico
 */
export interface WeatherBackgroundState {
  weatherMain: string;
  weatherId?: number;
  isDaytime: boolean;
  currentTime: Date;
  sunsetTime?: Date;
  timezone?: number;
}

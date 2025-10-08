/**
 * ViewModel - Contiene la lógica de negocio y estado
 * En React, esto es un custom hook que encapsula la lógica
 * 
 * NOTA: Por ahora usa datos mock. Más adelante se conectará con API real.
 */

import { WeatherForecast, WeatherModel } from '@/src/models/Weather';
import { useState } from 'react';

export interface WeatherViewModelState {
  weather: WeatherModel | null;
  forecast: WeatherForecast[];
  isLoading: boolean;
  error: string | null;
}

// Datos mock para desarrollo (eliminar cuando tengamos API)
const getMockWeather = (city: string): WeatherModel => {
  return new WeatherModel({
    city: city,
    temperature: 22,
    condition: 'Soleado',
    humidity: 65,
    windSpeed: 12,
    icon: '☀️',
    timestamp: new Date(),
  });
};

const getMockForecast = (): WeatherForecast[] => {
  return [
    { date: 'Lun', maxTemp: 24, minTemp: 18, condition: 'Soleado', icon: '☀️' },
    { date: 'Mar', maxTemp: 22, minTemp: 16, condition: 'Nublado', icon: '☁️' },
    { date: 'Mié', maxTemp: 20, minTemp: 15, condition: 'Lluvia', icon: '🌧️' },
    { date: 'Jue', maxTemp: 23, minTemp: 17, condition: 'Parcial', icon: '⛅' },
    { date: 'Vie', maxTemp: 25, minTemp: 19, condition: 'Soleado', icon: '☀️' },
  ];
};

export const useWeatherViewModel = (initialCity: string = 'Madrid') => {
  const [state, setState] = useState<WeatherViewModelState>({
    weather: getMockWeather(initialCity),
    forecast: getMockForecast(),
    isLoading: false,
    error: null,
  });

  /**
   * Refrescar datos (por ahora solo actualiza con mock data)
   */
  const refresh = () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simular delay de red
    setTimeout(() => {
      setState({
        weather: getMockWeather(initialCity),
        forecast: getMockForecast(),
        isLoading: false,
        error: null,
      });
    }, 500);
  };

  return {
    // Estado
    weather: state.weather,
    forecast: state.forecast,
    isLoading: state.isLoading,
    error: state.error,

    // Acciones
    refresh,
  };
};

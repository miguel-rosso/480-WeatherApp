/**
 * ViewModel - Contiene la lógica de negocio y estado
 * En React, esto es un custom hook que encapsula la lógica
 * Conectado con Redux para obtener datos del clima
 */

import { CurrentWeatherModel } from '@/src/api/models/CurrentWeatherModel';
import { Forecast } from '@/src/api/models/ForecastModel';
import { refreshCityData } from '@/src/api/services/WeatherPrefetchService';
import { useAppSelector } from '@/src/store/hooks';
import { selectCityWeather } from '@/src/store/slices/weatherSlice';
import { BackgroundUpdateData } from '@/src/types/viewModel.types';
import { useTranslation } from 'react-i18next';

export const useWeatherViewModel = (initialCity: string = 'Madrid') => {
  const { i18n } = useTranslation();
  
  // 🎯 REDUX: Obtener datos del store
  const cityWeatherState = useAppSelector(selectCityWeather(initialCity));

  /**
   * Refrescar los datos de la ciudad
   */
  const refresh = async () => {
    const lang = i18n.language === 'es' ? 'es' : 'en';
    await refreshCityData(initialCity, lang);
  };

  /**
   * Prepara los datos para actualizar el fondo (Redux)
   * El ViewModel prepara los datos, la View solo los despacha
   */
  const getBackgroundUpdateData = (currentTime: Date): BackgroundUpdateData | null => {
    if (!cityWeatherState.weather) return null;
    
    return {
      weatherMain: cityWeatherState.weather.weatherMain,
      weatherId: cityWeatherState.weather.weatherId,
      isDaytime: cityWeatherState.weather.isDaytime(),
      currentTime: currentTime,
      sunsetTime: cityWeatherState.weather.sunset,
      timezone: cityWeatherState.weather.timezone,
    };
  };

  return {
    // Estado desde Redux
    weather: cityWeatherState.weather as CurrentWeatherModel | null,
    forecast: cityWeatherState.forecast as Forecast[],
    isLoading: cityWeatherState.isLoading,
    error: cityWeatherState.error,

    // Acciones
    refresh,
    getBackgroundUpdateData,
  };
};

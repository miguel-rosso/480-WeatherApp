/**
 * ViewModel - Contiene la lógica de negocio y estado
 * En React, esto es un custom hook que encapsula la lógica
 * Conectado con Redux para obtener datos del clima
 */

import { CurrentWeatherModel } from '@/src/api/models/CurrentWeatherModel';
import { refreshCityData } from '@/src/api/services/WeatherPrefetchService';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { updateBackground } from '@/src/store/slices/weatherBackgroundSlice';
import { selectCityWeather } from '@/src/store/slices/weatherSlice';
import { useFocusEffect } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useCurrentWeatherViewModel = (initialCity: string = 'Madrid') => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  
  // Estado local para el tiempo actual
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 🎯 REDUX: Obtener datos del store
  const cityWeatherState = useAppSelector(selectCityWeather(initialCity));
  
  // Convertir el objeto plano a instancia de clase para usar sus métodos
  const weather = useMemo(() => {
    if (!cityWeatherState.weather) return null;
    return new CurrentWeatherModel(cityWeatherState.weather);
  }, [cityWeatherState.weather]);

  /**
   * Actualizar el tiempo actual cada minuto
   */
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  /**
   * Actualizar el fondo cuando la pantalla gana el foco o cambia el clima
   */
  useFocusEffect(
    React.useCallback(() => {
      if (weather) {
        dispatch(updateBackground({
          weatherMain: weather.weatherMain,
          weatherId: weather.weatherId,
          isDaytime: weather.isDaytime(),
          currentTime: currentTime,
          sunsetTime: weather.sunset,
          timezone: weather.timezone,
        }));
      }
    }, [currentTime, dispatch, weather])
  );

  /**
   * Refrescar los datos de la ciudad
   */
  const refresh = async () => {
    await refreshCityData(initialCity);
  };

  return {
    // Estado desde Redux (weather ya es una instancia de CurrentWeatherModel)
    weather,
    forecast: cityWeatherState.forecast,
    hourlyForecast: cityWeatherState.hourlyForecast,
    isLoading: cityWeatherState.isLoading,
    error: cityWeatherState.error,
    currentTime,

    // Acciones
    refresh,
  };
};

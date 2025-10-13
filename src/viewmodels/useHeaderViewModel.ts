/**
 * HeaderViewModel - Lógica de negocio para el header unificado
 * 
 * Este ViewModel maneja:
 * - Detección de la pantalla actual (ciudad o contacto)
 * - Obtención del clima de la ciudad actual desde Redux
 * - Actualización del tiempo local cada minuto
 * - Formateo de la hora local
 */

import { CurrentWeatherModel } from '@/src/models/CurrentWeatherModel';
import { useAppSelector } from '@/src/store/hooks';
import { selectCityWeather } from '@/src/store/slices/weatherSlice';
import { useSegments } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

export const useHeaderViewModel = () => {
  // 🎯 Detectar en qué tab estamos
  const segments = useSegments();
  const currentTab = segments[segments.length - 1];
  const isContactScreen = currentTab === 'contact';

  // Mapeo de nombres de tabs a nombres de ciudades
  const cityMap: Record<string, string> = {
    'index': 'London',
    'toronto': 'Toronto',
    'singapore': 'Singapore',
  };

  // Obtener el nombre de la ciudad actual
  const currentCity = cityMap[currentTab] || 'London';

  // 🎯 REDUX: Obtener el clima de la ciudad actual
  const cityWeatherState = useAppSelector(selectCityWeather(currentCity));

  // Estado local para el tiempo actual
  const [currentTime, setCurrentTime] = useState(new Date());

  // Convertir el objeto plano a instancia de clase para usar sus métodos
  const weather = useMemo(() => {
    if (!cityWeatherState.weather) return null;
    return new CurrentWeatherModel(cityWeatherState.weather);
  }, [cityWeatherState.weather]);

  // Actualizar el tiempo actual cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  // Obtener la hora local formateada
  const localTime = weather?.getFormattedLocalTime(currentTime);

  return {
    isContactScreen,
    localTime,
  };
};

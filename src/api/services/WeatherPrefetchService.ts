/**
 * Weather Prefetch Service
 * 
 * Servicio para cargar los datos de todas las ciudades al inicio de la app
 * Este servicio coordina las llamadas a la API y actualiza Redux
 */

import { CurrentWeatherService } from '@/src/api/services/CurrentWeatherService';
import { ForecastService } from '@/src/api/services/ForecastService';
import { store } from '@/src/store';
import { setError, setForecast, setLoading, setWeather } from '@/src/store/slices/weatherSlice';

/**
 * Obtiene el clima actual de una ciudad y lo guarda en Redux
 */
const fetchCityWeather = async (city: string, lang: string = 'en') => {
  try {
    store.dispatch(setLoading({ city }));
    
    const weather = await CurrentWeatherService.getCurrentWeather(city, lang);
    
    store.dispatch(setWeather({ city, weather }));
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    store.dispatch(setError({ city, error: 'Error al obtener el clima' }));
  }
};

/**
 * Obtiene el pronóstico de una ciudad y lo guarda en Redux
 */
const fetchCityForecast = async (city: string, lang: string = 'en') => {
  try {
    const forecast = await ForecastService.getForecast(city, lang);
    
    store.dispatch(setForecast({ city, forecast }));
  } catch (error) {
    console.error(`Error fetching forecast for ${city}:`, error);
  }
};

/**
 * Hace prefetch de los datos de todas las ciudades
 */
export const prefetchAllCities = async (cities: string[], lang: string = 'en') => {
  console.log('🚀 Prefetching weather data for all cities...');
  
  // Hacer fetch de todas las ciudades en paralelo
  await Promise.all(
    cities.map(async (city) => {
      await Promise.all([
        fetchCityWeather(city, lang),
        fetchCityForecast(city, lang),
      ]);
    })
  );
  
  console.log('✅ All cities data loaded!');
};

/**
 * Refresca los datos de una ciudad específica
 */
export const refreshCityData = async (city: string, lang: string = 'en') => {
  await Promise.all([
    fetchCityWeather(city, lang),
    fetchCityForecast(city, lang),
  ]);
};

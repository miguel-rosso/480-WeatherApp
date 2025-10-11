/**
 * Weather Prefetch Service
 *
 * Servicio para cargar los datos de todas las ciudades al inicio de la app
 * Este servicio coordina las llamadas a la API y actualiza Redux
 */

import { getCurrentWeather } from '@/src/api/services/CurrentWeatherService';
import { getForecast, getHourlyForecast } from '@/src/api/services/ForecastService';
import { store } from '@/src/store';
import { setError, setForecast, setHourlyForecast, setLoading, setWeather } from '@/src/store/slices/weatherSlice';

/**
 * Obtiene el clima actual de una ciudad y lo guarda en Redux
 */
const fetchCityWeather = async (city: string, lang: string = 'en') => {
  try {
    store.dispatch(setLoading({ city }));

    const weather = await getCurrentWeather(city, lang);

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
    const forecast = await getForecast(city, lang);

    store.dispatch(setForecast({ city, forecast }));
  } catch (error) {
    console.error(`Error fetching forecast for ${city}:`, error);
  }
};

/**
 * Obtiene el pronóstico por hora de una ciudad y lo guarda en Redux
 */
const fetchCityHourlyForecast = async (
  city: string,
  lang: string = 'en',
  timezone: number = 0,
  currentWeather?: { temperature: number; condition: string; weatherId: number; icon: string }
) => {
  try {
    const hourlyForecast = await getHourlyForecast(city, lang, timezone, currentWeather);

    store.dispatch(setHourlyForecast({ city, hourlyForecast }));
  } catch (error) {
    console.error(`Error fetching hourly forecast for ${city}:`, error);
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
      // Primero obtener el clima actual para tener el timezone
      await fetchCityWeather(city, lang);

      // Obtener timezone y datos del clima actual del store
      const state = store.getState();
      const cityWeather = state.weather.cities[city]?.weather;
      const timezone = cityWeather?.timezone || 0;
      
      // Preparar datos del clima actual para el hourly forecast
      const currentWeatherData = cityWeather ? {
        temperature: cityWeather.temperature,
        condition: cityWeather.condition,
        weatherId: cityWeather.weatherId,
        icon: cityWeather.icon,
      } : undefined;

      // Luego obtener pronósticos
      await Promise.all([
        fetchCityForecast(city, lang),
        fetchCityHourlyForecast(city, lang, timezone, currentWeatherData)
      ]);
    })
  );

  console.log('✅ All cities data loaded!');
};

/**
 * Refresca los datos de una ciudad específica
 */
export const refreshCityData = async (city: string, lang: string = 'en') => {
  // Primero obtener el clima actual para tener el timezone
  await fetchCityWeather(city, lang);

  // Obtener timezone y datos del clima actual del store
  const state = store.getState();
  const cityWeather = state.weather.cities[city]?.weather;
  const timezone = cityWeather?.timezone || 0;
  
  // Preparar datos del clima actual para el hourly forecast
  const currentWeatherData = cityWeather ? {
    temperature: cityWeather.temperature,
    condition: cityWeather.condition,
    weatherId: cityWeather.weatherId,
    icon: cityWeather.icon,
  } : undefined;

  // Luego obtener pronósticos
  await Promise.all([
    fetchCityForecast(city, lang),
    fetchCityHourlyForecast(city, lang, timezone, currentWeatherData)
  ]);
};

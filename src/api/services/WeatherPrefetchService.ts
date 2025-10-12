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
const fetchCityWeather = async (city: string) => {
  try {
    store.dispatch(setLoading({ city }));

    const weather = await getCurrentWeather(city);

    store.dispatch(setWeather({ city, weather }));
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    store.dispatch(setError({ city, error: 'Error al obtener el clima' }));
  }
};

/**
 * Obtiene el pronóstico de una ciudad y lo guarda en Redux
 */
const fetchCityForecast = async (
  city: string,
  timezone: number = 0,
  currentTemperature?: number,
  currentWeather?: { weatherId: number; description: string }
) => {
  try {
    const forecast = await getForecast(city, timezone, currentTemperature, currentWeather);

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
  timezone: number = 0,
  currentWeather?: { 
    temperature: number; 
    feelsLike: number;
    description: string; 
    weatherId: number; 
    icon: string;
    humidity: number;
    windSpeed: number;
    cloudiness: number;
    visibility?: number;
  }
) => {
  try {
    const hourlyForecast = await getHourlyForecast(city, timezone, currentWeather);

    store.dispatch(setHourlyForecast({ city, hourlyForecast }));
  } catch (error) {
    console.error(`Error fetching hourly forecast for ${city}:`, error);
  }
};

/**
 * Hace prefetch de los datos de todas las ciudades
 */
export const prefetchAllCities = async (cities: string[]) => {
  console.log('🚀 Prefetching weather data for all cities...');

  // Hacer fetch de todas las ciudades en paralelo
  await Promise.all(
    cities.map(async (city) => {
      // Primero obtener el clima actual para tener el timezone
      await fetchCityWeather(city);

      // Obtener timezone y datos del clima actual del store
      const state = store.getState();
      const cityWeather = state.weather.cities[city]?.weather;
      const timezone = cityWeather?.timezone || 0;
      
      // Preparar datos del clima actual para el hourly forecast
      const currentWeatherData = cityWeather ? {
        temperature: cityWeather.temperature,
        feelsLike: cityWeather.feelsLike,
        description: cityWeather.description,
        weatherId: cityWeather.weatherId,
        icon: cityWeather.icon,
        humidity: cityWeather.humidity,
        windSpeed: cityWeather.windSpeed,
        cloudiness: cityWeather.cloudiness,
        visibility: cityWeather.visibility,
      } : undefined;

      // Preparar weatherId y description para el forecast del día de hoy
      const currentWeatherForForecast = cityWeather ? {
        weatherId: cityWeather.weatherId,
        description: cityWeather.description,
      } : undefined;

      // Luego obtener pronósticos (pasar temperatura y clima actual para el primer día)
      await Promise.all([
        fetchCityForecast(city, timezone, cityWeather?.temperature, currentWeatherForForecast),
        fetchCityHourlyForecast(city, timezone, currentWeatherData)
      ]);
    })
  );

  console.log('✅ All cities data loaded!');
};

/**
 * Refresca los datos de una ciudad específica
 */
export const refreshCityData = async (city: string) => {
  // Primero obtener el clima actual para tener el timezone
  await fetchCityWeather(city);

  // Obtener timezone y datos del clima actual del store
  const state = store.getState();
  const cityWeather = state.weather.cities[city]?.weather;
  const timezone = cityWeather?.timezone || 0;
  
  // Preparar datos del clima actual para el hourly forecast
  const currentWeatherData = cityWeather ? {
    temperature: cityWeather.temperature,
    feelsLike: cityWeather.feelsLike,
    description: cityWeather.description,
    weatherId: cityWeather.weatherId,
    icon: cityWeather.icon,
    humidity: cityWeather.humidity,
    windSpeed: cityWeather.windSpeed,
    cloudiness: cityWeather.cloudiness,
    visibility: cityWeather.visibility,
  } : undefined;

  // Preparar weatherId y description para el forecast del día de hoy
  const currentWeatherForForecast = cityWeather ? {
    weatherId: cityWeather.weatherId,
    description: cityWeather.description,
  } : undefined;

  // Luego obtener pronósticos (pasar temperatura y clima actual para el primer día)
  await Promise.all([
    fetchCityForecast(city, timezone, cityWeather?.temperature, currentWeatherForForecast),
    fetchCityHourlyForecast(city, timezone, currentWeatherData)
  ]);
};

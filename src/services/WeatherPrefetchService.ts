/**
 * Weather Prefetch Service
 *
 * Servicio para cargar los datos de todas las ciudades al inicio de la app
 * Este servicio coordina las llamadas a la API y actualiza Redux
 */

import { getCurrentWeather } from '@/src/services/CurrentWeatherService';
import { getForecastData } from '@/src/services/ForecastService';
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
 * Obtiene el pronóstico diario y por hora de una ciudad y lo guarda en Redux
 */
const fetchCityForecasts = async (
  city: string,
  timezone: number = 0,
  currentTemperature?: number,
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
    // Una sola llamada al API que devuelve ambos: daily y hourly
    const { daily, hourly } = await getForecastData(city, timezone, currentTemperature, currentWeather);

    store.dispatch(setForecast({ city, forecast: daily }));
    store.dispatch(setHourlyForecast({ city, hourlyForecast: hourly }));
  } catch (error) {
    console.error(`Error fetching forecasts for ${city}:`, error);
  }
};

/**
 * Obtiene los datos de una ciudad específica y los guarda en Redux
 */
export const fetchCityData = async (city: string) => {
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

  // Luego obtener pronósticos (pasar temperatura y clima actual para el primer día)
  await fetchCityForecasts(city, timezone, cityWeather?.temperature, currentWeatherData);
};

/**
 * Hace prefetch de los datos de todas las ciudades
 * Utiliza fetchCityData internamente para evitar duplicación de código
 */
export const prefetchAllCities = async (cities: string[]) => {
  console.log('🚀 Prefetching weather data for all cities...');

  // Hacer fetch de todas las ciudades en paralelo usando fetchCityData
  await Promise.all(cities.map(city => fetchCityData(city)));

  console.log('✅ All cities data loaded!');
};
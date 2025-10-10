/**
 * ViewModel - Contiene la lógica de negocio y estado
 * En React, esto es un custom hook que encapsula la lógica
 * Conectado con OpenWeatherMap API
 */

import { getWeatherEmoji } from '@/src/api/config';
import { CurrentWeatherModel } from '@/src/api/models/CurrentWeatherModel';
import { Forecast, ForecastModel } from '@/src/api/models/ForecastModel';
import { CurrentWeatherService } from '@/src/api/services/CurrentWeatherService';
import { ForecastService } from '@/src/api/services/ForecastService';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface WeatherViewModelState {
  weather: CurrentWeatherModel | null;
  forecast: Forecast[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Datos preparados para actualizar el fondo (Redux)
 * El ViewModel prepara los datos, la View solo los despacha
 */
export interface BackgroundUpdateData {
  weatherMain: string;
  weatherId: number;
  isDaytime: boolean;
  currentTime: Date;
  sunsetTime: Date;
  timezone: number;
}

/**
 * Convierte el día de la semana a formato corto traducido
 */
const getDayName = (date: Date, lang: string): string => {
  const days: { [key: string]: string[] } = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
  return days[lang]?.[date.getDay()] || days.en[date.getDay()];
};

export const useWeatherViewModel = (initialCity: string = 'Madrid') => {
  const { i18n } = useTranslation();
  const [state, setState] = useState<WeatherViewModelState>({
    weather: null,
    forecast: [],
    isLoading: true,
    error: null,
  });

  /**
   * Obtiene el clima actual desde la API
   */
  const fetchCurrentWeather = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const lang = i18n.language === 'es' ? 'es' : 'en';
      const data = await CurrentWeatherService.getCurrentWeather(initialCity, lang);
      
      // Determinar si es de día
      const currentTime = Date.now() / 1000;
      const isDay = currentTime >= data.sys.sunrise && currentTime < data.sys.sunset;

      const weather = new CurrentWeatherModel({
        city: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].description,
        weatherMain: data.weather[0].main,
        weatherId: data.weather[0].id,
        weatherDescription: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s a km/h
        pressure: data.main.pressure,
        icon: getWeatherEmoji(data.weather[0].id, isDay),
        timestamp: new Date(data.dt * 1000),
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        timezone: data.timezone, // Desplazamiento desde UTC en segundos
      });
      
      setState(prev => ({ ...prev, weather, isLoading: false }));
    } catch (error) {
      console.error('Error fetching weather:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Error al obtener el clima',
        isLoading: false 
      }));
    }
  };

  /**
   * Obtiene el pronóstico de 5 días desde la API
   */
  const fetchForecast = async () => {
    try {
      const lang = i18n.language === 'es' ? 'es' : 'en';
      const data = await ForecastService.getForecast(initialCity, lang);
      
      // Agrupar por día y calcular máximas y mínimas
      const dailyData: { [key: string]: {
        temps: number[];
        date: Date;
        weather: { id: number; description: string };
      }} = {};
      
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            temps: [],
            date: date,
            weather: {
              id: item.weather[0].id,
              description: item.weather[0].description,
            },
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
      });
      
      // Convertir a array y ordenar por fecha
      const dailyForecasts: Forecast[] = Object.values(dailyData)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5) // Tomar solo 5 días
        .map(day => new ForecastModel({
          date: getDayName(day.date, lang),
          maxTemp: Math.round(Math.max(...day.temps)),
          minTemp: Math.round(Math.min(...day.temps)),
          condition: day.weather.description,
          icon: getWeatherEmoji(day.weather.id, true),
        }));
      
      console.log('Forecast data:', dailyForecasts); // Debug
      setState(prev => ({ ...prev, forecast: dailyForecasts }));
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  /**
   * Refrescar todos los datos
   */
  const refresh = () => {
    fetchCurrentWeather();
    fetchForecast();
  };

  // Cargar datos al montar y cuando cambie el idioma
  useEffect(() => {
    fetchCurrentWeather();
    fetchForecast();
  }, [initialCity, i18n.language]);

  /**
   * Prepara los datos para actualizar el fondo (Redux)
   * ✅ MVVM: El ViewModel prepara los datos, la View solo los despacha
   */
  const getBackgroundUpdateData = (currentTime: Date): BackgroundUpdateData | null => {
    if (!state.weather) return null;
    
    return {
      weatherMain: state.weather.weatherMain,
      weatherId: state.weather.weatherId,
      isDaytime: state.weather.isDaytime(),
      currentTime: currentTime,
      sunsetTime: state.weather.sunset,
      timezone: state.weather.timezone,
    };
  };

  return {
    // Estado
    weather: state.weather,
    forecast: state.forecast,
    isLoading: state.isLoading,
    error: state.error,

    // Acciones
    refresh,
    getBackgroundUpdateData, // ✅ Nueva función para preparar datos de Redux
  };
};

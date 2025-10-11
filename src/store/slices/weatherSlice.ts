/**
 * Weather Slice - Estado global del clima de todas las ciudades
 * 
 * Este slice almacena los datos del clima de todas las ciudades
 * para evitar hacer fetch cada vez que se cambia de pestaña
 */

import { CurrentWeather } from '@/src/api/models/CurrentWeatherModel';
import { Forecast } from '@/src/api/models/ForecastModel';
import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import type { RootState } from '@/src/store';
import { CityWeatherState, WeatherState } from '@/src/types/store.types';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

// 📦 Estado inicial
const initialState: WeatherState = {
  cities: {},
};

// 🍕 SLICE
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Iniciar carga de datos para una ciudad
    setLoading: (state, action: PayloadAction<{ city: string }>) => {
      const { city } = action.payload;
      if (!state.cities[city]) {
        state.cities[city] = {
          weather: null,
          forecast: [],
          hourlyForecast: [],
          isLoading: true,
          error: null,
          lastUpdated: null,
        };
      } else {
        state.cities[city].isLoading = true;
        state.cities[city].error = null;
      }
    },

    // Actualizar datos del clima actual
    setWeather: (state, action: PayloadAction<{ 
      city: string; 
      weather: CurrentWeather;
    }>) => {
      const { city, weather } = action.payload;
      if (!state.cities[city]) {
        state.cities[city] = {
          weather: null,
          forecast: [],
          hourlyForecast: [],
          isLoading: false,
          error: null,
          lastUpdated: null,
        };
      }
      state.cities[city].weather = weather;
      state.cities[city].isLoading = false;
      state.cities[city].lastUpdated = new Date();
    },

    // Actualizar pronóstico
    setForecast: (state, action: PayloadAction<{ 
      city: string; 
      forecast: Forecast[];
    }>) => {
      const { city, forecast } = action.payload;
      if (!state.cities[city]) {
        state.cities[city] = {
          weather: null,
          forecast: [],
          hourlyForecast: [],
          isLoading: false,
          error: null,
          lastUpdated: null,
        };
      }
      state.cities[city].forecast = forecast;
    },

    // Actualizar pronóstico por hora
    setHourlyForecast: (state, action: PayloadAction<{ 
      city: string; 
      hourlyForecast: HourlyForecast[];
    }>) => {
      const { city, hourlyForecast } = action.payload;
      if (!state.cities[city]) {
        state.cities[city] = {
          weather: null,
          forecast: [],
          hourlyForecast: [],
          isLoading: false,
          error: null,
          lastUpdated: null,
        };
      }
      state.cities[city].hourlyForecast = hourlyForecast;
    },

    // Establecer error
    setError: (state, action: PayloadAction<{ 
      city: string; 
      error: string;
    }>) => {
      const { city, error } = action.payload;
      if (!state.cities[city]) {
        state.cities[city] = {
          weather: null,
          forecast: [],
          hourlyForecast: [],
          isLoading: false,
          error: null,
          lastUpdated: null,
        };
      }
      state.cities[city].error = error;
      state.cities[city].isLoading = false;
    },
  },
});

// 🎬 Exportar actions
export const { setLoading, setWeather, setForecast, setHourlyForecast, setError } = weatherSlice.actions;

// 🔍 Estado inicial para ciudad no encontrada
const defaultCityState: CityWeatherState = {
  weather: null,
  forecast: [],
  hourlyForecast: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

// 🔍 Selector base
const selectWeatherState = (state: RootState) => state.weather;

// 🔍 Selector memoizado para obtener datos de una ciudad específica
export const selectCityWeather = (city: string) =>
  createSelector(
    [selectWeatherState],
    (weatherState) => weatherState.cities[city] || defaultCityState
  );

// Exportar reducer
export default weatherSlice.reducer;

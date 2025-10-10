/**
 * Weather Background Slice - Redux
 * 
 * Un "slice" en Redux Toolkit es una colección de:
 * - Estado inicial
 * - Reducers (funciones que modifican el estado)
 * - Actions (se generan automáticamente)
 * 
 * Esto reemplaza el WeatherBackgroundContext
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 📦 ESTADO: Define la forma del estado para el fondo del clima
interface WeatherBackgroundState {
  weatherMain: string;
  weatherId?: number;
  isDaytime: boolean;
  currentTime: Date;
  sunsetTime?: Date;
  timezone?: number;
}

// 🎬 ESTADO INICIAL: El valor por defecto cuando la app inicia
const initialState: WeatherBackgroundState = {
  weatherMain: 'Clear',
  isDaytime: true,
  currentTime: new Date(),
};

// 🍕 SLICE: Crea el slice con su nombre, estado inicial y reducers
const weatherBackgroundSlice = createSlice({
  name: 'weatherBackground', // Nombre del slice (se usa en las actions)
  initialState,
  reducers: {
    // 🔄 REDUCER: updateBackground
    // Toma el estado actual y actualiza las propiedades que le pasemos
    updateBackground: (state, action: PayloadAction<Partial<WeatherBackgroundState>>) => {
      // Redux Toolkit usa Immer internamente, así que puedes "mutar" el estado directamente
      // (En realidad, Immer crea una copia inmutable por ti)
      return {
        ...state,
        ...action.payload,
      };
    },
    
    // 🔄 REDUCER: resetBackground
    // Vuelve al estado inicial
    resetBackground: () => initialState,
  },
});

// 📤 EXPORTAR ACTIONS: Las actions se generan automáticamente
// Uso: dispatch(updateBackground({ weatherMain: 'Rain' }))
export const { updateBackground, resetBackground } = weatherBackgroundSlice.actions;

// 📤 EXPORTAR REDUCER: Se usa en el store
export default weatherBackgroundSlice.reducer;

// 🎯 SELECTORS: Funciones para leer datos del store
// Estos son helpers para acceder al estado de forma tipada
export const selectWeatherBackground = (state: { weatherBackground: WeatherBackgroundState }) => 
  state.weatherBackground;

export const selectWeatherMain = (state: { weatherBackground: WeatherBackgroundState }) => 
  state.weatherBackground.weatherMain;

export const selectIsDaytime = (state: { weatherBackground: WeatherBackgroundState }) => 
  state.weatherBackground.isDaytime;

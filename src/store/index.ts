/**
 * Redux Store - Configuración
 * 
 * El STORE es el contenedor central de todo el estado de la aplicación.
 * Aquí se combinan todos los slices (reducers) de la app.
 */

import { configureStore } from '@reduxjs/toolkit';
import weatherBackgroundReducer from './slices/weatherBackgroundSlice';
import weatherReducer from './slices/weatherSlice';

// 🏪 CONFIGURAR STORE
// configureStore es de Redux Toolkit y configura automáticamente:
// - Redux DevTools (para debugging en el navegador)
// - Middleware para detectar mutaciones accidentales
// - Serialización de actions
export const store = configureStore({
  reducer: {
    // Cada slice tiene su propio "espacio" en el estado
    // El estado será: { weatherBackground: { weatherMain, isDaytime, ... } }
    weatherBackground: weatherBackgroundReducer,
    weather: weatherReducer,
    
    // Aquí puedes agregar más slices en el futuro:
    // user: userReducer,
    // settings: settingsReducer,
  },
  // Configuración adicional para serializar/deserializar Dates
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas rutas de acción porque contienen Dates
        ignoredActions: [
          'weatherBackground/updateBackground',
          'weather/setWeather',
          'weather/setForecast',
        ],
        // Ignorar estas rutas del estado
        ignoredPaths: [
          'weatherBackground.currentTime',
          'weatherBackground.sunsetTime',
          'weather.cities',
        ],
      },
    }),
});

// 📘 TIPOS DE TYPESCRIPT
// Estos tipos son útiles para tener autocompletado y type-safety

// Tipo del estado completo de la app
export type RootState = ReturnType<typeof store.getState>;

// Tipo del dispatch (para acciones async si las usas en el futuro)
export type AppDispatch = typeof store.dispatch;

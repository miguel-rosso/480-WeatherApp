/**
 * Redux Hooks - Tipados
 * 
 * Estos hooks son versiones tipadas de useDispatch y useSelector.
 * Para usar en lugar de los hooks de react-redux directamente.
 * 
 * Beneficios:
 * - Autocompletado de TypeScript
 * - Type-safety (detecta errores en tiempo de desarrollo)
 * - No necesitas importar tipos cada vez
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// 🎯 Hook para dispatch con tipos
// Uso: const dispatch = useAppDispatch();
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 🎯 Hook para selector con tipos
// Uso: const weatherMain = useAppSelector(state => state.weatherBackground.weatherMain);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Screen - Daily Forecast
 * Punto de entrada para la pantalla de pronóstico diario
 */

import { DailyForecastScreen } from '@/src/views/DailyForecastScreen';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function DailyForecastScreenWrapper() {
  const params = useLocalSearchParams();
  const city = (params.city as string) || 'London';
  const initialDay = parseInt((params.day as string) || '0');

  return <DailyForecastScreen city={city} initialDay={initialDay} />;
}

/**
 * DailyForecastCard Component - Pronóstico diario 
 * 
 * Componente que muestra el pronóstico de 5 días con barras de temperatura
 */

import { Forecast } from '@/src/api/models/ForecastModel';
import { DailyForecastItem } from '@/src/components/cards/DailyForecast/DailyForecastItem';
import { getTemperatureGradient } from '@/src/utils/helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

interface DailyForecastProps {
  forecast: Forecast[];
}

export const DailyForecastCard: React.FC<DailyForecastProps> = ({ forecast }) => {
  const { t } = useTranslation();

  if (!forecast || forecast.length === 0) {
    return null;
  }

  // Calcular el rango global de temperaturas para las barras
  const allTemps = forecast.flatMap(day => [day.maxTemp, day.minTemp]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const tempRange = globalMax - globalMin || 1; // Evitar división por 0

  return (
    <View className="p-6 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-3">
        <Text style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.6)' }}>📅</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: 0.5 }}>
          {t('weather.forecast')?.toUpperCase() || '5-DAY FORECAST'}
        </Text>
      </View>

      {/* Pronósticos diarios */}
      <View>
        {forecast.map((day, index) => {
          // Obtener colores del gradiente basados en las temperaturas
          const [startColor, endColor] = getTemperatureGradient(day.minTemp, day.maxTemp);

          return (
            <DailyForecastItem
              key={index}
              day={day}
              globalMin={globalMin}
              globalMax={globalMax}
              tempRange={tempRange}
              startColor={startColor}
              endColor={endColor}
              showDivider={index > 0}
            />
          );
        })}
      </View>
    </View>
  );
};

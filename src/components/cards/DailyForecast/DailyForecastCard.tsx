/**
 * DailyForecastCard Component - Pronóstico diario 
 * 
 * Componente que muestra el pronóstico diario con barras de temperatura
 * Muestra todos los días disponibles de la API (típicamente 5-6 días)
 */

import { Forecast } from '@/src/api/models/ForecastModel';
import { DailyForecastItem } from '@/src/components/cards/DailyForecast/DailyForecastItem';
import { getTemperatureGradient } from '@/src/utils/helpers';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

interface DailyForecastProps {
  forecast: Forecast[];
  city: string;
}

export const DailyForecastCard: React.FC<DailyForecastProps> = ({ forecast, city }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!forecast || forecast.length === 0) {
    return null;
  }

  // Calcular el rango global de temperaturas para las barras
  const allTemps = forecast.flatMap(day => [day.maxTemp, day.minTemp]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const tempRange = globalMax - globalMin || 1; // Evitar división por 0

  // Navegar a DailyForecastScreen (día 0 = hoy por defecto)
  const handleCardPress = () => {
    router.push({
      pathname: '/dailyForecast',
      params: { city, day: '0' }
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={handleCardPress}
      className="p-6 rounded-3xl" 
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-3">
        <Text style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.6)' }}>📅</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: 0.5 }}>
          {t('weather.forecast')?.toUpperCase() || 'DAILY FORECAST'}
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
              dayIndex={index}
              city={city}
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

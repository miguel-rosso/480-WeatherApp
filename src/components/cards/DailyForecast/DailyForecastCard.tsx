/**
 * DailyForecastCard Component - Pronóstico diario 
 * 
 * Componente que muestra el pronóstico diario con barras de temperatura
 * Muestra todos los días disponibles de la API (típicamente 5-6 días)
 */

import { Forecast } from '@/src/models/ForecastModel';
import { DailyForecastItem } from '@/src/components/cards/DailyForecast/DailyForecastItem';
import { Colors } from '@/src/constants/Colors';
import { getTemperatureGradient } from '@/src/utils/helpers';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

interface DailyForecastProps {
  forecast: Forecast[];
  city: string;
  isLoading?: boolean;
}

export const DailyForecastCard: React.FC<DailyForecastProps> = ({ forecast, city, isLoading = false }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // Si está cargando, crear datos placeholder
  const displayData = isLoading
    ? Array.from({ length: 5 }, (_, i) => ({
        dayName: '',
        date: '',
        fullDate: '',
        weatherId: 800,
        icon: '01d',
        minTemp: 0,
        maxTemp: 0,
        description: '',
      } as Forecast))
    : forecast;

  // Calcular el rango global de temperaturas para las barras
  const allTemps = isLoading ? [0, 30] : displayData.flatMap(day => [day.maxTemp, day.minTemp]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const tempRange = globalMax - globalMin || 1; // Evitar división por 0

  // Navegar a DailyForecastScreen (día 0 = hoy por defecto)
  const handleCardPress = () => {
    if (!isLoading) {
      router.push({
        pathname: '/dailyForecast',
        params: { city, day: '0' }
      });
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={handleCardPress}
      className="p-6 rounded-3xl" 
      style={{ backgroundColor: Colors.weatherCardBackground }}
      disabled={isLoading}
    >
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-3">
        <Text style={{ fontSize: 11, color: Colors.whiteAlpha60 }}>📅</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.whiteAlpha60, letterSpacing: 0.5 }}>
          {t('weather.forecast')?.toUpperCase() || 'DAILY FORECAST'}
        </Text>
      </View>

      {/* Pronósticos diarios */}
      <View>
        {displayData.map((day, index) => {
          // Obtener colores del gradiente basados en las temperaturas
          const [startColor, endColor] = getTemperatureGradient(day.minTemp, day.maxTemp);

          return (
            <DailyForecastItem
              key={isLoading ? `skeleton-${index}` : index}
              day={day}
              globalMin={globalMin}
              globalMax={globalMax}
              tempRange={tempRange}
              startColor={startColor}
              endColor={endColor}
              showDivider={index > 0}
              dayIndex={index}
              city={city}
              isLoading={isLoading}
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

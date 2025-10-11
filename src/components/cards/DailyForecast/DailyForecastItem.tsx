/**
 * DailyForecastItem - Item individual del pronóstico diario
 */

import { Forecast } from '@/src/api/models/ForecastModel';
import { WeatherIcon } from '@/src/components/common/WeatherCustomIcon';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

interface DailyForecastItemProps {
  day: Forecast;
  globalMin: number;
  globalMax: number;
  tempRange: number;
  startColor: string;
  endColor: string;
  showDivider: boolean;
}

export const DailyForecastItem: React.FC<DailyForecastItemProps> = ({
  day,
  globalMin,
  tempRange,
  startColor,
  endColor,
  showDivider,
}) => {
  // Calcular posiciones para la barra de temperatura
  const minPosition = ((day.minTemp - globalMin) / tempRange) * 100;
  const maxPosition = ((day.maxTemp - globalMin) / tempRange) * 100;
  const barWidth = maxPosition - minPosition;

  return (
    <View>
      {/* Divider superior */}
      {showDivider && (
        <View
          style={{
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginVertical: 8,
          }}
        />
      )}

      {/* Fila del día */}
      <View className="flex-row items-center justify-between py-2">
        {/* Día de la semana */}
        <Text
          className="text-base font-medium"
          style={{
            color: '#fff',
            flex: 1,
            minWidth: 50,
          }}
        >
          {day.date}
        </Text>

        {/* Icono */}
        <View style={{ marginHorizontal: 8 }}>
          <WeatherIcon icon={day.icon} size={28} />
        </View>

        {/* Temperatura mínima */}
        <Text
          className="text-base"
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            minWidth: 35,
            textAlign: 'right',
          }}
        >
          {Math.round(day.minTemp)}°
        </Text>

        {/* Barra de temperatura */}
        <View
          style={{
            flex: 2,
            marginHorizontal: 12,
            height: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            position: 'relative',
            minWidth: 80,
          }}
        >
          {/* Barra de rango de temperatura con gradiente de colores */}
          <LinearGradient
            colors={[startColor, endColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              left: `${minPosition}%`,
              width: `${Math.max(barWidth, 10)}%`,
              height: '100%',
              borderRadius: 3,
              shadowColor: endColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 4,
            }}
          />
        </View>

        {/* Temperatura máxima */}
        <Text
          className="text-base font-medium"
          style={{
            color: '#fff',
            minWidth: 35,
            textAlign: 'left',
          }}
        >
          {Math.round(day.maxTemp)}°
        </Text>
      </View>
    </View>
  );
};

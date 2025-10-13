/**
 * DailyForecastItem - Item individual del pronóstico diario
 */

import { Forecast } from '@/src/api/models/ForecastModel';
import { DailyForecastItemSkeleton } from '@/src/components/cards/DailyForecast/DailyForecastItemSkeleton';
import { WeatherIcon } from '@/src/components/common/WeatherCustomIcon';
import { Colors } from '@/src/constants/Colors';
import { getDayNameKey } from '@/src/utils/helpers';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

interface DailyForecastItemProps {
  day: Forecast;
  globalMin: number;
  globalMax: number;
  tempRange: number;
  startColor: string;
  endColor: string;
  showDivider: boolean;
  dayIndex: number;
  city: string;
  isLoading?: boolean;
}

export const DailyForecastItem: React.FC<DailyForecastItemProps> = ({
  day,
  globalMin,
  tempRange,
  startColor,
  endColor,
  showDivider,
  dayIndex,
  city,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);

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
            backgroundColor: Colors.weatherDivider,
            marginVertical: 8,
          }}
        />
      )}

      {/* Fila del día */}
      <TouchableOpacity 
        className="flex-row items-center justify-between px-2 py-2"
        onPress={() => !isLoading && router.push({
          pathname: '/dailyForecast',
          params: { city, day: dayIndex.toString() }
        })}
        onPressIn={() => !isLoading && setIsPressed(true)}
        onPressOut={() => !isLoading && setIsPressed(false)}
        activeOpacity={1}
        style={{ 
          borderRadius: 8,
          backgroundColor: isPressed ? Colors.weatherPressedBackground : 'transparent',
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <DailyForecastItemSkeleton />
        ) : (
          <>
            {/* Día de la semana */}
            <Text
              className="text-base font-medium"
              style={{
                color: 'white',
                flex: 1,
                minWidth: 50,
              }}
            >
              {t(getDayNameKey(day.date))}
            </Text>

            {/* Icono */}
            <View style={{ marginHorizontal: 8 }}>
              <WeatherIcon icon={day.icon} size={28} />
            </View>

            {/* Temperatura mínima */}
            <Text
              className="text-base"
              style={{
                color: Colors.whiteAlpha70,
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
                backgroundColor: Colors.whiteAlpha20,
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
                color: 'white',
                minWidth: 35,
                textAlign: 'left',
              }}
            >
              {Math.round(day.maxTemp)}°
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

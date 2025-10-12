/**
 * TemperatureRangeBar Component
 * Displays min and max temperature with a visual gradient bar
 */

import { Colors } from '@/src/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

interface TemperatureRangeBarProps {
  minTemp: number;
  maxTemp: number;
  gradientColors: [string, string];
}

export const TemperatureRangeBar: React.FC<TemperatureRangeBarProps> = ({
  minTemp,
  maxTemp,
  gradientColors,
}) => {
  const { t } = useTranslation();
  const [gradientStartColor, gradientEndColor] = gradientColors;
  const temperatureDelta = Math.round(maxTemp - minTemp);

  return (
    <View className="mx-6 mb-6 overflow-hidden rounded-2xl" style={{ backgroundColor: Colors.weatherInfoBackground }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-3 pb-1">
        <Text className="text-base font-semibold" style={{ color: Colors.whiteAlpha70 }}>
          🌡️ {t('dailyForecast.temperatureRange')}
        </Text>
      </View>
      
      {/* Temperature Range Bar */}
      <View className="px-4 pt-2 pb-3">
        <View className="flex-row items-center justify-between">
          {/* Min Temperature */}
          <View className="items-center flex-1">
            <View 
              className="items-center justify-center w-12 h-12 mb-1 rounded-full" 
              style={{ backgroundColor: gradientStartColor + '30' }}
            >
              <Text className="text-lg">❄️</Text>
            </View>
            <Text className="mb-1 text-xs font-medium" style={{ color: Colors.whiteAlpha60 }}>
              {t('weather.min')}
            </Text>
            <Text className="text-2xl font-bold" style={{ color: 'white' }}>
              {Math.round(minTemp)}°
            </Text>
          </View>
          
          {/* Visual Separator */}
          <View className="items-center justify-center flex-1">
            <LinearGradient
              colors={[gradientStartColor, gradientEndColor]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ 
                width: '75%',
                height: 3,
                borderRadius: 2,
              }}
            />
            <Text className="mt-1 text-xs" style={{ color: Colors.whiteAlpha60 }}>
              Δ {temperatureDelta}°
            </Text>
          </View>
          
          {/* Max Temperature */}
          <View className="items-center flex-1">
            <View 
              className="items-center justify-center w-12 h-12 mb-1 rounded-full" 
              style={{ backgroundColor: gradientEndColor + '30' }}
            >
              <Text className="text-lg">🔥</Text>
            </View>
            <Text className="mb-1 text-xs font-medium" style={{ color: Colors.whiteAlpha60 }}>
              {t('weather.max')}
            </Text>
            <Text className="text-2xl font-bold" style={{ color: 'white' }}>
              {Math.round(maxTemp)}°
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

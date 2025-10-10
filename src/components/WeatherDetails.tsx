/**
 * WeatherDetails - Componente expandible con detalles del clima
 * Muestra información básica y avanzada con animación suave
 */

import { CurrentWeatherModel } from '@/src/api/models/CurrentWeatherModel';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface WeatherDetailsProps {
  weather: CurrentWeatherModel; // ✅ MVVM: Recibe el Model completo
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="overflow-hidden rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
      {/* Información básica - Siempre visible */}
      <View className="p-6">
        <View className="flex-row justify-around">
          {/* Amanecer */}
          <View className="items-center flex-1">
            <View className="items-center justify-center w-12 h-12 mb-2 rounded-2xl" style={{ backgroundColor: 'rgba(251, 146, 60, 0.2)' }}>
              <Text className="text-2xl">🌅</Text>
            </View>
            <Text className="mb-1 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {t('weather.sunrise')}
            </Text>
            <Text className="text-xl font-bold" style={{ color: '#fff' }}>
              {weather.formatDateToLocalTime(weather.sunrise)}
            </Text>
          </View>

          {/* Atardecer */}
          <View className="items-center flex-1">
            <View className="items-center justify-center w-12 h-12 mb-2 rounded-2xl" style={{ backgroundColor: 'rgba(251, 146, 60, 0.2)' }}>
              <Text className="text-2xl">🌇</Text>
            </View>
            <Text className="mb-1 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {t('weather.sunset')}
            </Text>
            <Text className="text-xl font-bold" style={{ color: '#fff' }}>
              {weather.formatDateToLocalTime(weather.sunset)}
            </Text>
          </View>
        </View>

        {/* Botón Ver más / Ver menos */}
        <TouchableOpacity
          onPress={toggleExpand}
          className="items-center py-2 mt-4"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-semibold" style={{ color: '#60A5FA' }}>
              {isExpanded ? t('weather.showLess') : t('weather.showMore')}
            </Text>
            <Text className="text-xs" style={{ color: '#60A5FA' }}>
              {isExpanded ? '▲' : '▼'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Información detallada - Expandible */}
      {isExpanded && (
        <View className="px-6 pb-6">
          {/* Separador */}
          <View className="h-px mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

          {/* Sensación térmica y Humedad */}
          <View className="flex-row justify-around mb-6">
            {/* Sensación Térmica */}
            <View className="items-center flex-1">
              <View className="items-center justify-center w-12 h-12 mb-2 rounded-2xl" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
                <Text className="text-2xl">🌡️</Text>
              </View>
              <Text className="mb-1 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {t('weather.feelsLike')}
              </Text>
              <Text className="text-xl font-bold" style={{ color: '#fff' }}>
                {weather.feelsLike}°
              </Text>
            </View>

            {/* Humedad */}
            <View className="items-center flex-1">
              <View className="items-center justify-center w-12 h-12 mb-2 rounded-2xl" style={{ backgroundColor: 'rgba(96, 165, 250, 0.2)' }}>
                <Text className="text-2xl">💧</Text>
              </View>
              <Text className="mb-1 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {t('weather.humidity')}
              </Text>
              <Text className="text-xl font-bold" style={{ color: '#fff' }}>
                {weather.humidity}%
              </Text>
            </View>
          </View>

          {/* Viento y Presión */}
          <View className="flex-row justify-around pt-4" style={{ borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.15)' }}>
            {/* Viento */}
            <View className="items-center flex-1">
              <View className="items-center justify-center w-12 h-12 mb-2 rounded-2xl" style={{ backgroundColor: 'rgba(96, 165, 250, 0.2)' }}>
                <Text className="text-2xl">💨</Text>
              </View>
              <Text className="mb-1 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {t('weather.wind')}
              </Text>
              <Text className="text-xl font-bold" style={{ color: '#fff' }}>
                {weather.windSpeed}
              </Text>
              <Text className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                km/h
              </Text>
            </View>

            {/* Presión */}
            <View className="items-center flex-1">
              <View className="items-center justify-center w-12 h-12 mb-2 rounded-2xl" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
                <Text className="text-2xl">🔽</Text>
              </View>
              <Text className="mb-1 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {t('weather.pressure')}
              </Text>
              <Text className="text-xl font-bold" style={{ color: '#fff' }}>
                {weather.pressure}
              </Text>
              <Text className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                hPa
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

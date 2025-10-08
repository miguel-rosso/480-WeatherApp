/**
 * View - Componente de UI que muestra el clima
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { useThemeColors } from '@/src/hooks/useThemeColor';
import { useWeatherViewModel } from '@/src/viewmodels/useWeatherViewModel';
import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';

interface WeatherViewProps {
  city: string;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ city }) => {
  const { weather, forecast, isLoading, refresh } = useWeatherViewModel(city);
  const colors = useThemeColors();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
    >
      <View className="gap-4 p-6">
        {/* Clima Actual */}
        {weather && (
          <View className="p-6 rounded-2xl" style={{ backgroundColor: colors.card }}>
            <Text className="mb-2 text-3xl font-bold" style={{ color: colors.text }}>
              {weather.city}
            </Text>
            <Text className="mb-4 text-5xl font-bold" style={{ color: colors.primary }}>
              {weather.getFormattedTemp()}
            </Text>
            <Text className="text-lg" style={{ color: colors.text }}>
              {weather.condition}
            </Text>
            <View className="flex-row justify-between mt-4">
              <Text style={{ color: colors.text }}>💧 {weather.humidity}%</Text>
              <Text style={{ color: colors.text }}>💨 {weather.windSpeed} km/h</Text>
            </View>
          </View>
        )}

        {/* Pronóstico */}
        {forecast.length > 0 && (
          <View className="p-6 rounded-2xl" style={{ backgroundColor: colors.card }}>
            <Text className="mb-4 text-xl font-bold" style={{ color: colors.text }}>
              Pronóstico
            </Text>
            {forecast.map((day, index) => (
              <View key={index} className="flex-row justify-between py-2 border-t border-gray-200">
                <Text style={{ color: colors.text }}>{day.date}</Text>
                <Text style={{ color: colors.text }}>
                  {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                </Text>
              </View>
            ))}
          </View>
        )}

        {isLoading && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>
    </ScrollView>
  );
};

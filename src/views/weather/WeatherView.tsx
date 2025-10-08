/**
 * View - Componente de UI que muestra el clima
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { Header } from '@/src/components/Header';
import { WeatherBackground } from '@/src/components/WeatherBackground';
import { useWeatherViewModel } from '@/src/viewmodels/useWeatherViewModel';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';

interface WeatherViewProps {
  city: string;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ city }) => {
  const { weather, forecast, isLoading, refresh } = useWeatherViewModel(city);
  const { t } = useTranslation();

  return (
    <View className="flex-1">
      {/* Fondo animado según clima */}
      <WeatherBackground condition={weather?.condition || 'Soleado'} />

      {/* Header con selector de idioma */}
      <Header city={city} />

      {/* Contenido principal */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading} 
            onRefresh={refresh}
            tintColor="#fff"
          />
        }
      >
        <View className="gap-4 pb-6">
          {/* Clima Actual */}
          {weather && (
            <View className="p-8 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <Text className="mb-2 text-6xl font-bold" style={{ color: '#fff' }}>
                {weather.getFormattedTemp()}
              </Text>
              <Text className="mb-6 text-2xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {weather.condition}
              </Text>
              <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="mb-1 text-4xl">💧</Text>
                  <Text className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {t('weather.humidity')}
                  </Text>
                  <Text className="text-lg font-semibold" style={{ color: '#fff' }}>
                    {weather.humidity}%
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="mb-1 text-4xl">💨</Text>
                  <Text className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {t('weather.wind')}
                  </Text>
                  <Text className="text-lg font-semibold" style={{ color: '#fff' }}>
                    {weather.windSpeed} km/h
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Pronóstico */}
          {forecast.length > 0 && (
            <View className="p-6 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
              <Text className="mb-4 text-xl font-bold" style={{ color: '#fff' }}>
                {t('weather.forecast')}
              </Text>
              {forecast.map((day, index) => (
                <View 
                  key={index} 
                  className="flex-row items-center justify-between py-3"
                  style={{ 
                    borderTopWidth: index > 0 ? 1 : 0,
                    borderTopColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Text className="text-lg" style={{ color: '#fff', flex: 1 }}>
                    {day.date}
                  </Text>
                  <Text className="text-3xl" style={{ marginRight: 12 }}>
                    {day.icon}
                  </Text>
                  <Text className="text-lg font-semibold" style={{ color: '#fff' }}>
                    {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                  </Text>
                </View>
              ))}
            </View>
          )}

          {isLoading && (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

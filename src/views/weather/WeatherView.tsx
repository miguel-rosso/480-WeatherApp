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
      {/* Fondo estilo Google Weather: GIF arriba + Gradiente abajo */}
      <WeatherBackground condition={weather?.condition || 'Soleado'} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading} 
            onRefresh={refresh}
            tintColor="#fff"
          />
        }
      >
        {/* Header con selector de idioma */}
        <Header city={city} />

        {/* Clima Actual - Sobre el GIF animado */}
        {weather && (
          <View className="px-6 pt-8 pb-12">
            <Text className="mb-2 font-bold text-7xl" style={{ color: '#fff' }}>
              {weather.getFormattedTemp()}
            </Text>
            <Text className="mb-8 text-2xl" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              {weather.condition}
            </Text>
            
            {/* Detalles del clima */}
            <View className="flex-row justify-start gap-8">
              <View className="items-center">
                <Text className="mb-1 text-3xl">💧</Text>
                <Text className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {t('weather.humidity')}
                </Text>
                <Text className="text-base font-semibold" style={{ color: '#fff' }}>
                  {weather.humidity}%
                </Text>
              </View>
              <View className="items-center">
                <Text className="mb-1 text-3xl">💨</Text>
                <Text className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {t('weather.wind')}
                </Text>
                <Text className="text-base font-semibold" style={{ color: '#fff' }}>
                  {weather.windSpeed} km/h
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Pronóstico - Sobre el gradiente */}
        {forecast.length > 0 && (
          <View className="px-6 pt-6">
            <Text className="mb-4 text-lg font-bold" style={{ color: '#fff' }}>
              {t('weather.forecast')}
            </Text>
            
            {/* Lista de días */}
            <View className="gap-2">
              {forecast.map((day, index) => (
                <View 
                  key={index} 
                  className="flex-row items-center justify-between px-4 py-4 rounded-2xl"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <Text className="text-base font-medium" style={{ color: '#fff', flex: 1 }}>
                    {day.date}
                  </Text>
                  <Text className="text-2xl" style={{ marginRight: 16 }}>
                    {day.icon}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-base font-semibold" style={{ color: '#fff' }}>
                      {Math.round(day.maxTemp)}°
                    </Text>
                    <Text className="text-base" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {Math.round(day.minTemp)}°
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {isLoading && (
          <View className="py-8">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

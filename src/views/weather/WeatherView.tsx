/**
 * View - Componente de UI que muestra el clima
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { LanguageSelector } from '@/src/components/LanguageSelector';
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

      {/* Header solo con selector de idioma */}
      <View className="flex-row items-center justify-end px-6 pb-4 pt-14">
        <LanguageSelector />
      </View>

      {/* Contenido principal */}
      <ScrollView
        className="flex-1 px-6"
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
        <View className="gap-6 pb-6">
          {/* Clima Actual - Centrado */}
          {weather && (
            <>
              {/* Nombre de la ciudad y temperatura centrados */}
              <View className="items-center mt-4 mb-2">
                <Text className="mb-3 text-4xl font-bold" style={{ color: '#fff' }}>
                  {t(`cities.${city.toLowerCase()}`)}
                </Text>
                <Text className="mb-2 font-bold text-7xl" style={{ color: '#fff' }}>
                  {weather.getFormattedTemp()}
                </Text>
                <Text className="text-2xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {weather.condition}
                </Text>
              </View>

              {/* Card de Humedad y Viento */}
              <View className="p-6 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <View className="flex-row justify-around">
                  <View className="items-center">
                    <Text className="mb-1 text-4xl">💧</Text>
                    <Text className="mb-1 text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {t('weather.humidity')}
                    </Text>
                    <Text className="text-xl font-semibold" style={{ color: '#fff' }}>
                      {weather.humidity}%
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="mb-1 text-4xl">💨</Text>
                    <Text className="mb-1 text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {t('weather.wind')}
                    </Text>
                    <Text className="text-xl font-semibold" style={{ color: '#fff' }}>
                      {weather.windSpeed} km/h
                    </Text>
                  </View>
                </View>
              </View>
            </>
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

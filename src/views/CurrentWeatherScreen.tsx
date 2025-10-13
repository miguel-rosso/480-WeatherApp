/**
 * CurrentWeatherScreen - Componente de UI que muestra el clima actual
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { DailyForecastCard } from '@/src/components/cards/DailyForecast/DailyForecastCard';
import { HourlyForecastCard } from '@/src/components/cards/HourlyForecast/HourlyForecastCard';
import { InfoPairCard } from '@/src/components/cards/InfoPairCard/InfoPairCard';
import { WeatherCard } from '@/src/components/cards/WeatherCard/WeatherCard';
import { WeatherHeader } from '@/src/components/cards/WeatherHeader/WeatherHeader';
import { useCurrentWeatherViewModel } from '@/src/viewmodels/useCurrentWeatherViewModel';
import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect } from 'expo-router';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, View } from 'react-native';

interface CurrentWeatherScreenProps {
  city: string;
}

export const CurrentWeatherScreen: React.FC<CurrentWeatherScreenProps> = ({ city }) => {
  // 🎯 MVVM: ViewModel maneja toda la lógica
  const { weather, forecast, hourlyForecast, isLoading, refresh, shouldScrollToTop } = useCurrentWeatherViewModel(city);
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  // Función para navegar a la pantalla de pronóstico diario del día actual (día 0)
  const navigateToDailyForecast = () => {
    router.push(`/dailyForecast?city=${city}&day=0`);
  };

  // Resetear scroll al inicio cuando la pantalla gana el foco (cambio de tab)
  // La lógica está en el ViewModel, aquí solo ejecutamos lo que nos dice
  useFocusEffect(
    React.useCallback(() => {
      if (shouldScrollToTop()) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      }
    }, [shouldScrollToTop])
  );

  return (
    <View className="flex-1">
      {/* Contenido principal */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'transparent' }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor={'white'} />}
      >
        <View className="gap-6 pb-8" style={{ backgroundColor: 'transparent' }}>
          {/* Header del clima */}
          <WeatherHeader
            city={city}
            weather={weather}
            forecast={forecast}
            t={t}
            isLoading={!weather}
          />

          {/* Pronóstico por Horas */}
          <HourlyForecastCard 
            hourlyData={hourlyForecast} 
            city={city} 
            forecast={forecast} 
            isLoading={hourlyForecast.length === 0}
          />

          {/* Pronóstico Diario */}
          <DailyForecastCard 
            forecast={forecast} 
            city={city} 
            isLoading={forecast.length === 0}
          />

          {/* Cards de información detallada */}
          <>
            {/* Sensación térmica y Humedad en cards separadas */}
            <View className="flex-row gap-3">
              <WeatherCard
                icon="🌡️"
                title={t('weather.feelsLike') || 'Feels Like'}
                value={weather ? Math.round(weather.feelsLike).toString() : '0'}
                unit="°C"
                description={
                  weather 
                    ? Math.abs(weather.feelsLike - weather.temperature) <= 2
                      ? t('weather.feelsLikeSimilar')
                      : weather.feelsLike > weather.temperature
                        ? t('weather.feelsLikeWarmer')
                        : t('weather.feelsLikeCooler')
                    : ''
                }
                onPress={navigateToDailyForecast}
                isLoading={!weather}
              />
              <WeatherCard
                icon={weather?.getHumidityIcon() || '💧'}
                title={t('weather.humidity') || 'Humidity'}
                value={weather ? weather.humidity.toString() : '0'}
                unit="%"
                description={weather ? weather.getHumidityDescription(t) : ''}
                onPress={navigateToDailyForecast}
                isLoading={!weather}
              />
            </View>
            {/* Fila 1: Viento y Presión */}
            <View className="flex-row gap-3">
              <WeatherCard
                icon="💨"
                title={t('weather.wind') || 'Wind'}
                value={weather ? Math.round(weather.windSpeed).toString() : '0'}
                unit="km/h"
                description={weather ? weather.getWindDescription(t) : ''}
                onPress={navigateToDailyForecast}
                isLoading={!weather}
              />
              <WeatherCard
                icon="🔽"
                title={t('weather.pressure') || 'Pressure'}
                value={weather ? weather.pressure.toString() : '0'}
                unit="hPa"
                description={weather ? weather.getPressureDescription(t) : ''}
                onPress={navigateToDailyForecast}
                isLoading={!weather}
              />
            </View>

            {/* Fila 2: Nubosidad y Visibilidad */}
            <View className="flex-row gap-3">
              <WeatherCard
                icon="☁️"
                title={t('weather.cloudiness') || 'Cloudiness'}
                value={weather ? weather.cloudiness.toString() : '0'}
                unit="%"
                description={weather ? weather.getCloudinessDescription(t) : ''}
                onPress={navigateToDailyForecast}
                isLoading={!weather}
              />
              <WeatherCard
                icon="👁️"
                title={t('weather.visibility') || 'Visibility'}
                value={weather?.visibility ? weather.getFormattedVisibility() : '0'}
                unit="km"
                description={weather?.visibility ? weather.getVisibilityDescription(t) : ''}
                onPress={navigateToDailyForecast}
                isLoading={!weather}
              />
            </View>

            {/* Amanecer y Atardecer */}
            <InfoPairCard
              title={t('weather.sunSchedule') || 'Sun'}
              titleIcon="☀️"
              leftItem={{
                icon: <Feather name="sunrise" size={32} color="orange" />,
                label: t('weather.sunrise'),
                value: weather ? weather.formatDateToLocalTime(weather.sunrise) : '00:00',
                showIconBackground: false,
              }}
              rightItem={{
                icon: <Feather name="sunset" size={32} color="darkorange" />,
                label: t('weather.sunset'),
                value: weather ? weather.formatDateToLocalTime(weather.sunset) : '00:00',
                showIconBackground: false,
              }}
              onPress={navigateToDailyForecast}
              isLoading={!weather}
            />
          </>
        </View>
      </ScrollView>
    </View>
  );
};

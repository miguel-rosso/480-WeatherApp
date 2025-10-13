/**
 * CurrentWeatherScreen - Componente de UI que muestra el clima actual
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { DailyForecastCard } from '@/src/components/cards/DailyForecast/DailyForecastCard';
import { HourlyForecastCard } from '@/src/components/cards/HourlyForecast/HourlyForecastCard';
import { InfoPairCard } from '@/src/components/cards/InfoPairCard';
import { WeatherCard } from '@/src/components/cards/WeatherCard';
import { WeatherIcon } from '@/src/components/common/WeatherCustomIcon';
import { Colors } from '@/src/constants/Colors';
import { getWeatherDescriptionKey } from '@/src/utils/helpers';
import { useCurrentWeatherViewModel } from '@/src/viewmodels/useCurrentWeatherViewModel';
import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect } from 'expo-router';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

interface CurrentWeatherScreenProps {
  city: string;
}

export const CurrentWeatherScreen: React.FC<CurrentWeatherScreenProps> = ({ city }) => {
  const { weather, forecast, hourlyForecast, isLoading, refresh, currentTime } = useCurrentWeatherViewModel(city);
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  // Función para navegar a la pantalla de pronóstico diario del día actual (día 0)
  const navigateToDailyForecast = () => {
    router.push(`/dailyForecast?city=${city}&day=0`);
  };

  // Resetear scroll al inicio cuando la pantalla gana el foco (cambio de tab)
  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
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
          {weather && (
            <>
              {/* Nombre de la ciudad y clima */}
              <View className="items-center mt-4 mb-2" style={{ backgroundColor: 'transparent' }}>
                <Text className="mb-3 text-4xl font-bold" style={{ color: 'white' }}>
                  {t(`cities.${city.toLowerCase()}`)}
                </Text>
                <Text className="mb-2 font-bold text-7xl" style={{ color: 'white' }}>
                  {weather.getFormattedTemp()}
                </Text>
                {/* Temperatura máxima y mínima del primer día del forecast (hoy) */}
                <Text className="mb-2 text-xl" style={{ color: Colors.whiteAlpha80 }}>
                  {t('weather.max')}: {forecast[0]?.maxTemp || weather.tempMax}° • {t('weather.min')}: {forecast[0]?.minTemp || weather.tempMin}°
                </Text>
                <View className="flex-row items-center gap-2">
                  <WeatherIcon icon={weather.icon} size={30} />
                  <Text className="text-2xl" style={{ color: Colors.whiteAlpha80 }}>
                    {t(getWeatherDescriptionKey(weather.weatherId))}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Pronóstico por Horas */}
          {hourlyForecast.length > 0 && <HourlyForecastCard hourlyData={hourlyForecast} city={city} forecast={forecast} />}

          {/* Pronóstico Diario */}
          {forecast.length > 0 && <DailyForecastCard forecast={forecast} city={city} />}

          {/* Cards de información detallada */}
          {weather && (
            <>
              {/* Sensación térmica y Humedad en cards separadas */}
              <View className="flex-row gap-3">
                <WeatherCard
                  icon="🌡️"
                  title={t('weather.feelsLike') || 'Feels Like'}
                  value={Math.round(weather.feelsLike).toString()}
                  unit="°C"
                  description={
                    Math.abs(weather.feelsLike - weather.temperature) <= 2
                      ? t('weather.feelsLikeSimilar')
                      : weather.feelsLike > weather.temperature
                        ? t('weather.feelsLikeWarmer')
                        : t('weather.feelsLikeCooler')
                  }
                  onPress={navigateToDailyForecast}
                />
                <WeatherCard
                  icon={weather.getHumidityIcon()}
                  title={t('weather.humidity') || 'Humidity'}
                  value={weather.humidity.toString()}
                  unit="%"
                  description={weather.getHumidityDescription(t)}
                  onPress={navigateToDailyForecast}
                />
              </View>
              {/* Fila 1: Viento y Presión */}
              <View className="flex-row gap-3">
                <WeatherCard
                  icon="💨"
                  title={t('weather.wind') || 'Wind'}
                  value={Math.round(weather.windSpeed).toString()}
                  unit="km/h"
                  description={weather.getWindDescription(t)}
                  onPress={navigateToDailyForecast}
                />
                <WeatherCard
                  icon="🔽"
                  title={t('weather.pressure') || 'Pressure'}
                  value={weather.pressure.toString()}
                  unit="hPa"
                  description={weather.getPressureDescription(t)}
                  onPress={navigateToDailyForecast}
                />
              </View>

              {/* Fila 2: Nubosidad y Visibilidad */}
              <View className="flex-row gap-3">
                <WeatherCard
                  icon="☁️"
                  title={t('weather.cloudiness') || 'Cloudiness'}
                  value={weather.cloudiness.toString()}
                  unit="%"
                  description={weather.getCloudinessDescription(t)}
                  onPress={navigateToDailyForecast}
                />
                {weather.visibility ? (
                  <WeatherCard
                    icon="👁️"
                    title={t('weather.visibility') || 'Visibility'}
                    value={weather.getFormattedVisibility()}
                    unit="km"
                    description={weather.getVisibilityDescription(t)}
                    onPress={navigateToDailyForecast}
                  />
                ) : (
                  <View className="flex-1" />
                )}
              </View>

              {/* Amanecer y Atardecer */}
              <InfoPairCard
                title={t('weather.sunSchedule') || 'Sun'}
                titleIcon="☀️"
                leftItem={{
                  icon: <Feather name="sunrise" size={32} color="orange" />,
                  label: t('weather.sunrise'),
                  value: weather.formatDateToLocalTime(weather.sunrise),
                  showIconBackground: false,
                }}
                rightItem={{
                  icon: <Feather name="sunset" size={32} color="darkorange" />,
                  label: t('weather.sunset'),
                  value: weather.formatDateToLocalTime(weather.sunset),
                  showIconBackground: false,
                }}
                onPress={navigateToDailyForecast}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

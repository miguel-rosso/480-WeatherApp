/**
 * WeatherHeader - Componente del encabezado principal del clima
 * 
 * Muestra ciudad, temperatura actual, min/max y descripción del clima
 */

import { CurrentWeatherModel } from '@/src/models/CurrentWeatherModel';
import { Forecast } from '@/src/models/ForecastModel';
import { WeatherHeaderSkeleton } from '@/src/components/cards/WeatherHeader/WeatherHeaderSkeleton';
import { WeatherIcon } from '@/src/components/common/WeatherCustomIcon';
import { Colors } from '@/src/constants/Colors';
import { getWeatherDescriptionKey } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';

interface WeatherHeaderProps {
  city: string;
  weather: CurrentWeatherModel | null;
  forecast: Forecast[];
  t: (key: string) => string;
  isLoading?: boolean;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({ 
  city, 
  weather, 
  forecast, 
  t,
  isLoading = false 
}) => {
  if (isLoading || !weather) {
    return <WeatherHeaderSkeleton />;
  }

  return (
    <View className="items-center mt-4 mb-2" style={{ backgroundColor: 'transparent' }}>
      {/* Nombre de la ciudad */}
      <Text className="mb-3 text-4xl font-bold" style={{ color: 'white' }}>
        {t(`cities.${city.toLowerCase()}`)}
      </Text>
      
      {/* Temperatura actual */}
      <Text className="mb-2 font-bold text-7xl" style={{ color: 'white' }}>
        {weather.getFormattedTemp()}
      </Text>
      
      {/* Temperatura máxima y mínima del primer día del forecast (hoy) */}
      <Text className="mb-2 text-xl" style={{ color: Colors.whiteAlpha80 }}>
        {t('weather.min')}: {forecast[0]?.minTemp || weather.tempMin}° • {t('weather.max')}: {forecast[0]?.maxTemp || weather.tempMax}°
      </Text>
      
      {/* Icono y descripción del clima */}
      <View className="flex-row items-center gap-2">
        <WeatherIcon icon={weather.icon} size={30} />
        <Text className="text-2xl" style={{ color: Colors.whiteAlpha80 }}>
          {t(getWeatherDescriptionKey(weather.weatherId)).charAt(0).toUpperCase() + t(getWeatherDescriptionKey(weather.weatherId)).slice(1)}
        </Text>
      </View>
    </View>
  );
};

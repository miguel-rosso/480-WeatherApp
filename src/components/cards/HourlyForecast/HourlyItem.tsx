/**
 * HourlyItem - Item individual de pronóstico por hora
 */

import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import { WeatherIcon } from '@/src/components/common/WeatherCustomIcon';
import React from 'react';
import { Text, View } from 'react-native';

interface HourlyItemProps {
  hour: HourlyForecast;
  isFirst: boolean;
  showBorder: boolean;
}

export const HourlyItem: React.FC<HourlyItemProps> = ({ hour, isFirst, showBorder }) => {
  return (
    <View 
      className="items-center justify-between px-3"
      style={{ 
        minWidth: 60,
        borderRightWidth: showBorder ? 1 : 0,
        borderRightColor: 'rgba(255, 255, 255, 0.15)'
      }}
    >
      {/* Hora */}
      <Text 
        className="mb-3 text-base font-medium" 
        style={{ 
          color: '#fff',
          fontWeight: isFirst ? '700' : '400'
        }}
      >
        {hour.time}
      </Text>
      
      {/* Icono del clima */}
      <View className="mb-3">
        <WeatherIcon icon={hour.icon} size={32} />
      </View>
      
      {/* Temperatura */}
      <Text 
        className="text-xl font-semibold" 
        style={{ 
          color: '#fff',
          fontWeight: isFirst ? '700' : '600'
        }}
      >
        {Math.round(hour.temperature)}°
      </Text>
    </View>
  );
};

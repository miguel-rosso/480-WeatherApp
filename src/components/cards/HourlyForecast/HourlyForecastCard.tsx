/**
 * HourlyForecastCard - Pronóstico por hora
 * 
 * Componente que muestra el pronóstico horario en un scroll horizontal
 */

import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import { DaySeparator } from '@/src/components/cards/HourlyForecast/DaySeparator';
import { HourlyItem } from '@/src/components/cards/HourlyForecast/HourlyItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

interface HourlyForecastCardProps {
  hourlyData: HourlyForecast[];
}

export const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ hourlyData }) => {
  const { t } = useTranslation();

  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  // Función para verificar si debemos mostrar el separador de día
  const shouldShowDaySeparator = (index: number): boolean => {
    if (index === 0) return false;
    const currentDate = hourlyData[index].fullDate;
    const previousDate = hourlyData[index - 1].fullDate;
    return currentDate !== previousDate;
  };

  return (
    <View className="overflow-hidden rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
      {/* Header */}
      <View className="flex-row items-center gap-2 px-6 pt-3 pb-3">
        <Text style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.6)' }}>⏰</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: 0.5 }}>
          {t('weather.hourlyForecast')?.toUpperCase() || 'HOURLY FORECAST'}
        </Text>
      </View>
      
      {/* Divider */}
      <View style={{ height: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.25)', marginHorizontal: 16 }} />
      
      {/* Scrollable hourly items */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }}
      >
        {hourlyData.map((hour, index) => {
          const isFirst = index === 0;
          const isLast = index === hourlyData.length - 1;
          const showDaySeparator = shouldShowDaySeparator(index);
          const showBorder = !isLast && !shouldShowDaySeparator(index + 1);
          
          return (
            <React.Fragment key={hour.timestamp}>
              {/* Separador de día */}
              {showDaySeparator && hour.dayName && (
                <DaySeparator dayName={hour.dayName} />
              )}
              
              {/* Item de hora */}
              <HourlyItem 
                hour={hour} 
                isFirst={isFirst}
                showBorder={showBorder}
              />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

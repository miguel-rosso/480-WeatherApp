/**
 * HourlyForecastCard - Pronóstico por hora
 * 
 * Componente que muestra el pronóstico horario en un scroll horizontal
 */

import { Forecast } from '@/src/api/models/ForecastModel';
import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import { DaySeparator } from '@/src/components/cards/HourlyForecast/DaySeparator';
import { HourlyItem } from '@/src/components/cards/HourlyForecast/HourlyItem';
import { Colors } from '@/src/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface HourlyForecastCardProps {
  hourlyData: HourlyForecast[];
  city: string;
  forecast: Forecast[]; // Array de forecast diario para mapear correctamente las fechas
}

export const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ hourlyData, city, forecast }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  // Crear un mapa de fullDate a índice del daily forecast
  // Extraemos las fechas únicas del hourly forecast en orden
  const dateToIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    
    // Recorrer hourly forecast y asignar índices basados en el orden de aparición
    // El primer día único que encontremos será índice 0, el segundo será 1, etc.
    let currentIndex = 0;
    hourlyData.forEach(hour => {
      if (hour.fullDate && !map.has(hour.fullDate)) {
        map.set(hour.fullDate, currentIndex);
        currentIndex++;
      }
    });
    
    console.log('📅 [HourlyForecastCard] Date to Index Map:', Array.from(map.entries()));
    
    return map;
  }, [hourlyData]);

  // Función para verificar si debemos mostrar el separador de día
  const shouldShowDaySeparator = (index: number): boolean => {
    if (index === 0) return false;
    const currentDate = hourlyData[index].fullDate;
    const previousDate = hourlyData[index - 1].fullDate;
    return currentDate !== previousDate;
  };

  // Navegar a DailyForecastScreen (día 0 por defecto)
  const handleCardPress = () => {
    router.push({
      pathname: '/dailyForecast',
      params: { city, day: '0' }
    });
  };

  // Validar si el día existe en el forecast
  const validateAndNavigate = (dayIndex: number) => {
    if (dayIndex >= forecast.length) {
      Alert.alert(
        '',
        t('error.dayNotAvailable') || 'This day is not available in the forecast',
        [{ text: 'OK' }]
      );
      return;
    }
    
    router.push({
      pathname: '/dailyForecast',
      params: { city, day: dayIndex.toString() }
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={handleCardPress}
      className="overflow-hidden rounded-3xl" 
      style={{ backgroundColor: Colors.weatherCardBackground }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-2 px-6 pt-3 pb-3">
        <Text style={{ fontSize: 11, color: Colors.whiteAlpha60 }}>⏰</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.whiteAlpha60, letterSpacing: 0.5 }}>
          {t('weather.hourlyForecast')?.toUpperCase() || 'HOURLY FORECAST'}
        </Text>
      </View>
      
      {/* Divider */}
      <View style={{ height: 0.5, backgroundColor: Colors.whiteAlpha25, marginHorizontal: 16 }} />
      
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
          const dayIndex = hour.fullDate ? (dateToIndexMap.get(hour.fullDate) ?? 0) : 0;
          
          return (
            <React.Fragment key={hour.timestamp}>
              {/* Separador de día */}
              {showDaySeparator && hour.dayName && (
                <DaySeparator 
                  dayName={hour.dayName} 
                  dayIndex={dayIndex}
                  onNavigate={validateAndNavigate}
                />
              )}
              
              {/* Item de hora */}
              <HourlyItem 
                hour={hour} 
                isFirst={isFirst}
                showBorder={showBorder}
                dayIndex={dayIndex}
                city={city}
                totalDays={forecast.length}
                onNavigate={validateAndNavigate}
              />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </TouchableOpacity>
  );
};

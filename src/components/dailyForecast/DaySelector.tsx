/**
 * DaySelector Component
 * Horizontal scrollable list of days
 */

import { Forecast } from '@/src/models/ForecastModel';
import { WeatherIcon } from '@/src/components/common/WeatherCustomIcon';
import { Colors } from '@/src/constants/Colors';
import { getDayNameKey } from '@/src/utils/helpers';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface DaySelectorProps {
  forecast: Forecast[];
  selectedDay: number;
  onSelectDay: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  forecast,
  selectedDay,
  onSelectDay
}) => {
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<(View | null)[]>([]);

  // Auto-scroll cuando cambia el día seleccionado
  useEffect(() => {
    if (scrollViewRef.current && itemRefs.current[selectedDay]) {
      // Medir la posición del item seleccionado y hacer scroll
      itemRefs.current[selectedDay]?.measureLayout(
        scrollViewRef.current as any,
        (x: number) => {
          // Hacer scroll al item centrado (aproximado)
          scrollViewRef.current?.scrollTo({
            x: x - 50, // Offset para centrarlo mejor
            animated: true
          });
        },
        () => {
          console.log('Error measuring layout');
        }
      );
    }
  }, [selectedDay]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="flex-grow-0 mt-4"
    >
      {forecast.map((day, index) => {
        const isSelected = index === selectedDay;
        
        return (
          <View
            key={index}
            ref={(ref) => {
              itemRefs.current[index] = ref;
            }}
            collapsable={false}
          >
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSelectDay(index);
              }}
              className="items-center mx-2"
              activeOpacity={0.7}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 16,
                backgroundColor: isSelected 
                  ? Colors.weatherSelectedBackground
                  : Colors.weatherUnselectedBackground,
                minWidth: 80,
              }}
            >
            {/* Day name */}
            <Text
              className="mb-2 text-sm font-semibold"
              style={{
                color: isSelected ? 'white' : Colors.whiteAlpha70,
              }}
            >
              {t(getDayNameKey(day.date))}
            </Text>

            {/* Weather icon */}
            <View className="mb-2">
              <WeatherIcon 
                icon={day.icon} 
                size={32}
                style={{ opacity: isSelected ? 1 : 0.7 }}
              />
            </View>
          </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

/**
 * DailyForecastScreen - Componente de UI que muestra el pronóstico diario detallado
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { DailyForecastDetails } from '@/src/components/dailyForecast/DailyForecastDetails';
import { DaySelector } from '@/src/components/dailyForecast/DaySelector';
import { PrecipitationChart } from '@/src/components/dailyForecast/PrecipitationChart';
import { TemperatureChart } from '@/src/components/dailyForecast/TemperatureChart';
import { TemperatureRangeBar } from '@/src/components/dailyForecast/TemperatureRangeBar';
import { DailyForecastGradient } from '@/src/components/layout/DailyForecastGradient';
import { Colors } from '@/src/constants/Colors';
import { useDailyForecastViewModel } from '@/src/viewmodels/useDailyForecastViewModel';
import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DailyForecastScreenProps {
  city: string;
  initialDay?: number;
}

export const DailyForecastScreen: React.FC<DailyForecastScreenProps> = ({ city, initialDay = 0 }) => {
  const { t } = useTranslation();
  
  // ViewModel contiene toda la lógica de negocio
  const {
    selectedDay,
    setSelectedDay,
    forecast,
    displayData,
    fullDayName,
    actualMaxTemp,
    actualMinTemp,
    gradientStartColor,
    gradientEndColor,
    representativeWeatherId,
    representativeDescription,
    representativeIcon,
    backgroundGradient,
  } = useDailyForecastViewModel({ city, initialDay });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: fullDayName,
          headerStyle: {
            backgroundColor: backgroundGradient[0],
          },
          headerTintColor: Colors.headerTintColor,
          headerTitleStyle: {
            fontWeight: '600',
          },
          presentation: 'modal',
        }}
      />
      <DailyForecastGradient colors={backgroundGradient as [string, string]}>
        <SafeAreaView className="flex-1" edges={['bottom']} style={{ backgroundColor: 'transparent' }}>
          <ScrollView className='flex-1'>
            {/* Day Selector */}
            <DaySelector 
              forecast={forecast} 
              selectedDay={selectedDay} 
              onSelectDay={setSelectedDay} 
            />

            {/* Temperature Chart */}
            <View className="mt-6">
              <View className="px-6 mb-3">
                <Text 
                  className="text-xs font-semibold tracking-wider uppercase" 
                  style={{ color: Colors.whiteAlpha60 }}
                >
                  {t('dailyForecast.temperature') || 'Temperature'}
                </Text>
              </View>
              <TemperatureChart 
                data={displayData} 
                gradientColors={[gradientStartColor, gradientEndColor]} 
              />
            </View>

            {/* Precipitation Chart */}
            <View className="mt-8 mb-6">
              <View className="px-6 mb-3">
                <Text 
                  className="text-xs font-semibold tracking-wider uppercase" 
                  style={{ color: Colors.whiteAlpha60 }}
                >
                  {t('dailyForecast.precipitation') || 'Precipitation'}
                </Text>
              </View>
              <PrecipitationChart data={displayData} />
            </View>

            {/* Details Section */}
            <DailyForecastDetails 
              data={displayData}
              summaryDescription={representativeDescription}
              weatherIcon={representativeIcon}
              weatherId={representativeWeatherId}
            />
            
            {/* Temperature Range Bar */}
            <TemperatureRangeBar
              minTemp={actualMinTemp}
              maxTemp={actualMaxTemp}
              gradientColors={[gradientStartColor, gradientEndColor]}
            />
          </ScrollView>
        </SafeAreaView>
      </DailyForecastGradient>
    </>
  );
};

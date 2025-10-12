/**
 * DailyForecastViewModel - Lógica de negocio para la pantalla de pronóstico diario
 * Encapsula toda la lógica de procesamiento de datos, cálculos y estado
 */

import { getDailyForecastGradient, getDayNameKey, getTemperatureGradient } from '@/src/utils/helpers';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWeatherViewModel } from './useWeatherViewModel';

interface UseDailyForecastViewModelProps {
  city: string;
  initialDay?: number;
}

export const useDailyForecastViewModel = ({ city, initialDay = 0 }: UseDailyForecastViewModelProps) => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(initialDay);
  
  // Obtener datos del WeatherViewModel (fuente de verdad)
  const { forecast, hourlyForecast, isLoading } = useWeatherViewModel(city);

  // Obtener el forecast del día seleccionado
  const selectedForecast = useMemo(() => forecast[selectedDay], [forecast, selectedDay]);
  
  const selectedDate = selectedForecast?.date || '';
  const selectedFullDate = selectedForecast?.fullDate || '';

  // Agrupar datos horarios por fecha (fullDate)
  const hourlyByDate = useMemo(() => {
    const grouped: { [key: string]: typeof hourlyForecast } = {};
    hourlyForecast.forEach((hour) => {
      if (hour.fullDate) {
        if (!grouped[hour.fullDate]) {
          grouped[hour.fullDate] = [];
        }
        grouped[hour.fullDate].push(hour);
      }
    });
    return grouped;
  }, [hourlyForecast]);

  // Obtener los datos horarios del día seleccionado usando la fullDate del forecast
  const displayData = useMemo(() => 
    hourlyByDate[selectedFullDate] || [], 
    [hourlyByDate, selectedFullDate]
  );

  // Temperaturas del día seleccionado
  const actualMaxTemp = selectedForecast?.maxTemp || 0;
  const actualMinTemp = selectedForecast?.minTemp || 0;

  // Obtener los colores del gradiente de temperatura
  const [gradientStartColor, gradientEndColor] = useMemo(
    () => getTemperatureGradient(actualMinTemp, actualMaxTemp),
    [actualMinTemp, actualMaxTemp]
  );

  // Obtener el nombre completo del día traducido
  const fullDayName = useMemo(
    () => t(getDayNameKey(selectedDate, false)),
    [selectedDate, t]
  );

  // Información del clima del día seleccionado (fuente de verdad: forecast diario)
  const representativeWeatherId = selectedForecast?.weatherId || 800;
  const representativeDescription = selectedForecast?.description || '';
  const representativeIcon = selectedForecast?.icon || '';

  // Obtener gradiente de fondo basado en el clima
  const backgroundGradient = useMemo(
    () => getDailyForecastGradient(representativeWeatherId),
    [representativeWeatherId]
  );

  // Log para debugging (puede eliminarse en producción)
  if (__DEV__) {
    console.log('📅 [DailyForecast ViewModel] Selected Day:', selectedDay);
    console.log('📅 [DailyForecast ViewModel] Selected Full Date:', selectedFullDate);
    console.log('📅 [DailyForecast ViewModel] Forecast weatherId:', representativeWeatherId);
    console.log('📅 [DailyForecast ViewModel] Display Data Length:', displayData.length);
    console.log('🌡️ [DailyForecast ViewModel] Max/Min Temp:', actualMaxTemp, actualMinTemp);
  }

  return {
    // Estado
    selectedDay,
    setSelectedDay,
    forecast,
    displayData,
    isLoading,
    
    // Datos procesados
    fullDayName,
    actualMaxTemp,
    actualMinTemp,
    gradientStartColor,
    gradientEndColor,
    representativeWeatherId,
    representativeDescription,
    representativeIcon,
    backgroundGradient,
  };
};

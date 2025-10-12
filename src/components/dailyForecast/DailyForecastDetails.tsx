/**
 * DailyForecastDetails Component
 * Shows additional weather details
 */

import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import { getWeatherDescriptionKey } from '@/src/utils/helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

interface DailyForecastDetailsProps {
  data: HourlyForecast[];
  summaryDescription?: string; // Description representativa del forecast diario (fuente de verdad)
  weatherIcon?: string; // Icono del forecast diario (ej: "02d", "10n")
  weatherId?: number; // WeatherId representativo del día
}

export const DailyForecastDetails: React.FC<DailyForecastDetailsProps> = ({ data, summaryDescription, weatherIcon, weatherId }) => {
  const { t, i18n } = useTranslation();

  if (!data || data.length === 0) {
    return null;
  }

  // Calcular promedios y totales del día
  const avgFeelsLike = data.reduce((sum, h) => sum + (h.feelsLike || h.temperature), 0) / data.length;
  const avgHumidity = data.reduce((sum, h) => sum + (h.humidity || 0), 0) / data.length;
  const avgWindSpeed = data.reduce((sum, h) => sum + (h.windSpeed || 0), 0) / data.length;
  const avgVisibility = data.reduce((sum, h) => sum + (h.visibility || 0), 0) / data.length;
  const avgCloudCover = data.reduce((sum, h) => sum + (h.clouds || 0), 0) / data.length;
  
  // Total de lluvia acumulada
  const totalRain = data.reduce((sum, h) => sum + (h.rain || 0), 0);

  // Usar el weatherId del forecast diario (fuente de verdad)
  // Si no se proporciona, calcular desde datos horarios como fallback
  const representativeWeatherId = weatherId || (() => {
    const weatherIdCounts = data.reduce((acc, h) => {
      acc[h.weatherId] = (acc[h.weatherId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    return parseInt(Object.entries(weatherIdCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '800');
  })();

  // Obtener la descripción traducida usando el weatherId
  const translatedDescription = t(getWeatherDescriptionKey(representativeWeatherId));

  // Función helper para formatear visibilidad
  const formatVisibility = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  };

  // Generar resumen descriptivo completo
  const generateSummary = () => {
    const description = translatedDescription;
    const feelsLike = Math.round(avgFeelsLike);
    const humidity = Math.round(avgHumidity);
    const windSpeed = avgWindSpeed.toFixed(1);
    const visibility = formatVisibility(avgVisibility);
    const cloudCover = Math.round(avgCloudCover);
    const rain = totalRain > 0 ? totalRain.toFixed(1) : null;

    if (i18n.language === 'es') {
      let summary = `El día presenta ${description} con una sensación térmica de ${feelsLike}°C. `;
      summary += `La humedad promedio es del ${humidity}% `;
      summary += `y el viento sopla a ${windSpeed} m/s. `;
      
      if (cloudCover > 0) {
        summary += `La nubosidad alcanza el ${cloudCover}%. `;
      }
      
      summary += `La visibilidad es de ${visibility}`;
      
      if (rain) {
        summary += ` con ${rain} mm de precipitación acumulada`;
      }
      
      summary += '.';
      return summary;
    } else {
      // English
      let summary = `The day features ${description} with a feels like temperature of ${feelsLike}°C. `;
      summary += `Average humidity is ${humidity}% `;
      summary += `and wind blows at ${windSpeed} m/s. `;
      
      if (cloudCover > 0) {
        summary += `Cloud cover reaches ${cloudCover}%. `;
      }
      
      summary += `Visibility is ${visibility}`;
      
      if (rain) {
        summary += ` with ${rain} mm of accumulated precipitation`;
      }
      
      summary += '.';
      return summary;
    }
  };

  return (
    <View className="px-6 pb-6 mt-4">
      {/* Section Title */}
      <View className="mb-4">
        <Text 
          className="text-xl font-bold" 
          style={{ color: "#FFFFFF" }}
        >
          {t('dailyForecast.dayForecast') || 'Day Forecast'}
        </Text>
      </View>

      {/* Daily Summary Card */}
      {translatedDescription && (
        <View 
          className="p-4 mb-4 rounded-2xl" 
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <View className="flex-row items-center mb-3">
            <Text className="mr-2 text-xl">📋</Text>
            <Text 
              className="text-xs font-semibold tracking-wider uppercase" 
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              {t('dailyForecast.dailySummary')}
            </Text>
          </View>
          <Text 
            className="text-base leading-6" 
            style={{ color: "#FFFFFF" }}
          >
            {generateSummary()}
          </Text>
        </View>
      )}

      {/* Details Grid */}
      <View className="flex-row flex-wrap justify-between">
        {/* Feels Like */}
        <View 
          className="p-4 mb-3 rounded-2xl" 
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: '48%' }}
        >
          <View className="flex-row items-center mb-2">
            <Text className="mr-2 text-xl">🌡️</Text>
            <Text 
              className="text-xs font-semibold tracking-wider uppercase" 
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              {t('dailyForecast.feelsLike')}
            </Text>
          </View>
          <Text 
            className="text-2xl font-bold" 
            style={{ color: "#FFFFFF" }}
          >
            {Math.round(avgFeelsLike)}°
          </Text>
        </View>

        {/* Humidity */}
        {avgHumidity > 0 && (
          <View 
            className="p-4 mb-3 rounded-2xl" 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: '48%' }}
          >
            <View className="flex-row items-center mb-2">
              <Text className="mr-2 text-xl">💧</Text>
              <Text 
                className="text-xs font-semibold tracking-wider uppercase" 
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {t('dailyForecast.humidity')}
              </Text>
            </View>
            <Text 
              className="text-2xl font-bold" 
              style={{ color: "#FFFFFF" }}
            >
              {Math.round(avgHumidity)}%
            </Text>
          </View>
        )}

        {/* Wind Speed */}
        {avgWindSpeed > 0 && (
          <View 
            className="p-4 mb-3 rounded-2xl" 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: '48%' }}
          >
            <View className="flex-row items-center mb-2">
              <Text className="mr-2 text-xl">💨</Text>
              <Text 
                className="text-xs font-semibold tracking-wider uppercase" 
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {t('dailyForecast.windSpeed')}
              </Text>
            </View>
            <Text 
              className="text-2xl font-bold" 
              style={{ color: "#FFFFFF" }}
            >
              {avgWindSpeed.toFixed(1)} <Text className="text-base">m/s</Text>
            </Text>
          </View>
        )}

        {/* Visibility */}
        {avgVisibility > 0 && (
          <View 
            className="p-4 mb-3 rounded-2xl" 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: '48%' }}
          >
            <View className="flex-row items-center mb-2">
              <Text className="mr-2 text-xl">👁️</Text>
              <Text 
                className="text-xs font-semibold tracking-wider uppercase" 
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {t('dailyForecast.visibility')}
              </Text>
            </View>
            <Text 
              className="text-2xl font-bold" 
              style={{ color: "#FFFFFF" }}
            >
              {formatVisibility(avgVisibility)}
            </Text>
          </View>
        )}

        {/* Cloud Cover */}
        {avgCloudCover > 0 && (
          <View 
            className="p-4 mb-3 rounded-2xl" 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: '48%' }}
          >
            <View className="flex-row items-center mb-2">
              <Text className="mr-2 text-xl">☁️</Text>
              <Text 
                className="text-xs font-semibold tracking-wider uppercase" 
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {t('dailyForecast.cloudCover')}
              </Text>
            </View>
            <Text 
              className="text-2xl font-bold" 
              style={{ color: "#FFFFFF" }}
            >
              {Math.round(avgCloudCover)}%
            </Text>
          </View>
        )}

        {/* Precipitation Total */}
          <View 
            className="p-4 mb-3 rounded-2xl" 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: '48%' }}
          >
            <View className="flex-row items-center mb-2">
              <Text className="mr-2 text-xl">{totalRain > 0 ? '🌧️' : '☀️'}</Text>
              <Text 
                className="text-xs font-semibold tracking-wider uppercase" 
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {t('dailyForecast.precipitationTotal')}
              </Text>
            </View>
            <Text 
              className="text-2xl font-bold" 
              style={{ color: "#FFFFFF" }}
            >
              {totalRain.toFixed(1)} <Text className="text-base">mm</Text>
            </Text>
          </View>
      </View>
    </View>
  );
};

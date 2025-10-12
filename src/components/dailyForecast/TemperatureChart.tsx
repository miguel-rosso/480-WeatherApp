/**
 * TemperatureChart Component
 * Custom SVG line chart showing hourly temperature with color-coded points
 * Each point has a different color based on its temperature
 */

import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import { Colors } from '@/src/constants/Colors';
import { getTemperatureColor } from '@/src/utils/helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

interface TemperatureChartProps {
  data: HourlyForecast[];
  gradientColors?: string[]; // Colores para el gradiente de la línea (opcional)
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get('window').width;

  if (!data || data.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text style={{ color: Colors.whiteAlpha60 }}>{t('dailyForecast.noData')}</Text>
      </View>
    );
  }

  if (data.length < 2) {
    return (
      <View className="items-center justify-center py-8">
        <Text style={{ color: Colors.whiteAlpha60 }}>{t('dailyForecast.noData')} (insufficient data)</Text>
      </View>
    );
  }

  // Extraer temperaturas y etiquetas
  const temperatures = data.map((hour) => hour.temperature);
  const labels = data.map((hour) => (hour.time === 'Now' ? 'Now' : hour.time.replace(':00', '')));

  // Calcular rango de temperaturas
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  const tempRange = maxTemp - minTemp;

  // Dimensiones del gráfico
  const chartWidth = screenWidth - 24; // Reducido de 48 a 24 para más ancho
  const chartHeight = 240; // Aumentado de 220 a 240
  const padding = { top: 30, right: 15, bottom: 40, left: 40 }; // Reducido padding right
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Calcular posiciones de los puntos
  const points = temperatures.map((temp, index) => {
    const x = padding.left + (index / (temperatures.length - 1)) * graphWidth;
    const y = padding.top + ((maxTemp - temp) / (tempRange || 1)) * graphHeight;
    return { x, y, temp, label: labels[index], color: getTemperatureColor(temp) };
  });

  // Crear el path de la línea usando curvas bezier suaves
  const createSmoothPath = () => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlPointX = (current.x + next.x) / 2;

      path += ` Q ${controlPointX} ${current.y}, ${controlPointX} ${(current.y + next.y) / 2}`;
      path += ` Q ${controlPointX} ${next.y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const pathData = createSmoothPath();

  // Crear gradiente dinámico basado en la secuencia real de temperaturas
  const createDynamicGradient = () => {
    // Crear un stop por cada punto de temperatura
    const stops = points.map((point, index) => {
      const offset = (index / (points.length - 1)) * 100;
      return <Stop key={index} offset={`${offset}%`} stopColor={point.color} stopOpacity="0.9" />;
    });

    return (
      <LinearGradient id="dynamicLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        {stops}
      </LinearGradient>
    );
  };

  // Calcular valores del eje Y
  const yAxisValues = Array.from({ length: 5 }, (_, i) => {
    const value = maxTemp - (i * tempRange) / 4;
    return Math.round(value);
  });

  return (
    <View className="px-3 py-4">
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>{createDynamicGradient()}</Defs>

        {/* Líneas horizontales de fondo con valores del eje Y */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + ratio * graphHeight;
          const tempValue = yAxisValues[i];

          return (
            <React.Fragment key={i}>
              {/* Línea horizontal */}
              <Path d={`M ${padding.left} ${y} L ${chartWidth - padding.right} ${y}`} stroke={'white'} strokeOpacity={0.1} strokeWidth={1} />
              {/* Etiqueta del eje Y */}
              <SvgText x={padding.left - 10} y={y + 4} fill={'white'} fontSize="10" fontWeight="400" textAnchor="end" opacity={0.6}>
                {tempValue}°
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Líneas verticales */}
        {points.map((point, index) => (
          <Path
            key={`vline-${index}`}
            d={`M ${point.x} ${padding.top} L ${point.x} ${chartHeight - padding.bottom}`}
            stroke={'white'}
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        ))}

        {/* Línea de temperatura con gradiente dinámico que sigue las temperaturas reales */}
        <Path d={pathData} fill="none" stroke="url(#dynamicLineGradient)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

        {/* Puntos con colores individuales según temperatura */}
        {points.map((point, index) => (
          <React.Fragment key={index}>
            {/* Punto exterior (borde blanco) */}
            <Circle cx={point.x} cy={point.y} r={7} fill={'white'} opacity={0.9} />
            {/* Punto interior (color de temperatura) */}
            <Circle cx={point.x} cy={point.y} r={5} fill={point.color} />
            {/* Temperatura sobre el punto */}
            <SvgText x={point.x} y={point.y - 15} fill={'white'} fontSize="12" fontWeight="600" textAnchor="middle">
              {Math.round(point.temp)}°
            </SvgText>
            {/* Etiqueta de hora debajo */}
            <SvgText x={point.x} y={chartHeight - padding.bottom + 20} fill={'white'} fontSize="11" fontWeight="400" textAnchor="middle" opacity={0.7}>
              {point.label}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

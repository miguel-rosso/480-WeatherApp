/**
 * PrecipitationChart Component
 * Custom SVG bar chart showing precipitation probability
 */

import { HourlyForecast } from '@/src/api/models/HourlyForecastModel';
import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

interface PrecipitationChartProps {
  data: HourlyForecast[];
}

export const PrecipitationChart: React.FC<PrecipitationChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get('window').width;

  if (!data || data.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text style={{ color: Colors.whiteAlpha60 }}>
          {t('dailyForecast.noData')}
        </Text>
      </View>
    );
  }

  // Extraer datos de precipitación y etiquetas
  const precipitationData = data.map(hour => hour.pop * 100); // Convertir a porcentaje (0-100)
  const labels = data.map(hour => (hour.time === 'Now' ? 'Now' : hour.time.replace(':00', '')));

  // Dimensiones del gráfico
  const chartWidth = screenWidth - 24;
  const chartHeight = 200;
  const padding = { top: 20, right: 15, bottom: 40, left: 40 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Calcular ancho de cada barra
  const barSpacing = 8;
  const totalSpacing = barSpacing * (data.length - 1);
  const barWidth = (graphWidth - totalSpacing) / data.length;

  // Calcular máximo para escala (mínimo 100% para mostrar escala completa)
  const maxPrecip = Math.max(...precipitationData, 100);

  // Calcular posiciones de las barras
  const bars = precipitationData.map((pop, index) => {
    const x = padding.left + index * (barWidth + barSpacing);
    // Altura mínima de 3px para barras con 0%
    const barHeight = pop === 0 ? 3 : (pop / maxPrecip) * graphHeight;
    const y = padding.top + graphHeight - barHeight;
    return { x, y, width: barWidth, height: barHeight, pop, label: labels[index] };
  });

  // Valores del eje Y (0%, 25%, 50%, 75%, 100%)
  const yAxisValues = [100, 75, 50, 25, 0];

  // Verificar si hay lluvia significativa
  const hasSignificantRain = Math.max(...precipitationData) > 10;

  return (
    <View className="px-3 py-4">
      <Svg width={chartWidth} height={chartHeight}>
        {/* Líneas horizontales de referencia con valores */}
        {yAxisValues.map((value, i) => {
          const y = padding.top + (i / 4) * graphHeight;
          return (
            <React.Fragment key={i}>
              {/* Línea horizontal */}
              <Rect
                x={padding.left}
                y={y}
                width={graphWidth}
                height={1}
                fill={'white'}
                opacity={0.1}
              />
              {/* Etiqueta del eje Y */}
              <SvgText
                x={padding.left - 10}
                y={y + 4}
                fill={'white'}
                fontSize="10"
                fontWeight="400"
                textAnchor="end"
                opacity={0.6}
              >
                {value}%
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Barras de precipitación */}
        {bars.map((bar, index) => (
          <React.Fragment key={index}>
            {/* Barra de precipitación */}
            <Rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={Math.max(bar.height, 3)}
              fill={Colors.chartBlue}
              opacity={bar.pop === 0 ? 0.2 : 0.8}
              rx={3}
              ry={3}
            />
            {/* Porcentaje sobre la barra (solo si > 0%) */}
            {bar.pop > 0 && (
              <SvgText
                x={bar.x + bar.width / 2}
                y={bar.y - 5}
                fill={'white'}
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
              >
                {Math.round(bar.pop)}%
              </SvgText>
            )}
            {/* Etiqueta de hora debajo */}
            <SvgText
              x={bar.x + bar.width / 2}
              y={chartHeight - padding.bottom + 20}
              fill={'white'}
              fontSize="11"
              fontWeight="400"
              textAnchor="middle"
              opacity={0.7}
            >
              {bar.label}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Etiqueta del eje Y (vertical) */}
        <SvgText
          x={10}
          y={chartHeight / 2}
          fill={'white'}
          fontSize="11"
          fontWeight="500"
          textAnchor="middle"
          opacity={0.7}
          rotation="-90"
          origin={`10, ${chartHeight / 2}`}
        >
          {t('dailyForecast.precipitationAxis')}
        </SvgText>

        {/* Etiqueta del eje X (horizontal) */}
        <SvgText
          x={chartWidth / 2}
          y={chartHeight - 5}
          fill={'white'}
          fontSize="11"
          fontWeight="500"
          textAnchor="middle"
          opacity={0.7}
        >
          {t('dailyForecast.timeAxis')}
        </SvgText>
      </Svg>

      {/* Descripción adicional */}
      <View className="px-4 rounded-xl">
        {hasSignificantRain ? (
          <Text className="text-sm" style={{ color: Colors.whiteAlpha80 }}>
            ☂️ {t('dailyForecast.rainExpected')}
          </Text>
        ) : (
          <Text className="text-sm" style={{ color: Colors.whiteAlpha80 }}>
            ☀️ {t('dailyForecast.noRainExpected')}
          </Text>
        )}
      </View>
    </View>
  );
};

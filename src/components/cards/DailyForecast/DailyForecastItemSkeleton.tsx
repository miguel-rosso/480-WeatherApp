/**
 * DailyForecastItemSkeleton - Skeleton loader para DailyForecastItem
 * 
 * Muestra un placeholder animado para el pronóstico diario
 */

import { Colors } from '@/src/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export const DailyForecastItemSkeleton: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <>
      {/* Día de la semana - Skeleton (text-base = 16px + line height) */}
      <Animated.View
        style={{
          width: 50,
          height: 19,
          borderRadius: 10,
          backgroundColor: Colors.whiteAlpha25,
          flex: 1,
          opacity
        }}
      />

      {/* Icono - Skeleton (size 28 + padding para emojis) */}
      <Animated.View style={{ marginHorizontal: 8, opacity }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.whiteAlpha25 }} />
      </Animated.View>

      {/* Temperatura mínima - Skeleton (text-base = 16px + line height) */}
      <Animated.View
        style={{
          width: 30,
          height: 19,
          borderRadius: 10,
          backgroundColor: Colors.whiteAlpha25,
          marginRight: 12,
          opacity
        }}
      />

      {/* Barra de temperatura - Skeleton */}
      <Animated.View
        style={{
          flex: 2,
          marginHorizontal: 12,
          height: 6,
          backgroundColor: Colors.whiteAlpha25,
          borderRadius: 3,
          minWidth: 80,
          opacity
        }}
      />

      {/* Temperatura máxima - Skeleton (text-base = 16px + line height) */}
      <Animated.View
        style={{
          width: 30,
          height: 19,
          borderRadius: 10,
          backgroundColor: Colors.whiteAlpha25,
          marginLeft: 12,
          opacity
        }}
      />
    </>
  );
};

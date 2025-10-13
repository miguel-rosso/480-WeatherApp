/**
 * HourlyItemSkeleton - Skeleton loader para HourlyItem
 * 
 * Muestra un placeholder animado para el pronóstico por hora
 */

import { Colors } from '@/src/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const HourlyItemSkeleton: React.FC = () => {
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
      {/* Hora - Skeleton (text-base = 16px + line height padding) */}
      <Animated.View 
        className="mb-3"
        style={{ 
          width: 40, 
          height: 19, 
          borderRadius: 10, 
          backgroundColor: Colors.whiteAlpha25,
          opacity 
        }} 
      />
      
      {/* Icono - Skeleton (size 32 + padding para emojis) */}
      <Animated.View 
        className="mb-3"
        style={{ 
          width: 36, 
          height: 36, 
          borderRadius: 18, 
          backgroundColor: Colors.whiteAlpha25,
          opacity 
        }} 
      />
      
      {/* Temperatura - Skeleton (text-xl = 20px + line height) */}
      <Animated.View 
        style={{ 
          width: 38, 
          height: 24, 
          borderRadius: 12, 
          backgroundColor: Colors.whiteAlpha25,
          opacity 
        }} 
      />
    </>
  );
};

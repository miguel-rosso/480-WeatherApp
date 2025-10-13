/**
 * WeatherHeaderSkeleton - Skeleton loader para el encabezado del clima
 * 
 * Muestra un placeholder animado para ciudad, temperatura, min/max y descripción
 */

import { Colors } from '@/src/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export const WeatherHeaderSkeleton: React.FC = () => {
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
    <View className="items-center mt-4 mb-2" style={{ backgroundColor: 'transparent' }}>
      {/* Nombre de la ciudad */}
      <Animated.View 
        style={{ 
          width: 140, 
          height: 40, 
          borderRadius: 20, 
          backgroundColor: Colors.whiteAlpha25,
          marginBottom: 12,
          opacity 
        }} 
      />
      
      {/* Temperatura */}
      <Animated.View 
        style={{ 
          width: 180, 
          height: 84, 
          borderRadius: 42, 
          backgroundColor: Colors.whiteAlpha25,
          marginBottom: 8,
          opacity 
        }} 
      />
      
      {/* Max / Min */}
      <Animated.View 
        style={{ 
          width: 160, 
          height: 24, 
          borderRadius: 12, 
          backgroundColor: Colors.whiteAlpha25,
          marginBottom: 8,
          opacity 
        }} 
      />
      
      {/* Icono y descripción del clima */}
      <View className="flex-row items-center gap-2">
        <Animated.View 
          style={{ 
            width: 30, 
            height: 30, 
            borderRadius: 15, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
        <Animated.View 
          style={{ 
            width: 120, 
            height: 28, 
            borderRadius: 14, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
      </View>
    </View>
  );
};

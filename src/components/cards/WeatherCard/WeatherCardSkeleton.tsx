/**
 * WeatherCardSkeleton - Skeleton loader para WeatherCard
 * 
 * Muestra un placeholder animado mientras se cargan los datos
 */

import { Colors } from '@/src/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export const WeatherCardSkeleton: React.FC = () => {
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
      {/* Header - Skeleton */}
      <View className="flex-row items-center gap-2 mb-2" style={{ minHeight: 16 }}>
        <Animated.View 
          style={{ 
            width: 16, 
            height: 16, 
            borderRadius: 8, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
        <Animated.View 
          style={{ 
            width: 80, 
            height: 11, 
            borderRadius: 6, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
      </View>
      
      {/* Value y Unit - Skeleton */}
      <View className="flex-row items-baseline gap-1 mb-1">
        <Animated.View 
          style={{ 
            width: 60, 
            height: 36, 
            borderRadius: 18, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
        <Animated.View 
          style={{ 
            width: 30, 
            height: 16, 
            borderRadius: 8, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
      </View>
      
      {/* Description - Skeleton */}
      <Animated.View 
        className="mt-1"
        style={{ 
          width: '90%', 
          height: 14, 
          borderRadius: 7, 
          backgroundColor: Colors.whiteAlpha25,
          opacity 
        }} 
      />
      <Animated.View 
        className="mt-1"
        style={{ 
          width: '70%', 
          height: 14, 
          borderRadius: 7, 
          backgroundColor: Colors.whiteAlpha25,
          opacity 
        }} 
      />
    </>
  );
};

/**
 * WeatherCard - Card individual reutilizable
 * 
 * Componente para mostrar información del clima en formato card compacto
 */

import { Colors } from '@/src/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface WeatherCardProps {
  icon: string;
  title: string;
  value: string;
  unit?: string;
  description?: string;
  onPress?: () => void; // Función opcional para hacer la card clickeable
  isLoading?: boolean; // Prop para mostrar skeleton
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ icon, title, value, unit, description, onPress, isLoading = false }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isLoading) {
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
    }
  }, [isLoading, opacity]);

  const content = isLoading ? (
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
  ) : (
    <>
      <View className="flex-row items-center gap-2 mb-2">
        <Text style={{ fontSize: 11, color: Colors.whiteAlpha60 }}>{icon}</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.whiteAlpha60, letterSpacing: 0.5 }}>
          {title.toUpperCase()}
        </Text>
      </View>
      <View className="flex-row items-baseline gap-1 mb-1">
        <Text className="text-3xl font-bold" style={{ color: 'white' }}>
          {value}
        </Text>
        {unit && (
          <Text className="text-base font-medium" style={{ color: Colors.whiteAlpha70 }}>
            {unit}
          </Text>
        )}
      </View>
      {description && (
        <Text className="mt-1 text-xs" style={{ color: Colors.whiteAlpha70 }}>
          {description}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className="flex-1 p-4 rounded-3xl"
        style={{ backgroundColor: Colors.weatherCardBackground, minWidth: '47%' }}
        disabled={isLoading}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 p-4 rounded-3xl" style={{ backgroundColor: Colors.weatherCardBackground, minWidth: '47%' }}>
      {content}
    </View>
  );
};

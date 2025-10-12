/**
 * WeatherCard - Card individual reutilizable
 * 
 * Componente para mostrar información del clima en formato card compacto
 */

import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface WeatherCardProps {
  icon: string;
  title: string;
  value: string;
  unit?: string;
  description?: string;
  onPress?: () => void; // Función opcional para hacer la card clickeable
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ icon, title, value, unit, description, onPress }) => {
  const content = (
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

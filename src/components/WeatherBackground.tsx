/**
 * WeatherBackground - Fondo según el clima y hora del día
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SkyAnimation } from './SkyAnimation';

interface WeatherBackgroundProps {
  condition: string;
  hour?: number; // Hora del día (0-23)
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ 
  condition, 
  hour = new Date().getHours() 
}) => {
  
  return (
    <View style={StyleSheet.absoluteFill}>      
      {/* Animación sobre el gradiente */}
      <SkyAnimation condition={condition} hour={hour} />
    </View>
  );
};

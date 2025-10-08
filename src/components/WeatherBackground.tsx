/**
 * WeatherBackground - Fondo animado según el clima y hora del día
 * Inspirado en la app de Google Weather
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface WeatherBackgroundProps {
  condition: string;
  hour?: number; // Hora del día (0-23)
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ 
  condition, 
  hour = new Date().getHours() 
}) => {
  
  // Determinar si es de día o de noche
  const isDay = hour >= 6 && hour < 20;
  
  // Obtener colores del degradado según clima y hora
  const getGradientColors = (): string[] => {
    const normalizedCondition = condition.toLowerCase();
    
    // ☀️ Soleado
    if (normalizedCondition.includes('sol') || normalizedCondition.includes('sunny') || normalizedCondition.includes('clear')) {
      if (isDay) {
        return ['#4A90E2', '#87CEEB', '#E3F2FD']; // Azul cielo brillante
      } else {
        return ['#0F2027', '#203A43', '#2C5364']; // Noche despejada
      }
    }
    
    // ☁️ Nublado
    if (normalizedCondition.includes('nublado') || normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) {
      if (isDay) {
        return ['#606C88', '#8E9EAB', '#B8C6DB']; // Gris suave
      } else {
        return ['#232526', '#414345', '#5C6570']; // Gris oscuro noche
      }
    }
    
    // 🌧️ Lluvia
    if (normalizedCondition.includes('lluvi') || normalizedCondition.includes('rain')) {
      if (isDay) {
        return ['#4B79A1', '#6A96C7', '#8EADD3']; // Azul grisáceo
      } else {
        return ['#1e3c72', '#2a5298', '#3d6bb3']; // Azul oscuro lluvioso
      }
    }
    
    // ⛅ Parcialmente nublado
    if (normalizedCondition.includes('parcial') || normalizedCondition.includes('partly')) {
      if (isDay) {
        return ['#56B4D3', '#78C9E3', '#A8DFF0']; // Azul claro
      } else {
        return ['#2C3E50', '#3F5770', '#5A7FA0']; // Azul grisáceo noche
      }
    }
    
    // ❄️ Nieve
    if (normalizedCondition.includes('nieve') || normalizedCondition.includes('snow')) {
      return ['#E6F7FF', '#C7E8F3', '#A8D8EA']; // Blanco azulado
    }
    
    // ⛈️ Tormenta
    if (normalizedCondition.includes('tormenta') || normalizedCondition.includes('storm') || normalizedCondition.includes('thunder')) {
      return ['#373B44', '#4A5568', '#5D6A7B']; // Gris oscuro tormentoso
    }
    
    // 🌫️ Niebla
    if (normalizedCondition.includes('niebla') || normalizedCondition.includes('fog') || normalizedCondition.includes('mist')) {
      return ['#8E9EAB', '#A8B5C7', '#C7D3E0']; // Gris claro neblinoso
    }
    
    // Default: Día/Noche estándar
    if (isDay) {
      return ['#56B4D3', '#78C9E3', '#A8DFF0'];
    } else {
      return ['#0F2027', '#203A43', '#2C5364'];
    }
  };

  const colors = getGradientColors() as [string, string, ...string[]];

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={colors}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
};

/**
 * WeatherIcon - Componente que renderiza emojis o iconos PNG de clima
 * Detecta si el icon es un emoji o una imagen PNG basándose en el prefijo "image:"
 */

import { Image } from 'expo-image';
import React from 'react';
import { Text, TextStyle } from 'react-native';

interface WeatherIconProps {
  icon: string; // Emoji o "image:nombre-del-icono"
  size?: number; // Tamaño del icono (aplica a ambos tipos)
  style?: TextStyle; // Estilo adicional (para emojis)
}

// Mapa de iconos PNG disponibles
const WEATHER_ICON_IMAGES: Record<string, any> = {
  'night-cloudy': require('@/assets/images/weatherIcons/night-cloudy-color-icon.png'),
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  icon, 
  size = 40,
  style 
}) => {
  // Si el icon empieza con "image:", es una imagen PNG
  if (icon.startsWith('image:')) {
    const iconName = icon.replace('image:', '');
    const imageSource = WEATHER_ICON_IMAGES[iconName];
    
    // Si no se encuentra la imagen, renderizar un emoji de sol por defecto
    if (!imageSource) {
      console.warn(`⚠️ WeatherIcon: Imagen no encontrada para "${iconName}"`);
      return (
        <Text style={[{ fontSize: size, lineHeight: size }, style]}>
          ☀️
        </Text>
      );
    }
    // Renderizar la imagen PNG
    return (
      <Image
        source={imageSource}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
    );
  }

  // Si no, es un emoji normal
  return (
    <Text style={[{ fontSize: size, lineHeight: size }, style as TextStyle]}>
      {icon}
    </Text>
  );
};

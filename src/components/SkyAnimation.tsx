/**
 * SkyAnimation - cielo según clima y hora del día
 */

import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface SkyAnimationProps {
  condition: string; // Condición del clima
  hour?: number; // Hora del día (0-23)
}

// GIF del cielo - por ahora usamos el mismo para todas las condiciones
const sunnyDayGif = require('../../assets/animations/SunSky.jpg');

const ANIMATIONS = {
  // SOLEADO
  sunnyDay: sunnyDayGif,
  sunnyAfternoon: sunnyDayGif,
  clearNight: sunnyDayGif,
  
  // NUBLADO
  cloudyDay: sunnyDayGif,
  cloudyAfternoon: sunnyDayGif,
  cloudyNight: sunnyDayGif,
  
  // LLUVIA
  rainyDay: sunnyDayGif,
  rainyAfternoon: sunnyDayGif,
  rainyNight: sunnyDayGif,
  
  // NIEVE
  snowyDay: sunnyDayGif,
  snowyAfternoon: sunnyDayGif,
  snowyNight: sunnyDayGif,
  
  // DEFAULT
  default: sunnyDayGif,
};

export const SkyAnimation: React.FC<SkyAnimationProps> = ({ 
  condition, 
  hour = new Date().getHours() 
}) => {
  
  // Determinar qué animación mostrar
  const getAnimation = useMemo(() => {
    const normalizedCondition = condition.toLowerCase();
    
    // Determinar momento del día
    const isDay = hour >= 6 && hour < 17;
    const isAfternoon = hour >= 17 && hour < 20;
    const isNight = hour >= 20 || hour < 6;
    
    // ☀️ SOLEADO / DESPEJADO
    if (normalizedCondition.includes('sol') || 
        normalizedCondition.includes('sun') || 
        normalizedCondition.includes('clear') ||
        normalizedCondition.includes('despej')) {
      if (isDay) return ANIMATIONS.sunnyDay;
      if (isAfternoon) return ANIMATIONS.sunnyAfternoon;
      if (isNight) return ANIMATIONS.clearNight;
    }
    
    // ☁️ NUBLADO
    if (normalizedCondition.includes('nubl') || 
        normalizedCondition.includes('cloud') ||
        normalizedCondition.includes('overcast')) {
      if (isDay) return ANIMATIONS.cloudyDay;
      if (isAfternoon) return ANIMATIONS.cloudyAfternoon;
      if (isNight) return ANIMATIONS.cloudyNight;
    }
    
    // 🌧️ LLUVIA
    if (normalizedCondition.includes('lluv') || 
        normalizedCondition.includes('rain')) {
      if (isDay) return ANIMATIONS.rainyDay;
      if (isAfternoon) return ANIMATIONS.rainyAfternoon;
      if (isNight) return ANIMATIONS.rainyNight;
    }
    
    // ❄️ NIEVE
    if (normalizedCondition.includes('nieve') || 
        normalizedCondition.includes('snow')) {
      if (isDay) return ANIMATIONS.snowyDay;
      if (isAfternoon) return ANIMATIONS.snowyAfternoon;
      if (isNight) return ANIMATIONS.snowyNight;
    }
    
    // Default
    return ANIMATIONS.default;
  }, [condition, hour]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Image
        source={getAnimation}
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
  },
});

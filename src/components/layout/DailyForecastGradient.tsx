/**
 * DailyForecastGradient Component
 * Dynamic gradient background for daily forecast screen based on weather
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

interface DailyForecastGradientProps {
  colors: [string, string];
  children: React.ReactNode;
}

export const DailyForecastGradient: React.FC<DailyForecastGradientProps> = ({ colors, children }) => {
  return (
    <LinearGradient
      colors={colors as readonly [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.7]} // El primer color (oscuro) ocupa el 70%, el segundo (claro) empieza al 70%
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

/**
 * DaySeparator - Separador visual entre días en el pronóstico por hora
 */

import React from 'react';
import { Text, View } from 'react-native';

interface DaySeparatorProps {
  dayName: string;
}

export const DaySeparator: React.FC<DaySeparatorProps> = ({ dayName }) => {
  return (
    <View 
      className="justify-center px-4 mx-2"
      style={{ minWidth: 80 }}
    >
      <View 
        className="rounded-full px-3 py-1.5"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Text 
          className="text-sm font-semibold text-center" 
          style={{ color: '#fff' }}
        >
          {dayName}
        </Text>
      </View>
    </View>
  );
};

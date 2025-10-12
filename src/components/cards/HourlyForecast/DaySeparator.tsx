/**
 * DaySeparator - Separador visual entre días en el pronóstico por hora
 */

import { Colors } from '@/src/constants/Colors';
import { getDayNameKey } from '@/src/utils/helpers';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

interface DaySeparatorProps {
  dayName: string;
  dayIndex: number;
  onNavigate: (dayIndex: number) => void;
}

export const DaySeparator: React.FC<DaySeparatorProps> = ({ 
  dayName, 
  dayIndex, 
  onNavigate 
}) => {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    onNavigate(dayIndex);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className="justify-center px-4 mx-2"
      style={{ minWidth: 80 }}
    >
      <View 
        className="rounded-full px-3 py-1.5"
        style={{ 
          backgroundColor: isPressed 
            ? Colors.whiteAlpha50
            : Colors.whiteAlpha20
        }}
      >
        <Text 
          className="text-xs font-semibold text-center" 
          style={{ color: 'white' }}
        >
          {t(getDayNameKey(dayName, false))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

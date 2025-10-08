/**
 * Header - Componente de encabezado con selector de idioma
 */

import { useThemeColors } from '@/src/hooks/useThemeColor';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  city: string;
}

export const Header: React.FC<HeaderProps> = ({ city }) => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <View 
      className="flex-row justify-between items-center px-6 pt-14 pb-4"
      style={{ 
        backgroundColor: 'transparent',
      }}
    >
      <View>
        <Text className="text-2xl font-bold" style={{ color: '#fff' }}>
          {t(`cities.${city.toLowerCase()}`)}
        </Text>
      </View>
      
      <LanguageSelector />
    </View>
  );
};

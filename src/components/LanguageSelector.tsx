/**
 * LanguageSelector - Selector de idioma en la parte superior derecha
 * Muestra inglés y español, con el seleccionado resaltado
 */

import { useThemeColors } from '@/src/hooks/useThemeColor';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const colors = useThemeColors();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (lang: string) => i18n.language === lang;

  return (
    <View className="flex-row gap-3 items-center">
      {/* Inglés */}
      <TouchableOpacity
        onPress={() => changeLanguage('en')}
        className="px-3 py-1.5 rounded-lg"
        style={{
          backgroundColor: isActive('en') ? colors.primary : 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          className="font-semibold text-sm"
          style={{
            color: isActive('en') ? '#fff' : colors.text,
          }}
        >
          EN
        </Text>
      </TouchableOpacity>

      {/* Español */}
      <TouchableOpacity
        onPress={() => changeLanguage('es')}
        className="px-3 py-1.5 rounded-lg"
        style={{
          backgroundColor: isActive('es') ? colors.primary : 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          className="font-semibold text-sm"
          style={{
            color: isActive('es') ? '#fff' : colors.text,
          }}
        >
          ES
        </Text>
      </TouchableOpacity>
    </View>
  );
};

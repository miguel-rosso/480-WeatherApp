/**
 * LanguageSelector - Selector de idioma en la parte superior derecha
 * Muestra inglés y español, con el seleccionado resaltado
 */

import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (lang: string) => i18n.language === lang;

  return (
    <View className="flex-row items-center gap-3">
      {/* Inglés */}
      <TouchableOpacity
        onPress={() => changeLanguage('en')}
        className="px-3 py-1.5 rounded-lg"
        style={{
          backgroundColor: isActive('en') ? Colors.languageSelectorActive : Colors.languageSelectorInactive,
          borderWidth: 1,
          borderColor: Colors.languageSelectorBorder,
        }}
      >
        <Text
          className="text-sm font-semibold"
          style={{
            color: isActive('en') ? Colors.languageSelectorTextActive : Colors.languageSelectorTextInactive,
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
          backgroundColor: isActive('es') ? Colors.languageSelectorActive : Colors.languageSelectorInactive,
          borderWidth: 1,
          borderColor: Colors.languageSelectorBorder,
        }}
      >
        <Text
          className="text-sm font-semibold"
          style={{
            color: isActive('es') ? Colors.languageSelectorTextActive : Colors.languageSelectorTextInactive,
          }}
        >
          ES
        </Text>
      </TouchableOpacity>
    </View>
  );
};

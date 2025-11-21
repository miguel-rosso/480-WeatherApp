/**
 * AppHeader - Componente de header unificado para toda la app
 *
 * Características:
 * - Muestra el selector de idioma en todas las pantallas
 * - En las pantallas de ciudades: muestra la hora local
 * - En la pantalla de contacto: muestra el título "Contact"
 * - Fondo transparente para ciudades (permite ver la imagen de fondo)
 * - Fondo sólido para contacto
 */

import { LanguageSelector } from '@/src/components/common/LanguageSelector';
import { SettingsButton } from '@/src/components/common/SettingsButton';
import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

interface AppHeaderProps {
  /** Tipo de pantalla: 'city' para ciudades, 'contact' para contacto */
  type: 'city' | 'contact';
  /** Hora local formateada (solo para tipo 'city') */
  localTime?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ type, localTime }) => {
  const { t } = useTranslation();

  const backgroundColor = type === 'contact' ? Colors.background : 'transparent';

  // Layout especial para Contact: botón a la izquierda, título centrado, selector de idioma a la derecha
  if (type === 'contact') {
    return (
      <View className="flex-row items-center justify-between px-6 pb-2 pt-14" style={{ backgroundColor }}>
        {/* Botón de navegación a la izquierda */}
        <View style={{ zIndex: 10 }}>
          <SettingsButton />
        </View>

        {/* Título centrado */}
        <Text className="text-2xl font-bold pt-14" style={{ color: 'white', position: 'absolute', left: 0, right: 0, textAlign: 'center' }}>
          {t('contact.title')}
        </Text>

        {/* Selector de idioma a la derecha */}
        <View style={{ zIndex: 10 }}>
          <LanguageSelector />
        </View>
      </View>
    );
  }

  // Layout para ciudades: hora local a la izquierda, botón y selector de idioma a la derecha
  return (
    <View className="flex-row items-center justify-between px-6 pb-2 pt-14" style={{ backgroundColor }}>
      {/* Hora local */}
      <View>
        {localTime ? (
          <Text className="text-lg font-semibold" style={{ color: 'white' }}>
            🕐 {localTime}
          </Text>
        ) : (
          <View
            style={{
              width: 60,
              height: 20,
              backgroundColor: Colors.whiteAlpha25,
              borderRadius: 6,
            }}
          />
        )}
      </View>

      {/* Botón y selector de idioma juntos */}
      <View className="flex-row items-center gap-3">
        {/* Selector de idioma */}
        <LanguageSelector />
        {/* Botón de navegación */}
        <SettingsButton />
      </View>
    </View>
  );
};

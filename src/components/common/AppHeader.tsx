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
  
  return (
    <View 
      className="flex-row items-center justify-between px-6 pb-2 pt-14" 
      style={{ backgroundColor }}
    >
      {/* Contenido izquierdo */}
      {type === 'city' ? (
        // Para ciudades: mostrar hora local o skeleton
        localTime ? (
          <Text className="text-lg font-semibold" style={{ color: 'white' }}>
            🕐 {localTime}
          </Text>
        ) : (
          <View 
            style={{ 
              width: 60, 
              height: 20, 
              backgroundColor: Colors.whiteAlpha25,
              borderRadius: 6 
            }} 
          />
        )
      ) : (
        // Para contacto: mostrar título
        <Text className="text-2xl font-bold" style={{ color: 'white' }}>
          {t('contact.title')}
        </Text>
      )}
      
      {/* Selector de idioma - siempre visible */}
      <LanguageSelector />
    </View>
  );
};

/**
 * SettingsButton - Botón para navegar a la pantalla de testing/configuración
 * 
 * Características:
 * - Usa el ViewModel para manejar la navegación (MVVM)
 * - Estilo adaptativo según el tipo de pantalla
 */

import { Colors } from '@/src/constants/Colors';
import { useHeaderViewModel } from '@/src/viewmodels/useHeaderViewModel';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const SettingsButton = () => {
  const { navigateToTestingScreen } = useHeaderViewModel();

  return (
    <TouchableOpacity
      onPress={navigateToTestingScreen}
      className="items-center justify-center rounded-full"
      style={{
        width: 40,
        height: 40,
        backgroundColor: Colors.whiteAlpha20,
      }}
      activeOpacity={0.7}
    >
      <Ionicons name="build-outline" size={22} color="white" />
    </TouchableOpacity>
  );
};

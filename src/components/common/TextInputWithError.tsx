/**
 * TextInputWithError - Componente reutilizable de input de texto con manejo de errores
 * Incluye label, input, y espacio reservado para mensajes de error
 */

import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface TextInputWithErrorProps extends TextInputProps {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
}

export const TextInputWithError: React.FC<TextInputWithErrorProps> = ({ label, hasError = false, errorMessage, onBlur, ...textInputProps }) => {
  return (
    <View>
      <Text className="mb-2 text-sm font-semibold" style={{ color: Colors.text }}>
        {label}
      </Text>
      <TextInput
        className="p-4 text-base border rounded-xl"
        style={{
          backgroundColor: Colors.inputBackground,
          borderColor: hasError ? Colors.error : Colors.inputBorder,
          borderWidth: hasError ? 2 : 1,
          color: Colors.text,
        }}
        placeholderTextColor={Colors.textSecondary}
        onBlur={onBlur}
        {...textInputProps}
      />
      {hasError && errorMessage && (
        <Text className="mt-1 text-xs" style={{ color: Colors.error }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

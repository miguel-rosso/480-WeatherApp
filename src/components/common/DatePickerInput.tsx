/**
 * DatePickerInput - Componente de selección de fecha
 * En Android: muestra el picker nativo estándar
 * En iOS: muestra un spinner con botones de Confirmar/Cancelar
 */

import { useThemeColors } from '@/src/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';

interface DatePickerInputProps {
  label: string;
  placeholder: string;
  value: Date | null;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  isOpen?: boolean; // Control externo del estado del picker
  onOpenChange?: (isOpen: boolean) => void; // Callback para notificar cambios de estado
  hasError?: boolean; // Indica si hay un error
  errorMessage?: string; // Mensaje de error a mostrar
  onBlur?: () => void; // Callback cuando pierde el foco
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  maximumDate,
  minimumDate,
  isOpen,
  onOpenChange,
  hasError = false,
  errorMessage,
  onBlur,
}) => {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const [internalShowDatePicker, setInternalShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  // Usar control externo si está disponible, sino usar el estado interno
  const showDatePicker = isOpen !== undefined ? isOpen : internalShowDatePicker;
  const setShowDatePicker = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalShowDatePicker(value);
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Manejar cambio de fecha
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      // Android: cerrar inmediatamente y aplicar cambio
      setShowDatePicker(false);
      if (event.type === 'set' && date) {
        onChange(date);
      }
      // Notificar que perdió el foco (tanto si confirma como si cancela)
      if (onBlur) {
        onBlur();
      }
    } else {
      // iOS: solo actualizar tempDate sin cerrar
      if (date) {
        setTempDate(date);
      }
    }
  };

  // Confirmar selección en iOS
  const confirmDateSelection = () => {
    onChange(tempDate);
    setShowDatePicker(false);
    // Notificar que perdió el foco
    if (onBlur) {
      onBlur();
    }
  };

  // Cancelar selección en iOS
  const cancelDateSelection = () => {
    setTempDate(value || new Date());
    setShowDatePicker(false);
    // Notificar que perdió el foco
    if (onBlur) {
      onBlur();
    }
  };

  // Toggle del picker
  const toggleDatePicker = () => {
    // Cerrar el teclado si está abierto
    Keyboard.dismiss();
    
    if (showDatePicker) {
      // Si está abierto, cerrar (comportamiento de cancelar)
      cancelDateSelection();
      // Notificar que perdió el foco
      if (onBlur) {
        onBlur();
      }
    } else {
      // Si está cerrado, abrir
      setTempDate(value || new Date());
      setShowDatePicker(true);
    }
  };

  return (
    <View>
      <Text className="mb-2 text-sm font-semibold" style={{ color: colors.text }}>
        {label}
      </Text>
      
      <TouchableOpacity
        className="flex-row items-center justify-between p-4 border rounded-xl"
        style={{
          backgroundColor: colors.inputBackground,
          borderColor: hasError ? '#EF4444' : colors.inputBorder,
          borderWidth: hasError ? 2 : 1,
        }}
        onPress={toggleDatePicker}
      >
        <Text
          className="text-base"
          style={{ color: value ? colors.text : colors.textSecondary }}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {hasError && errorMessage && (
        <Text className="mt-1 text-xs" style={{ color: '#EF4444' }}>
          {errorMessage}
        </Text>
      )}

      {showDatePicker && (
        <>
          {Platform.OS === 'ios' ? (
            // iOS DatePicker con botones de confirmar/cancelar
            <View
              className="p-4 mt-4 rounded-xl"
              style={{
                backgroundColor: colors.inputBackground,
                borderWidth: 1,
                borderColor: colors.inputBorder,
              }}
            >
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                style={{ height: 120 }}
              />
              <View className="flex-row justify-end mt-4 space-x-3">
                <TouchableOpacity
                  onPress={cancelDateSelection}
                  className="px-4 py-2 mr-3 rounded-lg"
                  style={{
                    backgroundColor: colors.buttonDisabled,
                  }}
                >
                  <Text style={{ color: colors.text }}>{t('contact.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmDateSelection}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: colors.buttonEnabled }}
                >
                  <Text style={{ color: colors.buttonTextEnabled }}>{t('contact.confirm')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // Android DatePicker (modal nativo)
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          )}
        </>
      )}
    </View>
  );
};

/**
 * ContactScreen - Componente de UI para el formulario de contacto
 * Solo se encarga de la presentación, no contiene lógica de negocio
 * La lógica está en el ViewModel (useContactViewModel)
 */

import { DatePickerInput } from '@/src/components/common/DatePickerInput';
import { TextInputWithError } from '@/src/components/common/TextInputWithError';
import { Colors } from '@/src/constants/Colors';
import { useContactViewModel } from '@/src/viewmodels/useContactViewModel';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export const ContactScreen: React.FC = () => {
  const { t } = useTranslation();
  const confettiRef = useRef<LottieView>(null);

  // 🎯 ViewModel: Toda la lógica del formulario (incluida la lógica de animación)
  const {
    formData,
    birthDate,
    willHireMe,
    isDatePickerOpen,
    showConfetti,
    setBirthDate,
    setWillHireMe,
    setIsDatePickerOpen,
    updateField,
    markFieldAsTouched,
    isFormValid,
    hasFieldError,
    getFieldErrorMessage,
    handleSubmit,
    handleScrollBegin,
  } = useContactViewModel();

  return (
    <KeyboardAvoidingView className="flex-1" style={{ backgroundColor: Colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* 🎉 Animación de confeti de fondo */}
      {showConfetti && (
        <View style={styles.confettiContainer} pointerEvents="none">
          <LottieView
            ref={confettiRef}
            source={require('@/assets/animations/Confetti.json')}
            style={styles.confetti}
            loop={false}
            autoPlay
            resizeMode="cover"
          />
        </View>
      )}

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-4"
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={handleScrollBegin}
        showsVerticalScrollIndicator={false}
      >
        {/* Header decorativo */}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <View className="items-center justify-center w-12 h-12 mr-4 rounded-2xl" style={{ backgroundColor: Colors.buttonEnabled + '20' }}>
              <Ionicons name="person-circle-outline" size={28} color={Colors.buttonEnabled} />
            </View>
            <View className="flex-1">
              <Text className="mt-1 text-sm" style={{ color: Colors.textSecondary }}>
                {t('contact.subtitle')}
              </Text>
            </View>
          </View>
        </View>

        {/* Formulario */}
        <View className="gap-5">
          {/* Nombre */}
          <TextInputWithError
            label={t('contact.name')}
            placeholder={t('contact.namePlaceholder')}
            value={formData.nombre}
            onChangeText={(text) => updateField('nombre', text)}
            onBlur={() => markFieldAsTouched('nombre')}
            hasError={hasFieldError('nombre')}
            errorMessage={t('contact.requiredField')}
          />

          {/* Fecha de Nacimiento */}
          <DatePickerInput
            label={t('contact.birthdate')}
            placeholder={t('contact.birthdatePlaceholder')}
            value={birthDate}
            onChange={setBirthDate}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
            isOpen={isDatePickerOpen}
            onOpenChange={setIsDatePickerOpen}
            hasError={!!getFieldErrorMessage('birthDate')}
            errorMessage={getFieldErrorMessage('birthDate')}
            onBlur={() => markFieldAsTouched('birthDate')}
          />

          {/* Ciudad */}
          <TextInputWithError
            label={t('contact.city')}
            placeholder={t('contact.cityPlaceholder')}
            value={formData.ciudad}
            onChangeText={(text) => updateField('ciudad', text)}
            onBlur={() => markFieldAsTouched('ciudad')}
            hasError={hasFieldError('ciudad')}
            errorMessage={t('contact.requiredField')}
          />

          {/* Email */}
          <TextInputWithError
            label={t('contact.email')}
            placeholder={t('contact.emailPlaceholder')}
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            onBlur={() => markFieldAsTouched('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            hasError={!!getFieldErrorMessage('email')}
            errorMessage={getFieldErrorMessage('email')}
          />

          {/* Teléfono */}
          <TextInputWithError
            label={t('contact.phone')}
            placeholder={t('contact.phonePlaceholder')}
            value={formData.telefono}
            onChangeText={(text) => updateField('telefono', text)}
            onBlur={() => markFieldAsTouched('telefono')}
            keyboardType="phone-pad"
            hasError={!!getFieldErrorMessage('telefono')}
            errorMessage={getFieldErrorMessage('telefono')}
          />

          {/* Switch - ¿Me vais a contratar? */}
          <View
            className="p-5 mt-3 rounded-2xl"
            style={{
              backgroundColor: Colors.background,
              borderWidth: 1,
              borderColor: Colors.textSecondary + '30',
              position: 'relative',
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 gap-3">
                <View
                  className="items-center justify-center rounded-full size-10"
                  style={{ backgroundColor: willHireMe ? Colors.buttonEnabled + '20' : Colors.textSecondary + '20' }}
                >
                  <Ionicons name={willHireMe ? 'checkmark-circle' : 'alert-circle'} size={24} color={willHireMe ? Colors.buttonEnabled : Colors.error} />
                </View>
                <Text className="flex-1 text-base font-medium" style={{ color: Colors.text }}>
                  {t('contact.willHireMe')}
                </Text>
              </View>
              <Switch
                value={willHireMe}
                onValueChange={setWillHireMe}
                trackColor={{ false: Colors.textSecondary, true: Colors.buttonEnabled }}
                thumbColor={willHireMe ? Colors.buttonTextEnabled : Colors.switchThumbInactive}
                ios_backgroundColor={Colors.textSecondary}
                style={Platform.OS === 'android' ? { transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] } : undefined}
              />
            </View>
          </View>
        </View>

        {/* Botón Enviar - Diseño mejorado */}
        <TouchableOpacity
          className="items-center justify-center p-5 mt-8 mb-6 rounded-2xl"
          style={{
            backgroundColor: isFormValid ? Colors.buttonEnabled : Colors.buttonDisabled,
            shadowColor: isFormValid ? Colors.buttonEnabled : Colors.shadowBlack,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isFormValid ? 0.3 : 0.1,
            shadowRadius: 12,
            elevation: isFormValid ? 5 : 1,
            borderWidth: isFormValid ? 0 : 1,
            borderColor: Colors.textSecondary + '30',
            minHeight: 60,
          }}
          onPress={handleSubmit}
          disabled={!isFormValid}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center gap-3">
            <Ionicons
              name={isFormValid ? 'paper-plane' : 'paper-plane-outline'}
              size={22}
              color={isFormValid ? Colors.buttonTextEnabled : Colors.buttonTextDisabled}
            />
            <Text
              className="text-lg font-bold tracking-wide"
              style={{
                color: isFormValid ? Colors.buttonTextEnabled : Colors.buttonTextDisabled,
              }}
            >
              {t('contact.submit')}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  confetti: {
    width: '100%',
    height: '100%',
  },
});

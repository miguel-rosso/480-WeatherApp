/**
 * ContactScreen - Componente de UI para el formulario de contacto
 * Solo se encarga de la presentación, no contiene lógica de negocio
 * La lógica está en el ViewModel (useContactViewModel)
 */

import { DatePickerInput } from '@/src/components/common/DatePickerInput';
import { LanguageSelector } from '@/src/components/common/LanguageSelector';
import { TextInputWithError } from '@/src/components/common/TextInputWithError';
import { Colors } from '@/src/constants/Colors';
import { useContactViewModel } from '@/src/viewmodels/useContactViewModel';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export const ContactScreen: React.FC = () => {
  const { t } = useTranslation();
  const animationRef = useRef<LottieView>(null);
  const timerRef = useRef<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<'confetti' | 'crying'>('confetti');

  // 🎯 ViewModel: Toda la lógica del formulario
  const {
    formData,
    birthDate,
    willHireMe,
    isDatePickerOpen,
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

  // 🎬 Efecto para reproducir la animación cuando cambia el switch
  useEffect(() => {
    if (showAnimation) {
      // Limpiar el timeout anterior si existe
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      animationRef.current?.play();

      // Ocultar la animación después de que termine
      timerRef.current = setTimeout(() => {
        setShowAnimation(false);
        timerRef.current = null;
      }, 2000); // 2 segundos
    }

    // Cleanup: limpiar el timeout cuando el componente se desmonte o showAnimation cambie
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showAnimation, currentAnimation]);

  // Manejar el cambio del switch con animación
  const handleSwitchChange = (value: boolean) => {
    setWillHireMe(value);
    // Establecer qué animación mostrar según el valor del switch
    setCurrentAnimation(value ? 'confetti' : 'crying');
    setShowAnimation(true);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={{ backgroundColor: Colors.background }}
    >
      <ScrollView className="flex-1" contentContainerClassName="px-6 pt-16 pb-6" keyboardShouldPersistTaps="handled" onScrollBeginDrag={handleScrollBegin}>
        {/* Language Selector */}
        <View className="absolute z-10 top-2 right-6">
          <LanguageSelector />
        </View>

        {/* Header */}
        <View className="mb-8">
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail" size={32} color={Colors.text} />
            <Text className="ml-3 text-3xl font-bold" style={{ color: Colors.text }}>
              {t('contact.title')}
            </Text>
          </View>
          <Text className="text-base" style={{ color: Colors.textSecondary }}>
            {t('contact.subtitle')}
          </Text>
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
          <View className="flex-row items-center justify-between py-4" style={{ position: 'relative' }}>
            <View className="flex-row items-center flex-1">
              <Text className="text-base" style={{ color: Colors.text }}>
                {t('contact.willHireMe')}
              </Text>
            </View>
            <Switch
              value={willHireMe}
              onValueChange={handleSwitchChange}
              trackColor={{ false: Colors.textSecondary, true: Colors.buttonEnabled }}
              thumbColor={willHireMe ? Colors.buttonTextEnabled : Colors.switchThumbInactive}
              ios_backgroundColor={Colors.textSecondary}
              style={Platform.OS === 'android' ? { transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] } : undefined}
            />
            {/* Animación de Lottie - Position absolute para no empujar elementos */}
            {showAnimation && (
              <View
                style={{
                  position: 'absolute',
                  right: 70, // Posicionar a la izquierda del switch (ajusta según el ancho del switch)
                  top: '50%',
                  marginTop: -25, // Centrar verticalmente
                  width: 72,
                  height: 72,
                  zIndex: 10,
                }}
              >
                <LottieView
                  ref={animationRef}
                  source={currentAnimation === 'confetti' ? require('@/assets/animations/Success.json') : require('@/assets/animations/Crying.json')}
                  style={{ width: 72, height: 72 }}
                  loop={false}
                  autoPlay
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity
          className="items-center p-5 mt-8 mb-6 rounded-xl"
          style={{
            backgroundColor: isFormValid ? Colors.buttonEnabled : Colors.buttonDisabled,
            shadowColor: Colors.shadowBlack,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isFormValid ? 0.1 : 0,
            shadowRadius: 4,
            elevation: isFormValid ? 3 : 0,
          }}
          onPress={handleSubmit}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Ionicons name="send" size={20} color={isFormValid ? Colors.buttonTextEnabled : Colors.buttonTextDisabled} className="mr-2" />
            <Text
              className="text-lg font-semibold"
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

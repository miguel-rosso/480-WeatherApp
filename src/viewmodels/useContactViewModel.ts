/**
 * ViewModel - Formulario de Contacto
 * Contiene toda la lógica de negocio y validación del formulario
 * En React, esto es un custom hook que encapsula la lógica
 */

import { useAudioPlayer } from 'expo-audio';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Platform } from 'react-native';

export interface FormData {
  nombre: string;
  ciudad: string;
  email: string;
  telefono: string;
}

export interface TouchedFields {
  nombre: boolean;
  birthDate: boolean;
  ciudad: boolean;
  email: boolean;
  telefono: boolean;
}

export const useContactViewModel = () => {
  const { t } = useTranslation();

  // Audio player para el sonido de celebración
  const audioPlayer = useAudioPlayer(require('@/assets/sounds/crowd-cheer-and-applause-406644.mp3'));

  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    ciudad: '',
    email: '',
    telefono: '',
  });

  // Estado para el DatePicker
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Estado para el Switch
  const [willHireMe, setWillHireMe] = useState(false);

  // Estado para la animación de confeti
  const [showConfetti, setShowConfetti] = useState(false);

  // Estado para campos tocados (para mostrar errores)
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    nombre: false,
    birthDate: false,
    ciudad: false,
    email: false,
    telefono: false,
  });

  /**
   * Cerrar DatePicker cuando el teclado se muestra (un TextInput recibe focus)
   */
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
        if (isDatePickerOpen) {
          setIsDatePickerOpen(false);
        }
      });

      return () => {
        keyboardWillShowListener.remove();
      };
    }
  }, [isDatePickerOpen]);

  /**
   * Mostrar animación de confeti y reproducir sonido cuando willHireMe cambia a true
   */
  useEffect(() => {
    if (willHireMe) {
      setShowConfetti(true);
      
      // Reiniciar el audio desde el inicio y configurar volumen
      audioPlayer.seekTo(0);
      audioPlayer.volume = 0.5;
      audioPlayer.play();

      // Ocultar el confeti después de la animación
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4500); // 4.5 segundos

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Al desactivar, pausar el audio y ocultar el confeti
      setShowConfetti(false);
      audioPlayer.pause();
    }
  }, [willHireMe, audioPlayer]);

  /**
   * Validar formato de email
   */
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validar formato de teléfono (números y algunos caracteres especiales)
   */
  const isPhoneValid = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 9;
  };

  /**
   * Validar que todos los campos estén llenos, con formato correcto y el switch activado
   */
  const isFormValid = (): boolean => {
    return (
      formData.nombre.trim() !== '' &&
      birthDate !== null &&
      formData.ciudad.trim() !== '' &&
      formData.email.trim() !== '' &&
      isEmailValid(formData.email) &&
      formData.telefono.trim() !== '' &&
      isPhoneValid(formData.telefono) &&
      willHireMe
    );
  };

  /**
   * Verificar si un campo específico tiene error
   */
  const hasFieldError = (fieldName: keyof TouchedFields): boolean => {
    if (!touchedFields[fieldName]) return false;

    if (fieldName === 'birthDate') {
      return birthDate === null;
    }
    return formData[fieldName as keyof FormData]?.trim() === '';
  };

  /**
   * Obtener mensaje de error específico para cada campo
   */
  const getFieldErrorMessage = (fieldName: keyof TouchedFields): string => {
    if (!touchedFields[fieldName]) return '';

    if (fieldName === 'birthDate') {
      return birthDate === null ? t('contact.requiredField') : '';
    }

    const fieldValue = formData[fieldName as keyof FormData];
    if (!fieldValue || fieldValue.trim() === '') {
      return t('contact.requiredField');
    }

    // Validaciones específicas
    if (fieldName === 'email' && !isEmailValid(fieldValue)) {
      return t('contact.errorInvalidEmail');
    }

    if (fieldName === 'telefono' && !isPhoneValid(fieldValue)) {
      return t('contact.errorInvalidPhone');
    }

    return '';
  };

  /**
   * Formatear fecha para mostrar
   */
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Actualizar un campo del formulario
   */
  const updateField = (fieldName: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  /**
   * Marcar un campo como tocado
   */
  const markFieldAsTouched = (fieldName: keyof TouchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  /**
   * Manejar envío del formulario
   */
  const handleSubmit = () => {
    // Marcar todos los campos como tocados para mostrar errores
    setTouchedFields({
      nombre: true,
      birthDate: true,
      ciudad: true,
      email: true,
      telefono: true,
    });

    if (!isFormValid()) {
      return;
    }

    // Validación exitosa
    alert(
      `${t('contact.successTitle')}\n\n` +
        `${t('contact.successName')}: ${formData.nombre}\n` +
        `${t('contact.successBirthdate')}: ${birthDate ? formatDate(birthDate) : ''}\n` +
        `${t('contact.successCity')}: ${formData.ciudad}\n` +
        `${t('contact.successEmail')}: ${formData.email}\n` +
        `${t('contact.successPhone')}: ${formData.telefono}\n` +
        `${t('contact.willHireMe')}: ${willHireMe ? t('contact.yes') : t('contact.no')}`
    );
  };

  /**
   * Cerrar el DatePicker cuando se empieza a hacer scroll (solo en iOS)
   */
  const handleScrollBegin = () => {
    if (isDatePickerOpen && Platform.OS === 'ios') {
      setIsDatePickerOpen(false);
    }
  };

  return {
    // Estado del formulario
    formData,
    birthDate,
    willHireMe,
    isDatePickerOpen,
    touchedFields,
    showConfetti,

    // Setters
    setBirthDate,
    setWillHireMe,
    setIsDatePickerOpen,
    updateField,
    markFieldAsTouched,

    // Validaciones
    isFormValid: isFormValid(),
    hasFieldError,
    getFieldErrorMessage,

    // Acciones
    handleSubmit,
    handleScrollBegin,
  };
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { es } from './es';

// Configuración de i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      es,
    },
    lng: 'en', // Idioma por defecto: inglés (requisito)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
  });

export default i18n;

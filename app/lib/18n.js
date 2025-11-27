'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esTranslation from '../locales/es/translation.json';
import enTranslation from '../locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng:
      typeof window !== 'undefined'
        ? localStorage.getItem('i18nextLng') || 'es'
        : 'es',

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    resources: {
      es: { translation: esTranslation },
      en: { translation: enTranslation },
    },

    ns: ['translation'],
    defaultNS: 'translation',
    keySeparator: '.',
    nsSeparator: ':',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    debug: false,
  });

export default i18n;

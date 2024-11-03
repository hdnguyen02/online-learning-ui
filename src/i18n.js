// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationVI from './locales/vi.json';

// Các tài nguyên ngôn ngữ
const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
};

i18n
  .use(initReactI18next) // kết nối i18next với React
  .init({
    resources,
    lng: 'vi', // ngôn ngữ mặc định
    fallbackLng: 'en', // ngôn ngữ dự phòng

    interpolation: {
      escapeValue: false // không cần thiết cho React
    }
  });

export default i18n;

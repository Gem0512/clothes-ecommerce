import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import file JSON cho các ngôn ngữ
import translationEN from './locales/en.json'
import translationVI from './locales/vi.json';

// Cấu hình các resources cho ngôn ngữ
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

// Cấu hình i18n
i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next) // Kết nối với React
  .init({
    resources,
    fallbackLng: 'en', // Ngôn ngữ mặc định
    debug: true, // Để debug nếu cần
    interpolation: {
      escapeValue: false, // React đã xử lý escaping
    },
  });

export default i18n;

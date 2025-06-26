// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// كل الترجمات ستكون هنا مباشرة (Frontend فقط)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React",
      "Medications": "Medications",
      "Our Products": "Our Products"
    }
  },
  ar: {
    translation: {
      "Welcome to React": "مرحبًا بك في React",
      "Medications": "الأدوية",
      "Our Products": "منتجاتنا"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources, // نستخدم الموارد المضمنة
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en", // اللغة الاحتياطية
    interpolation: {
      escapeValue: false
    },
    // لحفظ إعدادات اللغة
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    }
  });

export default i18n;
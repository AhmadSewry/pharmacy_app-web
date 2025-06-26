// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// كل الترجمات ستكون هنا مباشرة (Frontend فقط)
const resources = {
  en: {
    translation: {
      Medicines: "Medicines",
      PharmaCore: "PharmaCore",
      "Our Products": "Our Products",
      "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency.":
        "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency.",
      "Add to Cart": "Add to Cart",
      " “The tools, the meds, the control — — all in one place.”":
        " “The tools, the meds, the control — — all in one place.”",
      "Welcome to our Pharmacy App.": "Welcome to our Pharmacy App.",
      "Where pharmacy meets simplicity.": "Where pharmacy meets simplicity.",
    },
  },
  ar: {
    translation: {
      PharmaCore: "نواة الصيدلية",
      "Our Products": "منتجاتنا",
      "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency.":
        ".منصة ذكية لإدارة الأدوية والمخزون بسهولة، مصممة خصيصًا لأصحاب ومديري الصيدليات – تحكم كامل، كفاءة أعلى",
      "Add to Cart": "اضافة الى السلة",
      " “The tools, the meds, the control — — all in one place.”":
        "الأدوات والأدوية والتحكم كلها في مكان واحد",
      "Welcome to our Pharmacy App.": "مرحبا بك في تطبيقنا لادارة الصيدلية",
      "Where pharmacy meets simplicity.": "هنا حيث تلتقي الصيدلية بالبساطة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources, // نستخدم الموارد المضمنة
  lng: "en", // اللغة الافتراضية
  fallbackLng: "en", // اللغة الاحتياطية
  interpolation: {
    escapeValue: false,
  },
  // لحفظ إعدادات اللغة
  detection: {
    order: ["localStorage"],
    caches: ["localStorage"],
  },
});

export default i18n;

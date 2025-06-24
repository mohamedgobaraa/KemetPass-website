import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { welcome: "Welcome to our app!", changeLanguage: "Change Language" } },
      ar: { translation: { welcome: "مرحبًا بك في تطبيقنا!", changeLanguage: "تغيير اللغة" } }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    debug: true,
  });

export default i18n;


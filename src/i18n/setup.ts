import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruAuth from "./ru/auth.json";
import ruProfile from "./ru/profile.json";
import enAuth from "./en/auth.json";
import enProfile from "./en/profile.json";

// Определяем язык браузера или используем ru по умолчанию
const language = navigator.language.startsWith("ru") ? "ru" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { auth: ruAuth, profile: ruProfile },
      en: { auth: enAuth, profile: enProfile },
    },
    lng: language,
    fallbackLng: "en",
    ns: ["auth", "profile"],
    defaultNS: "auth",
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
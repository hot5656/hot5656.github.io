import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import zhTW from './locales/zh-TW.json';

const PREFERRED_LOCALE_KEY = 'preferredLocale';

const resources = {
  en: { translation: en },
  'zh-TW': { translation: zhTW },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-TW'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: PREFERRED_LOCALE_KEY,
      convertDetectedLanguage: (lng: string) => {
        if (lng.toLowerCase().startsWith('zh')) {
          return 'zh-TW';
        }
        return lng;
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const SUPPORTED_LOCALES = ['en', 'zh-TW'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const getPreferredLocale = (): SupportedLocale => {
  const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }

  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) {
    return 'zh-TW';
  }

  return 'en';
};

export const setPreferredLocale = (locale: SupportedLocale) => {
  localStorage.setItem(PREFERRED_LOCALE_KEY, locale);
  i18n.changeLanguage(locale);
};

export const getLocalePrefix = (locale: string): string => {
  return locale === 'en' ? '' : '/zh-tw';
};

export const getLocaleFromPath = (pathname: string): SupportedLocale => {
  if (pathname.startsWith('/zh-tw')) {
    return 'zh-TW';
  }
  return 'en';
};

export const removeLocalePrefix = (pathname: string): string => {
  return pathname.replace(/^\/(zh-tw)/, '') || '/';
};

export const addLocalePrefix = (path: string, locale: SupportedLocale): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const prefix = getLocalePrefix(locale);
  return `${prefix}${cleanPath}`;
};

export default i18n;

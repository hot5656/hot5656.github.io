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
      order: ['path', 'navigator', 'localStorage'],  // 新增 path 優先偵測
      caches: ['localStorage'],
      lookupLocalStorage: PREFERRED_LOCALE_KEY,
      lookupPath: 'path',  // 從 URL path 偵測 locale
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

// 改進：綜合 path、storage、navigator
export const getPreferredLocale = (pathname: string = window.location.pathname): SupportedLocale => {
  // 1. 先從 path 判斷
  if (pathname.startsWith('/zh-tw')) return 'zh-TW';
  
  const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }

  // 3. 自動 navigator
  const browserLang = navigator.language.toLowerCase();
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
  return pathname.replace(/^\/zh-tw/, '') || '/';
};

export const addLocalePrefix = (path: string, locale: SupportedLocale): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const prefix = getLocalePrefix(locale);
  return `${prefix ? '/' + prefix : ''}/${cleanPath}`.replace('//', '/');
};

export const redirectToLocale = (pathname: string): string => {
  const locale = getPreferredLocale(pathname);
  return addLocalePrefix(removeLocalePrefix(pathname), locale);
};

export default i18n;




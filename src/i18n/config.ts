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
      order: ['path', 'navigator', 'localStorage'],  // path > navigator > storage
      caches: ['localStorage'],
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

// 🔥 方案2：navigator 優先 localStorage！
export const getPreferredLocale = (pathname: string = window.location.pathname): SupportedLocale => {
  // console.log('🔍 getPreferredLocale START:', { pathname, navigator: navigator.language });
  
  // 1. path 最高優先
  if (pathname.startsWith('/zh-tw')) {
    // console.log('✅ Path: zh-TW');
    return 'zh-TW';
  }
  
  // 2. navigator 自動偵測（比 localStorage 優先！）
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) {
    // console.log('✅ AUTO DETECT zh-TW!');
    return 'zh-TW';
  }
  
  // 3. 最後才用 localStorage（使用者手動選擇）
  const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    // console.log('✅ Use stored:', stored);
    return stored as SupportedLocale;
  }
  
  // console.log('❌ Fallback en');
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
  return pathname.replace(/^\/zh-tw/i, '') || '/';
};

export const addLocalePrefix = (path: string, locale: SupportedLocale): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const prefix = getLocalePrefix(locale);
  return prefix ? `/${prefix}/${cleanPath}`.replace('//', '/') : `/${cleanPath}`;
};

export const resetPreferredLocale = (): void => {
  localStorage.removeItem(PREFERRED_LOCALE_KEY);
  i18n.changeLanguage(getPreferredLocale());
};

export default i18n;


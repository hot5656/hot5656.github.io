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
      order: ['navigator', 'localStorage'],  // 關鍵：首次 navigator 自動偵測，之後用 localStorage
      caches: ['localStorage'],
      lookupLocalStorage: PREFERRED_LOCALE_KEY,
      convertDetectedLanguage: (lng: string) => {  // 新增：自動轉中文
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
  // 直接依賴 i18n 偵測結果，或手動 fallback
  const detected = i18n.language as SupportedLocale || localStorage.getItem(PREFERRED_LOCALE_KEY) as SupportedLocale;
  if (detected && SUPPORTED_LOCALES.includes(detected)) {
    return detected;
  }

  const browserLang = navigator.language;
  if (browserLang.toLowerCase().startsWith('zh')) {
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

export const resetPreferredLocale = (): void => {  // 新增重置功能
  localStorage.removeItem(PREFERRED_LOCALE_KEY);
  i18n.changeLanguage(getPreferredLocale());
};

export default i18n;



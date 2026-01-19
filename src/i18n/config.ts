// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import zhTW from './locales/zh-TW.json';

const PREFERRED_LOCALE_KEY = 'preferredLocale';

export const SUPPORTED_LOCALES = ['en', 'zh-TW'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

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

    // ✅ 關鍵：避免 zh-TW 被當成 zh，導致 resolvedLanguage 掉回 en
    load: 'currentOnly', // i18next 文件有 load 行為說明 [web:33]

    interpolation: {
      escapeValue: false,
    },

    detection: {
      // ✅ path 最高（配合 /zh-tw 前綴）
      // ✅ localStorage 第二（使用者一旦選過就永遠優先）
      // ✅ navigator 最後（只在第一次、或沒有選過時才用）
      order: ['path', 'localStorage', 'navigator'],

      // ✅ 關鍵：不要在「自動偵測」時就寫入 localStorage
      // (caches: [] 可以防止自動持久化) [web:10]
      caches: [],

      lookupLocalStorage: PREFERRED_LOCALE_KEY,

      // 把任何 zh* 都統一成 zh-TW
      convertDetectedLanguage: (lng: string) => {
        if (!lng) return 'en';
        if (lng.toLowerCase().startsWith('zh')) return 'zh-TW';
        return lng;
      },
    },
  });

// （可留可刪）偵錯用
i18n.on('languageChanged', (lng) => {
  console.log('🌐 Language changed:', lng);
});

export const getPreferredLocale = (
  pathname: string = window.location.pathname
): SupportedLocale => {
  // 1) URL path 最高優先
  if (pathname.toLowerCase().startsWith('/zh-tw')) return 'zh-TW';

  // 2) 使用者選擇（只要選過就永遠優先）
  const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }

  // 3) 首次自動：navigator
  const browserLang = navigator.language?.toLowerCase() ?? '';
  if (browserLang.startsWith('zh')) return 'zh-TW';

  return 'en';
};

export const setPreferredLocale = (locale: SupportedLocale) => {
  // ✅ 只有使用者手動切換時才記住
  localStorage.setItem(PREFERRED_LOCALE_KEY, locale);
  i18n.changeLanguage(locale); // changeLanguage API [web:38]
};

export const resetPreferredLocale = (): void => {
  localStorage.removeItem(PREFERRED_LOCALE_KEY);
  // 讓偵測器重新跑一次：會依 path/localStorage/navigator 決定
  const detected = i18n.services?.languageDetector?.detect?.();
  const next = (Array.isArray(detected) ? detected[0] : detected) as string | undefined;
  i18n.changeLanguage(next || 'en');
};

export const getLocalePrefix = (locale: string): string => {
  return locale === 'en' ? '' : '/zh-tw';
};

export const getLocaleFromPath = (pathname: string): SupportedLocale => {
  if (pathname.toLowerCase().startsWith('/zh-tw')) return 'zh-TW';
  return 'en';
};

export const removeLocalePrefix = (pathname: string): string => {
  return pathname.replace(/^\/zh-tw/i, '') || '/';
};

export const addLocalePrefix = (path: string, locale: SupportedLocale): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const prefix = getLocalePrefix(locale);
  // prefix 已經包含 '/'，這裡避免變成 '//'
  return prefix ? `${prefix}/${cleanPath}`.replace(/\/{2,}/g, '/') : `/${cleanPath}`;
};

export default i18n;



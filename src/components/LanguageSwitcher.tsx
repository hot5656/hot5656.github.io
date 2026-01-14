import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { setPreferredLocale, getLocaleFromPath, removeLocalePrefix, addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocale = i18n.language as SupportedLocale;

  const switchLanguage = (locale: SupportedLocale) => {
    if (locale === currentLocale) return;

    setPreferredLocale(locale);

    const currentPath = removeLocalePrefix(location.pathname);
    const newPath = addLocalePrefix(currentPath, locale);

    navigate(newPath + location.search + location.hash);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{currentLocale === 'zh-TW' ? 'zh' : currentLocale}</span>
      </button>

      <div className="absolute right-0 mt-1 w-32 bg-white border border-stone-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <button
          onClick={() => switchLanguage('en')}
          className={`block w-full text-left px-4 py-2 text-sm hover:bg-stone-50 transition-colors ${
            currentLocale === 'en' ? 'text-stone-900 font-medium' : 'text-stone-600'
          }`}
        >
          English
        </button>
        <button
          onClick={() => switchLanguage('zh-TW')}
          className={`block w-full text-left px-4 py-2 text-sm hover:bg-stone-50 transition-colors ${
            currentLocale === 'zh-TW' ? 'text-stone-900 font-medium' : 'text-stone-600'
          }`}
        >
          繁體中文
        </button>
      </div>
    </div>
  );
}

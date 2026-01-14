import { useTranslation } from 'react-i18next';
import { addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function useLocalePath() {
  const { i18n } = useTranslation();

  return (path: string) => addLocalePrefix(path, i18n.language as SupportedLocale);
}

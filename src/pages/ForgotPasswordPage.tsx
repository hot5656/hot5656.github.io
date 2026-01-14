import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { Mail, ArrowLeft } from 'lucide-react';
import { addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { t, i18n } = useTranslation();

  const localePath = (path: string) => addLocalePrefix(path, i18n.language as SupportedLocale);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${localePath('/reset-password')}`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || t('forgotPassword.sendFailed'));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-light text-stone-900 mb-2">
              {t('forgotPassword.successTitle')}
            </h1>
            <p className="text-sm text-stone-600">
              {t('forgotPassword.successMessage')}
            </p>
            <p className="text-sm font-medium text-stone-900 mt-2">
              {email}
            </p>
          </div>

          <div className="bg-stone-50 rounded-md p-4 mb-6">
            <p className="text-sm text-stone-700 leading-relaxed">
              {t('forgotPassword.successNote')}
            </p>
          </div>

          <Link
            to={localePath('/login')}
            className="block w-full px-4 py-2.5 bg-stone-900 text-white text-center rounded-md hover:bg-stone-800 transition-colors font-medium"
          >
            {t('forgotPassword.returnToLogin')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 text-white rounded-full mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-light text-stone-900">
            {t('forgotPassword.title')}
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            {t('forgotPassword.subtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
              {t('forgotPassword.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
              placeholder={t('forgotPassword.emailPlaceholder')}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? t('forgotPassword.sendButtonLoading') : t('forgotPassword.sendButton')}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-200">
          <Link
            to={localePath('/login')}
            className="flex items-center justify-center text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('forgotPassword.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
}

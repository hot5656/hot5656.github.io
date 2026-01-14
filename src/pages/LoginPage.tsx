import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus } from 'lucide-react';
import { addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const localePath = (path: string) => addLocalePrefix(path, i18n.language as SupportedLocale);

  useEffect(() => {
    checkAdmin();
  }, [navigate]);

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const isAdmin = await checkIsAdmin(session.user.email!);
      if (isAdmin) {
        navigate(localePath('/admin'));
      }
    }
  }

  async function checkIsAdmin(userEmail: string): Promise<boolean> {
    const { data } = await supabase
      .from('roberthut_site_settings')
      .select('admin_emails')
      .single();

    if (!data?.admin_emails) return false;

    const adminEmails = data.admin_emails as string[];
    return adminEmails.includes(userEmail);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        const isAdmin = await checkIsAdmin(email);

        if (!isAdmin) {
          setError(t('login.noAdminPermission'));
          setLoading(false);
          return;
        }

        setSuccess(t('login.signupSuccess'));

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        navigate(localePath('/admin'));
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        const isAdmin = await checkIsAdmin(data.user.email!);

        if (!isAdmin) {
          await supabase.auth.signOut();
          throw new Error(t('login.noAdminPermission'));
        }

        navigate(localePath('/admin'));
      }
    } catch (err: any) {
      setError(err.message || (isSignUp ? t('login.signupFailed') : t('login.loginFailed')));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 text-white rounded-full mb-4">
            {isSignUp ? <UserPlus className="w-8 h-8" /> : <LogIn className="w-8 h-8" />}
          </div>
          <h1 className="text-2xl font-light text-stone-900">
            {isSignUp ? t('login.signupTitle') : t('login.title')}
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            {isSignUp ? t('login.signupSubtitle') : t('login.subtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
              {t('login.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
              placeholder={t('login.emailPlaceholder')}
              required
              disabled={loading}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                {t('login.password')} {isSignUp && <span className="text-stone-500 font-normal">{t('login.passwordHint')}</span>}
              </label>
              {!isSignUp && (
                <Link
                  to={localePath('/forgot-password')}
                  className="text-xs text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {t('login.forgotPassword')}
                </Link>
              )}
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (isSignUp ? t('login.signupButtonLoading') : t('login.loginButtonLoading')) : (isSignUp ? t('login.signupButton') : t('login.loginButton'))}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
            }}
            className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
            disabled={loading}
          >
            {isSignUp ? t('login.toggleLogin') : t('login.toggleSignup')}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200 text-center">
          <Link
            to={localePath('/')}
            className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            {t('login.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

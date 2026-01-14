import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Settings, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { LanguageSwitcher } from './LanguageSwitcher';
import { addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function Layout() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const localePath = (path: string) => addLocalePrefix(path, i18n.language as SupportedLocale);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate(localePath('/'));
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to={localePath('/')} className="group flex items-center gap-3 hover:opacity-80 transition-opacity">

            <div className="rounded-lg group-hover:shadow-lg transition-shadow bg-white">
              <img
                src="/Robert_hut_512_nb.png"
                alt="Robert hut"
                className="w-14 h-14"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight text-stone-900">
                Robert hut
              </span>
              <span className="text-base text-stone-500 tracking-wide">
                n8n, code & AI
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to={localePath('/')}
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link
              to={localePath('/about')}
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              <User className="w-4 h-4" />
              <span>{t('nav.about')}</span>
            </Link>
            {isAdmin && (
              <>
                <Link
                  to={localePath('/admin')}
                  className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
                >
                  <Settings className="w-4 h-4" />
                  <span>{t('nav.admin')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-red-600 transition-colors font-medium"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('nav.logout')}</span>
                </button>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} Robert hut. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/profile.php?id=61585313653246" className="hover:text-stone-900 transition-colors">Facebook</a>
              <a href="https://github.com/hot5656" className="hover:text-stone-900 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/robert-kao-48ab8a125/" className="hover:text-stone-900 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

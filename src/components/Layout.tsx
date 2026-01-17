import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Settings, User, LogOut, Wrench, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { LanguageSwitcher } from './LanguageSwitcher';
import { addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function Layout() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const localePath = (path: string) => addLocalePrefix(path, i18n.language as SupportedLocale);

  const isActivePath = (path: string) => {
    const currentPath = location.pathname.replace(/^\/(en|zh-TW)/, '') || '/';
    const targetPath = path;
    if (path === '/blog') {
      return currentPath === '/' || currentPath === '/blog';
    }
    return currentPath === targetPath || (path !== '/' && currentPath.startsWith(targetPath));
  };

  async function handleLogout() {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch (error) {
      console.error('Logout error:', error);
    }
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
              to={localePath('/blog')}
              className={`flex items-center gap-1.5 text-sm transition-colors font-medium px-3 py-2 rounded-lg ${
                isActivePath('/blog')
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link
              to={localePath('/tools')}
              className={`flex items-center gap-1.5 text-sm transition-colors font-medium px-3 py-2 rounded-lg ${
                isActivePath('/tools')
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{t('nav.tools')}</span>
            </Link>
            <Link
              to={localePath('/portfolio')}
              className={`flex items-center gap-1.5 text-sm transition-colors font-medium px-3 py-2 rounded-lg ${
                isActivePath('/portfolio')
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('nav.portfolio')}</span>
            </Link>
            <Link
              to={localePath('/about')}
              className={`flex items-center gap-1.5 text-sm transition-colors font-medium px-3 py-2 rounded-lg ${
                isActivePath('/about')
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t('nav.about')}</span>
            </Link>
            {isAdmin && (
              <>
                <Link
                  to={localePath('/admin')}
                  className={`flex items-center gap-1.5 text-sm transition-colors font-medium px-3 py-2 rounded-lg ${
                    isActivePath('/admin')
                      ? 'bg-stone-200 text-stone-900'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>{t('nav.admin')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-red-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-stone-100"
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

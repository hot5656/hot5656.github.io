import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Settings, User, LogOut, Wrench, Briefcase, Facebook, Github, Linkedin, Instagram, FileStack, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { LanguageSwitcher } from './LanguageSwitcher';
import { addLocalePrefix, type SupportedLocale } from '../i18n/config';

export function Layout() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n, ready } = useTranslation();  // 🔥 加 ready
  // 2026/01/19: add debug page tw error
  // console.log('i18n.language=', i18n.language);
  // console.log('resolvedLanguage=', i18n.resolvedLanguage);
  // console.log('nav.home=', t('nav.home'));
  
  // 🔥 加這行 debug
  // console.log('🔥 Layout Debug:', {
  //  pathname: location.pathname,
  //  i18n_language: i18n.language,
  //  ready,
  //  t_nav_home: t('nav.home'),
  //  t_nav_tools: t('nav.tools')
  // });

  const [menuOpen, setMenuOpen] = useState(false);

  // 換頁後自動收起手機選單
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // 🔥 等待 i18n 準備好
  if (!ready) return <div>Loading...</div>;
  
  const localePath = (path: string) => addLocalePrefix(path, i18n.language as SupportedLocale);

  // 只改 isActivePath
  const isActivePath = (path: string) => {
    const currentPath = location.pathname.replace(/^\/(en|zh-tw|zh-TW)/i, '') || '/';
    const targetPath = path.replace(/^\/(en|zh-tw|zh-TW)/i, '') || '/';
    if (targetPath === '/blog') {
      return currentPath === '/' || currentPath === '/blog';
    } 
    return currentPath === targetPath || (targetPath !== '/' && currentPath.startsWith(targetPath));
  };

  async function handleLogout() {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    navigate(localePath('/'));
  }

  const navItems = [
    { path: '/blog', icon: Home, label: t('nav.home') },
    { path: '/tools', icon: Wrench, label: t('nav.tools') },
    { path: '/portfolio', icon: Briefcase, label: t('nav.portfolio') },
    { path: '/about', icon: User, label: t('nav.about') },
    ...(isAdmin ? [{ path: '/admin', icon: Settings, label: t('nav.admin') }] : []),
  ];

  // 桌機（lg 以上）橫排；手機與平板收進漢堡選單、改直排
  const renderNavLinks = (mobile: boolean) => (
    <>
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={localePath(path)}
          className={`flex items-center gap-1.5 text-sm transition-colors font-medium rounded-lg ${
            mobile ? 'px-3 py-3' : 'px-3 py-2'
          } ${
            isActivePath(path)
              ? 'bg-stone-200 text-stone-900'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </Link>
      ))}
      {isAdmin && (
        <button
          onClick={handleLogout}
          className={`flex items-center gap-1.5 text-sm text-stone-600 hover:text-red-600 transition-colors font-medium rounded-lg hover:bg-stone-100 ${
            mobile ? 'px-3 py-3' : 'px-3 py-2'
          }`}
          title={t('nav.logout')}
        >
          <LogOut className="w-4 h-4" />
          <span>{t('nav.logout')}</span>
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-3 lg:py-6 flex items-center justify-between gap-4">
          <Link to={localePath('/blog')} className="group flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
            <div className="rounded-lg group-hover:shadow-lg transition-shadow bg-white">
              <img
                src="/Robert_hut_512_nb.png"
                alt="Robert hut"
                className="w-10 h-10 lg:w-14 lg:h-14"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-semibold tracking-tight text-stone-900 whitespace-nowrap">
                Robert hut
              </span>
              <span className="text-sm lg:text-base text-stone-500 tracking-wide whitespace-nowrap">
                n8n, code & AI
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {renderNavLinks(false)}
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden p-2 -mr-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="lg:hidden border-t border-stone-200 px-4 sm:px-6 py-3 flex flex-col gap-1">
            {renderNavLinks(true)}
            <div className="pt-2 mt-1 border-t border-stone-100">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} Robert hut. All rights reserved.</p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61585313653246"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0866FF] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            
              <a
                href="https://github.com/hot5656"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            
              <a
                href="https://www.linkedin.com/in/robert-kao-48ab8a125/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            
              <a
                href="https://www.instagram.com/roberthut.lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            
              <a
                href="https://substack.com/@roberthut"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF7731] transition-colors"
                aria-label="Substack"
              >
                <FileStack className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


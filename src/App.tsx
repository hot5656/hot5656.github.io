import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ToolsPage } from './pages/ToolsPage';
import PortfolioPage from './pages/PortfolioPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AdminPage } from './pages/AdminPage';
import { PostEditorPage } from './pages/PostEditorPage';
import { BioEditorPage } from './pages/BioEditorPage';
import { ImageLibraryPage } from './pages/ImageLibraryPage';
import { getPreferredLocale, getLocaleFromPath, addLocalePrefix, removeLocalePrefix } from './i18n/config';

function LocaleSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathLocale = getLocaleFromPath(window.location.pathname);
    const preferredLocale = getPreferredLocale(window.location.pathname);
    const targetLocale = pathLocale || preferredLocale;  // path 優先，無則自動偵測
    
    if (i18n.language !== targetLocale) {
      i18n.changeLanguage(targetLocale);
    }
  }, [i18n]);

  return null;
}

// 新增：根路徑自動導向邏輯
function RootRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('🚀 RootRedirect ALWAYS:', location.pathname);  // 永遠印
    if (location.pathname === '/') {
      const locale = getPreferredLocale('/');  // 自動偵測 navigator -> zh-TW
      const targetPath = addLocalePrefix('/blog', locale);
      console.log('🔍 RootRedirect:', { pathname: location.pathname, locale, targetPath, navigator: navigator.language });
      navigate(targetPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <LocaleSync />
      <RootRedirect />
      <Routes>
        {/* 統一 :locale? 動態路由，取代重複定義 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/blog" replace />} />
          <Route path="blog" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="post/:slug" element={<PostDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="admin/new" element={<ProtectedRoute><PostEditorPage /></ProtectedRoute>} />
          <Route path="admin/edit/:id" element={<ProtectedRoute><PostEditorPage /></ProtectedRoute>} />
          <Route path="admin/bio" element={<ProtectedRoute><BioEditorPage /></ProtectedRoute>} />
          <Route path="admin/images" element={<ProtectedRoute><ImageLibraryPage /></ProtectedRoute>} />
        </Route>
        
        {/* zh-tw 明確路由（backup） */}
        <Route path="/zh-tw/*" element={<Layout />}>
          <Route index element={<Navigate to="/zh-tw/blog" replace />} />
          <Route path="blog" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="tools" element={<ToolsPage />} />
          {/* ... 其他相同 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


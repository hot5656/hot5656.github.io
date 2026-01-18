import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n/config';  // 🔥 import i18n
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
import { getPreferredLocale, getLocaleFromPath, addLocalePrefix } from './i18n/config';

function LocaleSync() {
  const { i18n, ready } = useTranslation();

  useEffect(() => {
    if (!ready) return;
    const pathLocale = getLocaleFromPath(window.location.pathname);
    const preferredLocale = getPreferredLocale(window.location.pathname);
    const targetLocale = pathLocale || preferredLocale;
    if (i18n.language !== targetLocale) {
      i18n.changeLanguage(targetLocale);
    }
  },  [i18n, ready]);  // 🔥 加 ready

  return null;
}

// 根路徑自動導向 zh-TW（只執行一次）
function RootRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const locale = getPreferredLocale('/');
      const targetPath = addLocalePrefix('/blog', locale);
      navigate(targetPath, { replace: true });
    }
  }, []);  // 空依賴，只首次執行

  return null;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>  {/* 🔥 最外層包 */}
      <BrowserRouter>
        <LocaleSync />
        <RootRedirect />
        <Routes>
          {/* 通用路由 (英文預設) */}
          <Route path="/" element={<Layout />}>
            {/* 🔥 移除 index Navigate，由 RootRedirect 處理 */}
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
  
          {/* 中文明確路由 */}
          <Route path="/zh-tw" element={<Layout />}>
            <Route index element={<Navigate to="/zh-tw/blog" replace />} />
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
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;



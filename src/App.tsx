import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ToolsPage } from './pages/ToolsPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AdminPage } from './pages/AdminPage';
import { PostEditorPage } from './pages/PostEditorPage';
import { BioEditorPage } from './pages/BioEditorPage';
import { ImageLibraryPage } from './pages/ImageLibraryPage';
import { getLocaleFromPath } from './i18n/config';

function LocaleSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const locale = getLocaleFromPath(window.location.pathname);
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <LocaleSync />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
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

        <Route path="/zh-tw" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
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
  );
}

export default App;

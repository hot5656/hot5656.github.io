import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { PostEditorPage } from './pages/PostEditorPage';
import { BioEditorPage } from './pages/BioEditorPage';
import { ImageLibraryPage } from './pages/ImageLibraryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="post/:slug" element={<PostDetailPage />} />
          <Route path="login" element={<LoginPage />} />
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

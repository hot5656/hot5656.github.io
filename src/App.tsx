import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PostDetailPage } from './pages/PostDetailPage';
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
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/new" element={<PostEditorPage />} />
          <Route path="admin/edit/:id" element={<PostEditorPage />} />
          <Route path="admin/bio" element={<BioEditorPage />} />
          <Route path="admin/images" element={<ImageLibraryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

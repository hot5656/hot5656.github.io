import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Settings, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import ProjectModal from '../components/ProjectModal';

interface Project {
  id: string;
  name_zh: string;
  name_en: string;
  desc_zh: string;
  desc_en: string;
  url: string;
  status_zh: string;
  status_en: string;
  order_num: number;
}

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [ogImages, setOgImages] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const isZh = i18n.language === 'zh-TW';

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('roberthut_projects')
        .select('*')
        .order('order_num', { ascending: true });

      if (error) throw error;

      setProjects(data || []);

      if (data) {
        data.forEach(project => {
          fetchOGImage(project.url, project.id);
        });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOGImage(url: string, projectId: string) {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-og-image?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success && data.url) {
        setOgImages(prev => ({ ...prev, [projectId]: data.url }));
      }
    } catch (error) {
      console.error('Error fetching OG image:', error);
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setShowModal(true);
  }

  function handleAdd() {
    setEditingProject(null);
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
    setEditingProject(null);
    fetchProjects();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {isZh ? '作品集' : 'Portfolio'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isZh ? '我的專案與作品展示' : 'My projects and creations'}
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              {isZh ? '新增專案' : 'Add Project'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
                {ogImages[project.id] ? (
                  <img
                    src={ogImages[project.id]}
                    alt={isZh ? project.name_zh : project.name_en}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-20 h-20 bg-white/20 dark:bg-black/20 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-10 h-10 text-white/60" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isZh ? project.name_zh : project.name_en}
                  </h3>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={isZh ? '編輯' : 'Edit'}
                    >
                      <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                  <ReactMarkdown>
                    {isZh ? project.desc_zh : project.desc_en}
                  </ReactMarkdown>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    {isZh ? project.status_zh : project.status_en}
                  </span>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {isZh ? '開啟' : 'Open'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {isZh ? '目前沒有專案' : 'No projects yet'}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

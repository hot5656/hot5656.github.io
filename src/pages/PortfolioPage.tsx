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
  thumbnail_url?: string;
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
          if (!project.thumbnail_url) {
            fetchOGImage(project.url, project.id);
          }
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            {isZh ? '作品集' : 'Portfolio'}
          </h1>
          <p className="text-lg text-stone-600">
            {isZh ? '我的專案與作品展示' : 'My projects and creations'}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {isZh ? '新增專案' : 'Add Project'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-stone-300 transition-colors"
          >
            <div className="relative w-full bg-stone-100 overflow-hidden" style={{ aspectRatio: '1200/630' }}>
              {(project.thumbnail_url || ogImages[project.id]) ? (
                <img
                  src={project.thumbnail_url || ogImages[project.id]}
                  alt={isZh ? project.name_zh : project.name_en}
                  className="w-full h-full object-contain group-hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ExternalLink className="w-12 h-12 text-stone-300" />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-light text-stone-900">
                  {isZh ? project.name_zh : project.name_en}
                </h3>
                {isAdmin && (
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 hover:bg-stone-100 rounded-md transition-colors"
                    title={isZh ? '編輯' : 'Edit'}
                  >
                    <Settings className="w-4 h-4 text-stone-400" />
                  </button>
                )}
              </div>

              <div className="text-stone-700 leading-relaxed mb-4 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:space-y-1 [&_p]:mb-2 [&_h1]:text-xl [&_h1]:font-medium [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mb-2 [&_strong]:font-semibold [&_em]:italic [&_a]:text-stone-900 [&_a]:underline [&_a:hover]:text-stone-600">
                <ReactMarkdown>
                  {isZh ? project.desc_zh : project.desc_en}
                </ReactMarkdown>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <span className="text-sm text-stone-500">
                  {isZh ? project.status_zh : project.status_en}
                </span>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-stone-900 hover:text-stone-600 transition-colors"
                >
                  {isZh ? '開啟' : 'Open'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
          <p className="text-stone-400 text-lg">
            {isZh ? '目前沒有專案' : 'No projects yet'}
          </p>
        </div>
      )}

      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

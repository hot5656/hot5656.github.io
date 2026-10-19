import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';

  const [formData, setFormData] = useState({
    name_zh: '',
    name_en: '',
    desc_zh: '',
    desc_en: '',
    url: '',
    status_zh: '',
    status_en: '',
    order_num: 0,
    thumbnail_url: '',
  });

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showManageOrder, setShowManageOrder] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({
        name_zh: project.name_zh,
        name_en: project.name_en,
        desc_zh: project.desc_zh,
        desc_en: project.desc_en,
        url: project.url,
        status_zh: project.status_zh,
        status_en: project.status_en,
        order_num: project.order_num,
        thumbnail_url: project.thumbnail_url || '',
      });
    }
    fetchAllProjects();
  }, [project]);

  async function fetchAllProjects() {
    try {
      const { data, error } = await supabase
        .from('roberthut_projects')
        .select('*')
        .order('order_num', { ascending: false });

      if (error) throw error;
      setAllProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (project) {
        const { error } = await supabase
          .from('roberthut_projects')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', project.id);

        if (error) throw error;
      } else {
        const maxOrder = allProjects.reduce((max, p) => Math.max(max, p.order_num), 0);

        const { error } = await supabase
          .from('roberthut_projects')
          .insert([{
            ...formData,
            order_num: maxOrder + 1,
          }]);

        if (error) throw error;
      }

      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      alert(isZh ? '儲存失敗' : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!project) return;

    if (!confirm(isZh ? '確定要刪除此專案？' : 'Delete this project?')) {
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('roberthut_projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;
      onClose();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(isZh ? '刪除失敗' : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  }

  async function updateProjectOrder(newProjects: Project[]) {
    try {
      // 列表由新到舊顯示，最上面的專案 order_num 最大
      const updates = newProjects.map((p, index) =>
        supabase
          .from('roberthut_projects')
          .update({ order_num: newProjects.length - index })
          .eq('id', p.id)
      );

      await Promise.all(updates);
      fetchAllProjects();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return;

    const newProjects = [...allProjects];
    const draggedItem = newProjects[draggedIndex];
    newProjects.splice(draggedIndex, 1);
    newProjects.splice(index, 0, draggedItem);

    setAllProjects(newProjects);
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    if (draggedIndex !== null) {
      updateProjectOrder(allProjects);
    }
    setDraggedIndex(null);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project ? (isZh ? '編輯專案' : 'Edit Project') : (isZh ? '新增專案' : 'Add Project')}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowManageOrder(!showManageOrder)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isZh ? '管理排序' : 'Manage Order'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {showManageOrder ? (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isZh ? '拖拉調整順序' : 'Drag to reorder'}
              </h3>
              {allProjects.map((proj, index) => (
                <div
                  key={proj.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    draggedIndex === index ? 'opacity-50' : ''
                  }`}
                >
                  <GripVertical className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {isZh ? proj.name_zh : proj.name_en}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isZh ? '中文名稱' : 'Chinese Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name_zh}
                    onChange={(e) => setFormData({ ...formData, name_zh: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isZh ? '英文名稱' : 'English Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isZh ? '縮圖網址（選填）' : 'Thumbnail URL (Optional)'}
                </label>
                <input
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://..."
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {isZh ? '若留空，系統會自動從網址抓取 OG 圖片' : 'If empty, will auto-fetch OG image from URL'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isZh ? '中文狀態' : 'Chinese Status'}
                  </label>
                  <input
                    type="text"
                    value={formData.status_zh}
                    onChange={(e) => setFormData({ ...formData, status_zh: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={isZh ? '例如：即時可用' : 'e.g., Live now'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isZh ? '英文狀態' : 'English Status'}
                  </label>
                  <input
                    type="text"
                    value={formData.status_en}
                    onChange={(e) => setFormData({ ...formData, status_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Live now"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isZh ? '中文描述 (Markdown)' : 'Chinese Description (Markdown)'}
                </label>
                <textarea
                  value={formData.desc_zh}
                  onChange={(e) => setFormData({ ...formData, desc_zh: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                  placeholder="- 功能一&#10;- 功能二"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isZh ? '英文描述 (Markdown)' : 'English Description (Markdown)'}
                </label>
                <textarea
                  value={formData.desc_en}
                  onChange={(e) => setFormData({ ...formData, desc_en: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                  placeholder="- Feature one&#10;- Feature two"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {project && !showManageOrder && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? (isZh ? '刪除中...' : 'Deleting...') : (isZh ? '刪除' : 'Delete')}
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isZh ? '取消' : 'Cancel'}
            </button>
            {!showManageOrder && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? (isZh ? '儲存中...' : 'Saving...') : (isZh ? '儲存' : 'Save')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

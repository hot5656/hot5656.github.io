import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase, UsefulLink } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export function UsefulLinksSection() {
  const [links, setLinks] = useState<UsefulLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<UsefulLink | null>(null);
  const [formData, setFormData] = useState({ name_zh: '', name_en: '', url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadLinks();

    const channel = supabase
      .channel('useful_links_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'useful_links' },
        () => {
          loadLinks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadLinks() {
    try {
      const { data, error } = await supabase
        .from('useful_links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error loading links:', error);
    } finally {
      setLoading(false);
    }
  }

  function openForm(link?: UsefulLink) {
    if (link) {
      setEditingLink(link);
      setFormData({
        name_zh: link.name_zh || '',
        name_en: link.name_en || '',
        url: link.url,
      });
    } else {
      setEditingLink(null);
      setFormData({ name_zh: '', name_en: '', url: '' });
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingLink(null);
    setFormData({ name_zh: '', name_en: '', url: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingLink) {
        const { error } = await supabase
          .from('useful_links')
          .update({
            name_zh: formData.name_zh,
            name_en: formData.name_en,
            url: formData.url,
          })
          .eq('id', editingLink.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('useful_links')
          .insert([formData]);

        if (error) throw error;
      }

      closeForm();
    } catch (error) {
      console.error('Error saving link:', error);
      alert('Failed to save link');
    } finally {
      setSubmitting(false);
    }
  }

  function openDeleteConfirm(link: UsefulLink) {
    const displayName = i18n.language === 'zh-TW'
      ? (link.name_zh || link.name_en || link.url)
      : (link.name_en || link.name_zh || link.url);
    setDeleteConfirm({ id: link.id, name: displayName });
  }

  async function handleDelete() {
    if (!deleteConfirm) return;

    try {
      const { error } = await supabase
        .from('useful_links')
        .delete()
        .eq('id', deleteConfirm.id);

      if (error) throw error;
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-stone-400">{t('tools.usefulLinks.loading')}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-stone-900">
          {t('tools.usefulLinks.title')}
        </h3>
        {isAdmin && (
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            {t('tools.usefulLinks.addLink')}
          </button>
        )}
      </div>

      {links.length === 0 ? (
        <div className="text-center py-8 text-stone-500">
          {t('tools.usefulLinks.noLinks')}
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((link) => {
            const displayName = i18n.language === 'zh-TW'
              ? (link.name_zh || link.name_en || link.url)
              : (link.name_en || link.name_zh || link.url);

            return (
              <div key={link.id} className="border border-stone-200 rounded-lg overflow-hidden hover:bg-stone-50">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-blue-600 hover:text-blue-800"
                >
                  {displayName}
                </a>
                {isAdmin && (
                  <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 flex gap-2">
                    <button
                      onClick={() => openForm(link)}
                      className="p-1 text-stone-600 hover:text-blue-600 transition-colors"
                      title={t('tools.usefulLinks.edit')}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(link)}
                      className="p-1 text-stone-600 hover:text-red-600 transition-colors"
                      title={t('tools.usefulLinks.delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900">
                {editingLink ? t('tools.usefulLinks.editLink') : t('tools.usefulLinks.addLink')}
              </h3>
              <button
                onClick={closeForm}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  {t('tools.usefulLinks.nameZh')}
                </label>
                <input
                  type="text"
                  value={formData.name_zh}
                  onChange={(e) => setFormData({ ...formData, name_zh: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  {t('tools.usefulLinks.nameEn')}
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  {t('tools.usefulLinks.url')} *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? t('tools.usefulLinks.saving') : t('tools.usefulLinks.save')}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-4 py-2 bg-stone-200 text-stone-700 rounded-md hover:bg-stone-300 transition-colors"
                >
                  {t('tools.usefulLinks.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              {t('tools.usefulLinks.confirmDelete')}
            </h3>
            <p className="text-stone-600 mb-6">
              {deleteConfirm.name}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                {t('tools.usefulLinks.delete')}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-stone-200 text-stone-700 rounded-md hover:bg-stone-300 transition-colors"
              >
                {t('tools.usefulLinks.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

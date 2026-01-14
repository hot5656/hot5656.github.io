import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Save, Eye, Edit3, ArrowLeft } from 'lucide-react';
import { supabase, SiteSettings } from '../lib/supabase';
import { useLocalePath } from '../hooks/useLocalePath';

export function BioEditorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [settingsId, setSettingsId] = useState<string>('');
  const { t } = useTranslation();
  const localePath = useLocalePath();

  const [formData, setFormData] = useState({
    bio_title: '',
    bio_content: '',
    avatar_url: '',
  });

  useEffect(() => {
    loadBio();
  }, []);

  async function loadBio() {
    try {
      const { data, error } = await supabase
        .from('roberthut_site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettingsId(data.id);
        setFormData({
          bio_title: data.bio_title,
          bio_content: data.bio_content,
          avatar_url: data.avatar_url || '',
        });
      }
    } catch (error) {
      console.error('Error loading bio:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.bio_content.trim()) {
      alert(t('bioEditor.contentPlaceholder'));
      return;
    }

    setSaving(true);

    try {
      const bioData = {
        bio_title: formData.bio_title.trim(),
        bio_content: formData.bio_content.trim(),
        avatar_url: formData.avatar_url.trim() || null,
      };

      const { error } = await supabase
        .from('roberthut_site_settings')
        .update(bioData)
        .eq('id', settingsId);

      if (error) throw error;

      navigate(localePath('/admin'));
    } catch (error) {
      console.error('Error saving bio:', error);
      alert(t('bioEditor.saveFailed'));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(localePath('/admin'))}
          className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('postDetail.backToHome').replace('首頁', '管理頁面').replace('Home', 'Admin')}
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
          >
            {previewMode ? (
              <>
                <Edit3 className="w-4 h-4" />
                {t('common.edit')}
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                {t('postEditor.published').includes('Published') ? 'Preview' : '預覽'}
              </>
            )}
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? t('bioEditor.saveButtonLoading') : t('bioEditor.saveButton')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!previewMode ? (
          <>
            <div>
              <label htmlFor="bio_title" className="block text-sm font-medium text-stone-700 mb-2">
                {t('postEditor.title')}
              </label>
              <input
                type="text"
                id="bio_title"
                value={formData.bio_title}
                onChange={(e) => setFormData({ ...formData, bio_title: e.target.value })}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                placeholder={t('about.title')}
              />
            </div>

            <div>
              <label htmlFor="avatar_url" className="block text-sm font-medium text-stone-700 mb-2">
                {t('postEditor.coverImage').replace('封面圖片', '頭像圖片').replace('Cover Image', 'Avatar Image')}
              </label>
              <input
                type="url"
                id="avatar_url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div>
              <label htmlFor="bio_content" className="block text-sm font-medium text-stone-700 mb-2">
                {t('bioEditor.content')}
              </label>
              <textarea
                id="bio_content"
                value={formData.bio_content}
                onChange={(e) => setFormData({ ...formData, bio_content: e.target.value })}
                rows={20}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono text-sm resize-y"
                placeholder={t('bioEditor.contentPlaceholder')}
                required
              />
            </div>
          </>
        ) : (
          <div className="bg-white border border-stone-200 rounded-xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {formData.avatar_url && (
                <img
                  src={formData.avatar_url}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="prose prose-stone max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.bio_content || `*${t('about.noBio').replace('尚無個人簡介。', '尚無內容').replace('No bio available yet.', 'No content')}*`}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

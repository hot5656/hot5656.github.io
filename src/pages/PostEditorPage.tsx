import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Save, Eye, Edit3, ArrowLeft, Upload, X, Image as ImageIcon, Link, Pencil } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ImageGallery } from '../components/ImageGallery';
import { useLocalePath } from '../hooks/useLocalePath';
import { MarkdownParagraph } from '../components/MarkdownParagraph';
import 'highlight.js/styles/github-dark.css';

const SLUG_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const SLUG_LENGTH = 8;

// 產生 8 碼隨機網址代碼（a-z0-9），例如 k3x9p2qa
function generateSlug() {
  const bytes = crypto.getRandomValues(new Uint8Array(SLUG_LENGTH));
  return Array.from(bytes, (b) => SLUG_CHARS[b % SLUG_CHARS.length]).join('');
}

export function PostEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [editingUrl, setEditingUrl] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const localePath = useLocalePath();

  const [formData, setFormData] = useState({
    title: '',
    // 新文章建立時產生一次短網址代碼；編輯舊文章時由 loadPost 帶入原本的 slug，不會變動
    slug: id ? '' : generateSlug(),
    content: '',
    excerpt: '',
    cover_image_url: '',
    tags: '',
    eng_title: '',
    eng_content: '',
    eng_excerpt: '',
    eng_tags: '',
    translate: 'no',
    published: false,
  });

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  async function loadPost(postId: string) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('roberthut_posts')
        .select('*')
        .eq('id', postId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt || '',
          cover_image_url: data.cover_image_url || '',
          tags: data.tags?.join(', ') || '',
          eng_title: data.eng_title || '',
          eng_content: data.eng_content || '',
          eng_excerpt: data.eng_excerpt || '',
          eng_tags: data.eng_tags?.join(', ') || '',
          translate: data.translate || 'no',
          published: data.published || false,
        });
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert(t('postEditor.loadFailed'));
    } finally {
      setLoading(false);
    }
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({ ...prev, title }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(i18n.language === 'zh-TW' ? '請選擇圖片檔案' : 'Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(i18n.language === 'zh-TW' ? '圖片大小不能超過 5MB' : 'Image size cannot exceed 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('roberthut-blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('roberthut-blog-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        cover_image_url: publicUrl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(t('imageLibrary.uploadFailed'));
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveImage() {
    setFormData(prev => ({
      ...prev,
      cover_image_url: '',
    }));
    setUrlInput('');
    setEditingUrl(false);
  }

  function handleSelectFromGallery(url: string) {
    setFormData(prev => ({
      ...prev,
      cover_image_url: url,
    }));
    setShowGallery(false);
  }

  function handleUrlSubmit() {
    if (urlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        cover_image_url: urlInput.trim(),
      }));
      setShowUrlInput(false);
      setUrlInput('');
    }
  }

  function handleEditUrl() {
    setUrlInput(formData.cover_image_url);
    setEditingUrl(true);
  }

  function handleSaveEditedUrl() {
    if (urlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        cover_image_url: urlInput.trim(),
      }));
      setEditingUrl(false);
      setUrlInput('');
    }
  }

  function handleCancelEdit() {
    setEditingUrl(false);
    setUrlInput('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      setValidationError(i18n.language === 'zh-TW' ? '請填寫標題、網址代碼和內容' : 'Please fill in title, slug, and content');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setValidationError(null);
    setSaving(true);

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const engTags = formData.eng_tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const postData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || null,
        cover_image_url: formData.cover_image_url.trim() || null,
        tags: tags.length > 0 ? tags : null,
        eng_title: formData.eng_title.trim() || null,
        eng_content: formData.eng_content.trim() || null,
        eng_excerpt: formData.eng_excerpt.trim() || null,
        eng_tags: engTags.length > 0 ? engTags : null,
        translate: formData.translate,
        published: formData.published,
      };

      if (id) {
        const { error } = await supabase
          .from('roberthut_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('roberthut_posts')
          .insert([postData]);

        if (error) throw error;
      }

      navigate(localePath('/admin'));
    } catch (error) {
      console.error('Error saving post:', error);
      setValidationError(i18n.language === 'zh-TW' ? '儲存失敗，請檢查網址代碼是否重複' : 'Save failed, please check if slug is duplicated');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="max-w-7xl mx-auto">
      {validationError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">{i18n.language === 'zh-TW' ? '無法儲存' : 'Cannot Save'}</h3>
              <p className="mt-1 text-sm text-red-700">{validationError}</p>
            </div>
            <button
              onClick={() => setValidationError(null)}
              className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(localePath('/admin'))}
          className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {i18n.language === 'zh-TW' ? '返回管理頁面' : 'Back to Admin'}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-md bg-white">
            <label htmlFor="published" className="text-sm font-medium text-stone-700 cursor-pointer">
              {i18n.language === 'zh-TW' ? '發布狀態：' : 'Status:'}
            </label>
            <select
              id="published"
              value={formData.published ? 'published' : 'draft'}
              onChange={(e) => setFormData({ ...formData, published: e.target.value === 'published' })}
              className="text-sm border-0 bg-transparent focus:ring-0 font-medium cursor-pointer"
            >
              <option value="draft">{t('admin.draft')}</option>
              <option value="published">{t('admin.published')}</option>
            </select>
          </div>

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
                {i18n.language === 'zh-TW' ? '預覽' : 'Preview'}
              </>
            )}
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? t('postEditor.saving') : t('common.save')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!previewMode ? (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-2">
                {t('postEditor.title')} *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                placeholder={t('postEditor.titlePlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {t('postEditor.coverImage')}
              </label>

              {formData.cover_image_url && !editingUrl ? (
                <div className="space-y-3">
                  <div className="relative">
                    <img
                      src={formData.cover_image_url}
                      alt={i18n.language === 'zh-TW' ? '封面預覽' : 'Cover Preview'}
                      className="w-full h-64 object-cover rounded-lg border border-stone-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-stone-600 mb-1">{i18n.language === 'zh-TW' ? '圖片網址' : 'Image URL'}</p>
                        <p className="text-xs text-stone-500 font-mono break-all">
                          {formData.cover_image_url}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleEditUrl}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-stone-300 text-stone-700 rounded hover:bg-stone-50 transition-colors shrink-0"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        {t('common.edit')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : editingUrl ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveEditedUrl();
                        } else if (e.key === 'Escape') {
                          handleCancelEdit();
                        }
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveEditedUrl}
                      className="px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
                    >
                      {t('common.save')}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2.5 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
                    >
                      {t('common.cancel')}
                    </button>
                  </div>
                  {urlInput && (
                    <div className="relative">
                      <img
                        src={urlInput}
                        alt={i18n.language === 'zh-TW' ? '預覽' : 'Preview'}
                        className="w-full h-48 object-cover rounded-lg border border-stone-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : showUrlInput ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleUrlSubmit();
                        } else if (e.key === 'Escape') {
                          setShowUrlInput(false);
                          setUrlInput('');
                        }
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleUrlSubmit}
                      className="px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
                    >
                      {t('common.confirm')}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUrlInput(false);
                      setUrlInput('');
                    }}
                    className="text-sm text-stone-600 hover:text-stone-900"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-stone-400" />
                      <div>
                        <p className="text-sm font-medium text-stone-700">
                          {uploading ? t('imageLibrary.uploading') : (i18n.language === 'zh-TW' ? '上傳新圖片' : 'Upload New Image')}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          {i18n.language === 'zh-TW' ? '最大 5MB' : 'Max 5MB'}
                        </p>
                      </div>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGallery(true)}
                    className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 text-stone-400" />
                      <div>
                        <p className="text-sm font-medium text-stone-700">
                          {i18n.language === 'zh-TW' ? '從圖庫選擇' : 'From Gallery'}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          {i18n.language === 'zh-TW' ? '瀏覽已上傳' : 'Browse Uploaded'}
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowUrlInput(true)}
                    className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Link className="w-8 h-8 text-stone-400" />
                      <div>
                        <p className="text-sm font-medium text-stone-700">
                          {i18n.language === 'zh-TW' ? '輸入網址' : 'Enter URL'}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          {i18n.language === 'zh-TW' ? '外部連結' : 'External Link'}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-stone-700 mb-2">
                {i18n.language === 'zh-TW' ? '文章摘要' : 'Excerpt'}
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none"
                placeholder={i18n.language === 'zh-TW' ? '簡短描述這篇文章的內容...' : 'Brief description of this post...'}
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-stone-700 mb-2">
                {i18n.language === 'zh-TW' ? '標籤' : 'Tags'}
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                placeholder={i18n.language === 'zh-TW' ? 'react, typescript, 網頁開發（逗號分隔）' : 'react, typescript, web development (comma separated)'}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-stone-700 mb-2">
                {t('postEditor.content')} *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={20}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono text-sm resize-y"
                placeholder={t('postEditor.contentPlaceholder')}
                required
              />
            </div>

            <div className="border-t border-stone-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-stone-900 mb-4">
                {i18n.language === 'zh-TW' ? '英文翻譯' : 'English Translation'}
              </h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="translate" className="block text-sm font-medium text-stone-700 mb-2">
                    {i18n.language === 'zh-TW' ? '翻譯狀態' : 'Translation Status'}
                  </label>
                  <select
                    id="translate"
                    value={formData.translate}
                    onChange={(e) => setFormData({ ...formData, translate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                  >
                    <option value="no">{i18n.language === 'zh-TW' ? '否' : 'No'}</option>
                    <option value="yes">{i18n.language === 'zh-TW' ? '是' : 'Yes'}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="eng_title" className="block text-sm font-medium text-stone-700 mb-2">
                    {i18n.language === 'zh-TW' ? '英文標題' : 'English Title'}
                  </label>
                  <input
                    type="text"
                    id="eng_title"
                    value={formData.eng_title}
                    onChange={(e) => setFormData({ ...formData, eng_title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                    placeholder={i18n.language === 'zh-TW' ? '輸入英文標題...' : 'Enter English title...'}
                  />
                </div>

                <div>
                  <label htmlFor="eng_excerpt" className="block text-sm font-medium text-stone-700 mb-2">
                    {i18n.language === 'zh-TW' ? '英文摘要' : 'English Excerpt'}
                  </label>
                  <textarea
                    id="eng_excerpt"
                    value={formData.eng_excerpt}
                    onChange={(e) => setFormData({ ...formData, eng_excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none"
                    placeholder={i18n.language === 'zh-TW' ? '簡短描述這篇文章的英文內容...' : 'Brief description in English...'}
                  />
                </div>

                <div>
                  <label htmlFor="eng_tags" className="block text-sm font-medium text-stone-700 mb-2">
                    {i18n.language === 'zh-TW' ? '英文標籤' : 'English Tags'}
                  </label>
                  <input
                    type="text"
                    id="eng_tags"
                    value={formData.eng_tags}
                    onChange={(e) => setFormData({ ...formData, eng_tags: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                    placeholder={i18n.language === 'zh-TW' ? 'react, typescript, web development（逗號分隔）' : 'react, typescript, web development (comma separated)'}
                  />
                </div>

                <div>
                  <label htmlFor="eng_content" className="block text-sm font-medium text-stone-700 mb-2">
                    {i18n.language === 'zh-TW' ? '英文內容' : 'English Content'}
                  </label>
                  <textarea
                    id="eng_content"
                    value={formData.eng_content}
                    onChange={(e) => setFormData({ ...formData, eng_content: e.target.value })}
                    rows={20}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono text-sm resize-y"
                    placeholder={i18n.language === 'zh-TW' ? '支援 Markdown 格式的英文內容...' : 'English content in Markdown format...'}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white border border-stone-200 rounded-lg p-8">
            {formData.cover_image_url && (
              <img
                src={formData.cover_image_url}
                alt={formData.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            <h1 className="text-4xl md:text-5xl font-light mb-4 leading-tight">
              {formData.title || (i18n.language === 'zh-TW' ? '未命名文章' : 'Untitled Post')}
            </h1>

            {formData.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {formData.tags.split(',').map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-full text-xs"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-stone prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: MarkdownParagraph,
                  img: ({ node, ...props }) => (
                    <img {...props} className="rounded-lg w-full" loading="lazy" />
                  ),
                }}
              >
                {formData.content || (i18n.language === 'zh-TW' ? '*尚無內容*' : '*No content*')}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </form>

      {showGallery && (
        <ImageGallery
          onSelect={handleSelectFromGallery}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}

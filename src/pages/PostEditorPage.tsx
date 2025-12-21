import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Save, Eye, Edit3, ArrowLeft, Upload, X, Image as ImageIcon, Link, Pencil } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ImageGallery } from '../components/ImageGallery';
import 'highlight.js/styles/github-dark.css';

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

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image_url: '',
    tags: '',
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
          published: data.published || false,
        });
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert('載入文章失敗');
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(title: string) {
    const timestamp = Date.now().toString(36);
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
    return baseSlug ? `${baseSlug}-${timestamp}` : `post-${timestamp}`;
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片檔案');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('圖片大小不能超過 5MB');
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
      alert('上傳圖片失敗，請重試');
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
      setValidationError('請填寫標題、網址代碼和內容');
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

      const postData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || null,
        cover_image_url: formData.cover_image_url.trim() || null,
        tags: tags.length > 0 ? tags : null,
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

      navigate('/admin');
    } catch (error) {
      console.error('Error saving post:', error);
      setValidationError('儲存失敗，請檢查網址代碼是否重複');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">載入中...</div>
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
              <h3 className="text-sm font-medium text-red-800">無法儲存</h3>
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
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回管理頁面
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-md bg-white">
            <label htmlFor="published" className="text-sm font-medium text-stone-700 cursor-pointer">
              發布狀態：
            </label>
            <select
              id="published"
              value={formData.published ? 'published' : 'draft'}
              onChange={(e) => setFormData({ ...formData, published: e.target.value === 'published' })}
              className="text-sm border-0 bg-transparent focus:ring-0 font-medium cursor-pointer"
            >
              <option value="draft">草稿</option>
              <option value="published">已發布</option>
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
                編輯
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                預覽
              </>
            )}
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? '儲存中...' : '儲存'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!previewMode ? (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-2">
                標題 *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                封面圖片
              </label>

              {formData.cover_image_url && !editingUrl ? (
                <div className="space-y-3">
                  <div className="relative">
                    <img
                      src={formData.cover_image_url}
                      alt="封面預覽"
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
                        <p className="text-xs font-medium text-stone-600 mb-1">圖片網址</p>
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
                        編輯
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
                      儲存
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2.5 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                  {urlInput && (
                    <div className="relative">
                      <img
                        src={urlInput}
                        alt="預覽"
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
                      確定
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
                    取消
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
                          {uploading ? '上傳中...' : '上傳新圖片'}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          最大 5MB
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
                          從圖庫選擇
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          瀏覽已上傳
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
                          輸入網址
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          外部連結
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-stone-700 mb-2">
                文章摘要
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none"
                placeholder="簡短描述這篇文章的內容..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-stone-700 mb-2">
                標籤
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                placeholder="react, typescript, 網頁開發（逗號分隔）"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-stone-700 mb-2">
                內容（Markdown 格式）*
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={20}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono text-sm resize-y"
                placeholder="使用 Markdown 格式撰寫文章內容..."
                required
              />
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
              {formData.title || '未命名文章'}
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
                  img: ({ node, ...props }) => (
                    <img {...props} className="rounded-lg w-full" loading="lazy" />
                  ),
                }}
              >
                {formData.content || '*尚無內容*'}
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

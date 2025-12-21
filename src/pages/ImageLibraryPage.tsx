import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Copy, Check, Trash2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface StorageImage {
  name: string;
  url: string;
  created_at: string;
  size: number;
}

export function ImageLibraryPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const { data, error } = await supabase.storage
        .from('roberthut-blog-images')
        .list('covers', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      const imageList = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from('roberthut-blog-images')
          .getPublicUrl(`covers/${file.name}`);

        return {
          name: file.name,
          url: publicUrl,
          created_at: file.created_at || '',
          size: file.metadata?.size || 0,
        };
      });

      setImages(imageList);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
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

      await loadImages();

      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('上傳圖片失敗，請重試');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(imageName: string) {
    if (!confirm('確定要刪除這張圖片嗎？此操作無法復原。')) return;

    try {
      const { error } = await supabase.storage
        .from('roberthut-blog-images')
        .remove([`covers/${imageName}`]);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.name !== imageName));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('刪除失敗，請重試');
    }
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回管理頁面
        </button>

        <div className="border-2 border-dashed border-stone-300 rounded-lg px-6 py-3 hover:border-stone-400 transition-colors">
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
            className="cursor-pointer flex items-center gap-3"
          >
            <Upload className="w-5 h-5 text-stone-600" />
            <span className="text-sm font-medium text-stone-700">
              {uploading ? '上傳中...' : '上傳圖片'}
            </span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-light">圖片庫</h1>
          <div className="text-sm text-stone-500">
            共 {images.length} 張圖片
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-stone-500">載入中...</div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ImageIcon className="w-16 h-16 text-stone-300 mb-4" />
            <p className="text-stone-500 mb-2">圖片庫是空的</p>
            <p className="text-sm text-stone-400">上傳第一張圖片吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.name}
                className="group relative bg-stone-50 rounded-lg overflow-hidden border border-stone-200 hover:border-stone-400 transition-all hover:shadow-md"
              >
                <div className="aspect-video relative overflow-hidden bg-stone-100">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyUrl(image.url)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-stone-900 text-white text-sm font-medium rounded hover:bg-stone-800 transition-colors"
                      title="複製 URL"
                    >
                      {copiedUrl === image.url ? (
                        <>
                          <Check className="w-4 h-4" />
                          已複製
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          複製
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(image.name)}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded transition-colors"
                      title="刪除圖片"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  <div className="text-xs text-stone-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">大小</span>
                      <span>{formatFileSize(image.size)}</span>
                    </div>
                    {image.created_at && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">上傳</span>
                        <span>{new Date(image.created_at).toLocaleDateString('zh-TW')}</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={image.url}
                    readOnly
                    className="w-full px-2 py-1 text-xs bg-white border border-stone-200 rounded text-stone-600 font-mono"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

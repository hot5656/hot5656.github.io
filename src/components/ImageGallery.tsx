import { useEffect, useState } from 'react';
import { X, Copy, Check, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageGalleryProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

interface StorageImage {
  name: string;
  url: string;
  created_at: string;
}

export function ImageGallery({ onSelect, onClose }: ImageGalleryProps) {
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list('covers', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      const imageList = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(`covers/${file.name}`);

        return {
          name: file.name,
          url: publicUrl,
          created_at: file.created_at || '',
        };
      });

      setImages(imageList);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(imageName: string) {
    if (!confirm('確定要刪除這張圖片嗎？')) return;

    try {
      const { error } = await supabase.storage
        .from('blog-images')
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h2 className="text-2xl font-bold text-stone-900">圖片庫</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-stone-500">載入中...</div>
            </div>
          ) : images.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-stone-500">圖片庫是空的</p>
                <p className="text-sm text-stone-400 mt-2">上傳第一張圖片吧！</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.name}
                  className="group relative bg-stone-50 rounded-lg overflow-hidden border border-stone-200 hover:border-stone-400 transition-all hover:shadow-md"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                      onClick={() => onSelect(image.url)}
                    />
                  </div>

                  <div className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelect(image.url)}
                        className="flex-1 px-3 py-1.5 bg-stone-900 text-white text-sm font-medium rounded hover:bg-stone-800 transition-colors"
                      >
                        選擇
                      </button>
                      <button
                        onClick={() => handleCopyUrl(image.url)}
                        className="p-1.5 bg-stone-200 hover:bg-stone-300 rounded transition-colors"
                        title="複製 URL"
                      >
                        {copiedUrl === image.url ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-stone-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(image.name)}
                        className="p-1.5 bg-red-100 hover:bg-red-200 rounded transition-colors"
                        title="刪除圖片"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
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
    </div>
  );
}

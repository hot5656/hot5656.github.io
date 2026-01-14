import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Trash2, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ImageData {
  original: {
    url: string;
    size: number;
    width: number;
    height: number;
    name: string;
  } | null;
  compressed: {
    url: string;
    size: number;
    quality: number;
  } | null;
}

export default function ImageCompressor() {
  const [imageData, setImageData] = useState<ImageData>({
    original: null,
    compressed: null,
  });
  const [quality, setQuality] = useState(90);
  const [compressing, setCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('tools.image.invalidFile'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageData({
          original: {
            url: e.target?.result as string,
            size: file.size,
            width: img.width,
            height: img.height,
            name: file.name,
          },
          compressed: null,
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const compressImage = async () => {
    if (!imageData.original) return;

    setCompressing(true);

    try {
      const img = new Image();
      img.src = imageData.original.url;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error(t('tools.image.canvasError'));
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setCompressing(false);
            return;
          }

          const url = URL.createObjectURL(blob);

          setImageData((prev) => ({
            ...prev,
            compressed: {
              url,
              size: blob.size,
              quality,
            },
          }));

          setCompressing(false);
        },
        'image/jpeg',
        quality / 100
      );
    } catch (error) {
      console.error('Compression error:', error);
      alert(t('tools.image.compressionError'));
      setCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!imageData.compressed) return;

    const link = document.createElement('a');
    link.href = imageData.compressed.url;
    const originalName = imageData.original?.name || 'image.jpg';
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    link.download = `${nameWithoutExt}_compressed.jpg`;
    link.click();
  };

  const reset = () => {
    if (imageData.original?.url) {
      URL.revokeObjectURL(imageData.original.url);
    }
    if (imageData.compressed?.url) {
      URL.revokeObjectURL(imageData.compressed.url);
    }
    setImageData({ original: null, compressed: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressionRatio =
    imageData.original && imageData.compressed
      ? Math.round((1 - imageData.compressed.size / imageData.original.size) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{t('tools.image.title')}</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <ul className="text-sm text-blue-800 space-y-1">
              <li>{t('tools.image.instruction1')}</li>
              <li>{t('tools.image.instruction2')}</li>
              <li>{t('tools.image.instruction3')}</li>
              <li>{t('tools.image.instruction4')}</li>
            </ul>
          </div>
        </div>
      </div>

      {!imageData.original ? (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-stone-300 hover:border-stone-400 hover:bg-stone-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-stone-700 mb-2">{t('tools.image.dropZone')}</p>
          <p className="text-sm text-stone-500">{t('tools.image.supportedFormats')}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-stone-900 mb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              {t('tools.image.originalImage')}
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-stone-600">{t('tools.image.fileName')}</p>
                <p className="font-medium text-stone-900">{imageData.original.name}</p>
              </div>
              <div>
                <p className="text-stone-600">{t('tools.image.fileSize')}</p>
                <p className="font-medium text-stone-900">{formatFileSize(imageData.original.size)}</p>
              </div>
              <div>
                <p className="text-stone-600">{t('tools.image.dimensions')}</p>
                <p className="font-medium text-stone-900">
                  {imageData.original.width} × {imageData.original.height} px
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">{t('tools.image.compressSettings')}</h3>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">
                  {t('tools.image.quality')}: {quality}%
                </label>
                <span className="text-xs text-stone-500">{t('tools.image.qualityHint')}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>{t('tools.image.smallerFile')}</span>
                <span>{t('tools.image.higherQuality')}</span>
              </div>
            </div>

            <button
              onClick={compressImage}
              disabled={compressing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              {compressing ? t('tools.image.compressing') : t('tools.image.compress')}
            </button>
          </div>

          {imageData.compressed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold text-green-900">{t('tools.image.compressedImage')}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-700">{t('tools.image.compressedSize')}</p>
                  <p className="font-medium text-green-900">{formatFileSize(imageData.compressed.size)}</p>
                </div>
                <div>
                  <p className="text-green-700">{t('tools.image.savedSpace')}</p>
                  <p className="font-medium text-green-900">
                    {compressionRatio}% ({formatFileSize(imageData.original.size - imageData.compressed.size)})
                  </p>
                </div>
              </div>
              <button
                onClick={downloadCompressed}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('tools.image.download')}
              </button>
            </div>
          )}

          <button
            onClick={reset}
            className="w-full border border-stone-300 text-stone-600 hover:bg-stone-50 font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t('tools.image.reset')}
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeftRight, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HexAsciiConverter() {
  const [hexInput, setHexInput] = useState('');
  const [asciiInput, setAsciiInput] = useState('');
  const [hexResult, setHexResult] = useState('');
  const [asciiResult, setAsciiResult] = useState('');
  const { t } = useTranslation();

  const hexToAscii = () => {
    try {
      const hex = hexInput.replace(/\s/g, '');
      let result = '';

      for (let i = 0; i < hex.length; i += 2) {
        const byte = parseInt(hex.substr(i, 2), 16);
        if (isNaN(byte)) {
          setAsciiResult(t('tools.hex.errorInvalidHex'));
          return;
        }
        result += String.fromCharCode(byte);
      }

      setAsciiResult(result);
    } catch (error) {
      setAsciiResult(t('tools.hex.errorInvalidHex'));
    }
  };

  const asciiToHex = () => {
    try {
      let result = '';
      for (let i = 0; i < asciiInput.length; i++) {
        const hex = asciiInput.charCodeAt(i).toString(16).padStart(2, '0');
        result += hex + ' ';
      }
      setHexResult(result.trim().toUpperCase());
    } catch (error) {
      setHexResult(t('tools.hex.errorConversion'));
    }
  };

  const clearHex = () => {
    setHexInput('');
    setAsciiResult('');
  };

  const clearAscii = () => {
    setAsciiInput('');
    setHexResult('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{t('tools.hex.title')}</h2>
        <p className="text-stone-600">{t('tools.hex.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-stone-900">{t('tools.hex.hexToAscii')}</h3>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t('tools.hex.hexInput')}
            </label>
            <textarea
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              placeholder={t('tools.hex.hexPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={hexToAscii}
              disabled={!hexInput}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {t('tools.hex.convert')}
            </button>
            <button
              onClick={clearHex}
              className="px-4 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
              title={t('tools.hex.clear')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {asciiResult && (
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-sm text-stone-600 mb-2">{t('tools.hex.result')}</p>
              <p className="text-stone-900 font-mono break-all">{asciiResult}</p>
            </div>
          )}
        </div>

        <div className="border-t border-stone-200 pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-stone-900">{t('tools.hex.asciiToHex')}</h3>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t('tools.hex.asciiInput')}
            </label>
            <textarea
              value={asciiInput}
              onChange={(e) => setAsciiInput(e.target.value)}
              placeholder={t('tools.hex.asciiPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={asciiToHex}
              disabled={!asciiInput}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {t('tools.hex.convert')}
            </button>
            <button
              onClick={clearAscii}
              className="px-4 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
              title={t('tools.hex.clear')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {hexResult && (
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-sm text-stone-600 mb-2">{t('tools.hex.result')}</p>
              <p className="text-stone-900 font-mono break-all">{hexResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

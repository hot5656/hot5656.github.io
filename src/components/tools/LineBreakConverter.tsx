import { useState } from 'react';
import { ArrowLeftRight, Trash2, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LineBreakConverter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const convertToLineBreaks = () => {
    const converted = input.replace(/\\n/g, '\n');
    setResult(converted);
  };

  const convertFromLineBreaks = () => {
    const converted = input.replace(/\n/g, '\\n');
    setResult(converted);
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{t('tools.lineBreak.title')}</h2>
        <p className="text-stone-600">{t('tools.lineBreak.subtitle')}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          {t('tools.lineBreak.input')}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('tools.lineBreak.inputPlaceholder')}
          rows={6}
          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={convertToLineBreaks}
          disabled={!input}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ArrowLeftRight className="w-4 h-4" />
          {t('tools.lineBreak.toLineBreaks')}
        </button>
        <button
          onClick={convertFromLineBreaks}
          disabled={!input}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ArrowLeftRight className="w-4 h-4" />
          {t('tools.lineBreak.fromLineBreaks')}
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
          title={t('tools.lineBreak.clear')}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {result && (
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-stone-700">{t('tools.lineBreak.result')}</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">{t('tools.lineBreak.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t('tools.lineBreak.copy')}</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-stone-900 font-mono text-sm whitespace-pre-wrap break-all bg-white p-3 rounded border border-stone-200">
            {result}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-900 mb-2">{t('tools.lineBreak.exampleTitle')}</p>
        <div className="space-y-2 text-sm text-blue-800">
          <p className="font-mono">{t('tools.lineBreak.example1')}</p>
          <p className="text-blue-600">{t('tools.lineBreak.arrow')}</p>
          <pre className="font-mono bg-white p-2 rounded border border-blue-200">
            {t('tools.lineBreak.example2')}
          </pre>
        </div>
      </div>
    </div>
  );
}

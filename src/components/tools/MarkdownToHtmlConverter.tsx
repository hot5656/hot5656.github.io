import { useState } from 'react';
import { marked } from 'marked';
import { FileText, Trash2, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MarkdownToHtmlConverter() {
  const [markdown, setMarkdown] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const convertToHtml = async () => {
    try {
      const html = await marked.parse(markdown);
      setHtmlOutput(html);
    } catch (error) {
      console.error('Markdown conversion error:', error);
      setHtmlOutput('<p>Error converting markdown</p>');
    }
  };

  const clear = () => {
    setMarkdown('');
    setHtmlOutput('');
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{t('tools.markdown.title')}</h2>
        <p className="text-stone-600">{t('tools.markdown.subtitle')}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          {t('tools.markdown.markdownInput')}
        </label>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder={t('tools.markdown.markdownPlaceholder')}
          rows={8}
          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={convertToHtml}
          disabled={!markdown}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {t('tools.markdown.convert')}
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
          title={t('tools.markdown.clear')}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {htmlOutput && (
        <div className="space-y-4">
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-stone-700">{t('tools.markdown.htmlOutput')}</p>
              <button
                onClick={copyHtml}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">{t('tools.markdown.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t('tools.markdown.copy')}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-stone-900 font-mono text-xs whitespace-pre-wrap break-all bg-white p-3 rounded border border-stone-200 overflow-x-auto">
              {htmlOutput}
            </pre>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <p className="text-sm font-medium text-stone-700 mb-3">{t('tools.markdown.preview')}</p>
            <div
              className="prose prose-stone max-w-none bg-white p-4 rounded border border-stone-200"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-900 mb-2">{t('tools.markdown.exampleTitle')}</p>
        <pre className="text-sm text-blue-800 font-mono whitespace-pre-wrap">
{`# ${t('tools.markdown.exampleHeading')}

## ${t('tools.markdown.exampleSubheading')}

${t('tools.markdown.exampleText')}

- ${t('tools.markdown.exampleList1')}
- ${t('tools.markdown.exampleList2')}
- ${t('tools.markdown.exampleList3')}

**${t('tools.markdown.exampleBold')}** *${t('tools.markdown.exampleItalic')}*

[${t('tools.markdown.exampleLink')}](https://example.com)`}
        </pre>
      </div>
    </div>
  );
}

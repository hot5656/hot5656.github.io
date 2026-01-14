import { useState } from 'react';
import { DollarSign, Calendar, Code2, Type, FileCode, Image } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CurrencyConverter from '../components/tools/CurrencyConverter';
import DateCalculator from '../components/tools/DateCalculator';
import HexAsciiConverter from '../components/tools/HexAsciiConverter';
import LineBreakConverter from '../components/tools/LineBreakConverter';
import MarkdownToHtmlConverter from '../components/tools/MarkdownToHtmlConverter';
import ImageCompressor from '../components/tools/ImageCompressor';

type ToolType = 'currency' | 'date' | 'hex-ascii' | 'line-break' | 'markdown' | 'image-compressor';

interface Tool {
  id: ToolType;
  nameKey: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<ToolType>('currency');
  const { t } = useTranslation();

  const tools: Tool[] = [
    {
      id: 'currency',
      nameKey: 'tools.nav.currencyConverter',
      icon: <DollarSign className="w-5 h-5" />,
      component: <CurrencyConverter />,
    },
    {
      id: 'date',
      nameKey: 'tools.nav.dateCalculator',
      icon: <Calendar className="w-5 h-5" />,
      component: <DateCalculator />,
    },
    {
      id: 'hex-ascii',
      nameKey: 'tools.nav.hexAsciiConverter',
      icon: <Code2 className="w-5 h-5" />,
      component: <HexAsciiConverter />,
    },
    {
      id: 'line-break',
      nameKey: 'tools.nav.lineBreakConverter',
      icon: <Type className="w-5 h-5" />,
      component: <LineBreakConverter />,
    },
    {
      id: 'markdown',
      nameKey: 'tools.nav.markdownConverter',
      icon: <FileCode className="w-5 h-5" />,
      component: <MarkdownToHtmlConverter />,
    },
    {
      id: 'image-compressor',
      nameKey: 'tools.nav.imageCompressor',
      icon: <Image className="w-5 h-5" />,
      component: <ImageCompressor />,
    },
  ];

  const currentTool = tools.find((tool) => tool.id === selectedTool);

  return (
    <div className="flex gap-8 min-h-[600px]">
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden sticky top-24">
          <div className="p-4 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900">{t('tools.title')}</h2>
            <p className="text-sm text-stone-600 mt-1">{t('tools.subtitle')}</p>
          </div>
          <nav className="p-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  selectedTool === tool.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {tool.icon}
                <span className="text-sm">{t(tool.nameKey)}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="bg-white rounded-lg border border-stone-200 p-8">
          {currentTool?.component}
        </div>
      </main>
    </div>
  );
}

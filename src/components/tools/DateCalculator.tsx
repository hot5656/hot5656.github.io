import { useState } from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DateCalculator() {
  const [calcType, setCalcType] = useState<'add' | 'diff'>('diff');
  const { t } = useTranslation();

  const [baseDate, setBaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [addResult, setAddResult] = useState('');

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [diffResult, setDiffResult] = useState('');

  const calculateAddSubtract = () => {
    const daysNum = parseInt(days);
    if (isNaN(daysNum)) {
      setAddResult(t('tools.date.errorInvalidDays'));
      return;
    }

    const date = new Date(baseDate);
    const resultDate = new Date(date);

    if (operation === 'add') {
      resultDate.setDate(date.getDate() + daysNum);
    } else {
      resultDate.setDate(date.getDate() - daysNum);
    }

    const formatted = resultDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    setAddResult(formatted);
  };

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const remainingDays = diffDays % 30;

    let result = `${t('tools.date.differenceResult')}: `;
    if (years > 0) result += `${years} ${t('tools.date.years')} `;
    if (months > 0) result += `${months} ${t('tools.date.months')} `;
    result += `${diffDays} ${t('tools.date.totalDays')}`;

    setDiffResult(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{t('tools.date.title')}</h2>
        <p className="text-stone-600">{t('tools.date.subtitle')}</p>
      </div>

      <div className="flex gap-2 border-b border-stone-200">
        <button
          onClick={() => setCalcType('diff')}
          className={`px-4 py-2 font-medium transition-colors ${
            calcType === 'diff'
              ? 'text-stone-900 border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          {t('tools.date.calculateDifference')}
        </button>
        <button
          onClick={() => setCalcType('add')}
          className={`px-4 py-2 font-medium transition-colors ${
            calcType === 'add'
              ? 'text-stone-900 border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          {t('tools.date.addSubtractDays')}
        </button>
      </div>

      {calcType === 'diff' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              {t('tools.date.startDate')}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              {t('tools.date.endDate')}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            />
          </div>

          <button
            onClick={calculateDifference}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {t('tools.date.calculate')}
          </button>

          {diffResult && (
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
              <p className="text-lg font-semibold text-stone-900">{diffResult}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              {t('tools.date.baseDate')}
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t('tools.date.daysToAddSubtract')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setOperation('add')}
                className={`p-3 rounded-lg border transition-colors ${
                  operation === 'add'
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
                title={t('tools.date.add')}
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className={`p-3 rounded-lg border transition-colors ${
                  operation === 'subtract'
                    ? 'bg-red-100 border-red-300 text-red-700'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
                title={t('tools.date.subtract')}
              >
                <Minus className="w-5 h-5" />
              </button>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && calculateAddSubtract()}
                placeholder={t('tools.date.daysPlaceholder')}
                className="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={calculateAddSubtract}
            disabled={!days}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            {t('tools.date.calculate')}
          </button>

          {addResult && (
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
              <p className="text-lg font-semibold text-stone-900">{addResult}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

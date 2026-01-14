import { useState, useEffect } from 'react';
import { ArrowDownUp, RefreshCw, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
];

interface SourceResult {
  name: string;
  url: string;
  rates: Record<string, number>;
  base: string;
  success: boolean;
  error?: string;
}

interface ExchangeRateData {
  success: boolean;
  sources: SourceResult[];
  primarySource: SourceResult;
  timestamp: string;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TWD');
  const [result, setResult] = useState('');
  const [exchangeData, setExchangeData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/exchange-rates`;
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      };

      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
        throw new Error(t('tools.currency.errorFetch'));
      }

      const data = await response.json();

      if (data.success) {
        setExchangeData(data);
      } else {
        setError(data.error || t('tools.currency.errorFetch'));
      }
    } catch (err) {
      setError(t('tools.currency.errorNetwork'));
      console.error('Error fetching exchange rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const calculateRate = (source: SourceResult, from: string, to: string): number => {
    if (from === to) return 1;

    let rate = 1;

    if (from === source.base) {
      rate = source.rates[to] || 0;
    } else if (to === source.base) {
      rate = 1 / (source.rates[from] || 1);
    } else {
      const fromRate = source.rates[from] || 0;
      const toRate = source.rates[to] || 0;
      if (fromRate > 0) {
        rate = toRate / fromRate;
      }
    }

    return rate;
  };

  const convert = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      setResult(t('tools.currency.errorInvalidAmount'));
      return;
    }

    if (!exchangeData || !exchangeData.primarySource) {
      setResult(t('tools.currency.errorNoData'));
      return;
    }

    const rate = calculateRate(exchangeData.primarySource, fromCurrency, toCurrency);
    const converted = amountNum * rate;

    const fromSymbol = CURRENCIES.find(c => c.code === fromCurrency)?.symbol || '';
    const toSymbol = CURRENCIES.find(c => c.code === toCurrency)?.symbol || '';

    setResult(
      `${fromSymbol}${amountNum.toLocaleString()} ${fromCurrency} = ${toSymbol}${converted.toFixed(2)} ${toCurrency}`
    );
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-stone-900">{t('tools.currency.title')}</h2>
          <button
            onClick={fetchExchangeRates}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors disabled:opacity-50"
            title={t('tools.currency.refresh')}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{t('tools.currency.refresh')}</span>
          </button>
        </div>
        <p className="text-stone-600">{t('tools.currency.subtitle')}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {exchangeData && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          <div className="flex items-center justify-between">
            <span>
              {t('tools.currency.primarySource')}:{' '}
              <a
                href={exchangeData.primarySource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                {exchangeData.primarySource.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            </span>
            <span>
              {t('tools.currency.updateTime')}:{new Date(exchangeData.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            {t('tools.currency.amount')}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && convert()}
              placeholder={t('tools.currency.amountPlaceholder')}
              disabled={!exchangeData || loading}
              className="w-full pl-8 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent disabled:bg-stone-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t('tools.currency.fromCurrency')}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapCurrencies}
            className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            title={t('tools.currency.swap')}
          >
            <ArrowDownUp className="w-5 h-5" />
          </button>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t('tools.currency.toCurrency')}
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convert}
          disabled={!amount || !exchangeData || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
        >
          {t('tools.currency.convert')}
        </button>

        {result && exchangeData && (
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 space-y-3">
            <div>
              <p className="text-sm text-stone-600 mb-1">{t('tools.currency.result')}</p>
              <p className="text-2xl font-bold text-stone-900">{result}</p>
            </div>

            {fromCurrency !== toCurrency && (
              <p className="text-sm text-stone-600">
                {t('tools.currency.rate')}: 1 {fromCurrency} ≈{' '}
                {calculateRate(exchangeData.primarySource, fromCurrency, toCurrency).toFixed(4)}{' '}
                {toCurrency}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

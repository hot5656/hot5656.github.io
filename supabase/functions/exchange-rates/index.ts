const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ExchangeRateAPIResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}

interface SourceResult {
  name: string;
  url: string;
  rates: Record<string, number>;
  base: string;
  success: boolean;
  error?: string;
}

async function fetchFromExchangeRateAPI(): Promise<SourceResult> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data: ExchangeRateAPIResponse = await response.json();
    
    if (data.result === 'success' && data.rates) {
      return {
        name: 'ExchangeRate-API',
        url: 'https://www.exchangerate-api.com',
        rates: data.rates,
        base: data.base_code,
        success: true,
      };
    }
    
    return {
      name: 'ExchangeRate-API',
      url: 'https://www.exchangerate-api.com',
      rates: {},
      base: 'USD',
      success: false,
      error: 'Invalid response format',
    };
  } catch (error) {
    return {
      name: 'ExchangeRate-API',
      url: 'https://www.exchangerate-api.com',
      rates: {},
      base: 'USD',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function fetchFromFrankfurter(): Promise<SourceResult> {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD');
    const data = await response.json();
    
    if (data.rates) {
      const rates: Record<string, number> = { ...data.rates, USD: 1 };
      return {
        name: 'Frankfurter',
        url: 'https://www.frankfurter.app',
        rates,
        base: 'USD',
        success: true,
      };
    }
    
    return {
      name: 'Frankfurter',
      url: 'https://www.frankfurter.app',
      rates: {},
      base: 'USD',
      success: false,
      error: 'Invalid response format',
    };
  } catch (error) {
    return {
      name: 'Frankfurter',
      url: 'https://www.frankfurter.app',
      rates: {},
      base: 'USD',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const sources = await Promise.all([
      fetchFromExchangeRateAPI(),
      fetchFromFrankfurter(),
    ]);

    const primarySource = sources.find(s => s.success) || sources[0];

    if (!primarySource.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'All exchange rate sources failed',
          sources,
        }),
        {
          status: 503,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        sources,
        primarySource,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
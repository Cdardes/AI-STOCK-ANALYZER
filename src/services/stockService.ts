import { StockData, StockAnalysis } from '../types/stock';

// Mock data for AI stocks
const MOCK_STOCKS = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: '850.02',
    marketCap: '2100',
    peRatio: '75.5',
    yearHigh: '974.00',
    yearLow: '378.80',
    volume: '50000000',
    aiMetrics: {
      rndInvestment: '8000',
      patentCount: '2000',
      marketShare: '85',
      revenueGrowth: '265',
      aiAdoption: '0.95'
    },
    analysis: {
      strengths: ['Market leader in AI chips', 'Strong R&D pipeline', 'High demand for AI solutions'],
      weaknesses: ['High valuation', 'Supply chain constraints', 'Competition from AMD'],
      opportunities: ['AI boom', 'Cloud computing growth', 'Autonomous vehicles'],
      threats: ['Geopolitical risks', 'Market volatility', 'Regulatory challenges']
    },
    recommendation: 'Strong Buy'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: '415.32',
    marketCap: '3100',
    peRatio: '35.8',
    yearHigh: '420.82',
    yearLow: '275.37',
    volume: '25000000',
    aiMetrics: {
      rndInvestment: '25000',
      patentCount: '5000',
      marketShare: '75',
      revenueGrowth: '15',
      aiAdoption: '0.90'
    },
    analysis: {
      strengths: ['Cloud leadership', 'Strong AI integration', 'Diverse product portfolio'],
      weaknesses: ['Slower growth in some segments', 'High competition', 'Regulatory scrutiny'],
      opportunities: ['AI services growth', 'Enterprise cloud adoption', 'Gaming expansion'],
      threats: ['Cloud competition', 'Economic slowdown', 'Privacy regulations']
    },
    recommendation: 'Buy'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: '142.56',
    marketCap: '1800',
    peRatio: '24.5',
    yearHigh: '155.20',
    yearLow: '115.00',
    volume: '30000000',
    aiMetrics: {
      rndInvestment: '30000',
      patentCount: '4000',
      marketShare: '70',
      revenueGrowth: '12',
      aiAdoption: '0.85'
    },
    analysis: {
      strengths: ['AI leadership', 'Strong ad revenue', 'Cloud growth'],
      weaknesses: ['Regulatory challenges', 'Privacy concerns', 'Competition in AI'],
      opportunities: ['AI services', 'Cloud expansion', 'New AI products'],
      threats: ['Regulatory pressure', 'Ad market slowdown', 'AI competition']
    },
    recommendation: 'Buy'
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    currentPrice: '178.72',
    marketCap: '288',
    peRatio: '45.2',
    yearHigh: '184.92',
    yearLow: '60.05',
    volume: '45000000',
    aiMetrics: {
      rndInvestment: '5000',
      patentCount: '1500',
      marketShare: '25',
      revenueGrowth: '45',
      aiAdoption: '0.80'
    },
    analysis: {
      strengths: ['Strong product portfolio', 'Competitive pricing', 'Growing market share'],
      weaknesses: ['Smaller R&D budget', 'Supply chain dependency', 'Lower margins'],
      opportunities: ['AI chip market', 'Data center growth', 'Gaming expansion'],
      threats: ['NVIDIA competition', 'Market volatility', 'Supply chain risks']
    },
    recommendation: 'Buy'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms',
    currentPrice: '485.58',
    marketCap: '1250',
    peRatio: '32.4',
    yearHigh: '490.00',
    yearLow: '88.09',
    volume: '20000000',
    aiMetrics: {
      rndInvestment: '35000',
      patentCount: '3000',
      marketShare: '65',
      revenueGrowth: '25',
      aiAdoption: '0.88'
    },
    analysis: {
      strengths: ['AI research leadership', 'Strong ad platform', 'Metaverse potential'],
      weaknesses: ['Privacy concerns', 'Regulatory scrutiny', 'High R&D costs'],
      opportunities: ['AI integration', 'Metaverse development', 'Business solutions'],
      threats: ['Regulatory pressure', 'Competition', 'Privacy regulations']
    },
    recommendation: 'Buy'
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    currentPrice: '24.56',
    marketCap: '52',
    peRatio: 'N/A',
    yearHigh: '27.50',
    yearLow: '7.50',
    volume: '35000000',
    aiMetrics: {
      rndInvestment: '2000',
      patentCount: '800',
      marketShare: '15',
      revenueGrowth: '35',
      aiAdoption: '0.75'
    },
    analysis: {
      strengths: ['AI/ML expertise', 'Government contracts', 'Data analytics leadership'],
      weaknesses: ['High valuation', 'Customer concentration', 'Profitability concerns'],
      opportunities: ['AI platform growth', 'Commercial expansion', 'New markets'],
      threats: ['Competition', 'Contract risks', 'Market volatility']
    },
    recommendation: 'Hold'
  },
  {
    symbol: 'AI',
    name: 'C3.ai',
    currentPrice: '28.45',
    marketCap: '3.2',
    peRatio: 'N/A',
    yearHigh: '32.50',
    yearLow: '10.20',
    volume: '15000000',
    aiMetrics: {
      rndInvestment: '1500',
      patentCount: '500',
      marketShare: '8',
      revenueGrowth: '20',
      aiAdoption: '0.70'
    },
    analysis: {
      strengths: ['Enterprise AI focus', 'Strong partnerships', 'Industry expertise'],
      weaknesses: ['Small market cap', 'High cash burn', 'Limited profitability'],
      opportunities: ['AI adoption growth', 'New industries', 'Partnership expansion'],
      threats: ['Competition', 'Market volatility', 'Funding needs']
    },
    recommendation: 'Hold'
  },
  {
    symbol: 'CRM',
    name: 'Salesforce',
    currentPrice: '298.75',
    marketCap: '290',
    peRatio: '45.8',
    yearHigh: '310.00',
    yearLow: '126.34',
    volume: '12000000',
    aiMetrics: {
      rndInvestment: '18000',
      patentCount: '2500',
      marketShare: '40',
      revenueGrowth: '18',
      aiAdoption: '0.82'
    },
    analysis: {
      strengths: ['Cloud leadership', 'AI integration', 'Strong ecosystem'],
      weaknesses: ['High valuation', 'Integration challenges', 'Competition'],
      opportunities: ['AI services', 'Enterprise growth', 'New markets'],
      threats: ['Market saturation', 'Competition', 'Economic slowdown']
    },
    recommendation: 'Buy'
  }
];

// Mock analysis data
const MOCK_ANALYSIS = {
  NVDA: {
    technicalIndicators: {
      rsi: 65,
      macd: 12.5,
      movingAverage50: 820.5,
      movingAverage200: 650.2
    },
    sentimentScore: 85,
    buyingOpportunity: 'Strong Buy',
    riskLevel: 'Medium',
    priceTargets: {
      low: 750,
      medium: 900,
      high: 1100
    }
  },
  MSFT: {
    technicalIndicators: {
      rsi: 58,
      macd: 8.2,
      movingAverage50: 400.5,
      movingAverage200: 350.2
    },
    sentimentScore: 75,
    buyingOpportunity: 'Buy',
    riskLevel: 'Low',
    priceTargets: {
      low: 380,
      medium: 450,
      high: 500
    }
  },
  GOOGL: {
    technicalIndicators: {
      rsi: 52,
      macd: 5.5,
      movingAverage50: 140.5,
      movingAverage200: 130.2
    },
    sentimentScore: 70,
    buyingOpportunity: 'Buy',
    riskLevel: 'Low',
    priceTargets: {
      low: 130,
      medium: 160,
      high: 180
    }
  },
  AMD: {
    technicalIndicators: {
      rsi: 62,
      macd: 7.8,
      movingAverage50: 170.5,
      movingAverage200: 120.2
    },
    sentimentScore: 75,
    buyingOpportunity: 'Buy',
    riskLevel: 'Medium',
    priceTargets: {
      low: 150,
      medium: 200,
      high: 250
    }
  },
  META: {
    technicalIndicators: {
      rsi: 68,
      macd: 15.2,
      movingAverage50: 450.5,
      movingAverage200: 300.2
    },
    sentimentScore: 80,
    buyingOpportunity: 'Strong Buy',
    riskLevel: 'Medium',
    priceTargets: {
      low: 400,
      medium: 550,
      high: 600
    }
  },
  PLTR: {
    technicalIndicators: {
      rsi: 45,
      macd: -2.5,
      movingAverage50: 25.5,
      movingAverage200: 20.2
    },
    sentimentScore: 55,
    buyingOpportunity: 'Hold',
    riskLevel: 'High',
    priceTargets: {
      low: 20,
      medium: 30,
      high: 40
    }
  },
  AI: {
    technicalIndicators: {
      rsi: 48,
      macd: -1.5,
      movingAverage50: 28.5,
      movingAverage200: 22.2
    },
    sentimentScore: 50,
    buyingOpportunity: 'Hold',
    riskLevel: 'High',
    priceTargets: {
      low: 25,
      medium: 35,
      high: 45
    }
  },
  CRM: {
    technicalIndicators: {
      rsi: 55,
      macd: 4.2,
      movingAverage50: 290.5,
      movingAverage200: 250.2
    },
    sentimentScore: 65,
    buyingOpportunity: 'Buy',
    riskLevel: 'Low',
    priceTargets: {
      low: 280,
      medium: 320,
      high: 350
    }
  }
};

export const stockService = {
  async getTopAIStocks(): Promise<StockData[]> {
    try {
      return MOCK_STOCKS.map(stock => this.processStockData(stock.symbol, stock));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  },

  async getStockAnalysis(symbol: string): Promise<StockAnalysis> {
    try {
      return MOCK_ANALYSIS[symbol as keyof typeof MOCK_ANALYSIS] || {
        technicalIndicators: {
          rsi: 50,
          macd: 0,
          movingAverage50: 0,
          movingAverage200: 0
        },
        sentimentScore: 50,
        buyingOpportunity: 'Hold',
        riskLevel: 'Medium',
        priceTargets: {
          low: 0,
          medium: 0,
          high: 0
        }
      };
    } catch (error) {
      console.error('Error fetching stock analysis:', error);
      throw error;
    }
  },

  processStockData(symbol: string, data: any): StockData {
    return {
      symbol,
      name: data.name || symbol,
      price: parseFloat(data.currentPrice) || 0,
      marketCap: parseFloat(data.marketCap) * 1e9 || 0,
      peRatio: parseFloat(data.peRatio) || 0,
      yearHigh: parseFloat(data.yearHigh) || 0,
      yearLow: parseFloat(data.yearLow) || 0,
      volume: parseInt(data.volume) || 0,
      aiScore: this.calculateAIScore(data.aiMetrics),
      growthScore: this.calculateGrowthScore(data.aiMetrics),
      riskScore: this.calculateRiskScore(data),
      recommendation: data.recommendation || 'Hold',
      predictedPrice: this.calculatePricePrediction(data),
      historicalPrices: [],
      aiMetrics: {
        rndInvestment: parseFloat(data.aiMetrics?.rndInvestment) || 0,
        patentCount: parseInt(data.aiMetrics?.patentCount) || 0,
        marketShare: parseFloat(data.aiMetrics?.marketShare) || 0,
        revenueGrowth: parseFloat(data.aiMetrics?.revenueGrowth) || 0,
        aiAdoption: parseFloat(data.aiMetrics?.aiAdoption) || 0.5
      }
    };
  },

  calculateAIScore(metrics: any): number {
    if (!metrics) return 5;
    
    const weights = {
      rndInvestment: 0.3,
      patentCount: 0.2,
      marketShare: 0.2,
      revenueGrowth: 0.2,
      aiAdoption: 0.1
    };

    const normalizedRnD = Math.min(metrics.rndInvestment / 10000, 1);
    const normalizedPatents = Math.min(metrics.patentCount / 1000, 1);
    const normalizedMarketShare = Math.min(metrics.marketShare / 100, 1);
    const normalizedGrowth = Math.min(Math.max(metrics.revenueGrowth, 0) / 100, 1);
    const normalizedAdoption = metrics.aiAdoption;

    return (
      normalizedRnD * weights.rndInvestment +
      normalizedPatents * weights.patentCount +
      normalizedMarketShare * weights.marketShare +
      normalizedGrowth * weights.revenueGrowth +
      normalizedAdoption * weights.aiAdoption
    ) * 10;
  },

  calculateGrowthScore(metrics: any): number {
    if (!metrics) return 5;
    return Math.min(Math.max(metrics.revenueGrowth / 10, 0), 10);
  },

  calculateRiskScore(data: any): number {
    const baseRisk = 5;
    if (!data || !data.analysis) return baseRisk;

    const threats = data.analysis.threats.length;
    const strengths = data.analysis.strengths.length;
    
    let riskScore = baseRisk + (threats * 0.5) - (strengths * 0.3);
    return Math.min(Math.max(riskScore, 0), 10);
  },

  calculatePricePrediction(data: any): number {
    if (!data || !data.currentPrice) return 0;
    
    const currentPrice = parseFloat(data.currentPrice);
    const growth = data.aiMetrics?.revenueGrowth || 0;
    
    return currentPrice * (1 + (growth / 100));
  }
}; 
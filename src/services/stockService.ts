import { StockData, StockAnalysis } from '../types/stock';

// Mock data for AI stocks
const MOCK_STOCKS: StockData[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 850.02,
    previousClose: 845.50,
    marketCap: 2.1e12,
    peRatio: 75.5,
    yearHigh: 974.00,
    yearLow: 378.80,
    volume: 50000000,
    aiScore: 9.5,
    growthScore: 9.0,
    riskScore: 5.5,
    recommendation: 'Strong Buy',
    predictedPrice: 1000.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 8000,
      patentCount: 2000,
      marketShare: 85,
      revenueGrowth: 265,
      aiAdoption: 0.95
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 415.32,
    previousClose: 410.25,
    marketCap: 3.1e12,
    peRatio: 35.8,
    yearHigh: 420.82,
    yearLow: 275.37,
    volume: 25000000,
    aiScore: 9.2,
    growthScore: 8.5,
    riskScore: 3.8,
    recommendation: 'Buy',
    predictedPrice: 450.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 25000,
      patentCount: 5000,
      marketShare: 75,
      revenueGrowth: 15,
      aiAdoption: 0.90
    }
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    previousClose: 141.20,
    marketCap: 1.8e12,
    peRatio: 24.5,
    yearHigh: 155.20,
    yearLow: 115.00,
    volume: 30000000,
    aiScore: 9.0,
    growthScore: 8.2,
    riskScore: 4.0,
    recommendation: 'Buy',
    predictedPrice: 160.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 30000,
      patentCount: 4000,
      marketShare: 70,
      revenueGrowth: 12,
      aiAdoption: 0.85
    }
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    price: 178.72,
    previousClose: 175.50,
    marketCap: 2.88e11,
    peRatio: 45.2,
    yearHigh: 184.92,
    yearLow: 60.05,
    volume: 45000000,
    aiScore: 8.6,
    growthScore: 8.1,
    riskScore: 5.0,
    recommendation: 'Buy',
    predictedPrice: 200.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 5000,
      patentCount: 1500,
      marketShare: 25,
      revenueGrowth: 45,
      aiAdoption: 0.80
    }
  },
  {
    symbol: 'META',
    name: 'Meta Platforms',
    price: 485.58,
    previousClose: 480.25,
    marketCap: 1.25e12,
    peRatio: 32.4,
    yearHigh: 490.00,
    yearLow: 88.09,
    volume: 20000000,
    aiScore: 8.8,
    growthScore: 8.0,
    riskScore: 4.5,
    recommendation: 'Buy',
    predictedPrice: 550.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 35000,
      patentCount: 3000,
      marketShare: 65,
      revenueGrowth: 25,
      aiAdoption: 0.88
    }
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    price: 24.56,
    previousClose: 24.20,
    marketCap: 5.2e10,
    peRatio: 0,
    yearHigh: 27.50,
    yearLow: 7.50,
    volume: 35000000,
    aiScore: 8.5,
    growthScore: 7.8,
    riskScore: 6.0,
    recommendation: 'Hold',
    predictedPrice: 30.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 2000,
      patentCount: 800,
      marketShare: 15,
      revenueGrowth: 35,
      aiAdoption: 0.75
    }
  },
  {
    symbol: 'AI',
    name: 'C3.ai',
    price: 28.45,
    previousClose: 28.10,
    marketCap: 3.2e9,
    peRatio: 0,
    yearHigh: 32.50,
    yearLow: 10.20,
    volume: 15000000,
    aiScore: 8.3,
    growthScore: 7.5,
    riskScore: 6.5,
    recommendation: 'Hold',
    predictedPrice: 35.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 1500,
      patentCount: 500,
      marketShare: 8,
      revenueGrowth: 20,
      aiAdoption: 0.70
    }
  },
  {
    symbol: 'CRM',
    name: 'Salesforce',
    price: 298.75,
    previousClose: 295.50,
    marketCap: 2.9e11,
    peRatio: 45.8,
    yearHigh: 310.00,
    yearLow: 126.34,
    volume: 12000000,
    aiScore: 8.7,
    growthScore: 7.9,
    riskScore: 4.3,
    recommendation: 'Buy',
    predictedPrice: 350.00,
    historicalPrices: [],
    aiMetrics: {
      rndInvestment: 18000,
      patentCount: 2500,
      marketShare: 40,
      revenueGrowth: 18,
      aiAdoption: 0.82
    }
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
      name: data.name,
      price: Number(data.currentPrice),
      previousClose: Number(data.currentPrice) * 0.99,
      marketCap: Number(data.marketCap) * 1e9,
      peRatio: Number(data.peRatio) || 0,
      yearHigh: Number(data.yearHigh),
      yearLow: Number(data.yearLow),
      volume: Number(data.volume),
      aiScore: this.calculateAIScore(data.aiMetrics),
      growthScore: this.calculateGrowthScore(data.aiMetrics),
      riskScore: this.calculateRiskScore(data),
      recommendation: data.recommendation,
      predictedPrice: this.calculatePricePrediction(data),
      historicalPrices: [],
      aiMetrics: {
        rndInvestment: Number(data.aiMetrics.rndInvestment),
        patentCount: Number(data.aiMetrics.patentCount),
        marketShare: Number(data.aiMetrics.marketShare),
        revenueGrowth: Number(data.aiMetrics.revenueGrowth),
        aiAdoption: Number(data.aiMetrics.aiAdoption)
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

export const getTopAIStocks = async (): Promise<StockData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_STOCKS;
}; 
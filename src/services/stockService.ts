import { StockData, StockAnalysis } from '../types/stock';

// Mock data for AI stocks
const MOCK_STOCKS: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 175.04,
    previousClose: 173.23,
    marketCap: 2800000000000,
    peRatio: 29.5,
    yearHigh: 198.23,
    yearLow: 124.17,
    volume: 58900000,
    aiScore: 85,
    growthScore: 78,
    riskScore: 45,
    recommendation: 'Strong Buy',
    predictedPrice: 190.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.85,
      momentum: 0.78,
      volatility: 0.45
    },
    technicalIndicators: {
      rsi: 65,
      macd: 2.5,
      movingAverage50: 170.5,
      movingAverage200: 165.3,
      volume: {
        average: 50000000,
        current: 58900000,
        change: 17.8
      },
      bollingerBands: {
        upper: 185.5,
        middle: 175.0,
        lower: 164.5
      }
    }
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    price: 850.00,
    previousClose: 820.00,
    marketCap: 2100000000000,
    peRatio: 75.5,
    yearHigh: 900.00,
    yearLow: 400.00,
    volume: 45000000,
    aiScore: 95,
    growthScore: 90,
    riskScore: 60,
    recommendation: 'Strong Buy',
    predictedPrice: 950.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.95,
      momentum: 0.90,
      volatility: 0.60
    },
    technicalIndicators: {
      rsi: 75,
      macd: 12.5,
      movingAverage50: 820.5,
      movingAverage200: 650.2,
      volume: {
        average: 40000000,
        current: 45000000,
        change: 12.5
      },
      bollingerBands: {
        upper: 900.0,
        middle: 850.0,
        lower: 800.0
      }
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 400.00,
    previousClose: 390.00,
    marketCap: 3000000000000,
    peRatio: 35.5,
    yearHigh: 420.00,
    yearLow: 300.00,
    volume: 25000000,
    aiScore: 90,
    growthScore: 85,
    riskScore: 40,
    recommendation: 'Strong Buy',
    predictedPrice: 450.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.90,
      momentum: 0.85,
      volatility: 0.40
    },
    technicalIndicators: {
      rsi: 70,
      macd: 8.2,
      movingAverage50: 400.5,
      movingAverage200: 350.2,
      volume: {
        average: 20000000,
        current: 25000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 420.0,
        middle: 400.0,
        lower: 380.0
      }
    }
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    price: 140.00,
    previousClose: 138.00,
    marketCap: 1800000000000,
    peRatio: 25.5,
    yearHigh: 150.00,
    yearLow: 100.00,
    volume: 20000000,
    aiScore: 88,
    growthScore: 82,
    riskScore: 45,
    recommendation: 'Buy',
    predictedPrice: 160.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.88,
      momentum: 0.82,
      volatility: 0.45
    },
    technicalIndicators: {
      rsi: 65,
      macd: 5.5,
      movingAverage50: 140.5,
      movingAverage200: 130.2,
      volume: {
        average: 18000000,
        current: 20000000,
        change: 11.1
      },
      bollingerBands: {
        upper: 150.0,
        middle: 140.0,
        lower: 130.0
      }
    }
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    sector: 'Technology',
    price: 170.00,
    previousClose: 165.00,
    marketCap: 280000000000,
    peRatio: 40.5,
    yearHigh: 180.00,
    yearLow: 120.00,
    volume: 50000000,
    aiScore: 80,
    growthScore: 85,
    riskScore: 55,
    recommendation: 'Buy',
    predictedPrice: 200.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.80,
      momentum: 0.85,
      volatility: 0.55
    },
    technicalIndicators: {
      rsi: 60,
      macd: -2.5,
      movingAverage50: 25.5,
      movingAverage200: 20.2,
      volume: {
        average: 40000000,
        current: 50000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 180.0,
        middle: 170.0,
        lower: 160.0
      }
    }
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Technology',
    price: 480.00,
    previousClose: 470.00,
    marketCap: 1200000000000,
    peRatio: 30.5,
    yearHigh: 500.00,
    yearLow: 300.00,
    volume: 15000000,
    aiScore: 85,
    growthScore: 80,
    riskScore: 50,
    recommendation: 'Buy',
    predictedPrice: 520.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.85,
      momentum: 0.80,
      volatility: 0.50
    },
    technicalIndicators: {
      rsi: 68,
      macd: 7.8,
      movingAverage50: 170.5,
      movingAverage200: 120.2,
      volume: {
        average: 12000000,
        current: 15000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 500.0,
        middle: 480.0,
        lower: 460.0
      }
    }
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    sector: 'Technology',
    price: 24.56,
    previousClose: 24.20,
    marketCap: 52000000000,
    peRatio: 0,
    yearHigh: 27.50,
    yearLow: 7.50,
    volume: 35000000,
    aiScore: 85,
    growthScore: 78,
    riskScore: 60,
    recommendation: 'Hold',
    predictedPrice: 30.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.85,
      momentum: 0.78,
      volatility: 0.60
    },
    technicalIndicators: {
      rsi: 45,
      macd: -2.5,
      movingAverage50: 25.5,
      movingAverage200: 20.2,
      volume: {
        average: 30000000,
        current: 35000000,
        change: 16.7
      },
      bollingerBands: {
        upper: 27.5,
        middle: 24.5,
        lower: 21.5
      }
    }
  },
  {
    symbol: 'AI',
    name: 'C3.ai',
    sector: 'Technology',
    price: 28.45,
    previousClose: 28.10,
    marketCap: 3200000000,
    peRatio: 0,
    yearHigh: 32.50,
    yearLow: 10.20,
    volume: 15000000,
    aiScore: 83,
    growthScore: 75,
    riskScore: 65,
    recommendation: 'Hold',
    predictedPrice: 35.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.83,
      momentum: 0.75,
      volatility: 0.65
    },
    technicalIndicators: {
      rsi: 48,
      macd: -1.5,
      movingAverage50: 28.5,
      movingAverage200: 25.2,
      volume: {
        average: 12000000,
        current: 15000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 32.5,
        middle: 28.5,
        lower: 24.5
      }
    }
  },
  {
    symbol: 'CRM',
    name: 'Salesforce',
    sector: 'Technology',
    price: 298.75,
    previousClose: 295.00,
    marketCap: 290000000000,
    peRatio: 45.8,
    yearHigh: 310.00,
    yearLow: 126.34,
    volume: 12000000,
    aiScore: 87,
    growthScore: 79,
    riskScore: 43,
    recommendation: 'Buy',
    predictedPrice: 350.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.87,
      momentum: 0.79,
      volatility: 0.43
    },
    technicalIndicators: {
      rsi: 62,
      macd: 4.5,
      movingAverage50: 290.5,
      movingAverage200: 250.2,
      volume: {
        average: 10000000,
        current: 12000000,
        change: 20.0
      },
      bollingerBands: {
        upper: 310.0,
        middle: 298.8,
        lower: 287.5
      }
    }
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Technology',
    price: 180.00,
    previousClose: 175.00,
    marketCap: 600000000000,
    peRatio: 45.5,
    yearHigh: 200.00,
    yearLow: 150.00,
    volume: 100000000,
    aiScore: 82,
    growthScore: 75,
    riskScore: 65,
    recommendation: 'Hold',
    predictedPrice: 190.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.82,
      momentum: 0.75,
      volatility: 0.65
    },
    technicalIndicators: {
      rsi: 55,
      macd: 15.2,
      movingAverage50: 450.5,
      movingAverage200: 300.2,
      volume: {
        average: 80000000,
        current: 100000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 200.0,
        middle: 180.0,
        lower: 160.0
      }
    }
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    sector: 'Technology',
    price: 45.00,
    previousClose: 44.00,
    marketCap: 180000000000,
    peRatio: 20.5,
    yearHigh: 50.00,
    yearLow: 30.00,
    volume: 40000000,
    aiScore: 75,
    growthScore: 70,
    riskScore: 45,
    recommendation: 'Hold',
    predictedPrice: 50.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.75,
      momentum: 0.70,
      volatility: 0.45
    },
    technicalIndicators: {
      rsi: 50,
      macd: -1.5,
      movingAverage50: 28.5,
      movingAverage200: 25.2,
      volume: {
        average: 35000000,
        current: 40000000,
        change: 14.3
      },
      bollingerBands: {
        upper: 50.0,
        middle: 45.0,
        lower: 40.0
      }
    }
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Technology',
    price: 175.00,
    previousClose: 170.00,
    marketCap: 1800000000000,
    peRatio: 60.5,
    yearHigh: 180.00,
    yearLow: 120.00,
    volume: 30000000,
    aiScore: 88,
    growthScore: 85,
    riskScore: 45,
    recommendation: 'Buy',
    predictedPrice: 200.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.88,
      momentum: 0.85,
      volatility: 0.45
    },
    technicalIndicators: {
      rsi: 65,
      macd: 5.5,
      movingAverage50: 170.5,
      movingAverage200: 150.2,
      volume: {
        average: 25000000,
        current: 30000000,
        change: 20.0
      },
      bollingerBands: {
        upper: 180.0,
        middle: 175.0,
        lower: 170.0
      }
    }
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    sector: 'Technology',
    price: 600.00,
    previousClose: 590.00,
    marketCap: 260000000000,
    peRatio: 35.5,
    yearHigh: 650.00,
    yearLow: 450.00,
    volume: 8000000,
    aiScore: 82,
    growthScore: 78,
    riskScore: 50,
    recommendation: 'Hold',
    predictedPrice: 620.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.82,
      momentum: 0.78,
      volatility: 0.50
    },
    technicalIndicators: {
      rsi: 58,
      macd: 3.2,
      movingAverage50: 595.5,
      movingAverage200: 550.2,
      volume: {
        average: 7000000,
        current: 8000000,
        change: 14.3
      },
      bollingerBands: {
        upper: 650.0,
        middle: 600.0,
        lower: 550.0
      }
    }
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    price: 180.00,
    previousClose: 178.50,
    marketCap: 520000000000,
    peRatio: 12.5,
    yearHigh: 190.00,
    yearLow: 150.00,
    volume: 15000000,
    aiScore: 75,
    growthScore: 70,
    riskScore: 45,
    recommendation: 'Buy',
    predictedPrice: 200.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.75,
      momentum: 0.70,
      volatility: 0.45
    },
    technicalIndicators: {
      rsi: 60,
      macd: 3.5,
      movingAverage50: 175.5,
      movingAverage200: 165.2,
      volume: {
        average: 12000000,
        current: 15000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 190.0,
        middle: 180.0,
        lower: 170.0
      }
    }
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Healthcare',
    price: 160.00,
    previousClose: 158.00,
    marketCap: 380000000000,
    peRatio: 15.5,
    yearHigh: 170.00,
    yearLow: 140.00,
    volume: 8000000,
    aiScore: 80,
    growthScore: 75,
    riskScore: 35,
    recommendation: 'Buy',
    predictedPrice: 175.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.80,
      momentum: 0.75,
      volatility: 0.35
    },
    technicalIndicators: {
      rsi: 65,
      macd: 2.5,
      movingAverage50: 158.5,
      movingAverage200: 150.2,
      volume: {
        average: 7000000,
        current: 8000000,
        change: 14.3
      },
      bollingerBands: {
        upper: 170.0,
        middle: 160.0,
        lower: 150.0
      }
    }
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    sector: 'Energy',
    price: 110.00,
    previousClose: 108.00,
    marketCap: 440000000000,
    peRatio: 10.5,
    yearHigh: 120.00,
    yearLow: 90.00,
    volume: 20000000,
    aiScore: 70,
    growthScore: 65,
    riskScore: 40,
    recommendation: 'Hold',
    predictedPrice: 115.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.70,
      momentum: 0.65,
      volatility: 0.40
    },
    technicalIndicators: {
      rsi: 55,
      macd: 1.5,
      movingAverage50: 108.5,
      movingAverage200: 100.2,
      volume: {
        average: 18000000,
        current: 20000000,
        change: 11.1
      },
      bollingerBands: {
        upper: 120.0,
        middle: 110.0,
        lower: 100.0
      }
    }
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    sector: 'Consumer Defensive',
    price: 60.00,
    previousClose: 59.00,
    marketCap: 480000000000,
    peRatio: 25.5,
    yearHigh: 65.00,
    yearLow: 50.00,
    volume: 15000000,
    aiScore: 75,
    growthScore: 70,
    riskScore: 30,
    recommendation: 'Buy',
    predictedPrice: 65.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.75,
      momentum: 0.70,
      volatility: 0.30
    },
    technicalIndicators: {
      rsi: 60,
      macd: 1.2,
      movingAverage50: 59.5,
      movingAverage200: 55.2,
      volume: {
        average: 12000000,
        current: 15000000,
        change: 25.0
      },
      bollingerBands: {
        upper: 65.0,
        middle: 60.0,
        lower: 55.0
      }
    }
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    sector: 'Consumer Defensive',
    price: 150.00,
    previousClose: 148.00,
    marketCap: 350000000000,
    peRatio: 25.5,
    yearHigh: 160.00,
    yearLow: 130.00,
    volume: 8000000,
    aiScore: 78,
    growthScore: 72,
    riskScore: 35,
    recommendation: 'Buy',
    predictedPrice: 160.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.78,
      momentum: 0.72,
      volatility: 0.35
    },
    technicalIndicators: {
      rsi: 62,
      macd: 2.0,
      movingAverage50: 148.5,
      movingAverage200: 140.2,
      volume: {
        average: 7000000,
        current: 8000000,
        change: 14.3
      },
      bollingerBands: {
        upper: 160.0,
        middle: 150.0,
        lower: 140.0
      }
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
      rsi: 70,
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
      rsi: 65,
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
      rsi: 60,
      macd: -2.5,
      movingAverage50: 25.5,
      movingAverage200: 20.2
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
      macd: 7.8,
      movingAverage50: 170.5,
      movingAverage200: 120.2
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
      const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
      if (!stock) {
        throw new Error('Stock not found');
      }

      return {
        technicalIndicators: {
          rsi: stock.technicalIndicators.rsi,
          macd: stock.technicalIndicators.macd,
          movingAverage50: stock.technicalIndicators.movingAverage50,
          movingAverage200: stock.technicalIndicators.movingAverage200
        },
        sentimentScore: stock.aiMetrics.sentiment * 100,
        buyingOpportunity: stock.recommendation,
        riskLevel: stock.riskScore > 60 ? 'High' : stock.riskScore > 40 ? 'Medium' : 'Low',
        priceTargets: {
          low: stock.predictedPrice * 0.9,
          medium: stock.predictedPrice,
          high: stock.predictedPrice * 1.1
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
      sector: data.sector,
      price: Number(data.price),
      previousClose: Number(data.previousClose),
      marketCap: Number(data.marketCap),
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
        sentiment: Number(data.aiMetrics.sentiment),
        momentum: Number(data.aiMetrics.momentum),
        volatility: Number(data.aiMetrics.volatility)
      },
      technicalIndicators: {
        rsi: Number(data.technicalIndicators.rsi),
        macd: Number(data.technicalIndicators.macd),
        movingAverage50: Number(data.technicalIndicators.movingAverage50),
        movingAverage200: Number(data.technicalIndicators.movingAverage200),
        volume: {
          average: Number(data.technicalIndicators.volume.average),
          current: Number(data.technicalIndicators.volume.current),
          change: Number(data.technicalIndicators.volume.change)
        },
        bollingerBands: {
          upper: Number(data.technicalIndicators.bollingerBands.upper),
          middle: Number(data.technicalIndicators.bollingerBands.middle),
          lower: Number(data.technicalIndicators.bollingerBands.lower)
        }
      }
    };
  },

  calculateAIScore(metrics: { sentiment: number; momentum: number; volatility: number }): number {
    const weights = {
      sentiment: 0.4,
      momentum: 0.4,
      volatility: 0.2
    };

    return Math.round(
      metrics.sentiment * weights.sentiment +
      metrics.momentum * weights.momentum +
      (1 - metrics.volatility) * weights.volatility
    ) * 100;
  },

  calculateGrowthScore(metrics: { sentiment: number; momentum: number; volatility: number }): number {
    const weights = {
      sentiment: 0.3,
      momentum: 0.5,
      volatility: 0.2
    };

    return Math.round(
      metrics.sentiment * weights.sentiment +
      metrics.momentum * weights.momentum +
      (1 - metrics.volatility) * weights.volatility
    ) * 100;
  },

  calculateRiskScore(data: any): number {
    if (!data || !data.aiMetrics) return 50;
    
    const weights = {
      volatility: 0.6,
      sentiment: 0.2,
      momentum: 0.2
    };

    return Math.round(
      data.aiMetrics.volatility * weights.volatility +
      (1 - data.aiMetrics.sentiment) * weights.sentiment +
      (1 - data.aiMetrics.momentum) * weights.momentum
    ) * 100;
  },

  calculatePricePrediction(data: any): number {
    if (!data || !data.price) return 0;
    
    const currentPrice = Number(data.price);
    const momentum = data.aiMetrics?.momentum || 0;
    
    return currentPrice * (1 + momentum);
  }
};

export const getTopAIStocks = async (): Promise<StockData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_STOCKS;
}; 
import { StockData } from '../types/stock';

export const mockStocks: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 175.50,
    previousClose: 172.45,
    marketCap: 2800000000000,
    peRatio: 28.5,
    yearHigh: 198.23,
    yearLow: 124.17,
    volume: {
      average: 50000000,
      current: 45000000,
      change: -0.1
    },
    aiScore: 85,
    growthScore: 80,
    riskScore: 30,
    recommendation: 'Strong Buy',
    predictedPrice: 200.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.8,
      momentum: 0.7,
      volatility: 0.3
    },
    technicalIndicators: {
      rsi: 65,
      macd: 2.5,
      sma: 170.00,
      volume: {
        average: 50000000,
        current: 45000000,
        change: -0.1
      },
      bollingerBands: {
        upper: 185.00,
        middle: 175.00,
        lower: 165.00
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
    peRatio: 75.2,
    yearHigh: 900.00,
    yearLow: 400.00,
    volume: {
      average: 30000000,
      current: 35000000,
      change: 0.15
    },
    aiScore: 95,
    growthScore: 90,
    riskScore: 60,
    recommendation: 'Buy',
    predictedPrice: 950.00,
    historicalPrices: [],
    aiMetrics: {
      sentiment: 0.9,
      momentum: 0.85,
      volatility: 0.5
    },
    technicalIndicators: {
      rsi: 70,
      macd: 5.0,
      sma: 800.00,
      volume: {
        average: 30000000,
        current: 35000000,
        change: 0.15
      },
      bollingerBands: {
        upper: 900.00,
        middle: 850.00,
        lower: 800.00
      }
    }
  }
];

export const mockSectors = [
  {
    name: 'Technology',
    performance: 2.5,
    topStocks: ['AAPL', 'MSFT', 'GOOGL']
  },
  {
    name: 'Healthcare',
    performance: 1.2,
    topStocks: ['JNJ', 'PFE', 'UNH']
  },
  {
    name: 'Finance',
    performance: -0.8,
    topStocks: ['JPM', 'BAC', 'WFC']
  },
  {
    name: 'Energy',
    performance: -1.5,
    topStocks: ['XOM', 'CVX', 'COP']
  }
];

export const mockNews = [
  {
    id: '1',
    title: 'Tech Stocks Rally on AI Boom',
    summary: 'Technology stocks surge as artificial intelligence continues to drive market growth and innovation.',
    source: 'Financial Times',
    date: '2024-03-20',
    imageUrl: 'https://source.unsplash.com/random/800x400?technology',
    url: 'https://www.ft.com/',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Rate Cut',
    summary: 'The Federal Reserve hints at potential interest rate cuts in response to economic indicators.',
    source: 'Reuters',
    date: '2024-03-19',
    imageUrl: 'https://source.unsplash.com/random/800x400?finance',
    url: 'https://www.reuters.com/',
    category: 'Economy'
  }
]; 
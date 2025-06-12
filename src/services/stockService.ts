import axios from 'axios';
import { StockData, StockAnalysis } from '../types/stock';

const API_KEY = process.env.REACT_APP_STOCK_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Top 10 AI-focused companies to analyze
const AI_STOCKS = [
  'NVDA',  // NVIDIA
  'GOOGL', // Alphabet
  'MSFT',  // Microsoft
  'AMD',   // AMD
  'AI',    // C3.ai
  'PLTR',  // Palantir
  'META',  // Meta
  'CRM',   // Salesforce
  'TSLA',  // Tesla
  'IBM'    // IBM
];

interface AlphaVantageQuote {
  '05. price': string;
  '06. volume': string;
  '52WeekHigh': string;
  '52WeekLow': string;
}

interface AlphaVantageOverview {
  Name: string;
  MarketCapitalization: string;
  PERatio: string;
  Beta: string;
  QuarterlyRevenueGrowthYOY: string;
  QuarterlyEarningsGrowthYOY: string;
  ProfitMargin: string;
  DebtToEquityRatio: string;
  RAndDExpense: string;
}

interface AlphaVantageTimeSeriesData {
  '4. close': string;
  '5. volume': string;
}

interface AlphaVantageRSI {
  'Technical Analysis: RSI': {
    [key: string]: {
      RSI: string;
    };
  };
}

interface AlphaVantageMACD {
  'Technical Analysis: MACD': {
    [key: string]: {
      MACD: string;
      'MACD_Signal': string;
    };
  };
}

interface AlphaVantageSMA {
  'Technical Analysis: SMA': {
    [key: string]: {
      SMA: string;
    };
  };
}

export const stockService = {
  async getTopAIStocks(): Promise<StockData[]> {
    try {
      const stocksData = await Promise.all(
        AI_STOCKS.map(async (symbol) => {
          // Get overview data
          const overviewResponse = await axios.get<AlphaVantageOverview>(
            `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
          );

          // Get quote data
          const quoteResponse = await axios.get<{ 'Global Quote': AlphaVantageQuote }>(
            `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
          );

          // Get weekly time series for historical data
          const timeSeriesResponse = await axios.get<{ 'Weekly Time Series': Record<string, AlphaVantageTimeSeriesData> }>(
            `${BASE_URL}?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`
          );

          const overview = overviewResponse.data;
          const quote = quoteResponse.data['Global Quote'];
          const timeSeries = timeSeriesResponse.data['Weekly Time Series'];

          // Convert time series to historical prices array
          const historicalPrices = Object.entries(timeSeries || {}).slice(0, 52).map(([date, data]) => ({
            date,
            price: parseFloat(data['4. close']),
            volume: parseInt(data['5. volume'])
          }));

          return this.processStockData({
            symbol,
            overview,
            quote,
            historicalPrices
          });
        })
      );
      return stocksData;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  },

  async getStockAnalysis(symbol: string): Promise<StockAnalysis> {
    try {
      // Get technical indicators
      const rsiResponse = await axios.get<AlphaVantageRSI>(
        `${BASE_URL}?function=RSI&symbol=${symbol}&interval=daily&time_period=14&series_type=close&apikey=${API_KEY}`
      );

      const macdResponse = await axios.get<AlphaVantageMACD>(
        `${BASE_URL}?function=MACD&symbol=${symbol}&interval=daily&series_type=close&apikey=${API_KEY}`
      );

      const smaResponse = await axios.get<AlphaVantageSMA>(
        `${BASE_URL}?function=SMA&symbol=${symbol}&interval=daily&time_period=50&series_type=close&apikey=${API_KEY}`
      );

      const data = {
        rsi: rsiResponse.data,
        macd: macdResponse.data,
        sma: smaResponse.data
      };

      return this.processAnalysisData(data);
    } catch (error) {
      console.error('Error fetching stock analysis:', error);
      throw error;
    }
  },

  processStockData(data: { symbol: string; overview: AlphaVantageOverview; quote: AlphaVantageQuote; historicalPrices: any[] }): StockData {
    const { quote, overview } = data;
    
    return {
      symbol: data.symbol,
      name: overview.Name || data.symbol,
      price: parseFloat(quote['05. price']) || 0,
      marketCap: parseFloat(overview.MarketCapitalization) || 0,
      peRatio: parseFloat(overview.PERatio) || 0,
      yearHigh: parseFloat(quote['52WeekHigh']) || 0,
      yearLow: parseFloat(quote['52WeekLow']) || 0,
      volume: parseInt(quote['06. volume']) || 0,
      aiScore: this.calculateAIScore({
        rndInvestment: parseFloat(overview.RAndDExpense) || 0,
        marketCap: parseFloat(overview.MarketCapitalization) || 0,
        revenueGrowth: parseFloat(overview.QuarterlyRevenueGrowthYOY) || 0
      }),
      growthScore: this.calculateGrowthScore({
        revenueGrowth: parseFloat(overview.QuarterlyRevenueGrowthYOY) || 0,
        earningsGrowth: parseFloat(overview.QuarterlyEarningsGrowthYOY) || 0,
        profitMargin: parseFloat(overview.ProfitMargin) || 0
      }),
      riskScore: this.calculateRiskScore({
        beta: parseFloat(overview.Beta) || 1,
        volatility: 0.5, // Default value as Alpha Vantage doesn't provide this directly
        debtToEquity: parseFloat(overview.DebtToEquityRatio) || 0
      }),
      recommendation: 'Loading...',
      predictedPrice: 0,
      historicalPrices: data.historicalPrices || [],
      aiMetrics: {
        rndInvestment: parseFloat(overview.RAndDExpense) || 0,
        patentCount: 0, // Not available in Alpha Vantage
        marketShare: 0, // Not available in Alpha Vantage
        revenueGrowth: parseFloat(overview.QuarterlyRevenueGrowthYOY) || 0,
        aiAdoption: 0.5 // Default value as this is a custom metric
      }
    };
  },

  processAnalysisData(data: { rsi: AlphaVantageRSI; macd: AlphaVantageMACD; sma: AlphaVantageSMA }): StockAnalysis {
    const rsiData = Object.values(data.rsi['Technical Analysis: RSI'] || {})[0] || { RSI: '0' };
    const macdData = Object.values(data.macd['Technical Analysis: MACD'] || {})[0] || { MACD: '0', MACD_Signal: '0' };
    const smaData = Object.values(data.sma['Technical Analysis: SMA'] || {})[0] || { SMA: '0' };

    return {
      technicalIndicators: {
        rsi: parseFloat(rsiData.RSI) || 0,
        macd: parseFloat(macdData.MACD) || 0,
        movingAverage50: parseFloat(smaData.SMA) || 0,
        movingAverage200: 0 // Would need another API call for 200-day MA
      },
      sentimentScore: 50, // Default neutral sentiment as this requires additional data sources
      buyingOpportunity: this.determineBuyingOpportunity({
        rsi: parseFloat(rsiData.RSI) || 0,
        macdSignal: parseFloat(macdData.MACD_Signal) || 0
      }),
      riskLevel: 'Medium', // Default value
      priceTargets: {
        low: 0,
        medium: 0,
        high: 0
      }
    };
  },

  calculateAIScore(data: { rndInvestment: number; marketCap: number; revenueGrowth: number }): number {
    const weights = {
      rndInvestment: 0.3,
      marketCap: 0.2,
      revenueGrowth: 0.5
    };

    const normalizedRnD = Math.min(data.rndInvestment / 1e9, 1);
    const normalizedMarketCap = Math.min(data.marketCap / 1e12, 1);
    const normalizedGrowth = Math.min(Math.max(data.revenueGrowth, 0) / 100, 1);

    return (
      normalizedRnD * weights.rndInvestment +
      normalizedMarketCap * weights.marketCap +
      normalizedGrowth * weights.revenueGrowth
    ) * 10;
  },

  calculateGrowthScore(data: { revenueGrowth: number; earningsGrowth: number; profitMargin: number }): number {
    const weights = {
      revenueGrowth: 0.4,
      earningsGrowth: 0.4,
      profitMargin: 0.2
    };

    const normalizedRevenueGrowth = Math.min(Math.max(data.revenueGrowth, 0) / 100, 1);
    const normalizedEarningsGrowth = Math.min(Math.max(data.earningsGrowth, 0) / 100, 1);
    const normalizedProfitMargin = Math.min(Math.max(data.profitMargin, 0), 1);

    return (
      normalizedRevenueGrowth * weights.revenueGrowth +
      normalizedEarningsGrowth * weights.earningsGrowth +
      normalizedProfitMargin * weights.profitMargin
    ) * 10;
  },

  calculateRiskScore(data: { beta: number; volatility: number; debtToEquity: number }): number {
    const weights = {
      beta: 0.4,
      volatility: 0.3,
      debtToEquity: 0.3
    };

    const normalizedBeta = Math.min(Math.abs(data.beta), 2) / 2;
    const normalizedVolatility = Math.min(data.volatility, 1);
    const normalizedDebtToEquity = Math.min(data.debtToEquity / 2, 1);

    return (
      normalizedBeta * weights.beta +
      normalizedVolatility * weights.volatility +
      normalizedDebtToEquity * weights.debtToEquity
    ) * 10;
  },

  generateRecommendation(data: any): string {
    const aiScore = this.calculateAIScore(data);
    const growthScore = this.calculateGrowthScore(data);
    const riskScore = this.calculateRiskScore(data);
    
    if (aiScore > 8 && growthScore > 7 && riskScore < 5) {
      return 'Strong Buy';
    } else if (aiScore > 6 && growthScore > 5 && riskScore < 7) {
      return 'Buy';
    } else if (aiScore > 4 && growthScore > 3 && riskScore < 8) {
      return 'Hold';
    } else {
      return 'Watch';
    }
  },

  calculatePricePrediction(data: { price: number; revenueGrowth: number; peRatio: number }): number {
    const currentPrice = data.price || 0;
    const growthRate = data.revenueGrowth / 100 || 0;
    const marketMultiple = 15;
    
    return currentPrice * (1 + growthRate) * (marketMultiple / (data.peRatio || marketMultiple));
  },

  determineBuyingOpportunity(data: { rsi: number; macdSignal: number }): string {
    const rsi = data.rsi || 0;
    const macdSignal = data.macdSignal || 0;
    
    if (rsi < 30 && macdSignal > 0) {
      return 'Strong Buy Signal';
    } else if (rsi < 40 && macdSignal > 0) {
      return 'Potential Buy Signal';
    } else if (rsi > 70) {
      return 'Wait for Pull Back';
    } else {
      return 'Monitor';
    }
  },

  determineRiskLevel(data: { volatility: number; beta: number }): string {
    const volatility = data.volatility || 0;
    const beta = data.beta || 1;
    
    if (volatility > 0.4 || beta > 2) {
      return 'High';
    } else if (volatility > 0.2 || beta > 1.5) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }
}; 
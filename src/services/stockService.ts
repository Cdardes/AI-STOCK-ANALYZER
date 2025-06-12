import OpenAI from 'openai';
import { StockData, StockAnalysis } from '../types/stock';

console.log('API Key available:', !!process.env.REACT_APP_OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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

export const stockService = {
  async getTopAIStocks(): Promise<StockData[]> {
    try {
      const stocksData = await Promise.all(
        AI_STOCKS.map(async (symbol) => {
          const analysis = await this.getAIAnalysis(symbol);
          return this.processStockData(symbol, analysis);
        })
      );
      return stocksData;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  },

  async getAIAnalysis(symbol: string): Promise<any> {
    try {
      const prompt = `Analyze the AI company ${symbol} and provide the following information in JSON format:
      {
        "name": "Full company name",
        "currentPrice": "Approximate current stock price",
        "marketCap": "Approximate market cap in billions",
        "peRatio": "Approximate P/E ratio",
        "yearHigh": "52-week high price",
        "yearLow": "52-week low price",
        "volume": "Average daily volume",
        "aiMetrics": {
          "rndInvestment": "Approximate R&D investment in millions",
          "patentCount": "Number of AI-related patents",
          "marketShare": "AI market share percentage",
          "revenueGrowth": "YoY revenue growth percentage",
          "aiAdoption": "AI adoption score (0-1)"
        },
        "analysis": {
          "strengths": ["List of key strengths"],
          "weaknesses": ["List of key weaknesses"],
          "opportunities": ["List of opportunities"],
          "threats": ["List of threats"]
        },
        "recommendation": "Buy/Hold/Sell recommendation with brief explanation"
      }`;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a financial analyst specializing in AI companies. Provide detailed, accurate analysis based on public information and market trends."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-4-turbo-preview",
      });

      const response = completion.choices[0]?.message?.content;
      return response ? JSON.parse(response) : null;
    } catch (error) {
      console.error(`Error analyzing stock ${symbol}:`, error);
      throw error;
    }
  },

  async getStockAnalysis(symbol: string): Promise<StockAnalysis> {
    try {
      const prompt = `Provide a detailed technical and fundamental analysis for ${symbol} in JSON format:
      {
        "technicalIndicators": {
          "rsi": "Relative Strength Index value",
          "macd": "MACD value",
          "movingAverage50": "50-day moving average",
          "movingAverage200": "200-day moving average"
        },
        "sentimentScore": "Market sentiment score (0-100)",
        "buyingOpportunity": "Strong Buy/Buy/Hold/Sell/Strong Sell",
        "riskLevel": "Low/Medium/High",
        "priceTargets": {
          "low": "Conservative price target",
          "medium": "Average price target",
          "high": "Optimistic price target"
        }
      }`;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a technical analyst specializing in AI companies. Provide detailed technical analysis based on current market conditions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-4-turbo-preview",
      });

      const response = completion.choices[0]?.message?.content;
      return response ? JSON.parse(response) : null;
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
    // Calculate risk score based on market volatility, competition, and market position
    const baseRisk = 5; // Medium risk
    if (!data || !data.analysis) return baseRisk;

    const threats = data.analysis.threats.length;
    const strengths = data.analysis.strengths.length;
    
    // Adjust risk based on SWOT analysis
    let riskScore = baseRisk + (threats * 0.5) - (strengths * 0.3);
    
    // Ensure risk score stays within 0-10 range
    return Math.min(Math.max(riskScore, 0), 10);
  },

  calculatePricePrediction(data: any): number {
    if (!data || !data.currentPrice) return 0;
    
    const currentPrice = parseFloat(data.currentPrice);
    const growth = data.aiMetrics?.revenueGrowth || 0;
    
    // Simple prediction model based on current price and growth
    return currentPrice * (1 + (growth / 100));
  }
}; 
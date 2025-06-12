export interface StockData {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  peRatio: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  aiScore: number;  // Custom score based on AI potential
  growthScore: number;  // Growth potential score
  riskScore: number;  // Risk assessment score
  recommendation: string;
  predictedPrice: number;
  historicalPrices: PricePoint[];
  aiMetrics: AIMetrics;
}

export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

export interface AIMetrics {
  rndInvestment: number;  // R&D investment in AI
  patentCount: number;    // AI-related patents
  marketShare: number;    // Market share in AI sector
  revenueGrowth: number; // YoY revenue growth
  aiAdoption: number;    // AI adoption score
}

export interface StockAnalysis {
  technicalIndicators: {
    rsi: number;
    macd: number;
    movingAverage50: number;
    movingAverage200: number;
  };
  sentimentScore: number;
  buyingOpportunity: string;
  riskLevel: string;
  priceTargets: {
    low: number;
    medium: number;
    high: number;
  };
} 
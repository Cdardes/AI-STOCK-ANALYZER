export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface SocialSentiment {
  platform: string;
  sentiment: string;
  mentions: number;
  url: string;
}

export interface Competitor {
  symbol: string;
  name: string;
  marketShare: number;
  comparison: {
    aiScore: number;
    growthScore: number;
    riskScore: number;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  layout: 'grid' | 'list' | 'dashboard';
  watchlist: string[];
  notes: Record<string, string>;
  alerts: {
    priceChange: number;
    volumeSpike: number;
    newsAlert: boolean;
  };
}

export interface TechnicalIndicators {
  rsi: number;
  macd: number;
  movingAverage50: number;
  movingAverage200: number;
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  volume: {
    average: number;
    current: number;
    change: number;
  };
}

export interface DividendInfo {
  yield: number;
  payoutRatio: number;
  nextDividendDate: string;
  annualDividend: number;
  dividendGrowth: number;
}

export interface InstitutionalOwnership {
  totalShares: number;
  percentage: number;
  topHolders: Array<{
    name: string;
    shares: number;
    percentage: number;
  }>;
}

export interface EarningsInfo {
  nextEarningsDate: string;
  estimatedEPS: number;
  actualEPS?: number;
  surprise?: number;
  yearAheadEstimate: number;
}

export interface StockMetrics {
  technicalIndicators: TechnicalIndicators;
  dividendInfo: DividendInfo;
  institutionalOwnership: InstitutionalOwnership;
  earningsInfo: EarningsInfo;
  news: NewsItem[];
  socialSentiment: SocialSentiment;
  competitors: Competitor[];
} 
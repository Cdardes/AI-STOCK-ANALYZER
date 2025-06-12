import { StockMetrics } from '../types/enhanced';

export const getEnhancedStockMetrics = (symbol: string): StockMetrics => {
  // Mock data for enhanced stock metrics
  return {
    technicalIndicators: {
      rsi: Math.random() * 100,
      macd: (Math.random() - 0.5) * 10,
      movingAverage50: Math.random() * 1000,
      movingAverage200: Math.random() * 1000,
      bollingerBands: {
        upper: Math.random() * 1000,
        middle: Math.random() * 1000,
        lower: Math.random() * 1000
      },
      volume: {
        current: Math.floor(Math.random() * 10000000),
        average: Math.floor(Math.random() * 10000000),
        change: (Math.random() - 0.5) * 20
      }
    },
    news: [
      {
        id: '1',
        title: 'Company Announces Strong Q4 Results',
        summary: 'The company reported better-than-expected earnings and revenue for the fourth quarter.',
        source: 'Financial Times',
        date: new Date().toISOString(),
        sentiment: 'positive',
        url: 'https://example.com/news/1'
      },
      {
        id: '2',
        title: 'New Product Launch Expected Next Month',
        summary: 'The company is preparing to launch its latest product line, which analysts expect to drive growth.',
        source: 'Bloomberg',
        date: new Date(Date.now() - 86400000).toISOString(),
        sentiment: 'positive',
        url: 'https://example.com/news/2'
      },
      {
        id: '3',
        title: 'Market Competition Intensifies',
        summary: 'Competitors are increasing their market share, posing challenges for the company.',
        source: 'Wall Street Journal',
        date: new Date(Date.now() - 172800000).toISOString(),
        sentiment: 'negative',
        url: 'https://example.com/news/3'
      }
    ],
    competitors: [
      {
        symbol: 'COMP1',
        name: 'Competitor One',
        marketShare: 25.5,
        comparison: {
          aiScore: 8.5,
          growthScore: 7.8,
          riskScore: 6.2
        }
      },
      {
        symbol: 'COMP2',
        name: 'Competitor Two',
        marketShare: 18.3,
        comparison: {
          aiScore: 7.2,
          growthScore: 8.1,
          riskScore: 7.5
        }
      },
      {
        symbol: 'COMP3',
        name: 'Competitor Three',
        marketShare: 15.7,
        comparison: {
          aiScore: 6.8,
          growthScore: 6.5,
          riskScore: 8.2
        }
      }
    ],
    institutionalOwnership: {
      totalShares: Math.floor(Math.random() * 1000000000),
      percentage: Math.random() * 100,
      topHolders: [
        {
          name: 'Vanguard Group',
          shares: Math.floor(Math.random() * 10000000),
          percentage: Math.random() * 10
        },
        {
          name: 'BlackRock',
          shares: Math.floor(Math.random() * 10000000),
          percentage: Math.random() * 10
        },
        {
          name: 'State Street',
          shares: Math.floor(Math.random() * 10000000),
          percentage: Math.random() * 10
        }
      ]
    },
    earningsInfo: {
      nextEarningsDate: new Date(Date.now() + 30 * 86400000).toISOString(),
      estimatedEPS: Number((Math.random() * 5).toFixed(2)),
      actualEPS: Math.random() > 0.5 ? Number((Math.random() * 5).toFixed(2)) : undefined,
      yearAheadEstimate: Number((Math.random() * 6).toFixed(2)),
      surprise: Math.random() > 0.5 ? Number((Math.random() * 10 - 5).toFixed(2)) : undefined
    },
    dividendInfo: {
      yield: Number((Math.random() * 5).toFixed(2)),
      annualDividend: Number((Math.random() * 10).toFixed(2)),
      payoutRatio: Number((Math.random() * 100).toFixed(2)),
      nextDividendDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      dividendGrowth: Number((Math.random() * 20).toFixed(2))
    },
    socialSentiment: {
      twitter: {
        sentiment: Number((Math.random() * 2 - 1).toFixed(2)),
        volume: Math.floor(Math.random() * 10000),
        trending: Math.random() > 0.5
      },
      reddit: {
        sentiment: Number((Math.random() * 2 - 1).toFixed(2)),
        volume: Math.floor(Math.random() * 5000),
        trending: Math.random() > 0.5
      },
      overall: Number((Math.random() * 2 - 1).toFixed(2))
    }
  };
}; 
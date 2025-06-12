import { NewsItem, SocialSentiment } from '../types/enhanced';

export const getNewsAndSocialData = async (symbol: string): Promise<{ news: NewsItem[], socialSentiment: SocialSentiment }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock news data
  const news: NewsItem[] = [
    {
      id: '1',
      title: `${symbol} Announces Strong Q4 Earnings`,
      summary: 'The company reported better-than-expected earnings, driven by strong growth in their AI division.',
      source: 'Financial Times',
      date: new Date().toISOString(),
      url: 'https://example.com/news/1',
      sentiment: 'positive'
    },
    {
      id: '2',
      title: `${symbol} Partners with Tech Giant for AI Innovation`,
      summary: 'A new strategic partnership aims to accelerate AI development and market expansion.',
      source: 'TechCrunch',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      url: 'https://example.com/news/2',
      sentiment: 'positive'
    },
    {
      id: '3',
      title: `Analysts Raise Price Target for ${symbol}`,
      summary: 'Multiple analysts have increased their price targets following recent positive developments.',
      source: 'Bloomberg',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      url: 'https://example.com/news/3',
      sentiment: 'positive'
    },
    {
      id: '4',
      title: `${symbol} Faces Regulatory Scrutiny`,
      summary: 'The company is under review for compliance with new industry regulations.',
      source: 'Reuters',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      url: 'https://example.com/news/4',
      sentiment: 'negative'
    }
  ];

  // Mock social sentiment data
  const socialSentiment: SocialSentiment = {
    twitter: {
      sentiment: 0.75,
      volume: 12500,
      trending: true
    },
    reddit: {
      sentiment: 0.65,
      volume: 8500,
      trending: true
    },
    overall: 0.70
  };

  return { news, socialSentiment };
}; 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Timeline,
  Assessment,
  ShowChart,
  Article,
  People,
  AttachMoney,
  CompareArrows,
  Star,
  StarBorder,
  Info
} from '@mui/icons-material';
import { StockMetrics, NewsItem, Competitor, SocialSentiment } from '../types/enhanced';
import { StockData } from '../types/stock';
import { StockCalculator } from './StockCalculator';
import { NewsAndSocial } from './NewsAndSocial';
import { getNewsAndSocialData } from '../services/newsService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`stock-tabpanel-${index}`}
      aria-labelledby={`stock-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const technicalIndicatorDefinitions = {
  rsi: {
    name: "Relative Strength Index (RSI)",
    description: "A momentum oscillator that measures the speed and change of price movements. RSI values range from 0 to 100. Traditionally, RSI is considered overbought when above 70 and oversold when below 30.",
    interpretation: "Higher values indicate stronger momentum, while lower values suggest weaker momentum."
  },
  macd: {
    name: "Moving Average Convergence Divergence (MACD)",
    description: "A trend-following momentum indicator that shows the relationship between two moving averages of a security's price. The MACD is calculated by subtracting the 26-period EMA from the 12-period EMA.",
    interpretation: "Positive values suggest upward momentum, while negative values indicate downward momentum."
  },
  bollingerBands: {
    name: "Bollinger Bands",
    description: "A volatility indicator consisting of three lines: a simple moving average (middle band) and two standard deviations above and below it (upper and lower bands).",
    interpretation: "Prices near the upper band suggest overbought conditions, while prices near the lower band suggest oversold conditions."
  },
  volume: {
    name: "Volume",
    description: "The number of shares or contracts traded in a security or market during a given period. It is a measure of market activity and liquidity.",
    interpretation: "Higher volume often indicates stronger price movements and greater market interest."
  },
  movingAverages: {
    name: "Moving Averages",
    description: "Technical indicators that smooth out price data by creating a constantly updated average price. Common periods include 50-day and 200-day moving averages.",
    interpretation: "Price above moving average suggests uptrend, while price below suggests downtrend."
  }
};

interface EnhancedStockAnalysisProps {
  stock: StockData;
}

export const EnhancedStockAnalysis: React.FC<EnhancedStockAnalysisProps> = ({ stock }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [newsData, setNewsData] = useState<{ news: NewsItem[], socialSentiment: SocialSentiment } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleInfoClick = () => {
    setInfoDialogOpen(true);
  };

  const handleCloseInfo = () => {
    setInfoDialogOpen(false);
  };

  useEffect(() => {
    const fetchNewsAndSocialData = async () => {
      setLoading(true);
      try {
        const data = await getNewsAndSocialData(stock.symbol);
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news and social data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndSocialData();
  }, [stock.symbol]);

  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'AI Technology Breakthrough',
      source: 'Tech News',
      date: '2024-03-20',
      url: 'https://www.reuters.com/technology/',
      sentiment: 'positive',
      summary: 'Company announces breakthrough in AI technology'
    },
    {
      id: '2',
      title: 'Market Analysis Report',
      source: 'Financial Times',
      date: '2024-03-19',
      url: 'https://www.ft.com/',
      sentiment: 'neutral',
      summary: 'Latest market trends and analysis'
    }
  ];

  const mockSocial: SocialSentiment[] = [
    {
      platform: 'Twitter',
      sentiment: 'positive',
      mentions: 1200,
      url: 'https://twitter.com/search?q='
    },
    {
      platform: 'Reddit',
      sentiment: 'neutral',
      mentions: 800,
      url: 'https://www.reddit.com/search?q='
    }
  ];

  const renderNewsItem = (news: NewsItem) => (
    <Card key={news.id} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {news.source} • {news.date}
        </Typography>
        <Typography variant="body2" paragraph>
          {news.summary}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );

  const renderSocialSentiment = (social: SocialSentiment) => (
    <Card key={social.platform} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {social.platform}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Mentions: {social.mentions}
        </Typography>
        <Typography variant="body2" paragraph>
          Sentiment: {social.sentiment}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href={`${social.url}${stock.symbol}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Discussions
        </Button>
      </CardContent>
    </Card>
  );

  const renderCompanyOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Company Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Symbol
              </Typography>
              <Typography variant="body1">
                {stock.symbol}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Company Name
              </Typography>
              <Typography variant="body1">
                {stock.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Current Price
              </Typography>
              <Typography variant="body1">
                ${stock.price.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Market Cap
              </Typography>
              <Typography variant="body1">
                ${(stock.marketCap / 1e9).toFixed(2)}B
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                P/E Ratio
              </Typography>
              <Typography variant="body1">
                {stock.peRatio.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Volume
              </Typography>
              <Typography variant="body1">
                {(stock.volume / 1e6).toFixed(2)}M
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            AI Analysis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                AI Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinearProgress
                  variant="determinate"
                  value={stock.aiScore * 10}
                  color="primary"
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <Typography variant="body2">
                  {stock.aiScore.toFixed(1)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Growth Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinearProgress
                  variant="determinate"
                  value={stock.growthScore * 10}
                  color="primary"
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <Typography variant="body2">
                  {stock.growthScore.toFixed(1)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Risk Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinearProgress
                  variant="determinate"
                  value={stock.riskScore * 10}
                  color="error"
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <Typography variant="body2">
                  {stock.riskScore.toFixed(1)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Price Analysis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                52-Week High
              </Typography>
              <Typography variant="body1">
                ${stock.yearHigh.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                52-Week Low
              </Typography>
              <Typography variant="body1">
                ${stock.yearLow.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Previous Close
              </Typography>
              <Typography variant="body1">
                ${stock.previousClose.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Predicted Price
              </Typography>
              <Typography variant="body1" color={stock.predictedPrice > stock.price ? 'success.main' : 'error.main'}>
                ${stock.predictedPrice.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderTechnicalIndicator = (name: string, value: number, definition: any) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          {definition.name}
        </Typography>
        <Tooltip title="Click for more information">
          <IconButton size="small" onClick={handleInfoClick}>
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={value * 10} 
        sx={{ 
          height: 10, 
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: value > 7 ? '#4caf50' : value > 4 ? '#ff9800' : '#f44336'
          }
        }} 
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {value.toFixed(1)}/10
      </Typography>
    </Box>
  );

  const renderVolumeIndicator = (volume: { average: number; current: number; change: number }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Volume Analysis
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Current</Typography>
          <Typography variant="body1">{volume.current.toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Average</Typography>
          <Typography variant="body1">{volume.average.toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Change</Typography>
          <Typography 
            variant="body1" 
            color={volume.change > 0 ? 'success.main' : 'error.main'}
          >
            {volume.change > 0 ? '+' : ''}{volume.change.toFixed(2)}%
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderBollingerBands = (bands: { upper: number; middle: number; lower: number }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Bollinger Bands
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Upper</Typography>
          <Typography variant="body1">${bands.upper.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Middle</Typography>
          <Typography variant="body1">${bands.middle.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Lower</Typography>
          <Typography variant="body1">${bands.lower.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Paper sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', px: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {stock.name} ({stock.symbol})
        </Typography>
      </Box>

      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="stock analysis tabs">
        <Tab label="Overview" />
        <Tab label="Technical Analysis" />
        <Tab label="News & Social" />
      </Tabs>

      <TabPanel value={selectedTab} index={0}>
        {renderCompanyOverview()}
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Technical Indicators
            </Typography>
            {renderTechnicalIndicator('RSI', stock.technicalIndicators.rsi, technicalIndicatorDefinitions.rsi)}
            {renderTechnicalIndicator('MACD', stock.technicalIndicators.macd, technicalIndicatorDefinitions.macd)}
            {renderTechnicalIndicator('50-Day MA', stock.technicalIndicators.movingAverage50, technicalIndicatorDefinitions.movingAverages)}
            {renderTechnicalIndicator('200-Day MA', stock.technicalIndicators.movingAverage200, technicalIndicatorDefinitions.movingAverages)}
            {renderVolumeIndicator(stock.technicalIndicators.volume)}
            {renderBollingerBands(stock.technicalIndicators.bollingerBands)}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : newsData ? (
          <NewsAndSocial
            news={newsData.news}
            socialSentiment={newsData.socialSentiment}
            stockSymbol={stock.symbol}
          />
        ) : (
          <Typography variant="body1" sx={{ p: 3 }}>
            No news and social data available.
          </Typography>
        )}
      </TabPanel>

      <Dialog
        open={infoDialogOpen}
        onClose={handleCloseInfo}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Technical Indicators Information</DialogTitle>
        <DialogContent>
          {Object.entries(technicalIndicatorDefinitions).map(([key, definition]) => (
            <Box key={key} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {definition.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {definition.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interpretation: {definition.interpretation}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfo}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}; 
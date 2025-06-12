import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Link,
  CircularProgress
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  Reddit as RedditIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import { NewsItem, SocialSentiment } from '../types/enhanced';

interface NewsAndSocialProps {
  news: NewsItem[];
  socialSentiment: SocialSentiment;
  stockSymbol: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`news-tabpanel-${index}`}
      aria-labelledby={`news-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const NewsAndSocial: React.FC<NewsAndSocialProps> = ({
  news,
  socialSentiment,
  stockSymbol
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getSentimentColor = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderNewsItem = (item: NewsItem) => (
    <Card key={item.id} sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Chip
                label={item.sentiment}
                color={getSentimentColor(item.sentiment)}
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {item.source} • {new Date(item.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" paragraph>
              {item.summary}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                Read More
                <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderSocialSentiment = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TwitterIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Twitter Sentiment</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Sentiment Score
              </Typography>
              <Typography variant="h4" color={socialSentiment.twitter.sentiment > 0 ? 'success.main' : 'error.main'}>
                {socialSentiment.twitter.sentiment > 0 ? '+' : ''}{socialSentiment.twitter.sentiment.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Volume
              </Typography>
              <Typography variant="h6">
                {socialSentiment.twitter.volume.toLocaleString()} mentions
              </Typography>
            </Box>
            {socialSentiment.twitter.trending && (
              <Chip
                icon={<TrendingUpIcon />}
                label="Trending"
                color="primary"
                size="small"
              />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RedditIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Reddit Sentiment</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Sentiment Score
              </Typography>
              <Typography variant="h4" color={socialSentiment.reddit.sentiment > 0 ? 'success.main' : 'error.main'}>
                {socialSentiment.reddit.sentiment > 0 ? '+' : ''}{socialSentiment.reddit.sentiment.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Volume
              </Typography>
              <Typography variant="h6">
                {socialSentiment.reddit.volume.toLocaleString()} mentions
              </Typography>
            </Box>
            {socialSentiment.reddit.trending && (
              <Chip
                icon={<TrendingUpIcon />}
                label="Trending"
                color="primary"
                size="small"
              />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Overall Social Sentiment
            </Typography>
            <Typography variant="h4" color={socialSentiment.overall > 0 ? 'success.main' : 'error.main'}>
              {socialSentiment.overall > 0 ? '+' : ''}{socialSentiment.overall.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Paper sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="News" />
          <Tab label="Social Media" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Latest News for {stockSymbol}
          </Typography>
        </Box>
        {news.map(renderNewsItem)}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderSocialSentiment()}
      </TabPanel>
    </Paper>
  );
}; 
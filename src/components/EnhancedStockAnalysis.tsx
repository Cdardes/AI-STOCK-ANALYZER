import React, { useState } from 'react';
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
  LinearProgress
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
  StarBorder
} from '@mui/icons-material';
import { StockMetrics, NewsItem, Competitor } from '../types/enhanced';
import { StockData } from '../types/stock';

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

interface EnhancedStockAnalysisProps {
  stock: StockData;
  metrics: StockMetrics;
  onAddToWatchlist: (symbol: string) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  isInWatchlist: boolean;
}

export const EnhancedStockAnalysis: React.FC<EnhancedStockAnalysisProps> = ({
  stock,
  metrics,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isInWatchlist
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderNewsItem = (news: NewsItem) => (
    <ListItem key={news.id}>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1">{news.title}</Typography>
            <Chip
              size="small"
              label={news.sentiment}
              color={
                news.sentiment === 'positive' ? 'success' :
                news.sentiment === 'negative' ? 'error' : 'default'
              }
            />
          </Box>
        }
        secondary={
          <>
            <Typography variant="body2" color="textSecondary">
              {news.source} • {new Date(news.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">{news.summary}</Typography>
          </>
        }
      />
    </ListItem>
  );

  const renderCompetitor = (competitor: Competitor) => (
    <Card key={competitor.symbol} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{competitor.name}</Typography>
        <Typography color="textSecondary" gutterBottom>
          Market Share: {competitor.marketShare}%
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2">AI Score</Typography>
            <LinearProgress
              variant="determinate"
              value={competitor.comparison.aiScore * 10}
              color="primary"
            />
            <Typography variant="body2">{competitor.comparison.aiScore.toFixed(1)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Growth</Typography>
            <LinearProgress
              variant="determinate"
              value={competitor.comparison.growthScore * 10}
              color="success"
            />
            <Typography variant="body2">{competitor.comparison.growthScore.toFixed(1)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Risk</Typography>
            <LinearProgress
              variant="determinate"
              value={competitor.comparison.riskScore * 10}
              color="error"
            />
            <Typography variant="body2">{competitor.comparison.riskScore.toFixed(1)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" px={2}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<Timeline />} label="Technical" />
            <Tab icon={<Article />} label="News" />
            <Tab icon={<People />} label="Ownership" />
            <Tab icon={<AttachMoney />} label="Earnings" />
            <Tab icon={<CompareArrows />} label="Competitors" />
          </Tabs>
          <Tooltip title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
            <IconButton
              onClick={() => isInWatchlist ? onRemoveFromWatchlist(stock.symbol) : onAddToWatchlist(stock.symbol)}
              color={isInWatchlist ? "primary" : "default"}
            >
              {isInWatchlist ? <Star /> : <StarBorder />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Technical Indicators
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="RSI"
                  secondary={metrics.technicalIndicators.rsi.toFixed(2)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="MACD"
                  secondary={metrics.technicalIndicators.macd.toFixed(2)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="50-Day MA"
                  secondary={metrics.technicalIndicators.movingAverage50.toFixed(2)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="200-Day MA"
                  secondary={metrics.technicalIndicators.movingAverage200.toFixed(2)}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Volume Analysis
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Current Volume"
                  secondary={metrics.technicalIndicators.volume.current.toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Average Volume"
                  secondary={metrics.technicalIndicators.volume.average.toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Volume Change"
                  secondary={`${metrics.technicalIndicators.volume.change > 0 ? '+' : ''}${metrics.technicalIndicators.volume.change.toFixed(2)}%`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Latest News
        </Typography>
        <List>
          {metrics.news.map(renderNewsItem)}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Institutional Ownership
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Shares: {metrics.institutionalOwnership.totalShares.toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Percentage: {metrics.institutionalOwnership.percentage.toFixed(2)}%
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Top Holders
        </Typography>
        <List>
          {metrics.institutionalOwnership.topHolders.map((holder, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={holder.name}
                secondary={`${holder.shares.toLocaleString()} shares (${holder.percentage.toFixed(2)}%)`}
              />
            </ListItem>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Earnings Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Next Earnings Date"
                  secondary={new Date(metrics.earningsInfo.nextEarningsDate).toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Estimated EPS"
                  secondary={metrics.earningsInfo.estimatedEPS.toFixed(2)}
                />
              </ListItem>
              {metrics.earningsInfo.actualEPS && (
                <ListItem>
                  <ListItemText
                    primary="Actual EPS"
                    secondary={metrics.earningsInfo.actualEPS.toFixed(2)}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Year Ahead Estimate"
                  secondary={metrics.earningsInfo.yearAheadEstimate.toFixed(2)}
                />
              </ListItem>
              {metrics.earningsInfo.surprise && (
                <ListItem>
                  <ListItemText
                    primary="Earnings Surprise"
                    secondary={`${metrics.earningsInfo.surprise > 0 ? '+' : ''}${metrics.earningsInfo.surprise.toFixed(2)}%`}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6" gutterBottom>
          Competitor Analysis
        </Typography>
        {metrics.competitors.map(renderCompetitor)}
      </TabPanel>
    </Paper>
  );
}; 
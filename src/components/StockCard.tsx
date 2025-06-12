import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  Grid
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info as InfoIcon,
  ShowChart as ChartIcon
} from '@mui/icons-material';
import { StockData } from '../types/stock';

interface StockCardProps {
  stock: StockData;
  onClick: () => void;
}

const metricDefinitions = {
  aiScore: "AI Score (0-10): Measures the company's AI capabilities based on R&D investment, patents, market share, revenue growth, and AI adoption rate.",
  growthScore: "Growth Score (0-10): Indicates the company's growth potential based on revenue growth and market expansion.",
  riskScore: "Risk Score (0-10): Evaluates investment risk based on market volatility, competition, and company stability. Lower is better.",
  peRatio: "P/E Ratio: Price-to-Earnings ratio. Measures stock valuation relative to earnings. Lower may indicate better value.",
  marketCap: "Market Cap: Total market value of the company's shares. Indicates company size and market presence.",
  recommendation: "Recommendation: Analyst consensus on whether to buy, hold, or sell the stock.",
  predictedPrice: "Predicted Price: Estimated future stock price based on growth projections and market analysis."
};

export const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const priceChange = stock.price - stock.previousClose;
  const priceChangePercent = (priceChange / stock.previousClose) * 100;
  const isPositive = priceChange >= 0;

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'success';
    if (score >= 4) return 'warning';
    return 'error';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`;
    return `${marketCap.toFixed(2)}`;
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" component="div">
              {stock.symbol}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {stock.name}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              color={isPositive ? 'success.main' : 'error.main'}
              sx={{ mr: 1 }}
            >
              ${stock.price.toFixed(2)}
            </Typography>
            <Chip
              size="small"
              icon={isPositive ? <TrendingUp /> : <TrendingDown />}
              label={`${isPositive ? '+' : ''}${priceChangePercent.toFixed(2)}%`}
              color={isPositive ? 'success' : 'error'}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Market Cap
            </Typography>
            <Typography variant="body1">
              ${(stock.marketCap / 1e9).toFixed(2)}B
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Volume
            </Typography>
            <Typography variant="body1">
              {(stock.volume / 1e6).toFixed(2)}M
            </Typography>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            AI Score
          </Typography>
          <Box display="flex" alignItems="center">
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
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Tooltip title="View Analysis">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Chart">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}>
              <ChartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}; 
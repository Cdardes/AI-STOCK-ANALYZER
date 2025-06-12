import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info as InfoIcon,
  ShowChart as ChartIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { StockData } from '../types/stock';

interface StockCardProps {
  stock: StockData;
  onClick: () => void;
  onAddToWatchlist: (symbol: string) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  isInWatchlist: boolean;
}

export const StockCard: React.FC<StockCardProps> = ({
  stock,
  onClick,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isInWatchlist,
}) => {
  const priceChange = stock.price - stock.previousClose;
  const priceChangePercent = (priceChange / stock.previousClose) * 100;
  const isPositive = priceChange >= 0;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      onRemoveFromWatchlist(stock.symbol);
    } else {
      onAddToWatchlist(stock.symbol);
    }
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
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
            AI Analysis
          </Typography>
          <Box display="flex" gap={1}>
            <Chip
              label={`AI Score: ${stock.aiScore}`}
              size="small"
              color="primary"
            />
            <Chip
              label={`Growth: ${stock.growthScore}`}
              size="small"
              color="success"
            />
            <Chip
              label={`Risk: ${stock.riskScore}`}
              size="small"
              color="warning"
            />
          </Box>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Box>
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
          <Tooltip title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
            <IconButton
              size="small"
              onClick={handleWatchlistClick}
              color={isInWatchlist ? "primary" : "default"}
            >
              {isInWatchlist ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}; 
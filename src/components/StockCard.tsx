import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid } from '@mui/material';
import { StockData } from '../types/stock';

interface StockCardProps {
  stock: StockData;
  onClick: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
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
      onClick={onClick}
      sx={{ 
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div">
                {stock.symbol}
              </Typography>
              <Chip 
                label={stock.recommendation}
                color={stock.recommendation === 'Strong Buy' ? 'success' : 
                       stock.recommendation === 'Buy' ? 'primary' :
                       stock.recommendation === 'Hold' ? 'warning' : 'default'}
              />
            </Box>
            <Typography color="textSecondary" gutterBottom>
              {stock.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="div">
                {formatNumber(stock.price)}
              </Typography>
              <Typography color="textSecondary">
                Market Cap: {formatMarketCap(stock.marketCap)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Chip 
                label={`AI Score: ${stock.aiScore.toFixed(1)}`}
                color={getScoreColor(stock.aiScore) as any}
                size="small"
              />
              <Chip 
                label={`Growth: ${stock.growthScore.toFixed(1)}`}
                color={getScoreColor(stock.growthScore) as any}
                size="small"
              />
              <Chip 
                label={`Risk: ${stock.riskScore.toFixed(1)}`}
                color={getScoreColor(10 - stock.riskScore) as any}
                size="small"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Predicted: {formatNumber(stock.predictedPrice)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                P/E: {stock.peRatio.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 
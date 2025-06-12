import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info as InfoIcon,
} from '@mui/icons-material';

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketOverviewProps {
  indices: MarketIndex[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercent = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Market Overview
        </Typography>
        <Tooltip title="Real-time market indices and trends">
          <IconButton size="small">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={2}>
        {indices.map((index) => (
          <Grid item xs={12} sm={6} md={3} key={index.name}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {index.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {formatNumber(index.value)}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                {index.change >= 0 ? (
                  <TrendingUp color="success" />
                ) : (
                  <TrendingDown color="error" />
                )}
                <Chip
                  label={formatPercent(index.changePercent)}
                  size="small"
                  color={index.change >= 0 ? 'success' : 'error'}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 
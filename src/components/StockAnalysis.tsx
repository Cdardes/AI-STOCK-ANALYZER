import React from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Box, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { StockAnalysis as StockAnalysisType } from '../types/stock';
import {
  TrendingUp,
  TrendingDown,
  Timeline,
  Assessment,
  ShowChart
} from '@mui/icons-material';

interface StockAnalysisProps {
  analysis: StockAnalysisType;
}

export const StockAnalysis: React.FC<StockAnalysisProps> = ({ analysis }) => {
  const {
    technicalIndicators,
    sentimentScore,
    buyingOpportunity,
    riskLevel,
    priceTargets
  } = analysis;

  const getIndicatorColor = (value: number, threshold: number) => {
    return value > threshold ? 'success.main' : 'error.main';
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Technical Analysis
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              <Timeline /> Technical Indicators
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="RSI (Relative Strength Index)"
                  secondary={
                    <Typography 
                      component="span" 
                      color={getIndicatorColor(technicalIndicators.rsi, 50)}
                    >
                      {technicalIndicators.rsi.toFixed(2)}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="MACD"
                  secondary={
                    <Typography 
                      component="span" 
                      color={getIndicatorColor(technicalIndicators.macd, 0)}
                    >
                      {technicalIndicators.macd.toFixed(2)}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="50-Day Moving Average"
                  secondary={technicalIndicators.movingAverage50.toFixed(2)}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="200-Day Moving Average"
                  secondary={technicalIndicators.movingAverage200.toFixed(2)}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              <Assessment /> Market Sentiment
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Sentiment Score"
                  secondary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography 
                        component="span" 
                        color={getIndicatorColor(sentimentScore, 50)}
                      >
                        {sentimentScore.toFixed(2)}
                      </Typography>
                      {sentimentScore > 50 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Risk Level"
                  secondary={
                    <Chip 
                      label={riskLevel}
                      color={getRiskColor(riskLevel)}
                      size="small"
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Buying Opportunity"
                  secondary={buyingOpportunity}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            <ShowChart /> Price Targets
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  bgcolor: 'error.light'
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Low Target
                </Typography>
                <Typography variant="h6">
                  ${priceTargets.low.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  bgcolor: 'warning.light'
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Medium Target
                </Typography>
                <Typography variant="h6">
                  ${priceTargets.medium.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  bgcolor: 'success.light'
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  High Target
                </Typography>
                <Typography variant="h6">
                  ${priceTargets.high.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}; 
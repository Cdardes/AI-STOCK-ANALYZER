import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Grid, 
  Tooltip, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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
  const [openInfo, setOpenInfo] = React.useState(false);

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
    <>
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
                <Box display="flex" alignItems="center" gap={1}>
                  <Tooltip title={metricDefinitions.recommendation}>
                    <Chip 
                      label={stock.recommendation}
                      color={stock.recommendation === 'Strong Buy' ? 'success' : 
                             stock.recommendation === 'Buy' ? 'primary' :
                             stock.recommendation === 'Hold' ? 'warning' : 'default'}
                    />
                  </Tooltip>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenInfo(true);
                    }}
                  >
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Box>
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
                <Tooltip title={metricDefinitions.marketCap}>
                  <Typography color="textSecondary">
                    Market Cap: {formatMarketCap(stock.marketCap)}
                  </Typography>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" gap={1}>
                <Tooltip title={metricDefinitions.aiScore}>
                  <Chip 
                    label={`AI Score: ${stock.aiScore.toFixed(1)}`}
                    color={getScoreColor(stock.aiScore) as any}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title={metricDefinitions.growthScore}>
                  <Chip 
                    label={`Growth: ${stock.growthScore.toFixed(1)}`}
                    color={getScoreColor(stock.growthScore) as any}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title={metricDefinitions.riskScore}>
                  <Chip 
                    label={`Risk: ${stock.riskScore.toFixed(1)}`}
                    color={getScoreColor(10 - stock.riskScore) as any}
                    size="small"
                  />
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Tooltip title={metricDefinitions.predictedPrice}>
                  <Typography variant="body2" color="textSecondary">
                    Predicted: {formatNumber(stock.predictedPrice)}
                  </Typography>
                </Tooltip>
                <Tooltip title={metricDefinitions.peRatio}>
                  <Typography variant="body2" color="textSecondary">
                    P/E: {stock.peRatio.toFixed(2)}
                  </Typography>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog 
        open={openInfo} 
        onClose={() => setOpenInfo(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Understanding Stock Metrics
        </DialogTitle>
        <DialogContent>
          <List>
            {Object.entries(metricDefinitions).map(([key, value]) => (
              <React.Fragment key={key}>
                <ListItem>
                  <ListItemText
                    primary={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    secondary={value}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInfo(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 
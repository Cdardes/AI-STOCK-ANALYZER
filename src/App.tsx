import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { Menu as MenuIcon, Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import { StockCard } from './components/StockCard';
import { StockChart } from './components/StockChart';
import { EnhancedStockAnalysis } from './components/EnhancedStockAnalysis';
import { useStocks } from './hooks/useStocks';
import { getEnhancedStockMetrics } from './services/enhancedStockService';
import { StockData } from './types/stock';

console.log('App component is being loaded');

const App: React.FC = () => {
  console.log('App component rendering');

  const { stocks, loading, error } = useStocks();
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleStockClick = (stock: StockData) => {
    setSelectedStock(stock);
  };

  const handleAddToWatchlist = (symbol: string) => {
    setWatchlist(prev => [...prev, symbol]);
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Stock Analyzer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem>
              <Typography variant="h6">Watchlist</Typography>
            </ListItem>
            <Divider />
            {watchlist.map(symbol => {
              const stock = stocks.find(s => s.symbol === symbol);
              return stock ? (
                <ListItem
                  key={symbol}
                  button
                  onClick={() => {
                    handleStockClick(stock);
                    toggleDrawer();
                  }}
                >
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={stock.symbol} secondary={stock.name} />
                </ListItem>
              ) : null;
            })}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Stock Analysis Dashboard
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {stocks.map(stock => (
                <Grid item xs={12} sm={6} key={stock.symbol}>
                  <StockCard
                    stock={stock}
                    onClick={() => handleStockClick(stock)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <StockChart stocks={stocks} />
          </Grid>

          {selectedStock && (
            <Grid item xs={12}>
              <EnhancedStockAnalysis
                stock={selectedStock}
                metrics={getEnhancedStockMetrics(selectedStock.symbol)}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                isInWatchlist={watchlist.includes(selectedStock.symbol)}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default App; 
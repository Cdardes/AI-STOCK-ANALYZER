import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Paper,
  Grid,
  Tooltip,
  Fab,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  Info as InfoIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { StockCard } from './components/StockCard';
import { StockChart } from './components/StockChart';
import { EnhancedStockAnalysis } from './components/EnhancedStockAnalysis';
import { EducationalResources } from './components/EducationalResources';
import { useStocks } from './hooks/useStocks';
import theme from './theme';
import ScrollToTop from './components/ScrollToTop';
import { MarketOverview } from './components/MarketOverview';
import { SectorPerformance } from './components/SectorPerformance';
import { MarketNews } from './components/MarketNews';
import { StockData } from './types/stock';

const drawerWidth = 240;

const mockIndices = [
  {
    name: 'S&P 500',
    value: 4783.45,
    change: 12.34,
    changePercent: 0.26,
  },
  {
    name: 'Dow Jones',
    value: 36245.67,
    change: -45.89,
    changePercent: -0.13,
  },
  {
    name: 'NASDAQ',
    value: 15678.90,
    change: 78.56,
    changePercent: 0.50,
  },
  {
    name: 'Russell 2000',
    value: 2345.67,
    change: 5.43,
    changePercent: 0.23,
  },
];

const mockSectors = [
  {
    name: 'Technology',
    performance: 2.5,
    topStocks: ['AAPL', 'MSFT', 'GOOGL'],
  },
  {
    name: 'Healthcare',
    performance: 1.2,
    topStocks: ['JNJ', 'PFE', 'UNH'],
  },
  {
    name: 'Finance',
    performance: -0.8,
    topStocks: ['JPM', 'BAC', 'WFC'],
  },
  {
    name: 'Energy',
    performance: -1.5,
    topStocks: ['XOM', 'CVX', 'COP'],
  },
];

const mockNews = [
  {
    id: '1',
    title: 'Tech Stocks Rally on AI Boom',
    summary: 'Technology stocks surge as artificial intelligence continues to drive market growth and innovation.',
    source: 'Financial Times',
    date: '2024-03-20',
    imageUrl: 'https://source.unsplash.com/random/800x400?technology',
    url: 'https://www.ft.com/',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Rate Cut',
    summary: 'The Federal Reserve hints at potential interest rate cuts in response to economic indicators.',
    source: 'Reuters',
    date: '2024-03-19',
    imageUrl: 'https://source.unsplash.com/random/800x400?finance',
    url: 'https://www.reuters.com/',
    category: 'Economy',
  },
];

function App() {
  const { stocks, loading, error } = useStocks();
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStockClick = (stock: StockData) => {
    setSelectedStock(stock);
    setActiveSection('analysis');
  };

  const handleAddToWatchlist = (symbol: string) => {
    setWatchlist(prev => [...prev, symbol]);
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          AI Stock Analyzer
        </Typography>
      </Toolbar>
      <List>
        <ListItem button onClick={() => setActiveSection('dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('watchlist')}>
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Watchlist" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('education')}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Education" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('about')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Box>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              AI-Powered Stock Analysis
            </Typography>
            <MarketOverview indices={mockIndices} />
            <SectorPerformance sectors={mockSectors} />
            <Grid container spacing={3}>
              {stocks.map((stock: StockData) => (
                <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
                  <StockCard
                    stock={stock}
                    isInWatchlist={watchlist.includes(stock.symbol)}
                    onAddToWatchlist={handleAddToWatchlist}
                    onRemoveFromWatchlist={handleRemoveFromWatchlist}
                  />
                </Grid>
              ))}
            </Grid>
            <MarketNews news={mockNews} />
          </Box>
        );
      case 'watchlist':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              My Watchlist
            </Typography>
            <Grid container spacing={3}>
              {watchlist.map((symbol) => (
                <Grid item xs={12} sm={6} md={4} key={symbol}>
                  <StockCard
                    stock={{ symbol } as StockData}
                    isInWatchlist={true}
                    onAddToWatchlist={handleAddToWatchlist}
                    onRemoveFromWatchlist={handleRemoveFromWatchlist}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 'education':
        return <EducationalResources />;
      case 'about':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              About AI Stock Analyzer
            </Typography>
            <Typography paragraph>
              AI Stock Analyzer is a powerful tool that uses artificial intelligence to analyze stocks and provide insights for investors.
            </Typography>
            <Typography paragraph>
              Our platform combines advanced AI algorithms with traditional financial analysis to help you make informed investment decisions.
            </Typography>
            <Typography paragraph>
              Key features include:
            </Typography>
            <ul>
              <li>AI-powered stock analysis</li>
              <li>Real-time market data</li>
              <li>Technical indicators</li>
              <li>Educational resources</li>
              <li>Portfolio tracking</li>
            </ul>
          </Paper>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h4" align="center" sx={{ mt: 4 }}>
            Loading stocks...
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h4" color="error" align="center" sx={{ mt: 4 }}>
            {error}
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            backgroundColor: 'background.default',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl">
            {selectedStock ? (
              <Box>
                <IconButton
                  onClick={() => setSelectedStock(null)}
                  sx={{ mb: 2 }}
                >
                  <TrendingUpIcon />
                </IconButton>
                <EnhancedStockAnalysis stock={selectedStock} />
              </Box>
            ) : (
              renderContent()
            )}
          </Container>
        </Box>
      </Box>
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App; 
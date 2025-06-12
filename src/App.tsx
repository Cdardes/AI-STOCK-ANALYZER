import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { StockCard } from './components/StockCard';
import { StockAnalysis } from './components/StockAnalysis';
import { useStocks } from './hooks/useStocks';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%)',
        },
      },
    },
  },
});

export const App: React.FC = () => {
  const {
    stocks,
    loading,
    error,
    selectedStock,
    stockAnalysis,
    selectStock,
  } = useStocks();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h1" gutterBottom align="center">
            AI Stock Analyzer
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
            Top 10 AI Companies to Watch in 2025
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={selectedStock ? 6 : 12}>
              <Grid container spacing={2}>
                {stocks.map((stock) => (
                  <Grid item xs={12} sm={selectedStock ? 12 : 6} key={stock.symbol}>
                    <StockCard
                      stock={stock}
                      onClick={() => selectStock(stock.symbol)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {selectedStock && stockAnalysis && (
              <Grid item xs={12} md={6}>
                <Paper 
                  sx={{ 
                    p: 2,
                    position: 'sticky',
                    top: 20,
                    maxHeight: 'calc(100vh - 40px)',
                    overflow: 'auto'
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {stocks.find(s => s.symbol === selectedStock)?.name} Analysis
                  </Typography>
                  <StockAnalysis analysis={stockAnalysis} />
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}; 
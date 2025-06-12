import { useState, useEffect } from 'react';
import { StockData, StockAnalysis } from '../types/stock';
import { stockService } from '../services/stockService';

export const useStocks = () => {
  console.log('useStocks hook initializing');
  
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis | null>(null);

  useEffect(() => {
    console.log('useStocks effect running - fetching stocks');
    fetchStocks();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      console.log('Fetching analysis for stock:', selectedStock);
      fetchStockAnalysis(selectedStock);
    }
  }, [selectedStock]);

  const fetchStocks = async () => {
    try {
      console.log('Starting to fetch stocks');
      setLoading(true);
      const data = await stockService.getTopAIStocks();
      console.log('Received stock data:', data);
      setStocks(data);
      setError(null);
    } catch (err) {
      console.error('Error in fetchStocks:', err);
      setError('Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  const fetchStockAnalysis = async (symbol: string) => {
    try {
      console.log('Starting to fetch analysis for:', symbol);
      const analysis = await stockService.getStockAnalysis(symbol);
      console.log('Received analysis:', analysis);
      setStockAnalysis(analysis);
      setError(null);
    } catch (err) {
      console.error('Error in fetchStockAnalysis:', err);
      setError('Failed to fetch stock analysis');
    }
  };

  const selectStock = (symbol: string) => {
    console.log('Selecting stock:', symbol);
    setSelectedStock(symbol);
  };

  return {
    stocks,
    loading,
    error,
    selectedStock,
    stockAnalysis,
    selectStock,
    refreshData: fetchStocks
  };
}; 
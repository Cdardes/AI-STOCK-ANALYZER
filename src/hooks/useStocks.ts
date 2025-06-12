import { useState, useEffect } from 'react';
import { StockData, StockAnalysis } from '../types/stock';
import { stockService } from '../services/stockService';

export const useStocks = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis | null>(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchStockAnalysis(selectedStock);
    }
  }, [selectedStock]);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const data = await stockService.getTopAIStocks();
      setStocks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockAnalysis = async (symbol: string) => {
    try {
      const analysis = await stockService.getStockAnalysis(symbol);
      setStockAnalysis(analysis);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock analysis');
      console.error(err);
    }
  };

  const selectStock = (symbol: string) => {
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
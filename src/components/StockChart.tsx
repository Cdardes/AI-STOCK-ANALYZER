import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StockData } from '../types/stock';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  stocks: StockData[];
}

type MetricType = 'aiScore' | 'growthScore' | 'riskScore' | 'peRatio' | 'marketCap';

const metricLabels: Record<MetricType, string> = {
  aiScore: 'AI Score',
  growthScore: 'Growth Score',
  riskScore: 'Risk Score',
  peRatio: 'P/E Ratio',
  marketCap: 'Market Cap (Billions)'
};

export const StockChart: React.FC<StockChartProps> = ({ stocks }) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('aiScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleMetricChange = (event: SelectChangeEvent) => {
    setSelectedMetric(event.target.value as MetricType);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  const chartData = useMemo(() => {
    const sortedStocks = [...stocks].sort((a, b) => {
      const valueA = selectedMetric === 'marketCap' 
        ? a[selectedMetric] / 1e9 
        : a[selectedMetric];
      const valueB = selectedMetric === 'marketCap' 
        ? b[selectedMetric] / 1e9 
        : b[selectedMetric];
      
      return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
    });

    const data: ChartData<'bar'> = {
      labels: sortedStocks.map(stock => stock.symbol),
      datasets: [
        {
          label: metricLabels[selectedMetric],
          data: sortedStocks.map(stock => 
            selectedMetric === 'marketCap' 
              ? stock[selectedMetric] / 1e9 
              : stock[selectedMetric]
          ),
          backgroundColor: 'rgba(33, 150, 243, 0.6)',
          borderColor: 'rgba(33, 150, 243, 1)',
          borderWidth: 1,
        },
      ],
    };

    return data;
  }, [stocks, selectedMetric, sortOrder]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Stock Comparison - ${metricLabels[selectedMetric]}`,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `${metricLabels[selectedMetric]}: ${
              selectedMetric === 'marketCap' 
                ? `$${value.toFixed(2)}B` 
                : value.toFixed(2)
            }`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: metricLabels[selectedMetric]
        }
      }
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Stock Comparison Chart
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Metric</InputLabel>
            <Select
              value={selectedMetric}
              label="Metric"
              onChange={handleMetricChange}
            >
              <MenuItem value="aiScore">AI Score</MenuItem>
              <MenuItem value="growthScore">Growth Score</MenuItem>
              <MenuItem value="riskScore">Risk Score</MenuItem>
              <MenuItem value="peRatio">P/E Ratio</MenuItem>
              <MenuItem value="marketCap">Market Cap</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortOrder}
              label="Sort Order"
              onChange={handleSortChange}
            >
              <MenuItem value="desc">Highest to Lowest</MenuItem>
              <MenuItem value="asc">Lowest to Highest</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ height: 400 }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Paper>
  );
}; 
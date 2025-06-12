import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
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
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StockData } from '../types/stock';

// Register ChartJS components
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

type MetricType = 'aiScore' | 'growthScore' | 'riskScore' | 'price' | 'marketCap' | 'volume';

export const StockChart: React.FC<StockChartProps> = ({ stocks }) => {
  const [metric, setMetric] = useState<MetricType>('aiScore');

  const handleMetricChange = (event: SelectChangeEvent) => {
    setMetric(event.target.value as MetricType);
  };

  const getMetricLabel = (metric: MetricType): string => {
    switch (metric) {
      case 'aiScore': return 'AI Score';
      case 'growthScore': return 'Growth Score';
      case 'riskScore': return 'Risk Score';
      case 'price': return 'Price ($)';
      case 'marketCap': return 'Market Cap ($B)';
      case 'volume': return 'Volume (M)';
      default: return metric;
    }
  };

  const formatValue = (value: number, metric: MetricType): number => {
    switch (metric) {
      case 'marketCap': return value / 1e9;
      case 'volume': return value / 1e6;
      default: return value;
    }
  };

  const data: ChartData<'bar'> = {
    labels: stocks.map(stock => stock.symbol),
    datasets: [
      {
        label: getMetricLabel(metric),
        data: stocks.map(stock => formatValue(stock[metric], metric)),
        backgroundColor: stocks.map(stock => {
          const value = stock[metric];
          if (metric === 'riskScore') {
            return value > 7 ? 'rgba(255, 99, 132, 0.8)' :
                   value > 4 ? 'rgba(255, 206, 86, 0.8)' :
                   'rgba(75, 192, 192, 0.8)';
          }
          return value > 8 ? 'rgba(75, 192, 192, 0.8)' :
                 value > 6 ? 'rgba(255, 206, 86, 0.8)' :
                 'rgba(255, 99, 132, 0.8)';
        }),
        borderColor: stocks.map(stock => {
          const value = stock[metric];
          if (metric === 'riskScore') {
            return value > 7 ? 'rgb(255, 99, 132)' :
                   value > 4 ? 'rgb(255, 206, 86)' :
                   'rgb(75, 192, 192)';
          }
          return value > 8 ? 'rgb(75, 192, 192)' :
                 value > 6 ? 'rgb(255, 206, 86)' :
                 'rgb(255, 99, 132)';
        }),
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Stock Comparison - ${getMetricLabel(metric)}`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const stock = stocks[context.dataIndex];
            let label = `${stock.name} (${stock.symbol}): `;
            
            switch (metric) {
              case 'marketCap':
                return `${label}$${value.toFixed(2)}B`;
              case 'volume':
                return `${label}${value.toFixed(2)}M`;
              case 'price':
                return `${label}$${value.toFixed(2)}`;
              default:
                return `${label}${value.toFixed(1)}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: getMetricLabel(metric)
        }
      }
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Stock Comparison
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel>Metric</InputLabel>
            <Select
              value={metric}
              label="Metric"
              onChange={handleMetricChange}
            >
              <MenuItem value="aiScore">AI Score</MenuItem>
              <MenuItem value="growthScore">Growth Score</MenuItem>
              <MenuItem value="riskScore">Risk Score</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="marketCap">Market Cap</MenuItem>
              <MenuItem value="volume">Volume</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: 400, width: '100%' }}>
            <Bar data={data} options={options} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}; 
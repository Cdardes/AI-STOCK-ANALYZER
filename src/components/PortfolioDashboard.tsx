import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info as InfoIcon,
  Download as DownloadIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { StockData } from '../types/stock';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

interface PortfolioDashboardProps {
  stocks: StockData[];
  watchlist: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ stocks, watchlist }) => {
  const [tabValue, setTabValue] = useState(0);
  const [showAlerts, setShowAlerts] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const calculatePortfolioMetrics = () => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.price, 0);
    const totalRisk = stocks.reduce((sum, stock) => sum + stock.riskScore, 0) / stocks.length;
    const totalGrowth = stocks.reduce((sum, stock) => sum + stock.growthScore, 0) / stocks.length;
    const totalAI = stocks.reduce((sum, stock) => sum + stock.aiScore, 0) / stocks.length;

    return {
      totalValue,
      totalRisk,
      totalGrowth,
      totalAI
    };
  };

  const metrics = calculatePortfolioMetrics();

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [10000, 10500, 10200, 10800, 11200, 11500],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const renderRiskAnalysis = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Risk Assessment
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Overall Risk Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={metrics.totalRisk * 10}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: metrics.totalRisk > 7 ? '#f44336' : metrics.totalRisk > 4 ? '#ff9800' : '#4caf50'
                  }
                }}
              />
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {metrics.totalRisk.toFixed(1)}/10
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Growth Potential
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Overall Growth Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={metrics.totalGrowth * 10}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: metrics.totalGrowth > 7 ? '#4caf50' : metrics.totalGrowth > 4 ? '#ff9800' : '#f44336'
                  }
                }}
              />
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {metrics.totalGrowth.toFixed(1)}/10
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAssetAllocation = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Allocation</TableCell>
            <TableCell align="right">Risk Score</TableCell>
            <TableCell align="right">Growth Score</TableCell>
            <TableCell align="right">AI Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>{stock.name}</TableCell>
              <TableCell align="right">${stock.price.toLocaleString()}</TableCell>
              <TableCell align="right">
                {((stock.price / metrics.totalValue) * 100).toFixed(1)}%
              </TableCell>
              <TableCell align="right">{stock.riskScore.toFixed(1)}</TableCell>
              <TableCell align="right">{stock.growthScore.toFixed(1)}</TableCell>
              <TableCell align="right">{stock.aiScore.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Portfolio Dashboard</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Export Portfolio">
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Set Alerts">
              <IconButton onClick={() => setShowAlerts(!showAlerts)}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Value
                </Typography>
                <Typography variant="h4">
                  ${metrics.totalValue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI Score
                </Typography>
                <Typography variant="h4">
                  {metrics.totalAI.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Growth Score
                </Typography>
                <Typography variant="h4">
                  {metrics.totalGrowth.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Risk Score
                </Typography>
                <Typography variant="h4">
                  {metrics.totalRisk.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Performance" />
            <Tab label="Risk Analysis" />
            <Tab label="Asset Allocation" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ height: 400 }}>
            <Line data={performanceData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Portfolio Performance'
                }
              }
            }} />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {renderRiskAnalysis()}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {renderAssetAllocation()}
        </TabPanel>
      </Box>
    </Paper>
  );
}; 
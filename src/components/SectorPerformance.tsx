import React from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface Sector {
  name: string;
  performance: number;
  topStocks: string[];
}

interface SectorPerformanceProps {
  sectors: Sector[];
}

export const SectorPerformance: React.FC<SectorPerformanceProps> = ({ sectors }) => {
  const formatPercent = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  const getColor = (performance: number) => {
    if (performance >= 2) return 'success.main';
    if (performance >= 0) return 'success.light';
    if (performance >= -2) return 'error.light';
    return 'error.main';
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Sector Performance
        </Typography>
        <Tooltip title="Performance of different market sectors">
          <IconButton size="small">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        {sectors.map((sector) => (
          <Box key={sector.name} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1">{sector.name}</Typography>
              <Typography
                variant="subtitle1"
                color={getColor(sector.performance)}
                fontWeight="bold"
              >
                {formatPercent(sector.performance)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.abs(sector.performance) * 10}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getColor(sector.performance),
                },
              }}
            />
            <Box mt={1}>
              <Typography variant="caption" color="text.secondary">
                Top Stocks: {sector.topStocks.join(', ')}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}; 
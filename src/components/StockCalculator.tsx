import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Tooltip,
  IconButton
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { StockData } from '../types/stock';

interface StockCalculatorProps {
  stocks: StockData[];
}

export const StockCalculator: React.FC<StockCalculatorProps> = ({ stocks }) => {
  const [investmentAmount, setInvestmentAmount] = useState<string>('10000');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setInvestmentAmount(value);
    }
  };

  const calculateStockPurchase = (price: number, amount: number) => {
    const shares = amount / price;
    return {
      shares: Math.floor(shares),
      value: Math.floor(shares) * price,
      remaining: amount - (Math.floor(shares) * price)
    };
  };

  const totalAmount = parseFloat(investmentAmount) || 0;
  const calculations = stocks.map(stock => ({
    ...stock,
    ...calculateStockPurchase(stock.price, totalAmount)
  }));

  const totalValue = calculations.reduce((sum, calc) => sum + calc.value, 0);
  const totalRemaining = calculations.reduce((sum, calc) => sum + calc.remaining, 0);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Stock Purchase Calculator
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Calculate how many shares you can purchase with your investment amount
        </Typography>
        <TextField
          fullWidth
          label="Investment Amount"
          value={investmentAmount}
          onChange={handleAmountChange}
          type="text"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ mb: 2 }}
        />
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Shares</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calculations.map((calc) => (
              <TableRow key={calc.symbol}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {calc.name}
                    <Tooltip title={`AI Score: ${calc.aiScore.toFixed(1)}`}>
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell align="right">${calc.price.toFixed(2)}</TableCell>
                <TableCell align="right">{calc.shares.toLocaleString()}</TableCell>
                <TableCell align="right">${calc.value.toLocaleString()}</TableCell>
                <TableCell align="right">${calc.remaining.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="subtitle2">Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2">
                  ${totalValue.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2">
                  ${totalRemaining.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          * Calculations are based on current stock prices and do not include transaction fees or taxes.
        </Typography>
      </Box>
    </Paper>
  );
}; 
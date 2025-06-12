import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { StockData } from '../types/stock';

interface SectorFilterProps {
  stocks: StockData[];
  selectedSector: string;
  onSectorChange: (sector: string) => void;
}

export const SectorFilter: React.FC<SectorFilterProps> = ({
  stocks,
  selectedSector,
  onSectorChange,
}) => {
  // Get unique sectors and count stocks in each sector
  const sectorCounts = stocks.reduce((acc, stock) => {
    acc[stock.sector] = (acc[stock.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sectors = Object.keys(sectorCounts);

  const handleSectorClick = (sector: string) => {
    onSectorChange(sector === selectedSector ? '' : sector);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    onSectorChange(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Filter by Sector
      </Typography>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, mb: 2 }}>
        {sectors.map((sector) => (
          <Chip
            key={sector}
            label={`${sector} (${sectorCounts[sector]})`}
            onClick={() => handleSectorClick(sector)}
            color={sector === selectedSector ? 'primary' : 'default'}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
      <FormControl sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}>
        <InputLabel>Sector</InputLabel>
        <Select
          value={selectedSector}
          label="Sector"
          onChange={handleSelectChange}
        >
          <MenuItem value="">
            <em>All Sectors</em>
          </MenuItem>
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector} ({sectorCounts[sector]})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}; 
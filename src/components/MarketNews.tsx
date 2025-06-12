import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Grid,
} from '@mui/material';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  imageUrl: string;
  url: string;
  category: string;
}

interface MarketNewsProps {
  news: NewsItem[];
}

export const MarketNews: React.FC<MarketNewsProps> = ({ news }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Latest Market News
      </Typography>
      <Grid container spacing={3}>
        {news.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Chip
                    label={item.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item.source} • {new Date(item.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.summary}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 
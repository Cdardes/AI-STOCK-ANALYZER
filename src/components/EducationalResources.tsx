import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import {
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Psychology as PsychologyIcon,
  ExpandMore as ExpandMoreIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon
} from '@mui/icons-material';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  url: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Stock Market Basics',
    description: 'A comprehensive guide to understanding how the stock market works, including key concepts and terminology.',
    type: 'article',
    level: 'beginner',
    url: 'https://www.investopedia.com/articles/basics/06/invest1000.asp',
    tags: ['basics', 'terminology', 'market']
  },
  {
    id: '2',
    title: 'Technical Analysis Fundamentals',
    description: 'Learn about technical indicators, chart patterns, and how to use them in your trading strategy.',
    type: 'video',
    level: 'intermediate',
    duration: '45 min',
    url: 'https://www.investopedia.com/technical-analysis-4689657',
    tags: ['technical analysis', 'indicators', 'charts']
  },
  {
    id: '3',
    title: 'AI in Stock Market Analysis',
    description: 'Explore how artificial intelligence is transforming stock market analysis and trading strategies.',
    type: 'article',
    level: 'advanced',
    url: 'https://www.investopedia.com/articles/active-trading/092114/role-artificial-intelligence-future-investment-advisory.asp',
    tags: ['AI', 'machine learning', 'analysis']
  },
  {
    id: '4',
    title: 'Risk Management Strategies',
    description: 'Learn essential risk management techniques to protect your investment portfolio.',
    type: 'course',
    level: 'intermediate',
    duration: '2 hours',
    url: 'https://www.investopedia.com/articles/trading/11/risk-management.asp',
    tags: ['risk', 'portfolio', 'management']
  }
];

const topics = [
  {
    title: 'Market Fundamentals',
    icon: <SchoolIcon />,
    description: 'Learn the basics of stock markets, trading, and investment principles.'
  },
  {
    title: 'Technical Analysis',
    icon: <TrendingUpIcon />,
    description: 'Master chart patterns, indicators, and technical analysis tools.'
  },
  {
    title: 'Fundamental Analysis',
    icon: <AssessmentIcon />,
    description: 'Understand company financials, ratios, and valuation methods.'
  },
  {
    title: 'Risk Management',
    icon: <SecurityIcon />,
    description: 'Develop strategies to protect your investments and manage risk.'
  },
  {
    title: 'AI & Machine Learning',
    icon: <PsychologyIcon />,
    description: 'Explore how AI is transforming market analysis and trading.'
  }
];

export const EducationalResources: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | false>(false);

  const handleTopicChange = (topic: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedTopic(isExpanded ? topic : false);
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <ArticleIcon />;
      case 'video':
        return <VideoIcon />;
      case 'course':
        return <BookIcon />;
    }
  };

  const getLevelColor = (level: Resource['level']) => {
    switch (level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'error';
    }
  };

  return (
    <Paper sx={{ width: '100%', mt: 2, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Educational Resources
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Enhance your investment knowledge with our comprehensive learning materials.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Topics
              </Typography>
              <List>
                {topics.map((topic) => (
                  <Accordion
                    key={topic.title}
                    expanded={expandedTopic === topic.title}
                    onChange={handleTopicChange(topic.title)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <ListItemIcon>{topic.icon}</ListItemIcon>
                      <ListItemText primary={topic.title} />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {topic.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Recommended Resources
          </Typography>
          <Grid container spacing={2}>
            {resources.map((resource) => (
              <Grid item xs={12} key={resource.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ mr: 2 }}>{getResourceIcon(resource.type)}</Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {resource.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {resource.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                          <Chip
                            label={resource.level}
                            color={getLevelColor(resource.level)}
                            size="small"
                          />
                          {resource.duration && (
                            <Chip label={resource.duration} size="small" />
                          )}
                          {resource.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Access Resource
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}; 
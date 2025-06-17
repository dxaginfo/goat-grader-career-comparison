import React from 'react';
import { Typography, Box, Paper, Divider, Grid, Chip } from '@mui/material';
import CareerStatsChart from './CareerStatsChart';
import AchievementsComparison from './AchievementsComparison';

interface Player {
  id: number;
  name: string;
  team: string;
}

interface ComparisonCriteria {
  peakPerformance: boolean;
  longevity: boolean;
  playoffs: boolean;
  championships: boolean;
  statistics: boolean;
  eraAdjusted: boolean;
}

interface ComparisonResultsProps {
  players: Player[];
  criteria: ComparisonCriteria;
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ players, criteria }) => {
  // This would normally come from the API after processing player stats
  const analysisText = `
    In comparing ${players.map(p => p.name).join(' and ')}, several key patterns emerge. 
    
    ${players[0].name} showcased a higher peak scoring average during his prime years, 
    averaging over 30 points per game for multiple seasons and demonstrating unparalleled 
    scoring efficiency. His impact was most notable in high-pressure playoff situations, 
    where his performance metrics consistently exceeded regular season averages.
    
    In contrast, ${players[1].name} demonstrates superior versatility across statistical 
    categories, particularly in assists and rebounds. When adjusting for era-specific factors 
    such as pace and defensive intensity, ${players[1].name}'s overall contribution to team 
    success shows remarkable consistency over a longer career timeline.
    
    The championship context reveals interesting patterns as well. While ${players[0].name} 
    achieved a perfect record in NBA Finals appearances, ${players[1].name} faced a wider 
    variety of championship-caliber opponents throughout different eras of the league.
    
    From a longevity perspective, ${players[1].name} maintains elite production metrics 
    well beyond the typical career arc, showing minimal statistical decline in year-over-year 
    performance even into the later stages of his career.
  `;

  return (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2">
            Career Comparison Results
          </Typography>
          
          <Box>
            {Object.entries(criteria)
              .filter(([_, isSelected]) => isSelected)
              .map(([key]) => (
                <Chip 
                  key={key} 
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  size="small"
                  sx={{ mr: 1 }}
                />
              ))
            }
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            AI Analysis
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {analysisText}
          </Typography>
        </Box>
      </Paper>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Career Statistics Comparison
            </Typography>
            <CareerStatsChart players={players} />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Accolades & Achievements
            </Typography>
            <AchievementsComparison players={players} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ComparisonResults;

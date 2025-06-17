import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface Player {
  id: number;
  name: string;
  team: string;
}

interface CareerStatsChartProps {
  players: Player[];
}

const CareerStatsChart: React.FC<CareerStatsChartProps> = ({ players }) => {
  const theme = useTheme();
  
  // This is a placeholder component - in a real app, we would use D3.js to create
  // interactive visualizations of player statistics
  
  // Mock data for demonstration
  const statCategories = ['PPG', 'RPG', 'APG', 'SPG', 'BPG', 'FG%', '3P%', 'FT%'];
  
  const mockPlayerStats = {
    1: [30.1, 6.2, 5.3, 2.3, 0.8, 0.497, 0.327, 0.835], // Jordan
    2: [27.0, 7.4, 7.4, 1.6, 0.8, 0.504, 0.344, 0.734], // LeBron
    3: [25.0, 5.2, 4.7, 1.4, 0.5, 0.447, 0.329, 0.837], // Kobe
    4: [19.5, 7.2, 11.2, 1.9, 0.4, 0.520, 0.303, 0.848], // Magic
    5: [24.3, 10.0, 6.3, 1.7, 0.8, 0.496, 0.376, 0.886], // Bird
    6: [24.6, 11.2, 3.6, 0.9, 2.6, 0.559, 0.056, 0.721], // Kareem
    7: [30.1, 22.9, 4.4, 0.0, 0.0, 0.540, 0.000, 0.511], // Wilt
    8: [15.1, 22.5, 4.3, 0.0, 0.0, 0.440, 0.000, 0.561], // Russell
    9: [19.0, 10.8, 3.0, 0.7, 2.2, 0.506, 0.179, 0.696], // Duncan
    10: [23.7, 10.9, 2.5, 0.6, 2.3, 0.582, 0.045, 0.527] // Shaq
  };
  
  // Function to get player color - in a real app we would use team colors
  const getPlayerColor = (index: number) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      '#4CAF50',
      '#FFC107',
      '#9C27B0'
    ];
    return colors[index % colors.length];
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', mb: 2 }}>
        {players.map((player, index) => (
          <Box 
            key={player.id} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 3 
            }}
          >
            <Box 
              sx={{ 
                width: 16, 
                height: 16, 
                bgcolor: getPlayerColor(index),
                mr: 1,
                borderRadius: '50%'
              }} 
            />
            <Typography variant="body2">{player.name}</Typography>
          </Box>
        ))}
      </Box>
      
      {/* Simple bar chart representation */}
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 600, mt: 2 }}>
          {statCategories.map((category, categoryIndex) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>{category}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 24 }}>
                {players.map((player, playerIndex) => {
                  const value = mockPlayerStats[player.id as keyof typeof mockPlayerStats][categoryIndex];
                  const maxValue = Math.max(...players.map(p => mockPlayerStats[p.id as keyof typeof mockPlayerStats][categoryIndex]));
                  const percentage = (value / maxValue) * 100;
                  
                  return (
                    <Box 
                      key={player.id} 
                      sx={{ 
                        position: 'relative',
                        height: '100%',
                        width: `${100 / players.length}%`,
                        pr: 1
                      }}
                    >
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${percentage}%`, 
                          bgcolor: getPlayerColor(playerIndex),
                          position: 'relative',
                          borderRadius: 1
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            position: 'absolute',
                            right: -35,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {value.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CareerStatsChart;

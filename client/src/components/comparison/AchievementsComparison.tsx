import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';

interface Player {
  id: number;
  name: string;
  team: string;
}

interface AchievementsComparisonProps {
  players: Player[];
}

const AchievementsComparison: React.FC<AchievementsComparisonProps> = ({ players }) => {
  const theme = useTheme();
  
  // Mock data - in a real app, this would come from the API
  const mockAchievements = {
    1: { // Michael Jordan
      championships: 6,
      mvps: 5,
      allStar: 14,
      allNba: 11,
      allDefense: 9,
      scoringTitles: 10,
      dpoy: 1
    },
    2: { // LeBron James
      championships: 4,
      mvps: 4,
      allStar: 19,
      allNba: 19,
      allDefense: 6,
      scoringTitles: 1,
      dpoy: 0
    },
    3: { // Kobe Bryant
      championships: 5,
      mvps: 1,
      allStar: 18,
      allNba: 15,
      allDefense: 12,
      scoringTitles: 2,
      dpoy: 0
    },
    4: { // Magic Johnson
      championships: 5,
      mvps: 3,
      allStar: 12,
      allNba: 10,
      allDefense: 0,
      scoringTitles: 0,
      dpoy: 0
    },
    5: { // Larry Bird
      championships: 3,
      mvps: 3,
      allStar: 12,
      allNba: 10,
      allDefense: 3,
      scoringTitles: 0,
      dpoy: 0
    },
    6: { // Kareem Abdul-Jabbar
      championships: 6,
      mvps: 6,
      allStar: 19,
      allNba: 15,
      allDefense: 11,
      scoringTitles: 2,
      dpoy: 0
    },
    7: { // Wilt Chamberlain
      championships: 2,
      mvps: 4,
      allStar: 13,
      allNba: 10,
      allDefense: 2,
      scoringTitles: 7,
      dpoy: 0
    },
    8: { // Bill Russell
      championships: 11,
      mvps: 5,
      allStar: 12,
      allNba: 11,
      allDefense: 0,
      scoringTitles: 0,
      dpoy: 0
    },
    9: { // Tim Duncan
      championships: 5,
      mvps: 2,
      allStar: 15,
      allNba: 15,
      allDefense: 15,
      scoringTitles: 0,
      dpoy: 0
    },
    10: { // Shaquille O'Neal
      championships: 4,
      mvps: 1,
      allStar: 15,
      allNba: 14,
      allDefense: 3,
      scoringTitles: 2,
      dpoy: 0
    }
  };

  const achievementCategories = [
    { id: 'championships', label: 'Championships' },
    { id: 'mvps', label: 'MVP Awards' },
    { id: 'allStar', label: 'All-Star Selections' },
    { id: 'allNba', label: 'All-NBA Teams' },
    { id: 'allDefense', label: 'All-Defensive Teams' },
    { id: 'scoringTitles', label: 'Scoring Titles' },
    { id: 'dpoy', label: 'Defensive Player of the Year' }
  ];

  // Function to determine the cell color based on which player has the highest value
  const getCellColor = (value: number, categoryIndex: number) => {
    const maxValue = Math.max(...players.map(player => 
      mockAchievements[player.id as keyof typeof mockAchievements][achievementCategories[categoryIndex].id as keyof typeof mockAchievements[1]]
    )) as number;
    
    return value === maxValue && maxValue > 0 ? theme.palette.success.light : 'transparent';
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Achievement</strong></TableCell>
            {players.map(player => (
              <TableCell key={player.id} align="center">
                <strong>{player.name}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {achievementCategories.map((category, categoryIndex) => (
            <TableRow key={category.id}>
              <TableCell component="th" scope="row">
                {category.label}
              </TableCell>
              {players.map(player => {
                const value = mockAchievements[player.id as keyof typeof mockAchievements][category.id as keyof typeof mockAchievements[1]] as number;
                return (
                  <TableCell 
                    key={`${player.id}-${category.id}`} 
                    align="center"
                    sx={{ 
                      bgcolor: getCellColor(value, categoryIndex),
                      fontWeight: getCellColor(value, categoryIndex) !== 'transparent' ? 'bold' : 'normal'
                    }}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AchievementsComparison;

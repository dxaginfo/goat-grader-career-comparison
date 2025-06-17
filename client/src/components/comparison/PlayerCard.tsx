import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Player {
  id: number;
  name: string;
  team: string;
}

interface PlayerCardProps {
  player: Player;
  onRemove: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onRemove }) => {
  // In a real app, we would use actual player images
  const getPlayerImageUrl = (playerId: number) => {
    return `https://via.placeholder.com/300x400?text=${encodeURIComponent(player.name)}`;
  };

  return (
    <Card sx={{ position: 'relative', height: '100%' }}>
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <IconButton 
          onClick={onRemove} 
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.5)', 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } 
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <CardMedia
        component="img"
        height="200"
        image={getPlayerImageUrl(player.id)}
        alt={player.name}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {player.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip 
            label={player.team} 
            size="small" 
            sx={{ borderRadius: 1 }} 
          />
        </Box>
        
        {/* In a real app, we would display actual player stats here */}
        <Typography variant="body2" color="text.secondary">
          Career statistics will be compared against other selected players.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;

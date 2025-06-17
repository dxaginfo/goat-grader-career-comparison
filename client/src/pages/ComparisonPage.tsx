import React, { useState } from 'react';
import { Typography, Box, Grid, Paper, Autocomplete, TextField, Button, Divider, Chip, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, CircularProgress, Alert } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PlayerCard from '../components/comparison/PlayerCard';
import ComparisonResults from '../components/comparison/ComparisonResults';

// Mock data - would be fetched from API in a real implementation
const MOCK_PLAYERS = [
  { id: 1, name: 'Michael Jordan', team: 'Chicago Bulls' },
  { id: 2, name: 'LeBron James', team: 'Los Angeles Lakers' },
  { id: 3, name: 'Kobe Bryant', team: 'Los Angeles Lakers' },
  { id: 4, name: 'Magic Johnson', team: 'Los Angeles Lakers' },
  { id: 5, name: 'Larry Bird', team: 'Boston Celtics' },
  { id: 6, name: 'Kareem Abdul-Jabbar', team: 'Los Angeles Lakers' },
  { id: 7, name: 'Wilt Chamberlain', team: 'Philadelphia 76ers' },
  { id: 8, name: 'Bill Russell', team: 'Boston Celtics' },
  { id: 9, name: 'Tim Duncan', team: 'San Antonio Spurs' },
  { id: 10, name: 'Shaquille O\'Neal', team: 'Los Angeles Lakers' },
];

interface Player {
  id: number;
  name: string;
  team: string;
}

const ComparisonPage: React.FC = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [comparisonCriteria, setComparisonCriteria] = useState({
    peakPerformance: true,
    longevity: true,
    playoffs: true,
    championships: true,
    statistics: true,
    eraAdjusted: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPlayer = (player: Player | null) => {
    if (player && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleRemovePlayer = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter(player => player.id !== playerId));
  };

  const handleCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComparisonCriteria({
      ...comparisonCriteria,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCompare = () => {
    if (selectedPlayers.length < 2) {
      setError('Please select at least two players to compare');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResultsReady(true);
    }, 2000);
  };

  const resetComparison = () => {
    setSelectedPlayers([]);
    setResultsReady(false);
  };

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        NBA Player Career Comparison
      </Typography>
      
      {!resultsReady ? (
        <>
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Select Players to Compare
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Autocomplete
                options={MOCK_PLAYERS}
                getOptionLabel={(option) => `${option.name} (${option.team})`}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Search for an NBA player" 
                    variant="outlined" 
                    fullWidth 
                  />
                )}
                onChange={(_, value) => handleAddPlayer(value)}
                value={null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Selected Players:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedPlayers.length > 0 ? (
                  selectedPlayers.map(player => (
                    <Chip 
                      key={player.id}
                      label={player.name}
                      onDelete={() => handleRemovePlayer(player.id)}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No players selected yet. Search and select players to compare.
                  </Typography>
                )}
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" component="h2" gutterBottom>
              Comparison Criteria
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Select which factors to include in the comparison:
              </FormLabel>
              <FormGroup row>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={comparisonCriteria.peakPerformance} 
                          onChange={handleCriteriaChange} 
                          name="peakPerformance" 
                        />
                      }
                      label="Peak Performance"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={comparisonCriteria.longevity} 
                          onChange={handleCriteriaChange} 
                          name="longevity" 
                        />
                      }
                      label="Career Longevity"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={comparisonCriteria.playoffs} 
                          onChange={handleCriteriaChange} 
                          name="playoffs" 
                        />
                      }
                      label="Playoff Performance"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={comparisonCriteria.championships} 
                          onChange={handleCriteriaChange} 
                          name="championships" 
                        />
                      }
                      label="Championship Success"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={comparisonCriteria.statistics} 
                          onChange={handleCriteriaChange} 
                          name="statistics" 
                        />
                      }
                      label="Statistical Dominance"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={comparisonCriteria.eraAdjusted} 
                          onChange={handleCriteriaChange} 
                          name="eraAdjusted" 
                        />
                      }
                      label="Era-Adjusted Stats"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <CompareArrowsIcon />}
                onClick={handleCompare}
                disabled={selectedPlayers.length < 2 || isLoading}
                sx={{ px: 4 }}
              >
                {isLoading ? 'Processing...' : 'Compare Players'}
              </Button>
            </Box>
          </Paper>
          
          {selectedPlayers.length > 0 && (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {selectedPlayers.map(player => (
                <Grid item xs={12} sm={6} md={4} key={player.id}>
                  <PlayerCard 
                    player={player} 
                    onRemove={() => handleRemovePlayer(player.id)} 
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <>
          <ComparisonResults 
            players={selectedPlayers} 
            criteria={comparisonCriteria} 
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={resetComparison}
            >
              Start New Comparison
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ComparisonPage;

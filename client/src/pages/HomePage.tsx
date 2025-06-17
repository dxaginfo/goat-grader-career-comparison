import React from 'react';
import { Box, Typography, Button, Paper, Grid, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompareIcon from '@mui/icons-material/Compare';
import HistoryIcon from '@mui/icons-material/History';
import SportBasketballIcon from '@mui/icons-material/SportBasketball';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Player Comparison',
      description: 'Compare career stats, accolades, and impact between any NBA players',
      icon: <CompareIcon fontSize="large" color="primary" />
    },
    {
      title: 'Era-Adjusted Statistics',
      description: 'Advanced algorithms normalize stats across different eras of basketball',
      icon: <HistoryIcon fontSize="large" color="primary" />
    },
    {
      title: 'AI-Generated Analysis',
      description: 'Get expert-level insights and narrative explanations about player careers',
      icon: <SportBasketballIcon fontSize="large" color="primary" />
    }
  ];

  return (
    <>
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1d428a 0%, #0c2456 100%)',
          color: 'white',
          mb: 4
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          The G.O.A.T. Grader
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Settle basketball's greatest debates with data-driven analysis
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          color="secondary"
          onClick={() => navigate('/compare')}
          sx={{ px: 4, py: 1 }}
        >
          Start Comparing Players
        </Button>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Why Use The G.O.A.T. Grader?
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button size="small" onClick={() => navigate('/compare')}>
                  Try it now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to settle the debate?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Who's the real GOAT? Michael Jordan or LeBron James? Kobe Bryant or Magic Johnson?
          <br />
          Let the data speak for itself.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/compare')}
        >
          Compare NBA Legends
        </Button>
      </Box>
    </>
  );
};

export default HomePage;

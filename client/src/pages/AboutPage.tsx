import React from 'react';
import { Typography, Paper, Box, Grid, Divider } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        About The G.O.A.T. Grader
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          The G.O.A.T. Grader was created to bring data-driven analysis to basketball's greatest debates. 
          We believe that comparing basketball legends should go beyond simple opinions and incorporate comprehensive statistical analysis.
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform uses historical NBA statistics, advanced analytics, and AI-powered insights to provide 
          fair and balanced comparisons between players across different eras of basketball history.
        </Typography>
      </Paper>
      
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        How It Works
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, height: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Data Collection</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              We gather comprehensive statistics from public sources, including regular season and playoff performance, 
              individual accolades, and team success metrics throughout a player's career.
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, height: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Era Normalization</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              Our algorithms adjust statistics to account for differences in pace, rule changes, and other factors 
              that influence performance across different NBA eras, allowing for fair cross-era comparisons.
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, height: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>AI Analysis</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              Our AI engine translates complex statistical comparisons into natural language insights, helping users 
              understand the strengths, weaknesses, and overall impact of different players throughout their careers.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'white' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          A Note on Methodology
        </Typography>
        <Typography variant="body1" paragraph>
          While we strive for statistical accuracy and fairness, we acknowledge that basketball greatness can never be 
          fully captured by numbers alone. Cultural impact, leadership, and intangibles all contribute to a player's legacy.
        </Typography>
        <Typography variant="body1">
          The G.O.A.T. Grader aims to provide an objective foundation for these discussions, not to declare a definitive "greatest of all time."
        </Typography>
      </Paper>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        About the Data
      </Typography>
      <Typography variant="body2" paragraph>
        All statistical data used in the G.O.A.T. Grader is sourced from publicly available basketball statistics. 
        We update our database regularly to include the most current information available.
      </Typography>
      <Typography variant="body2" paragraph>
        This project is not affiliated with or endorsed by the National Basketball Association (NBA) or any of its teams.
      </Typography>
    </>
  );
};

export default AboutPage;

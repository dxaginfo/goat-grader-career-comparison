import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              The G.O.A.T. Grader
            </Typography>
            <Typography variant="body2">
              Settle basketball debates with data-driven analysis
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Resources
            </Typography>
            <Link href="/about" color="inherit" sx={{ display: 'block', mb: 0.5 }}>
              About
            </Link>
            <Link href="/compare" color="inherit" sx={{ display: 'block', mb: 0.5 }}>
              Compare Players
            </Link>
          </Box>
        </Box>
        
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
            © {new Date().getFullYear()} The G.O.A.T. Grader. All rights reserved.
          </Typography>
          
          <Typography variant="body2">
            Data sourced from public basketball statistics
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

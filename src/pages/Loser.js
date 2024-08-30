import React from 'react';
import { Typography, Box } from '@mui/material';

const Loser = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 2 }}>
      <Typography variant="h2" color="error" sx={{ marginBottom: 2 }}>Oops!</Typography>
      <Typography variant="h5">You swiped left. Better luck next time!</Typography>
    </Box>
  );
};

export default Loser;

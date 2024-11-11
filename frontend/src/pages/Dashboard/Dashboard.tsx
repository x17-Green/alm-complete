// src/pages/Dashboard.tsx

import React from 'react';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import { LogoutButton } from '../components/LogoutButton'; // Adjust the import path as necessary

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Afro Lyrics Mania Dashboard
        </Typography>
        {/* Use the LogoutButton directly */}
        <LogoutButton />
      </Box>
    </Container>
  );
};

export default Dashboard;
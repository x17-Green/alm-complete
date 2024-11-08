// src/pages/Dashboard.tsx

import React from 'react';
import { Container, Typography } from '@mui/material';
// import DashboardHeader from '../components/DashboardHeader'; // Import the DashboardHeader
import { LogoutButton } from '../authPages/LogoutButton'; // Adjust the import path as necessary

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Afro Lyrics Mania Dashboard
      </Typography>
      {/* Use the LogoutButton directly */}
      <LogoutButton />
    </Container>
  );
};

export default Dashboard;
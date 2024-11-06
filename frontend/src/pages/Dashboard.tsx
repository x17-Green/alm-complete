import React from 'react';
import { Container, Typography } from '@mui/material';
import { LogoutButton } from './authPages/LogoutButton';
// import LogoutButton from './LogoutButton'; // Adjust the import path as necessary

const Dashboard = () => {
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
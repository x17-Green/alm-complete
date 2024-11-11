import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DashboardLayout } from '../components/DashboardLayout';
import Dashboard from './Dashboard';
import TrackSearch from '../../components/TrackSearch';
import Settings from './Settings';

// Create a custom theme for the dashboard with a white matte design
const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for primary actions
    },
    secondary: {
      main: '#dc004e', // Pink for secondary actions
    },
    background: {
      default: '#ffffff', // White background for a clean look
      paper: '#f5f5f5', // Light grey for cards and surfaces
    },
    text: {
      primary: '#333333', // Dark text for readability
      secondary: '#666666', // Lighter text for secondary information
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1976d2',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
  },
  shape: {
    borderRadius: 5, // Rounded corners for a modern look
  },
});

// DashboardApp component
const DashboardApp: React.FC = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <DashboardLayout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<TrackSearch />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default DashboardApp;

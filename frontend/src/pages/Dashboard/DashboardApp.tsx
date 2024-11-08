import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DashboardLayout } from '../../components/DashboardLayout';
import Dashboard from './Dashboard';
import TrackSearch from '../../components/TrackSearch';
// import Settings from './Settings'; // Uncomment when you have a Settings component

// Create a custom theme for the dashboard
const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const DashboardApp: React.FC = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/search" element={<TrackSearch />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default DashboardApp;
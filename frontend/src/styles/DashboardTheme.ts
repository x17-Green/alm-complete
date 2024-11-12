import { createTheme } from '@mui/material/styles';

// Create a custom theme for the dashboard with a white matte design
export const DashboardTheme = createTheme({
    palette: {
        mode: 'light', // Default mode
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



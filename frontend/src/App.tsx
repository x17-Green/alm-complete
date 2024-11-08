// src/App.tsx

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

import Home from './pages/LandingPages/Home';
import Features from './pages/LandingPages/Features';
import About from './pages/LandingPages/About';
import Contact from './pages/LandingPages/Contact';

import Login from './pages/authPages/Login';
import Register from './pages/authPages/Register';
import EmailVerification from './pages/authPages/EmailVerification';
import DashboardApp from './pages/Dashboard/Dashboard';
import Logout from './pages/authPages/Logout';
import { MainLayout } from './components/MainLayout';
import { DashboardLayout } from './components/DashboardLayout';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', // Vibrant orange
    },
    secondary: {
      main: '#4CAF50', // Green
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

// Create a functional component to conditionally render headers

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Dashboard route without MainLayout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/*" element={<DashboardApp />} />
          </Route>
          
          {/* All other routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/verify-email" element={<EmailVerification />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

// Wrap the App component with Router
const Root: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default Root;

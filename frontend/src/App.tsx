import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/LandingPages/Home';
import Features from './pages/LandingPages/Features';
import About from './pages/LandingPages/About';
import Contact from './pages/LandingPages/Contact';
import Login from './pages/authPages/Login';
import Register from './pages/authPages/Register';
import EmailVerification from './pages/authPages/EmailVerification';
import DashboardApp from './pages/Dashboard/DashboardApp';
import Logout from './pages/authPages/Logout';
import { MainLayout } from './pages/components/MainLayout';

// Create a custom theme for the main app
const mainTheme = createTheme({
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Protected Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardApp />
            </ProtectedRoute>
          }
        />

        {/* Main app routes */}
        <Route element={<ThemeProvider theme={mainTheme}><CssBaseline /><MainLayout /></ThemeProvider>}>
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
    </AuthProvider>
  );
};

const Root: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default Root;

import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { logoutUser  } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken'); // Use the correct token key
      console.log('LogoutButton - Retrieved token:', token); // Debug log
      await logoutUser (token);
      localStorage.removeItem('jwtToken'); // Clear the token from localStorage
      if (onLogout) {
        onLogout(); // Call the onLogout prop if provided
      }
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} /> : 'Logout'}
    </Button>
  );
};
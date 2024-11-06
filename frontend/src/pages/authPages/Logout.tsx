import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/api'; // Import the logout function
import { AxiosError } from 'axios'; // Import AxiosError for type assertion

// Define the expected structure of the error response
interface ErrorResponse {
  message: string;
}

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      console.log('Attempting to log out...');
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const response = await logoutUser (token);
          console.log('Logout successful:', response.message);
          localStorage.removeItem('jwtToken');
          navigate('/login');
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as ErrorResponse)?.message || axiosError.message;
          console.error('Logout error:', errorMessage);
        }
      } else {
        console.warn('No token found, user is not logged in. Redirecting to home.');
        navigate('/');
      }
    };

    handleLogout();
  }, [navigate]);
  // console.log('Executing Logout useEffect'); // Debugging statement
  return <div>Logging out...</div>; // Optional loading message
};

export default Logout;

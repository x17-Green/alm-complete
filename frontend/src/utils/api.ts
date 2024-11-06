// api.ts

import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8000/api/auth'; // Adjust the port if necessary

// Function to register a new user
export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  country: string;
  city: string;
  role: 'artist' | 'musicLover';
  spotifyLink?: string;
  appleMusicLink?: string;
  bio: string;
  profilePicture?: string;
}) => {
  const response = await axios.post(`${AUTH_API_URL}/register`, userData);
  return response.data;
};

// Function to log in a user
export const loginUser = async (credentials: {
  usernameOrEmail: string;
  password: string;
}) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
  return response.data;
};

// Function to check for existing user
export const checkExistingUser = async (username: string, email: string) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/check-existing_user`, { username, email });
    return response; 
  } catch (error: any) { 
    // If the error response exists, return it
    if (error.response) {
      return error.response; // Return the error response for handling in the frontend
    }
    // If there's no response, throw a generic error
    throw new Error('Network error or server not responding');
  }
};

// Function to log out a user
export const logoutUser = async (token: string | null) => {
  if (!token) {
    console.error('No token provided for logout');
    throw new Error('No token available');
  }

  try {
    const response = await axios.post(`${AUTH_API_URL}/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Logout response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.error('Error during logout:', error.response.data);
        throw new Error(error.response.data.message || 'Logout failed');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from server');
      }
    }
    console.error('Error during logout:', error);
    throw error;
  }
};

// export const logoutUser = async (token: string) => {
//   try {
//     const response = await axios.post(`${AUTH_API_URL}/logout`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//       }
//     });
//     console.log('Logout response:', response.data); // Log the response for debugging
//     return response.data;
//   } catch (error) {
//     console.error('Error during logout:', error); // Log the error for debugging
//     throw error; // Rethrow the error to handle it in the calling function
//   }
// };

// Add more API functions here for other endpoints as needed

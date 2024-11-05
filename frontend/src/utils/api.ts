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
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
  return response.data;
};

// Function to check for existing user
export const checkExistingUser = async (username: string | null, email: string | null) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/check-existing`, { username, email });
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

// Add more API functions here for other endpoints as needed

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


// import axios from 'axios';

// const AUTH_API_URL = 'http://localhost:8000/api/auth'; // Adjust the port if necessary

// Define the expected structure of the login response
interface LoginResponse {
  jwtToken?: string;      // The JWT token for authentication (optional)
  refreshToken?: string;  // The refresh token for session management (optional)
  existingToken?: string; // The existing token if the user is already logged in
  userData?: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    fullName: string;
  };
  message: string;        // Message from the server
}

// Function to log in a user
// export const loginUser = async (credentials: {
//   usernameOrEmail: string;
//   password: string;
// }): Promise<LoginResponse> => {
//   try {
//     const response = await axios.post<LoginResponse>(`${AUTH_API_URL}/login`, credentials);
    
//     // Log the response for debugging
//     console.log('Login response:', response.data); 

//     return response.data; // Return the response data directly
//   } catch (error) {
//     // Handle errors from the API
//     if (axios.isAxiosError(error)) {
//       console.error('Error during login:', error.response?.data || error.message);
//       throw new Error(error.response?.data.message || 'Login failed');
//     } else {
//       console.error('Unexpected error:', error);
//       throw new Error('An unexpected error occurred');
//     }
//   }
// };

export const loginUser = async (credentials: {
  usernameOrEmail: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${AUTH_API_URL}/login`, credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Properly propagate the error message from the server
      if (error.response?.status === 404) {
        throw new Error(`Incorrect email or username: ${credentials.usernameOrEmail}`);
      }
      if (error.response?.status === 401) {
        throw new Error('Incorrect password');
      }
      // For other error cases, use the server's message if available
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('An unexpected error occurred');
  }
};


// // Function to log in a user
// export const loginUser = async (credentials: {
//   usernameOrEmail: string;
//   password: string;
// }) => {
//   const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
//   return response.data;
// };

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
// export const logoutUser = async (token: string | null) => {
//   if (!token) {
//     console.error('No token provided for logout');
//     throw new Error('No token available');
//   }

//   try {
//     const response = await axios.post(`${AUTH_API_URL}/logout`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     console.log('Logout response:', response.data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         // console.error('Error during logout:', error.response.data);
//         throw new Error(error.response.data.message || 'Logout failed');
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//         throw new Error('No response from server');
//       }
//     }
//     console.error('Error during logout:', error);
//     throw error;
//   }
// };

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

// Function to log out a user
export const logoutUser  = async (token: string | null) => {
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

    // Clear the token from local storage or wherever it's stored
    localStorage.removeItem('token'); // Adjust this based on your storage mechanism

    // Optionally, you might want to redirect the user or update the UI state
    // For example: window.location.href = '/login';

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error during logout:', error.response.data);
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

// Add more API functions here for other endpoints as needed

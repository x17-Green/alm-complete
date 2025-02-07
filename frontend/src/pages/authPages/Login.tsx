import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Divider,
  Box,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Google as GoogleIcon, 
  Apple as AppleIcon, 
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Contactless as ContactlessIcon
} from '@mui/icons-material';
import { loginUser  } from '../../utils/api'; // Import the loginUser  function

export default function Login() {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null); // State for error messages
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateInputs = () => {
    const { usernameOrEmail, password } = loginData;
    let valid = true;
    let errorMessage = '';

    if (!usernameOrEmail) {
      errorMessage = 'Username or Email is required.';
      valid = false;
    } else if (!password) {
      errorMessage = 'Password is required.';
      valid = false;
    }

    if (!valid) {
      setError(errorMessage);
    } else {
      setError(null);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) return;
    
    try {
      const response = await loginUser(loginData);
      console.log('Login successful:', response);

      if (response.existingToken) {
        localStorage.setItem('jwtToken', response.existingToken);
        navigate('/dashboard');
        return;
      }

      if (response.jwtToken) {
        localStorage.setItem('jwtToken', response.jwtToken);
      }
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      navigate('/dashboard');
    } catch (error) {
      // The error is now properly propagated from the API function
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const oauthProviders = [
    { name: 'Google', icon: <GoogleIcon /> },
    { name: 'Apple', icon: <AppleIcon /> },
    { name: 'Facebook', icon: <FacebookIcon /> },
    { name: 'LinkedIn', icon: <LinkedInIcon /> },
    { name: 'Spotify', icon: <ContactlessIcon /> },
    { name: 'Apple Music', icon: '🎵' },
    { name: 'TikTok', icon: '🎵' },
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        pt: isMobile ? 4 : 0 // Add top padding on mobile
      }}
    >
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          py: 4 // Add vertical padding
        }}
      >
        <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Log in to Afro Lyrics Mania
          </Typography>
          {/* {error && <Typography color="error">{error}</Typography>} Display error message */}
          {error && (
            <Typography 
              color="error" 
              sx={{ 
                mt: 2, 
                mb: 2, 
                textAlign: 'center',
                padding: '8px',
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                borderRadius: '4px'
              }}
            >
              {error}
            </Typography> )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="usernameOrEmail"
                  label="Username or Email"
                  name="usernameOrEmail"
                  autoComplete="username"
                  value={loginData.usernameOrEmail}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 3 }}>OR</Divider>
          <Grid container spacing={2}>
            {oauthProviders.map((provider) => (
              <Grid item xs={12} key={provider.name}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={provider.icon}
                  onClick={() => console.log(`Login with ${provider.name}`)}
                >
                  Continue with {provider.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

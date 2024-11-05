import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
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
} from '@mui/material'
import { 
  Google as GoogleIcon, 
  Apple as AppleIcon, 
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Contactless as ContactlessIcon
} from '@mui/icons-material'

export default function Login() {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: ''
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Login data:', loginData)
    // Here you would typically send the login data to your server
  }

  const oauthProviders = [
    { name: 'Google', icon: <GoogleIcon /> },
    { name: 'Apple', icon: <AppleIcon /> },
    { name: 'Facebook', icon: <FacebookIcon /> },
    { name: 'LinkedIn', icon: <LinkedInIcon /> },
    { name: 'Spotify', icon: <ContactlessIcon /> },
    { name: 'Apple Music', icon: '🎵' },
    { name: 'TikTok', icon: '🎵' },
  ]

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
  )
}

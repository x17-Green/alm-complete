import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Box,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Music enthusiast and lyric lover.'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSaveChanges = () => {
    // Implement save changes logic
    console.log('Saving changes:', { profileData, notifications, darkMode, language });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src="/path-to-profile-picture.jpg"
                sx={{ width: 120, height: 120 }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={profileData.bio}
                  onChange={handleProfileChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notifications.email}
              onChange={handleNotificationChange}
              name="email"
            />
          }
          label="Email Notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifications.push}
              onChange={handleNotificationChange}
              name="push"
            />
          }
          label="Push Notifications"
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Security
        </Typography>
        <Button variant="outlined" color="primary">
          Change Password
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <PaletteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label="Dark Mode"
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <LanguageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Language
        </Typography>
        <TextField
          select
          fullWidth
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </TextField>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;

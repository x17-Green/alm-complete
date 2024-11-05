import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  Box,
  Link,
  Avatar,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import ProfilePictureModal from '../../components/ProfilePictureModal';
import { registerUser, checkExistingUser } from '../../utils/api';

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  role: 'artist' | 'musicLover';
  spotifyLink?: string;
  appleMusicLink?: string;
  bio: string;
  profilePicture?: string;
}

const steps = ['Account Details', 'Personal Information', 'User Role', 'Additional Info'];

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    role: 'musicLover',
    bio: '',
    spotifyLink: '',
    appleMusicLink: '',
    profilePicture: ''
  });
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateStep = async () => {
    const { username, email, password, confirmPassword, firstName, lastName, dateOfBirth, country, city, role } = userData;
    let valid = true;
    let errorMessage = '';

    switch (activeStep) {
      case 0:
        // Validation for Account Details
        if (!username) {
          errorMessage = 'Username is required.';
          valid = false;
        } else if (username.length < 3) {
          errorMessage = 'Username must be at least 3 characters long.';
          valid = false;
        }
        if (!email) {
          errorMessage = 'Email is required.';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errorMessage = 'Email address is invalid.';
          valid = false;
        } 
        if (!password) {
          errorMessage = 'Password is required.';
          valid = false;
        } else if (password.length < 6) {
          errorMessage = 'Password must be at least 6 characters long.';
          valid = false;
        }
        if (!confirmPassword || confirmPassword.length <= 0) {
          errorMessage = 'Please confirm your password';
          valid = false;
        } else if (password !== confirmPassword) {
          errorMessage = 'Passwords do not match.';
          valid = false;
        }
        break;
      case 1:
        // Validation for Personal Information
        if (!firstName) {
          errorMessage = 'First name is required.';
          valid = false;
        }
        if (!lastName) {
          errorMessage = 'Last name is required.';
          valid = false;
        }
        if (!dateOfBirth) {
          errorMessage = 'Date of birth is required.';
          valid = false;
        }
        if (!country) {
          errorMessage = 'Country is required.';
          valid = false;
        }
        if (!city) {
          errorMessage = 'City is required.';
          valid = false;
        }
        break;
      case 2:
        // Validation for User Role
        if (!role) {
          errorMessage = 'User role is required.';
          valid = false;
        }
        if (role == 'artist') {
          if (!userData.spotifyLink || !userData.appleMusicLink) {
            errorMessage = 'Spotify and AppleMusic links required'
            valid = false;
          }
        }
        break;
      case 3:
        // Validation for Additional Info
        if (userData.bio == '') {
          if (!userData.bio) {
            errorMessage = 'Bio is required.';
            valid = false;
          }
        }
        break;
      default:
        break;
    }

    if (!valid) {
      setError(errorMessage);
    } else {
      setError(null);
    }

    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<'artist' | 'musicLover'>) => {
    const { name, value } = e.target;

    // Ensure that the value is correctly typed for SelectChangeEvent
    if (e.target instanceof HTMLSelectElement) {
      setUserData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setUserData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Check for existing user before moving to the next step
      try {
        const existingUserResponse = await checkExistingUser(userData.username, userData.email);
        if (existingUserResponse.status === 409) {
          setError(existingUserResponse.data.message);
          return; // Prevent moving to the next step
        }
      } catch (error) {
        setError('Error checking existing user. Please try again.');
        return; // Prevent moving to the next step
      }
    }

    if (await validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      console.log('Registration successful:', response);
      navigate('/register/verify-email'); // Redirect to email verification page
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handleProfilePictureSelect = (pictureUrl: string) => {
    setUserData(prevState => ({
      ...prevState,
      profilePicture: pictureUrl
    }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                value={userData.username}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="email"
                label="Email Address"
                value={userData.email}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={userData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
          </>
        );
      case 1:
        return (
          <>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={userData.firstName}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={userData.lastName}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={userData.dateOfBirth}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                value={userData.country}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                value={userData.city}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
          </>
        );
      case 2:
        return (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">I am a</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={userData.role}
                label="I am a"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="musicLover">Music Lover</MenuItem>
              </Select>
            </FormControl>
            {userData.role === 'artist' && (
              <>
                <Tooltip title={error || ''} arrow>
                  <TextField
                    required
                    fullWidth
                    name="spotifyLink"
                    label="Spotify Artist Link"
                    value={userData.spotifyLink || ''}
                    onChange={handleChange}
                    margin="normal"
                    error={!!error}
                  />
                </Tooltip>
                <Tooltip title={error || ''} arrow>
                  <TextField
                    required
                    fullWidth
                    name="appleMusicLink"
                    label="Apple Music Artist Link"
                    value={userData.appleMusicLink || ''}
                    onChange={handleChange}
                    margin="normal"
                    error={!!error}
                  />
                </Tooltip>
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Tooltip title={error || ''} arrow>
              <TextField
                required
                fullWidth
                name="bio"
                label="Tell us more about yourself."
                multiline
                rows={4}
                value={userData.bio}
                onChange={handleChange}
                margin="normal"
                error={!!error}
              />
            </Tooltip>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => setIsProfilePictureModalOpen(true)}
                sx={{ mr: 2 }}
              >
                Choose Profile Picture
              </Button>
              {userData.profilePicture && (
                <Avatar
                  src={userData.profilePicture}
                  sx={{ width: 60, height: 60 }}
                />
              )}
            </Box>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeStep === steps.length - 1) {
      handleSubmit(event as any as React.FormEvent<HTMLFormElement>);
    } else {
      handleNext();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container component="main" maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Create Your Afro Lyrics Mania Account
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: '20px 0' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box component="form" onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Box>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                )}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleButtonClick}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Log in here
              </Link>
            </Typography>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Or register with a social media account on the{' '}
              <Link component={RouterLink} to="/login">
                login page
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      <ProfilePictureModal
        open={isProfilePictureModalOpen}
        onClose={() => setIsProfilePictureModalOpen(false)}
        onSelectPicture={handleProfilePictureSelect}
      />
    </Box>
  );
}

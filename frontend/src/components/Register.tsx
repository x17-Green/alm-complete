import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Link,
  Avatar,
  SelectChangeEvent
} from '@mui/material'
import ProfilePictureModal from './ProfilePictureModal'

interface UserData {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  city: string
  role: 'artist' | 'musicLover'
  spotifyLink?: string
  appleMusicLink?: string
  bio: string
  profilePicture?: string
}

const steps = ['Account Details', 'Personal Information', 'User Role', 'Additional Info']

export default function Register() {
  const [activeStep, setActiveStep] = useState(0)
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
    bio: ''
  })
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<'artist' | 'musicLover'>) => {
    const { name, value } = e.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Registration data:', userData)
    // Here you would typically send the registration data to your server
  }

  const handleProfilePictureSelect = (pictureUrl: string) => {
    setUserData(prevState => ({
      ...prevState,
      profilePicture: pictureUrl
    }))
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              value={userData.username}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={userData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={userData.confirmPassword}
              onChange={handleChange}
              margin="normal"
            />
          </>
        )
      case 1:
        return (
          <>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={userData.firstName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              value={userData.lastName}
              onChange={handleChange}
              margin="normal"
            />
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
            />
            <TextField
              required
              fullWidth
              name="country"
              label="Country"
              value={userData.country}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="city"
              label="City"
              value={userData.city}
              onChange={handleChange}
              margin="normal"
            />
          </>
        )
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
                <TextField
                  fullWidth
                  name="spotifyLink"
                  label="Spotify Artist Link"
                  value={userData.spotifyLink || ''}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="appleMusicLink"
                  label="Apple Music Artist Link"
                  value={userData.appleMusicLink || ''}
                  onChange={handleChange}
                  margin="normal"
                />
              </>
            )}
          </>
        )
      case 3:
        return (
          <>
            <TextField
              fullWidth
              name="bio"
              label="Bio"
              multiline
              rows={4}
              value={userData.bio}
              onChange={handleChange}
              margin="normal"
            />
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
        )
      default:
        return 'Unknown step'
    }
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeStep === steps.length - 1) {
      handleSubmit(event as any as React.FormEvent<HTMLFormElement>)
    } else {
      handleNext()
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container component="main" maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Create Your Afro Lyrics Mania Account
          </Typography>
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
  )
}

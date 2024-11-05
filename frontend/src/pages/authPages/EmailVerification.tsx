import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerification = async () => {
    // Simulate verification logic
    if (verificationCode === '123456') { // Replace with actual verification logic
      console.log('Verification successful');
      navigate('/login'); // Redirect to login page
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align="center">
        Email Verification
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleVerification(); }}>
        <TextField
          required
          fullWidth
          label="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Verify
        </Button>
      </Box>
    </Container>
  );
}

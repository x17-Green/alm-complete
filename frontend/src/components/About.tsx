import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom textAlign="center">
          About Afro Lyrics Mania
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" paragraph textAlign="center">
          Celebrating and promoting the rich diversity of African music
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                Afro Lyrics Mania is dedicated to preserving, promoting, and celebrating the vibrant world of African music. We aim to provide a platform that connects artists, fans, and industry professionals, fostering a thriving community around African musical heritage.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a world where African music is globally recognized and appreciated. Through our platform, we strive to break down barriers, showcase talent, and create opportunities for African artists to reach a wider audience.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2023, Afro Lyrics Mania was born out of a passion for African music and a desire to create a dedicated space for its appreciation. Our team of music enthusiasts, technology experts, and industry professionals came together to build a platform that addresses the unique needs of the African music scene.
              </Typography>
              <Typography variant="body1">
                Today, we're proud to serve thousands of artists and fans across the continent and beyond, continually evolving our platform to meet the dynamic needs of the African music industry.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
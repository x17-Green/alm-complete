import { Link as RouterLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'

export default function Home() {
  const features = [
    {
      title: 'Publish Lyrics',
      description: 'Easily publish and manage your song lyrics.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'Stream Music',
      description: 'Discover and stream African music from various artists.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'User Profiles',
      description: 'Create and customize your artist or fan profile.',
      image: '/placeholder.svg?height=200&width=300',
    },
  ]

  const testimonials = [
    {
      quote: "Afro Lyrics Mania has revolutionized how I share my music with fans.",
      author: "Yemi Alade, Nigerian Afropop singer",
    },
    {
      quote: "As a music enthusiast, I love exploring new African artists on this platform.",
      author: "John Doe, Music Blogger",
    },
  ]

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Celebrate African Music with Afro Lyrics Mania
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" paragraph>
          A platform for artists to publish lyrics and for enthusiasts to explore African music.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/features"
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h2" component="h2" gutterBottom textAlign="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h2" component="h2" gutterBottom textAlign="center">
          What People Are Saying
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    "{testimonial.quote}"
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    - {testimonial.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
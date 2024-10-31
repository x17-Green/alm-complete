import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'

export default function Features() {
  const features = [
    {
      title: 'Publish Lyrics',
      description: 'Easily publish and manage your song lyrics. Our intuitive interface allows artists to upload, edit, and organize their lyrics effortlessly.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'Stream Music',
      description: 'Discover and stream African music from various artists. Enjoy a vast library of songs from different genres and regions across Africa.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'User Profiles',
      description: 'Create and customize your artist or fan profile. Showcase your work, connect with other users, and build your fanbase.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'Collaborative Tools',
      description: 'Collaborate with other artists, songwriters, and producers. Share ideas, work on projects together, and create amazing music.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your performance with detailed analytics. Monitor your streams, views, and engagement to grow your audience effectively.',
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      title: 'Mobile App',
      description: 'Access Afro Lyrics Mania on the go with our mobile app. Enjoy all features anytime, anywhere on your smartphone or tablet.',
      image: '/placeholder.svg?height=200&width=300',
    },
  ]

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom textAlign="center">
          Features
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" paragraph textAlign="center">
          Discover the powerful features that make Afro Lyrics Mania the ultimate platform for African music.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
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
    </Container>
  )
}

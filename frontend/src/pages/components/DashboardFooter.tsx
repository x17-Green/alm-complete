import { Link as RouterLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Facebook, Instagram } from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Afro Lyrics Mania is dedicated to celebrating and promoting African music and artists.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lekki, Lagos, Nigeria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@afrolyricsmania.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +234 913 414 0000
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/afrolyricsmania" color="inherit" sx={{ mr: 2 }}>
              <Facebook />
            </Link>
            <Link href="https://www.x.com/afrolyricsmania" color="inherit" sx={{ mr: 2 }}>
              <XIcon />
            </Link>
            <Link href="https://www.instagram.com/afrolyricsmania" color="inherit">
              <Instagram />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link component={RouterLink} to="/privacy" color="inherit">
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link component={RouterLink} to="/terms" color="inherit">
                Terms of Service
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://afrolyricsmania.com/">
              Afro Lyrics Mania
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

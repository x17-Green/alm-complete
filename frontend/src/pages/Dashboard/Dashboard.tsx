// // src/pages/Dashboard.tsx

// import React from 'react';
// import { Container, Typography } from '@mui/material';
// import Box from '@mui/material/Box'
// import { LogoutButton } from '../components/LogoutButton'; // Adjust the import path as necessary

// const Dashboard: React.FC = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to Afro Lyrics Mania Dashboard
//         </Typography>
//         {/* Use the LogoutButton directly */}
//         <LogoutButton />
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;

"use client"

import React, { useState } from 'react'
import { Box, Grid, Paper, Typography, Button, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PlayCircle, Pause, SkipNext, SkipPrevious, Search, MusicNote, Lyrics, Settings, Analytics } from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for the chart
const analyticsData = [
  { name: 'Jan', streams: 4000, lyrics: 2400 },
  { name: 'Feb', streams: 3000, lyrics: 1398 },
  { name: 'Mar', streams: 2000, lyrics: 9800 },
  { name: 'Apr', streams: 2780, lyrics: 3908 },
  { name: 'May', streams: 1890, lyrics: 4800 },
  { name: 'Jun', streams: 2390, lyrics: 3800 },
]

const DashboardItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}))

export default function Dashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Welcome to Afro Lyrics Mania Dashboard
          </Typography>
        </Grid>

        {/* Search Bar */}
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
            <TextField
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for music or lyrics"
              inputProps={{ 'aria-label': 'search for music or lyrics' }}
            />
            <Button variant="contained" sx={{ p: '10px', m: '2px' }}>
              Search
            </Button>
          </Paper>
        </Grid>

        {/* Music Player */}
        <Grid item xs={12} md={6}>
          <DashboardItem>
            <Typography variant="h6" gutterBottom>
              Now Playing
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
              <IconButton aria-label="previous song">
                <SkipPrevious />
              </IconButton>
              <IconButton aria-label="play/pause" onClick={handlePlayPause}>
                {isPlaying ? <Pause /> : <PlayCircle />}
              </IconButton>
              <IconButton aria-label="next song">
                <SkipNext />
              </IconButton>
            </Box>
            <Typography variant="subtitle1">Song Title - Artist Name</Typography>
          </DashboardItem>
        </Grid>

        {/* Lyrics Preview */}
        <Grid item xs={12} md={6}>
          <DashboardItem>
            <Typography variant="h6" gutterBottom>
              Lyrics Preview
            </Typography>
            <Typography variant="body1" sx={{ overflow: 'auto', maxHeight: 200 }}>
              {`[Verse 1]
              Sample lyrics line 1
              Sample lyrics line 2
              Sample lyrics line 3

              [Chorus]
              Sample chorus line 1
              Sample chorus line 2`}
            </Typography>
          </DashboardItem>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <DashboardItem>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button startIcon={<MusicNote />} variant="outlined" fullWidth sx={{ mb: 1 }}>
              Upload Music
            </Button>
            <Button startIcon={<Lyrics />} variant="outlined" fullWidth sx={{ mb: 1 }}>
              Edit Lyrics
            </Button>
            <Button startIcon={<Settings />} variant="outlined" fullWidth>
              Settings
            </Button>
          </DashboardItem>
        </Grid>

        {/* Analytics Chart */}
        <Grid item xs={12} md={8}>
          <DashboardItem>
            <Typography variant="h6" gutterBottom>
              Analytics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="streams" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="lyrics" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </DashboardItem>
        </Grid>
      </Grid>
    </Box>
  )
}

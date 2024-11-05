import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import Modal from './NotificationModal'
import TrackPlayer from './TrackPlayer'
import MusicPlayer from './MusicPlayer'

interface Track {
  _id: string
  title: string
  artist: string
  album: string
  duration: number
  imageUrl: string
  previewUrl: string
}

export default function TrackSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Track[]>([])
  const [suggestions, setSuggestions] = useState<Track[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 0) {
        try {
          const response = await axios.get<Track[]>(`http://localhost:8000/api/search/tracks?query=${query}`)
          setSuggestions(response.data)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        }
      } else {
        setSuggestions([]) // Clear suggestions if the query is empty
      }
    }

    const debounceFetch = setTimeout(() => {
      fetchSuggestions()
    }, 300) // Debounce for 300ms

    return () => clearTimeout(debounceFetch) // Cleanup on unmount or when query changes
  }, [query])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim() === '') {
      setIsModalOpen(true)
      return
    }
    try {
      const response = await axios.get<Track[]>(`http://localhost:8000/api/search/tracks?query=${query}`)
      setResults(response.data)
      setSuggestions([]) // Clear suggestions after search
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
  }

  const handlePlayPause = (track: Track) => {
    if (playingTrack && playingTrack._id === track._id) {
      setPlayingTrack(null)
      setCurrentTrackIndex(null)
    } else {
      setPlayingTrack(track)
      setCurrentTrackIndex(results.findIndex(t => t._id === track._id))
    }
  }

  const handlePrevious = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      const newIndex = currentTrackIndex - 1
      setCurrentTrackIndex(newIndex)
      setPlayingTrack(results[newIndex])
    }
  }

  const handleNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < results.length - 1) {
      const newIndex = currentTrackIndex + 1
      setCurrentTrackIndex(newIndex)
      setPlayingTrack(results[newIndex])
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom textAlign="center">
          Search Tracks
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSearch}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tracks..."
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                }}
              />
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Box>
          </form>

          {suggestions.length > 0 && (
            <Paper elevation={2} sx={{ mt: 2, maxHeight: 200, overflow: 'auto' }}>
              <List>
                {suggestions.map((track) => (
                  <ListItemButton key={track._id} onClick={() => setQuery(track.title)}>
                    <ListItemText primary={`${track.title} by ${track.artist}`} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}

          {results.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Play</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Artist</TableCell>
                    <TableCell>Album</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((track) => (
                    <TableRow key={track._id}>
                      <TableCell>
                        <TrackPlayer 
                          track={track} 
                          isPlaying={playingTrack?._id === track._id}
                          onPlayPause={() => handlePlayPause(track)}
                        />
                      </TableCell>
                      <TableCell>
                        <Avatar src={track.imageUrl} alt={track.title} variant="square" />
                      </TableCell>
                      <TableCell>{track.title}</TableCell>
                      <TableCell>{track.artist}</TableCell>
                      <TableCell>{track.album}</TableCell>
                      <TableCell>{formatDuration(track.duration)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} message="Please enter a search query." />
      <MusicPlayer
        track={playingTrack}
        onClose={() => setPlayingTrack(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </Container>
  )
}

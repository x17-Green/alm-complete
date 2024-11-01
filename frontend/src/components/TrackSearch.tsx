import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemText, 
  Paper,
  Box
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import Modal from './NotificationModal' // Assuming Modal component is already converted to TypeScript

interface Track {
  _id: string
  title: string
  artist: string
}

export default function TrackSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Track[]>([])
  const [suggestions, setSuggestions] = useState<Track[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setIsModalOpen(true) // Open the modal for empty input
      return // Prevent further execution
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
                  <ListItem key={track._id} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${track.title} by ${track.artist}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {results.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Search Results
              </Typography>
              <List>
                {results.map((track) => (
                  <ListItem key={track._id}>
                    <ListItemText primary={track.title} secondary={`Artist: ${track.artist}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} message="Please enter a search query." />
    </Container>
  )
}
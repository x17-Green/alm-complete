import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  Avatar,
  Grow,
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material'

interface Track {
  _id: string
  title: string
  artist: string
  imageUrl: string
  previewUrl: string
  duration: number
}

interface MusicPlayerProps {
  track: Track | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, onClose, onPrevious, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (track) {
      setIsPlaying(true)
      setCurrentTime(0)
    }
  }, [track])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (audioRef.current && typeof newValue === 'number') {
      audioRef.current.currentTime = newValue
      setCurrentTime(newValue)
    }
  }

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setVolume(newValue)
      if (audioRef.current) {
        audioRef.current.volume = newValue
      }
      setIsMuted(newValue === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (!track) return null

  return (
    <Grow in={!!track}>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 300,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1000, // Ensure it's above other elements
        }}
      >
        <Avatar
          src={track.imageUrl}
          alt={track.title}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          {track.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {track.artist}
        </Typography>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Slider
            value={currentTime}
            max={track.duration / 1000}
            onChange={handleSliderChange}
            aria-label="time-indicator"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTime(track.duration / 1000)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton onClick={onPrevious}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton onClick={onNext}>
            <SkipNext />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <IconButton onClick={toggleMute}>
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Slider
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            min={0}
            max={1}
            step={0.01}
            sx={{ ml: 1 }}
          />
        </Box>
        <audio
          ref={audioRef}
          src={track.previewUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onNext}
        />
      </Paper>
    </Grow>
  )
}

export default MusicPlayer

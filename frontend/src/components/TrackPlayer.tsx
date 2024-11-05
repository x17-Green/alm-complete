import React, { useEffect, useRef } from 'react';
import { IconButton, Box } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

interface Track {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  previewUrl: string;
}

interface TrackPlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: (trackId: string) => void;
}

const TrackPlayer: React.FC<TrackPlayerProps> = ({ track, isPlaying, onPlayPause }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  const handlePlayPause = () => {
    onPlayPause(track._id);
  };
  
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handlePlayPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <audio ref={audioRef} src={track.previewUrl} />
    </Box>
  );
}

export default TrackPlayer;

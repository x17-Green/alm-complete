import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function TrackPlayer({ trackId }) {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tracks/${trackId}`);
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetchTrack();
  }, [trackId]);
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  if (!track) return <div>Loading...</div>;
  
  return (
    <div>
    <h2>{track.title}</h2>
    <p>{track.artist}</p>
    <img src={track.imageUrl} alt={track.title} style={{ width: '200px' }} />
    <audio ref={audioRef} src={track.previewUrl} />
    <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default TrackPlayer;

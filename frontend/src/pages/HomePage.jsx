// HomePage.jsx
import React, { useState } from 'react';
import TrackSearch from '../components/TrackSearch';
import TrackPlayer from '../components/TrackPlayer';
import BentoDashboard from '../components/BentoDashboard';

const HomePage = () => {
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const handleTrackSelect = (trackId) => {
    setSelectedTrackId(trackId);
  };

  return (
    <div className="App">
      <BentoDashboard />
      <h1>Afro Lyrics Mania</h1>
      <TrackSearch onTrackSelect={handleTrackSelect} />
      {selectedTrackId && <TrackPlayer trackId={selectedTrackId} />}
    </div>
  );
};

export default HomePage;
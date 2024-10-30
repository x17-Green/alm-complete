import React, { useState } from 'react';
import axios from 'axios';
import TrackSearch from './components/TrackSearch';
import TrackPlayer from './components/TrackPlayer';
import './App.css';

function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const handleTrackSelect = (trackId) => {
    setSelectedTrackId(trackId);
  };

  return (
    <div className="App">
      <h1>Afro Lyrics Mania</h1>
      <TrackSearch onTrackSelect={handleTrackSelect} />
      {selectedTrackId && <TrackPlayer trackId={selectedTrackId} />}
    </div>
  );
}

export default App;

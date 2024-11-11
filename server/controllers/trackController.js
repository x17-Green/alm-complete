import { getTrackInfo, searchTracks as spotifySearchTracks, searchTrack } from '../services/spotifyService.js';
import Track from '../models/music/Track';
import SearchResult from '../models/music/searchResult'; 

// Get all tracks (for testing purposes)
export const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find().limit(20);
        res.status(200).json(tracks);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ message: 'Error fetching tracks' });
    }
};

// Add a new track (for testing purposes)
export const addTrack = async (req, res) => {
    try {
        const { title, artist, album, genre, duration, filePath } = req.body;
        
        // Search for the track on Spotify
        const spotifyData = await searchTrack(title, artist);
        
        const trackData = {
            title,
            artist,
            album,
            genre,
            duration,
            filePath,
            uploadedBy: req.user.userId,
        };

        if (spotifyData && spotifyData.spotifyId) {
            trackData.spotifyId = spotifyData.spotifyId;
            trackData.previewUrl = spotifyData.previewUrl;
            trackData.imageUrl = spotifyData.imageUrl;
        }

        const track = new Track(trackData);

        await track.save();
        res.status(201).json(track);
    } catch (error) {
        console.error('Error adding track:', error);
        res.status(500).json({ message: 'Error adding track', error: error.message });
    }
};

export const getTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await Track.findById(id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.status(200).json(track);
    } catch (error) {
        console.error('Error fetching track:', error);
        res.status(500).json({ message: 'Error fetching track' });
    }
};

// Get search results by query
export const getSearchResults = async (req, res) => {
    try {
        const { query } = req.params;
        const searchResults = await SearchResult.findOne({ query });
        if (!searchResults) {
            return res.status(404).json({ message: 'No search results found for this query' });
        }
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ message: 'Error fetching search results', error: error.message });
    }
};

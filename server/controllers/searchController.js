// Implement search functionality.

import { searchTracks as spotifySearchTracks } from '../services/spotifyService.js';
import SearchResult from '../models/music/searchResult.js';
import Track from '../models/music/Track.js';

// Search tracks
export const searchTracks = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // First, search in the local database
        const localTracks = await Track.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { artist: { $regex: query, $options: 'i' } },
                { album: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });

        // Prepare results array
        const results = [...localTracks];

        // If local tracks are found and less than 20, search Spotify
        if (localTracks.length < 10) {
            try {
                console.log('Fetching tracks from Spotify for query:...', query); // Log when fetching from Spotify
                const spotifyTracks = await spotifySearchTracks(query);
                const spotifyResults = await Promise.all(spotifyTracks.map(async (spotifyTrack) => {
                    let track = await Track.findOne({ spotifyId: spotifyTrack.id });
                    if (!track) {
                        track = new Track({
                            title: spotifyTrack.name,
                            artist: spotifyTrack.artists[0].name,
                            album: spotifyTrack.album.name,
                            duration: spotifyTrack.duration_ms,
                            spotifyId: spotifyTrack.id,
                            previewUrl: spotifyTrack.preview_url,
                            imageUrl: spotifyTrack.album.images[0].url
                        });
                        await track.save();
                    }
                    return track;
                }));

                // Combine local and Spotify results
                results.push(...spotifyResults);
            } catch (error) {
                console.error('Error searching tracks on Spotify:', error.message);
                // Optionally log to a developer console or monitoring service
            }
        }

        // Save the search results to the new collection
        const searchResult = new SearchResult({
            query,
            results: results.map(track => ({
                title: track.title,
                artist: track.artist,
                album: track.album,
                duration: track.duration,
                spotifyId: track.spotifyId,
                previewUrl: track.previewUrl,
                imageUrl: track.imageUrl,
            })),
        });

        await searchResult.save(); // Save the search result

        res.status(200).json(results);
    } catch (error) {
        console.error('Search error:', error);
        if (error.statusCode === 400 && error.body.error === 'invalid_client') {
            return res.status(500).json({ message: 'Error with Spotify API authentication. Please check server configuration.' });
        }
        res.status(500).json({ message: 'Error searching tracks', error: error.message });
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

// Get tracks by ID
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

import Track from '../models/Track';

// Search tracks
export const searchTracks = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const tracks = await Track.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: "textScore" } })
        .limit(20);  // Limit to 20 results

        res.status(200).json(tracks);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching tracks' });
    }
};

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
        const track = new Track({
            title,
            artist,
            album,
            genre,
            duration,
            filePath,
            uploadedBy: req.user.userId  // Assuming you're using authentication middleware
        });
        await track.save();
        res.status(201).json(track);
    } catch (error) {
        console.error('Error adding track:', error);
        res.status(500).json({ message: 'Error adding track' });
    }
};


import mongoose from 'mongoose';

const trackSearchResultSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true,
    },
    results: [
        {
            title: String,
            artist: String,
            album: String,
            duration: Number,
            spotifyId: String,
            previewUrl: String,
            imageUrl: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SearchResult = mongoose.model('SearchResult', trackSearchResultSchema);

export default SearchResult;


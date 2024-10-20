import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    genre: {
        type: String
    },
    duration: {
        type: Number
    },
    filePath: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Add text index for search functionality
trackSchema.index({ title: 'text', artist: 'text', album: 'text', genre: 'text' });

const Track = mongoose.model('Track', trackSchema);

export default Track;

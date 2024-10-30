// Define search API routes.

import express from 'express';
import { searchTracks, getTrack, getSearchResults } from '../controllers/searchController.js';

const router = express.Router();

router.get('/results', getSearchResults);
router.get('/tracks', searchTracks); // search query working
router.get('/tracks/:id', getTrack); // working x

export default router;

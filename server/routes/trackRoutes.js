// Define track related endpoints

import express from 'express';
import { searchTracks, getAllTracks, addTrack } from '../controllers/trackController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/search', searchTracks);
router.get('/', getAllTracks);
router.post('/', authenticate, addTrack);

export default router;


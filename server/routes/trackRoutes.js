// Define track related endpoints

import express from 'express';
import { authenticate } from '../middleware/auth';
import { getAllTracks, addTrack } from '../controllers/trackController';

const router = express.Router();

router.get('/list', getAllTracks)
router.post('/add', authenticate, addTrack);

export default router;

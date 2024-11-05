// Define user-related API routes.

import express from 'express';
import { register, login, profile, checkExistingUser } from '../../controllers/authController';
import { authenticate } from '../../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, profile);
router.post('/check-existing', checkExistingUser);

export default router;

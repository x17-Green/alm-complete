// Define user-related API routes.

import express from 'express';
import { register, login, profile, checkNewUser, logout } from '../../controllers/authController';
import { authenticate } from '../../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, profile);
router.post('/check_new_user', checkNewUser);
router.post('/logout', logout);

export default router;

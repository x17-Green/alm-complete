// JWT authentication middleware.

import jwt from 'jsonwebtoken';
import Redis from 'ioredis';

const redisClient = new Redis(); // Connect to Redis

export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Check if the token is in the blocklist
    const exists = await redisClient.exists(token);
    if (exists === 1) {
      return res.status(401).json({ message: 'Token has been revoked. Please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

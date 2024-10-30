/* eslint-disable import/no-extraneous-dependencies */
// server.js - Main server entry point for Afro-Lyrics-Mania

/**
* Required External Modules
*/
import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/api/authRoutes';
import trackRoutes from './routes/trackRoutes';
import searchRoutes from './routes/searchRoutes';
// import streamRoutes from './routes/streamRoutes';
// import musicRoutes from './routes/musicRoutes';
// import lyricsRoutes from './routes/lyricsRoutes';


// import { errorHandler } from './middleware/errorHandler';

// Load environment variables from .env file
config();

/**
* App Variables
*/

const app = express();
const PORT = process.env.PORT || '8000';
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/alm-dev-test-db-02';

/**
*  App Configuration
*/

// Enhanced security with helmet
app.use(helmet());

// Enable CORS
app.use(cors());

// Logging middleware
app.use(morgan('dev'));

// Parse JSON bodies
app.use(json());

// Parse URL-encoded bodies
app.use(urlencoded({ extended: true }));

// Error handling middleware
// app.use(errorHandler);

/**
* Routes Definitions
*/

// Health check route
app.get('/health', (request, response) => {
  response.status(200).json({ status: 'OK' });
});

// TODO: Add route definitions here
// Example: app.use('/api/lyrics', lyricsRouter);

/**
* API Route Connections
*/

// TODO: Connect API routes here
// Example: app.use('/api', apiRouter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/search', searchRoutes);
// app.use('/api/musics', musicRoutes);
// app.use('/api/lyrics', lyricsRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/stream', streamRoutes);

/**
* Global Error Handler
*/

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.error(`[${new Date().toISOString()}] ${error.stack}`);
  response.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

/**
* Server Activation
*/

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
})
  .then(() => console.log(`Connected to MongoDB at: ${MONGODB_URI}`))
  .catch((error) => console.error('MongoDB connection error:', error));

const server = app.listen(PORT, () => {
  console.log(`ALM-Server is listening to requests on: http://localhost:${PORT}`);
});

/**
* Graceful Shutdown
*/

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

/**
* Unhandled Promise Rejection Handler
*/

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // TODO: Add application-specific logging, error reporting, or recovery logic here
});

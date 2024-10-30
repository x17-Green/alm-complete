/**
* @module server
* @author Okoyen Ebisine Precious <x17.ebi@icloud.com>
* @version 1.0.0
* @license MIT
* @description Main server entry point for Afro-Lyrics-Mania, a web application
* designed to celebrate African music by providing a platform for music artists to
* publish, edit, and manage their lyrics efficiently.
* - The application supports 
*   - user registration, 
*   - login, 
*   - music streaming, 
*   - music lyrics publishing, 
*   - and search functionalities, 
* Making it a comprehensive tool for music enthusiasts to access and enjoy African music seamlessly.
* 
* @dependencies
* - React: Frontend library for building user interfaces
* - Node.js: JavaScript runtime for server-side logic
* - Express.js: Web framework for Node.js
* - MongoDB: NoSQL database for storing user data and music metadata
* - Mongoose: ODM for MongoDB
* - Axios: Promise-based HTTP client for making requests
* 
* @usage
* To run the application, use the following commands:
* - `npm run dev`: Starts the server in development mode with hot reloading.
* - `npm start`: Runs both the server and the frontend concurrently.
* 
* @environment
* Ensure that the necessary environment variables are set in a `.env` file,
* including the MongoDB connection string and any API keys required for third-party services.
* 
* @tags
* - Afro-Lyrics-Mania
* - African Music
* - Lyrics Management
* - Music Streaming
* 
* @see
* - [GitHub Repository](https://github.com/x17-Green/afro-lyrics-mania "Afro Lyrics Mania GitHub Repository")
* - [Documentation](https://github.com/x17-Green/afro-lyrics-mania/blob/main/README.md "README")
*/ 

/**
* Required External Modules
*/

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';

/**
* Required App Modules
*/

import connectToDatabase from './config/database';
import { errorHandler } from './middleware/errorHandler';

/**
* API Route Definitions
*/

import trackRoutes from './routes/trackRoutes';
import searchRoutes from './routes/searchRoutes';
import authRoutes from './routes/api/authRoutes';
// import streamRoutes from './routes/streamRoutes';
// import musicRoutes from './routes/musicRoutes';
// import lyricsRoutes from './routes/lyricsRoutes';

/**
* App Variables
*/

const app = express();
const PORT = process.env.PORT || '8000';
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/alm-dev-test-db-02';

/**
*  App Configuration
*/

// Load environment variables from .env file
config();

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
app.use(errorHandler);

/**
* Routes Definitions
*/

// Health check route
app.get('/health', (request, response) => {
  response.status(200).json({ status: 'OK' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/search', searchRoutes);
// app.use('/api/music', musicRoutes);
// app.use('/api/lyrics', lyricsRoutes);
// app.use('/api/stream', streamRoutes);

/**
* Server Activation
*/

// Connect to MongoDB
connectToDatabase(MONGODB_URI);

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

// Export the app for testing
export default app;

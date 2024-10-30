// Configuration for MongoDB connection.

import mongoose from 'mongoose';

const connectToDatabase = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at: ${MONGODB_URI}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDatabase;

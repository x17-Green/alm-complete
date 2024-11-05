// Mongoose schema for user data.
// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date, // Assuming dateOfBirth is a date
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['artist', 'musicLover'], // Restrict to specific roles
    required: true,
  },
  spotifyLink: {
    type: String,
  },
  appleMusicLink: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Create a virtual field for fullName that populates with the values from firstName and lastName
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);

export default User;

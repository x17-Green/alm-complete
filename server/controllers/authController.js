// Implement JWT Authentication
// Authentication controllers

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Redis from 'ioredis';

const redisClient = new Redis(); // Connect to Redis

// Registration
export const register = async (req, res) => {
  try {
    const {
      firstName, lastName, username, email, password, dateOfBirth, country, city, role, spotifyLink, appleMusicLink, bio,
    } = req.body;

    // Validate user input data
    if (!firstName || !lastName || !username || !email || !password || !dateOfBirth || !country || !city || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if existing user
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: `Username: [${existingUser.username}] already exists` });
      }
      return res.status(400).json({ message: `Email address: [${existingUser.email}] already exists` });
    }

    // Hash user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
      country,
      city,
      role,
      spotifyLink,
      appleMusicLink,
      bio,
    });

    // Save user to database
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Defined user data
    const userData = {
      registered: user.username,
      information: {
        [user._id]: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          dateOfBirth: user.dateOfBirth,
          country: user.country,
          city: user.city,
          role: user.role,
          spotifyLink: user.spotifyLink,
          appleMusicLink: user.appleMusicLink,
          bio: user.bio,
          profilePicture: user.profilePicture,
        },
      },
    };

    // Return JWT Token and add user data
    console.log({ token, userData, message: `User: [${user.username}] created successfully` });
    return res.status(201).json({ token, userData, message: `Username: [${user.username}] created successfully` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error creating user' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Validate user input data
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for existing user by username or email
    const existingUser = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!existingUser ) {
      return res.status(404).json({ message: `Incorrect email or username: ${usernameOrEmail}` });
    }

    // Check if the user already has a valid token in the Redis blocklist
    const existingToken = await redisClient.get(existingUser._id.toString());
    if (existingToken) {
      // User has a valid token, respond with success but do not generate a new token
      return res.status(200).json({
        existingToken,
        message: 'User is already logged in with a valid session.',
        userData: {
          id: existingUser ._id,
          firstName: existingUser .firstName,
          lastName: existingUser .lastName,
          username: existingUser .username,
          email: existingUser .email,
          fullName: existingUser .fullName,
        },
      });
    }

    // Compare provided password with hashed password in the database
    const isValidPassword = await bcrypt.compare(password, existingUser .password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT Token with a short expiration time (e.g., 15 minutes)
    const jwtToken = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '15m' });
    // Generate Refresh Token with a longer expiration time (e.g., 7 days)
    const refreshToken = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

    // Store the refresh token in Redis with a longer expiration time
    await redisClient.set(`refreshToken:${existingUser._id}`, refreshToken, 'EX', 604800); // 7 days in seconds
    // Store the JWT token in Redis blocklist
    await redisClient.set(existingUser._id.toString(), jwtToken, 'EX', 900); // Set expiration time as needed (1 hour in this case)

    // Defined user data
    const userData = {
      id: existingUser._id,
      // firstName: existingUser.firstName,
      // lastName: existingUser.lastName,
      username: existingUser.username,
      // email: existingUser.email,
      fullName: existingUser.fullName,
      role: existingUser.role,
    };

    // Log the successful login attempt
    console.log({ jwtToken, refreshToken, userData, message: `User  [${usernameOrEmail}] logged in successfully` });

    // Return JWT Token and add user data
    return res.status(200).json({ jwtToken, refreshToken, userData, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error logging in' });
  }
};

// Profile
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Defined user data
    const userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      };
  
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving user profile' });
  }
};

// Check existing user
export const checkNewUser = async (req, res) => {
  const { username, email } = req.body;

  // Check if existing user
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    // If an existing user is found, respond with a 409 Conflict status
    return res.status(409).json({ 
      message: existingUser.username === username 
        ? `Username: ${existingUser.username} already exists` 
        : `Email address: ${existingUser.email} already exists` 
    });
  } else {
    // Success case: No new user found
    return res.status(200).json({ 
      message: `Welcome: ${username}`
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is present
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace('Bearer ', '').trim();

    // Check if the token is empty after extraction
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify the JWT token to get the user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    // Check if the JWT token exists in the blocklist
    const tokenExists = await redisClient.exists(userId.toString());
    if (!tokenExists) {
      return res.status(400).json({ message: 'User  is not logged in' });
    }

    // Remove the JWT token from the Redis blocklist
    await redisClient.del(userId.toString());

    // Remove the refresh token from Redis
    await redisClient.del(`refreshToken:${userId}`);

    // Clear the cookie if you're using cookies for JWT
    res.clearCookie('jwToken'); // Adjust the cookie name as necessary

    console.log(`User  with token: [${token}] logged out successfully`);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing logout' });
  }
};

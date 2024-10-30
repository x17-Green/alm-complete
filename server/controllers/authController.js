// Implement JWT Authentication

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

// Registration
export const register = async (req, res) => {
  try {
    const {
      firstName, lastName, username, email, password,
    } = req.body;

    // Validate user input data
    if (!firstName || !lastName || !username || !email || !password) {
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
        },
      },
    };

    // Return JWT Token and add user data
    return res.status(201).json({ token, userData, message: `Username: [${user.username}] created successfully` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error creating user' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate user input data
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for existing username and email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.username !== username) {
      return res.status(400).json({ message: 'Incorrect username' });
    }
    if (user.email !== email) {
      return res.status(400).json({ message: 'Incorrect email address' });
    }

    // Compare provided password with hashed password in database
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Defined user data
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    };

    // Return JWT Token and add user data
    return res.status(200).json({ token, userData, message: 'Logged in successfully' });
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

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Mock user for demonstration purposes
// In a real application, this would be stored in a database
const adminUser = {
  id: '1',
  username: 'admin',
  password: '$2a$10$XFNxG9mYMNIUBw5OqLEbvOlsJ9SFq1jHKcKnqZ.mGNbDUJKiZVvlG', // hashed 'admin123'
  isAdmin: true
};

// For debugging purposes
console.log('Admin user configured:', { id: adminUser.id, username: adminUser.username, isAdmin: adminUser.isAdmin });

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username });

  try {
    // Check if username matches
    if (username !== adminUser.username) {
      console.log('Username mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // For direct comparison during development/testing
    if (password === 'admin123') {
      console.log('Direct password match for development');
      // Create and sign JWT token
      const payload = {
        user: {
          id: adminUser.id,
          isAdmin: adminUser.isAdmin
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'mysecrettoken',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: adminUser.id,
              username: adminUser.username,
              isAdmin: adminUser.isAdmin
            }
          });
        }
      );
      return;
    }
    
    // Check if password matches using bcrypt
    const isMatch = await bcrypt.compare(password, adminUser.password);
    console.log('Password check result:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT token
    const payload = {
      user: {
        id: adminUser.id,
        isAdmin: adminUser.isAdmin
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'mysecrettoken',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: adminUser.id,
            username: adminUser.username,
            isAdmin: adminUser.isAdmin
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/verify
// @desc    Verify token & return user data
// @access  Private
router.get('/verify', (req, res) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');

    // Return user data
    res.json({
      isValid: true,
      user: {
        id: decoded.user.id,
        username: adminUser.username, // Include username in response
        isAdmin: decoded.user.isAdmin
      }
    });
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// For testing purposes, you can create a hash for a password
// Uncomment this code to generate a hash for a new password
/*
const generateHash = async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('admin123', salt);
  console.log('Generated hash:', hash);
};

generateHash();
*/

module.exports = { router };
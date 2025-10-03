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
  password: '$2b$10$JnODO7FhStj3OFPrgZ0fDemXIXyQti3MBC/2z0DhZIiTtyxXU1iIu', // Hash for 'admin123'
  isAdmin: true
};

// For debugging purposes
console.log('Admin user configured:', { id: adminUser.id, username: adminUser.username, isAdmin: adminUser.isAdmin });

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username, passwordLength: password?.length });

  try {
    // Check if username matches
    if (username !== adminUser.username) {
      console.log('Username mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Removed insecure direct password comparison for production security
    
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

// Hash generation is now handled in initializeAdmin() function above

module.exports = { router };
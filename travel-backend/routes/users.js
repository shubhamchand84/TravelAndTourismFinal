const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email && !phone) return res.status(400).json({ message: 'Email or phone required' });

    // Check existing
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, phone });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();

    const payload = { user: { id: user._id.toString(), role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'mysecrettoken', { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await User.findOne(email ? { email } : { phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.password) return res.status(400).json({ message: 'Password login not enabled' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user._id.toString(), role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'mysecrettoken', { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedTrips');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/me
router.put('/me', verifyToken, async (req, res) => {
  try {
    const { name, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, preferences } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/saved-trips/:packageId
router.post('/saved-trips/:packageId', verifyToken, async (req, res) => {
  try {
    const { packageId } = req.params;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { savedTrips: packageId } },
      { new: true }
    ).populate('savedTrips');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

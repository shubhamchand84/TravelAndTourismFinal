const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { verifyToken, requireRoles } = require('../middleware/auth');

// GET /api/bookings - User's bookings or all
router.get('/', verifyToken, async (req, res) => {
  try {
    const isAdmin = ['admin', 'staff'].includes(req.user.role);
    const filter = isAdmin ? {} : { user: req.user.id };
    
    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('package', 'title location basePrice')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/bookings/:id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('package');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Users can only see their own bookings
    const isAdmin = ['admin', 'staff'].includes(req.user.role);
    if (!isAdmin && booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/bookings
router.post('/', verifyToken, async (req, res) => {
  try {
    const bookingData = { ...req.body, user: req.user.id };
    
    // Validate package exists if booking a package
    if (bookingData.package) {
      const package = await Package.findById(bookingData.package);
      if (!package) return res.status(404).json({ message: 'Package not found' });
    }
    
    const booking = new Booking(bookingData);
    await booking.save();
    
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('package');
    
    res.status(201).json(populatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/bookings/:id/status - Admin only
router.put('/:id/status', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email phone').populate('package');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/bookings/:id/payment - Admin only
router.put('/:id/payment', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    ).populate('user', 'name email phone').populate('package');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

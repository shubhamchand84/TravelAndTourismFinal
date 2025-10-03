const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { verifyToken, requireRoles } = require('../middleware/auth');

// GET /api/payments - Admin only
router.get('/', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('booking')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/payments/booking/:bookingId
router.get('/booking/:bookingId', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Users can only see payments for their own bookings
    const isAdmin = ['admin', 'staff'].includes(req.user.role);
    if (!isAdmin && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const payments = await Payment.find({ booking: req.params.bookingId })
      .populate('booking')
      .populate('user', 'name email phone');
    
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/payments - Create payment (stub implementation)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { bookingId, amount, method } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Users can only create payments for their own bookings
    const isAdmin = ['admin', 'staff'].includes(req.user.role);
    if (!isAdmin && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const payment = new Payment({
      booking: bookingId,
      user: req.user.id,
      amount,
      method,
      providerRef: `STUB_${Date.now()}`, // Stub reference
      status: 'paid' // Stub - always successful for demo
    });
    
    await payment.save();
    
    // Update booking payment status
    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid' });
    
    const populatedPayment = await Payment.findById(payment._id)
      .populate('booking')
      .populate('user', 'name email phone');
    
    res.status(201).json(populatedPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/payments/:id/status - Admin only
router.put('/:id/status', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('booking').populate('user', 'name email phone');
    
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    
    // Update booking payment status based on payment status
    const paymentStatusMap = {
      'paid': 'paid',
      'failed': 'unpaid',
      'refunded': 'refunded',
      'partial': 'partial'
    };
    
    if (paymentStatusMap[status]) {
      await Booking.findByIdAndUpdate(payment.booking._id, { 
        paymentStatus: paymentStatusMap[status] 
      });
    }
    
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

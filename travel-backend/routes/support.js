const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { verifyToken, requireRoles } = require('../middleware/auth');

// GET /api/support - User's tickets or all
router.get('/', verifyToken, async (req, res) => {
  try {
    const isAdmin = ['admin', 'staff'].includes(req.user.role);
    const filter = isAdmin ? {} : { user: req.user.id };
    
    const tickets = await SupportTicket.find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/support/:id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id)
      .populate('user', 'name email phone');
    
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    
    // Users can only see their own tickets
    const isAdmin = ['admin', 'staff'].includes(req.user.role);
    if (!isAdmin && ticket.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/support
router.post('/', verifyToken, async (req, res) => {
  try {
    const { subject, message, priority } = req.body;
    
    const ticket = new SupportTicket({
      user: req.user.id,
      subject,
      message,
      priority: priority || 'medium'
    });
    
    await ticket.save();
    
    const populatedTicket = await SupportTicket.findById(ticket._id)
      .populate('user', 'name email phone');
    
    res.status(201).json(populatedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/support/:id/status - Admin only
router.put('/:id/status', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email phone');
    
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/support/:id/priority - Admin only
router.put('/:id/priority', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const { priority } = req.body;
    
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    ).populate('user', 'name email phone');
    
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

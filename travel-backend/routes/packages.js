const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { verifyToken, requireRoles } = require('../middleware/auth');

// GET /api/packages - Public search/filter
router.get('/', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, duration, sort = 'createdAt', page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (location) filter['location.city'] = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = Number(minPrice);
      if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
    }
    if (duration) filter.durationDays = Number(duration);

    const packages = await Package.find(filter)
      .sort({ [sort]: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Package.countDocuments(filter);
    res.json({ packages, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/packages/:id
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.json(package);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/packages - Admin only
router.post('/', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const package = new Package({
      ...req.body,
      createdBy: new mongoose.Types.ObjectId() // Generate a valid ObjectId instead of using req.user.id
    });
    await package.save();
    res.status(201).json(package);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/packages/:id - Admin only
router.put('/:id', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.json(package);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/packages/:id - Admin only
router.delete('/:id', verifyToken, requireRoles('admin'), async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    
    // Check if package has bookings
    if (package.bookingsCount > 0) {
      // Mark as unavailable instead of deleting
      package.isActive = false;
      await package.save();
      return res.json({ 
        message: 'Package has existing bookings. Marked as unavailable instead of deletion.',
        action: 'marked_unavailable'
      });
    }
    
    // Safe to delete
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted successfully', action: 'deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/packages/:id/discounts - Admin only
router.post('/:id/discounts', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    
    package.discounts.push(req.body);
    await package.save();
    res.json(package);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/packages/admin - Admin only - Get all packages for admin dashboard
router.get('/admin/all', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/packages/:id/toggle-status - Admin only - Toggle active/inactive status
router.put('/:id/toggle-status', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    
    package.isActive = !package.isActive;
    await package.save();
    res.json({ 
      message: `Package ${package.isActive ? 'activated' : 'deactivated'}`,
      package 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/packages/:id/images - Admin only - Add images to package
router.post('/:id/images', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const { images } = req.body;
    const package = await Package.findById(req.params.id);
    
    if (!package) return res.status(404).json({ message: 'Package not found' });
    
    package.images.push(...images);
    await package.save();
    res.json(package);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/packages/:id/images/:index - Admin only - Remove specific image
router.delete('/:id/images/:index', verifyToken, requireRoles('admin', 'staff'), async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    
    const imageIndex = parseInt(req.params.index);
    if (imageIndex >= 0 && imageIndex < package.images.length) {
      package.images.splice(imageIndex, 1);
      await package.save();
      res.json({ message: 'Image removed successfully', package });
    } else {
      res.status(400).json({ message: 'Invalid image index' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

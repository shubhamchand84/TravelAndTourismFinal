const express = require('express');
const router = express.Router();
const TravelPackage = require('../models/TravelPackage');
const { upload, deleteImage } = require('../config/cloudinary');
const { verifyToken: auth, requireRoles } = require('../middleware/auth');

// @route   GET /api/travel-packages
// @desc    Get all active travel packages (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      tags,
      minPrice,
      maxPrice,
      search
    } = req.query;

    const query = { isActive: true };
    
    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Add filters
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const packages = await TravelPackage.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await TravelPackage.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: {
        packages,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching packages',
      error: error.message
    });
  }
});

// @route   GET /api/travel-packages/:id
// @desc    Get single travel package by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const package = await TravelPackage.findById(req.params.id);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    if (!package.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Package is not available'
      });
    }

    res.json({
      success: true,
      data: package
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid package ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching package',
      error: error.message
    });
  }
});

// @route   POST /api/travel-packages
// @desc    Create new travel package (Admin only)
// @access  Private/Admin
router.post('/', auth, requireRoles('admin'), upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/travel-packages - User:', req.user);
    console.log('POST /api/travel-packages - Body:', req.body);
    console.log('POST /api/travel-packages - File:', req.file ? 'Present' : 'Missing');
    
    const {
      title,
      subtitle,
      price,
      startDate,
      endDate,
      shortDescription,
      tags
    } = req.body;

    // Validate required fields
    if (!title || !price || !startDate || !endDate || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Package image is required'
      });
    }

    // Parse tags if provided as string
    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === 'string' ? 
        tags.split(',').map(tag => tag.trim().toLowerCase()) : 
        tags;
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Create package - use a dummy ObjectId for createdBy since we don't have real users
    const mongoose = require('mongoose');
    const packageData = {
      title: title.trim(),
      subtitle: subtitle?.trim(),
      price: parseFloat(price),
      startDate: start,
      endDate: end,
      shortDescription: shortDescription.trim(),
      tags: parsedTags,
      image: {
        url: req.file.path,
        publicId: req.file.filename
      },
      createdBy: new mongoose.Types.ObjectId() // Generate a valid ObjectId
    };

    const newPackage = new TravelPackage(packageData);
    await newPackage.save();

    res.status(201).json({
      success: true,
      message: 'Travel package created successfully',
      data: newPackage
    });
  } catch (error) {
    console.error('Error creating package:', error);
    
    // Delete uploaded image if package creation fails
    if (req.file) {
      try {
        await deleteImage(req.file.filename);
      } catch (deleteError) {
        console.error('Error deleting uploaded image:', deleteError);
      }
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating package',
      error: error.message
    });
  }
});

// @route   PUT /api/travel-packages/:id
// @desc    Update travel package (Admin only)
// @access  Private/Admin
router.put('/:id', auth, requireRoles('admin'), upload.single('image'), async (req, res) => {
  try {
    const package = await TravelPackage.findById(req.params.id);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    const {
      title,
      subtitle,
      price,
      startDate,
      endDate,
      shortDescription,
      tags,
      isActive
    } = req.body;

    // Parse tags if provided
    let parsedTags = package.tags;
    if (tags !== undefined) {
      parsedTags = typeof tags === 'string' ? 
        tags.split(',').map(tag => tag.trim().toLowerCase()) : 
        tags;
    }

    // Validate dates if provided
    const newStartDate = startDate ? new Date(startDate) : package.startDate;
    const newEndDate = endDate ? new Date(endDate) : package.endDate;
    
    if (newStartDate >= newEndDate) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Update fields
    const updateData = {
      title: title?.trim() || package.title,
      subtitle: subtitle?.trim() || package.subtitle,
      price: price !== undefined ? parseFloat(price) : package.price,
      startDate: newStartDate,
      endDate: newEndDate,
      shortDescription: shortDescription?.trim() || package.shortDescription,
      tags: parsedTags,
      isActive: isActive !== undefined ? isActive : package.isActive
    };

    // Handle image update
    if (req.file) {
      // Delete old image from Cloudinary
      if (package.image.publicId) {
        try {
          await deleteImage(package.image.publicId);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }

      updateData.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    const updatedPackage = await TravelPackage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Package updated successfully',
      data: updatedPackage
    });
  } catch (error) {
    console.error('Error updating package:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid package ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating package',
      error: error.message
    });
  }
});

// @route   DELETE /api/travel-packages/:id
// @desc    Delete travel package (Admin only)
// @access  Private/Admin
router.delete('/:id', auth, requireRoles('admin'), async (req, res) => {
  try {
    const package = await TravelPackage.findById(req.params.id);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    // Delete image from Cloudinary
    if (package.image.publicId) {
      try {
        await deleteImage(package.image.publicId);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
      }
    }

    // Delete package from database
    await TravelPackage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Package deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting package:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid package ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting package',
      error: error.message
    });
  }
});

// @route   GET /api/travel-packages/admin/all
// @desc    Get all packages for admin (including inactive)
// @access  Private/Admin
router.get('/admin/all', auth, requireRoles('admin'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status = 'all'
    } = req.query;

    const query = {};
    if (status !== 'all') {
      query.isActive = status === 'active';
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const packages = await TravelPackage.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await TravelPackage.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: {
        packages,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin packages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching packages',
      error: error.message
    });
  }
});

module.exports = router;

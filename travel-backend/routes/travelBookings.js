const express = require('express');
const router = express.Router();
const TravelBooking = require('../models/TravelBooking');
const TravelPackage = require('../models/TravelPackage');
const { verifyToken: auth } = require('../middleware/auth');

// @route   POST /api/travel-bookings
// @desc    Create new booking
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      packageId,
      userName,
      email,
      phone,
      travelers,
      travelDate,
      specialRequests
    } = req.body;

    // Validate required fields
    if (!packageId || !userName || !email || !phone || !travelers || !travelDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if package exists and is active
    const package = await TravelPackage.findById(packageId);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    if (!package.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Package is not available for booking'
      });
    }

    // Validate travel date is within package date range
    const requestedDate = new Date(travelDate);
    if (requestedDate < package.startDate || requestedDate > package.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Travel date must be within package date range'
      });
    }

    // Calculate total amount
    const totalAmount = package.price * parseInt(travelers);

    // Create booking
    const bookingData = {
      packageId,
      packageTitle: package.title,
      userName: userName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      travelers: parseInt(travelers),
      travelDate: requestedDate,
      specialRequests: specialRequests?.trim(),
      totalAmount
    };

    const newBooking = new TravelBooking(bookingData);
    await newBooking.save();

    // Update package bookings count
    await TravelPackage.findByIdAndUpdate(
      packageId,
      { $inc: { bookingsCount: 1 } }
    );

    // Populate package details for response
    await newBooking.populate('packageId', 'title price startDate endDate');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: newBooking,
        bookingReference: newBooking.formattedReference
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);

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
      message: 'Server error while creating booking',
      error: error.message
    });
  }
});

// @route   GET /api/travel-bookings
// @desc    Get all bookings (Admin only)
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      packageId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = req.query;

    const query = {};
    
    // Add filters
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (packageId) {
      query.packageId = packageId;
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { bookingReference: { $regex: search, $options: 'i' } },
        { packageTitle: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const bookings = await TravelBooking.find(query)
      .populate('packageId', 'title price startDate endDate image')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await TravelBooking.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    // Get booking statistics
    const stats = await TravelBooking.getBookingStats();

    res.json({
      success: true,
      data: {
        bookings,
        stats,
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
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings',
      error: error.message
    });
  }
});

// @route   GET /api/travel-bookings/:id
// @desc    Get single booking by ID
// @access  Private/Admin
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await TravelBooking.findById(req.params.id)
      .populate('packageId', 'title price startDate endDate image shortDescription');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking',
      error: error.message
    });
  }
});

// @route   PUT /api/travel-bookings/:id
// @desc    Update booking status (Admin only)
// @access  Private/Admin
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, notes, paymentStatus } = req.body;

    const booking = await TravelBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Validate status
    const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Validate payment status
    const validPaymentStatuses = ['Pending', 'Paid', 'Refunded'];
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status value'
      });
    }

    // Update booking
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const updatedBooking = await TravelBooking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('packageId', 'title price startDate endDate image');

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    console.error('Error updating booking:', error);

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
        message: 'Invalid booking ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating booking',
      error: error.message
    });
  }
});

// @route   DELETE /api/travel-bookings/:id
// @desc    Delete booking (Admin only)
// @access  Private/Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await TravelBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update package bookings count
    await TravelPackage.findByIdAndUpdate(
      booking.packageId,
      { $inc: { bookingsCount: -1 } }
    );

    // Delete booking
    await TravelBooking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting booking',
      error: error.message
    });
  }
});

// @route   GET /api/travel-bookings/reference/:reference
// @desc    Get booking by reference number (Public)
// @access  Public
router.get('/reference/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    // Remove TRV- prefix if present
    const cleanReference = reference.replace(/^TRV-/, '');
    
    const booking = await TravelBooking.findOne({ 
      bookingReference: cleanReference 
    }).populate('packageId', 'title price startDate endDate image shortDescription');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking by reference:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking',
      error: error.message
    });
  }
});

// @route   GET /api/travel-bookings/stats/dashboard
// @desc    Get booking statistics for dashboard (Admin only)
// @access  Private/Admin
router.get('/stats/dashboard', auth, async (req, res) => {
  try {
    const stats = await TravelBooking.getBookingStats();
    
    // Get recent bookings
    const recentBookings = await TravelBooking.find()
      .populate('packageId', 'title price')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get monthly booking trends
    const monthlyStats = await TravelBooking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.json({
      success: true,
      data: {
        stats,
        recentBookings,
        monthlyStats
      }
    });
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;

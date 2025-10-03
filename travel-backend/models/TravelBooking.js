const mongoose = require('mongoose');

const travelBookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TravelPackage',
    required: [true, 'Package ID is required']
  },
  packageTitle: {
    type: String,
    required: [true, 'Package title is required'],
    trim: true
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  travelers: {
    type: Number,
    required: [true, 'Number of travelers is required'],
    min: [1, 'At least 1 traveler is required'],
    max: [20, 'Maximum 20 travelers allowed']
  },
  travelDate: {
    type: Date,
    required: [true, 'Travel date is required']
  },
  specialRequests: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted booking reference
travelBookingSchema.virtual('formattedReference').get(function() {
  return `TRV-${this.bookingReference}`;
});

// Index for better query performance
travelBookingSchema.index({ packageId: 1 });
travelBookingSchema.index({ status: 1 });
travelBookingSchema.index({ createdAt: -1 });
travelBookingSchema.index({ email: 1 });
travelBookingSchema.index({ bookingReference: 1 });

// Pre-save middleware to generate booking reference
travelBookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    // Generate unique booking reference
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingReference = `${timestamp}${random}`.toUpperCase();
  }
  next();
});

// Pre-save middleware to validate travel date
travelBookingSchema.pre('save', async function(next) {
  if (this.isModified('travelDate') || this.isModified('packageId')) {
    try {
      const TravelPackage = mongoose.model('TravelPackage');
      const package = await TravelPackage.findById(this.packageId);
      
      if (!package) {
        return next(new Error('Package not found'));
      }
      
      if (this.travelDate < package.startDate || this.travelDate > package.endDate) {
        return next(new Error('Travel date must be within package date range'));
      }
      
      // Set package title if not already set
      if (!this.packageTitle) {
        this.packageTitle = package.title;
      }
      
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Static method to get bookings with pagination
travelBookingSchema.statics.getBookingsWithPagination = function(options = {}) {
  const {
    page = 1,
    limit = 10,
    status,
    packageId,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  const query = {};
  
  if (status) query.status = status;
  if (packageId) query.packageId = packageId;

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  return this.find(query)
    .populate('packageId', 'title price startDate endDate')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);
};

// Static method to get booking statistics
travelBookingSchema.statics.getBookingStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);
};

// Instance method to update status
travelBookingSchema.methods.updateStatus = function(newStatus, notes) {
  this.status = newStatus;
  if (notes) {
    this.notes = notes;
  }
  return this.save();
};

module.exports = mongoose.model('TravelBooking', travelBookingSchema);

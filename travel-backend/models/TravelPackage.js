const mongoose = require('mongoose');

const travelPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Package title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [150, 'Subtitle cannot exceed 150 characters']
  },
  price: {
    type: Number,
    required: [true, 'Package price is required'],
    min: [0, 'Price cannot be negative']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  image: {
    url: {
      type: String,
      required: [true, 'Image URL is required']
    },
    publicId: {
      type: String,
      required: [true, 'Cloudinary public ID is required']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for duration in days
travelPackageSchema.virtual('duration').get(function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Index for better query performance
travelPackageSchema.index({ createdAt: -1 });
travelPackageSchema.index({ isActive: 1 });
travelPackageSchema.index({ tags: 1 });
travelPackageSchema.index({ price: 1 });

// Pre-save middleware to ensure dates are valid
travelPackageSchema.pre('save', function(next) {
  if (this.startDate >= this.endDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

// Static method to get active packages
travelPackageSchema.statics.getActivePackages = function(options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    tags,
    minPrice,
    maxPrice
  } = options;

  const query = { isActive: true };
  
  // Add filters
  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  return this.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate('createdBy', 'username email');
};

module.exports = mongoose.model('TravelPackage', travelPackageSchema);

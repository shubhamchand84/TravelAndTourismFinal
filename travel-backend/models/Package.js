const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  seats: Number,
  hotel: String,
  flight: String,
  price: Number
}, { _id: false });

const DiscountSchema = new mongoose.Schema({
  name: String,
  percentage: Number,
  startDate: Date,
  endDate: Date,
  active: { type: Boolean, default: true }
}, { _id: false });

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['Adventure','Beaches','Hills','Historical','Wildlife','City','Culture','Relaxation','Other'], default: 'Other' },
  location: { city: String, country: String },
  durationDays: Number,
  basePrice: { type: Number, required: true },
  images: [String],
  inclusions: [String],
  exclusions: [String],
  discounts: [DiscountSchema],
  availability: [AvailabilitySchema],
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  bookingsCount: { type: Number, default: 0 },
  maxGroupSize: { type: Number, default: 20 },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Moderate' },
  highlights: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    meals: [String],
    accommodation: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);

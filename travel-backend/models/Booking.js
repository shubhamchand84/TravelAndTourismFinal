const mongoose = require('mongoose');

const TravelerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
}, { _id: false });

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['hotel', 'flight', 'package', 'transport'], required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  hotel: { name: String, roomType: String },
  flight: { airline: String, flightNumber: String },
  transport: { mode: String, provider: String },
  travelers: [TravelerSchema],
  startDate: Date,
  endDate: Date,
  price: Number,
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending','confirmed','rejected','cancelled','completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid','paid','refunded','partial'], default: 'unpaid' },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);

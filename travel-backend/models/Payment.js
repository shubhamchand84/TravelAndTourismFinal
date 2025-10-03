const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  method: { type: String, enum: ['UPI','Card','NetBanking','Wallet','PayPal','Other'], default: 'Other' },
  providerRef: { type: String },
  status: { type: String, enum: ['pending','paid','failed','refunded','partial'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);

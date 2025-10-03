const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
  interests: [{ type: String }],
  budgetRange: { min: Number, max: Number },
  preferredDurations: [{ type: Number }],
  locations: [{ type: String }]
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin', 'staff', 'agent'], default: 'user' },
  savedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
  preferences: PreferenceSchema,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

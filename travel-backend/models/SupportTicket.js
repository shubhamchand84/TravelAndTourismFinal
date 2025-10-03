const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open','in_progress','resolved','closed'], default: 'open' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);

const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, default: 'General' },
  hourlyRate: { type: Number, default: 0 }, // e.g., 200 Rs extra
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Coach', coachSchema);
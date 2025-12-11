const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Badminton Court 1"
  type: { type: String, enum: ['indoor', 'outdoor'], required: true },
  basePricePerHour: { type: Number, required: true }, // e.g., 500 Rs
  description: String
});

module.exports = mongoose.model('Court', courtSchema);
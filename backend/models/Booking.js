const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
  userEmail: { type: String, required: true }, // Simple user setup for now
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  
  // Resources Added
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach', default: null },
  racketsNeeded: { type: Number, default: 0 },
  
  // Price Calculation Snapshot (Store exactly how much charged)
  totalPrice: { type: Number, required: true },
  priceBreakdown: {
    basePrice: Number,
    coachFee: Number,
    equipmentFee: Number,
    peakHourSurge: Number
  },
  
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
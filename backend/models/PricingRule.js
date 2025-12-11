const mongoose = require('mongoose');

const pricingRuleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true }, // e.g., "Weekend Hike"
  type: { type: String, enum: ['peak_hour', 'weekend', 'holiday'], required: true },
  multiplier: { type: Number, default: 1 }, // e.g., 1.5x price
  additionalAmount: { type: Number, default: 0 }, // e.g., +100 Rs
  startTime: String, // "18:00" (Only for peak_hour)
  endTime: String,   // "21:00"
  dayOfWeek: Number  // 0=Sun, 6=Sat (Only for weekend)
});

module.exports = mongoose.model('PricingRule', pricingRuleSchema);
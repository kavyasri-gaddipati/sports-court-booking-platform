const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Court = require('./models/Court');
const Coach = require('./models/Coach');
const PricingRule = require('./models/PricingRule');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Court.deleteMany();
    await Coach.deleteMany();
    await PricingRule.deleteMany();

    // 1. More Courts (Variety)
    const courts = [
      { name: '🏸 Badminton Court A (Premium)', type: 'indoor', basePricePerHour: 500, description: 'Synthetic mat, Air Conditioned' },
      { name: '🏸 Badminton Court B', type: 'indoor', basePricePerHour: 400, description: 'Standard wooden flooring' },
      { name: '🎾 Tennis Clay Court', type: 'outdoor', basePricePerHour: 800, description: 'Professional Red Clay' },
      { name: '🏀 Basketball Arena', type: 'outdoor', basePricePerHour: 1000, description: 'Full court with floodlights' },
      { name: '🏏 Cricket Net Practice', type: 'outdoor', basePricePerHour: 300, description: 'Bowling machine available' },
      { name: '🏐 Squash Court Pro', type: 'indoor', basePricePerHour: 600, description: 'Glass back wall' }
    ];

    // 2. More Coaches
    const coaches = [
      { name: 'Coach Rahul (Badminton)', specialization: 'Badminton', hourlyRate: 200 },
      { name: 'Coach Serena (Tennis)', specialization: 'Tennis', hourlyRate: 500 },
      { name: 'Coach Mike (Basketball)', specialization: 'Basketball', hourlyRate: 400 },
      { name: 'Coach Dhoni (Cricket)', specialization: 'Cricket', hourlyRate: 600 }
    ];

    // 3. Pricing Rules
    const rules = [
      { ruleName: 'Peak Hour', type: 'peak_hour', multiplier: 1.5, startTime: '18:00', endTime: '21:00' },
      { ruleName: 'Weekend Surge', type: 'weekend', additionalAmount: 150, dayOfWeek: 6 },
      { ruleName: 'Sunday Fun', type: 'weekend', additionalAmount: 200, dayOfWeek: 0 }
    ];

    await Court.insertMany(courts);
    await Coach.insertMany(coaches);
    await PricingRule.insertMany(rules);

    console.log('✅ HUGE Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

importData();
const Booking = require('../models/Booking');
const Court = require('../models/Court');
const Coach = require('../models/Coach');
const PricingRule = require('../models/PricingRule');
const calculateTotal = require('../utils/priceCalculator');

// 1. Create Booking
const createBooking = async (req, res) => {
  try {
    const { courtId, userEmail, startTime, endTime, coachId, racketsNeeded } = req.body;

    // Check Availability
    const existingBooking = await Booking.findOne({
      court: courtId,
      $or: [
        { startTime: { $lt: new Date(endTime), $gte: new Date(startTime) } },
        { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } }
      ],
      status: 'confirmed'
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Court is already booked for this time slot!' });
    }

    const court = await Court.findById(courtId);
    const rules = await PricingRule.find();
    let coach = null;
    if (coachId) coach = await Coach.findById(coachId);

    const pricing = await calculateTotal(court, startTime, endTime, { coach, racketsNeeded }, rules);

    const newBooking = new Booking({
      court: courtId,
      userEmail,
      startTime,
      endTime,
      coach: coachId || null,
      racketsNeeded: racketsNeeded || 0,
      totalPrice: pricing.total,
      priceBreakdown: pricing.breakdown,
      status: 'confirmed'
    });

    await newBooking.save();
    res.status(201).json(newBooking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Bookings (FIXED: Added .populate)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('court', 'name type')  // <-- Idi Court Name ni testundi
      .populate('coach', 'name')       // <-- Idi Coach Name ni testundi
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete Booking
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Update Status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.status = status;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getBookings, deleteBooking, updateBookingStatus };
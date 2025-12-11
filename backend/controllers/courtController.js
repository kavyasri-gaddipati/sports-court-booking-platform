const Court = require('../models/Court');
const Coach = require('../models/Coach');

// @desc    Get all courts
// @route   GET /api/courts
const getCourts = async (req, res) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coaches
// @route   GET /api/coaches
const getCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourts, getCoaches };
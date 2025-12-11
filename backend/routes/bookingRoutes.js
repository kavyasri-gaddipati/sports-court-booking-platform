const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getBookings, 
  deleteBooking, 
  updateBookingStatus 
} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings);
router.delete('/:id', deleteBooking);
router.patch('/:id', updateBookingStatus);

module.exports = router;
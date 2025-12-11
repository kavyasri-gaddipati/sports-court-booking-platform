const express = require('express');
const router = express.Router();
const { getCourts, getCoaches } = require('../controllers/courtController');

router.get('/courts', getCourts);     // URL: /api/courts
router.get('/coaches', getCoaches);   // URL: /api/coaches

module.exports = router;
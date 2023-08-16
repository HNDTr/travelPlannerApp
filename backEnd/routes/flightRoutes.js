const express = require('express');
const {getFlightOffers} = require('../controllers/flightController');
const router = express.Router();



router.get('/flights', getFlightOffers);

module.exports = router;
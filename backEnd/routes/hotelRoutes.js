const express = require('express');
const {getHotelOffers} = require('../controllers/hotelController');
const router = express.Router();



router.get('/hotels', getHotelOffers);

module.exports = router;
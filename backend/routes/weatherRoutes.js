const express = require('express');
const {getWeatherForecast} = require('../controllers/weatherController')
const router = express.Router();



router.get('/weathers', getWeatherForecast);

module.exports = router;
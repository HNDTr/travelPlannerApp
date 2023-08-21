const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getItineraries, deleteItinerary, updateItinerary, setItineraries } = require('../controllers/itinerariesController')

router.route('/').get(protect, getItineraries).post(protect, setItineraries)
router.route('/:id').delete(protect, deleteItinerary).put(protect, updateItinerary)

module.exports = router
const asyncHandler = require('express-async-handler')

const Itinerary = require('../models/itineraryModel')
const User = require('../models/userModel')


// @desc       Get itineraries
// @route      GET /api/itineraries
// @access     Private
const getItineraries = asyncHandler(async(req,res) => {
    const itineraries = await Itinerary.find({user: req.user.id})

    res.status(200).json(itineraries)
})

// @desc       Set itineraries
// @route      SET /api/itineraries
// @access     Private
const setItineraries = asyncHandler(async(req,res) => {
    if (!req.body.title) {
        res.status(400)
        throw new Error('Please add a title field')
      }
    
      const itinerary = await Itinerary.create({
        title: req.body.title,
        travelDate: req.body.travelDate,
        returnDate: req.body.returnDate,
        time: req.body.time,
        user: req.user.id,
        description: req.body.description
      })
    
      res.status(200).json(itinerary)
})

// @desc    Update itinerary
// @route   PUT /api/itineraries/:id
// @access  Private
const updateItinerary = asyncHandler(async (req, res) => {
    const itinerary = await Itinerary.findById(req.params.id)
  
    if (!itinerary) {
      res.status(400)
      throw new Error('Itinerary not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the itinerary user
    if (itinerary.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const updatedItinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedItinerary)
  })

// @desc    Delete itinerary
// @route   DELETE /api/itineraries/:id
// @access  Private
const deleteItinerary = asyncHandler(async (req, res) => {
    const itinerary = await Itinerary.findById(req.params.id)
  
    if (!itinerary) {
      res.status(400)
      throw new Error('Itinerary not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the itinerary user
    if (itinerary.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    await itinerary.deleteOne()
  
    res.status(200).json({ id: req.params.id })
  })


module.exports = {
    getItineraries,
    setItineraries,
    deleteItinerary,
    updateItinerary
}
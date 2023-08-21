import axios from "axios";

const API_URL = '/api/itineraries/'

// Create new itinerary
const createItinerary = async (itineraryData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, itineraryData, config)

    return response.data
}

// Get user itineraries
const getItineraries = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user itinerary
const deleteItinerary = async (itineraryId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + itineraryId, config)

    return response.data
}

// Update user itinerary
const updateItinerary = async (itineraryId, itineraryData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + itineraryId, itineraryData, config)

    return response.data
}

const itineraryService = {
    createItinerary,
    getItineraries,
    deleteItinerary,
    updateItinerary
}

export default itineraryService
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});


const getHotelOffers = async (req, res, next) => {
    const {cityCode, amenities, ratings } = req.query;

    try {
      const response = await amadeus.client.get('/v1/reference-data/locations/hotels/by-city', {
        cityCode,
        amenities,
        ratings
      });
  
      const hotelOffers = response.data;
      res.json({ data: hotelOffers });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    getHotelOffers,
};
  
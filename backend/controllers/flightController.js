const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

const getFlightOffers = async (req, res, next) => {
  const { originLocationCode, destinationLocationCode, departureDate, adults } = req.query;

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
    });

    const flightOffers = response.data;
    res.json({ data: flightOffers });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getFlightOffers,
};


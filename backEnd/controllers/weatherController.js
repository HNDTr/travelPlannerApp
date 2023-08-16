const axios = require("axios");


const API_KEY = process.env.WEATHER_API

const getWeatherForecast = async(req,res,next) => {
    const { cityName, units } = req.query;

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: cityName,
            units: units,
            appid: API_KEY,
          },
    });

        const weatherData = response.data;
        res.json(weatherData);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getWeatherForecast,
};



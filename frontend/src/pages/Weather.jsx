import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb'
import {IoIosThunderstorm} from 'react-icons/io'
import {FaSnowflake} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import {BsFillCloudDrizzleFill, BsCloudRain, BsCloudRainFill, BsCloudFog2Fill, BsCloudSunFill} from 'react-icons/bs'
import axios from 'axios';

function Weather() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    cityName: '',
  });

  const [weatherDetails, setWeatherDetails] = useState(null);

  const [tempUnits, setTempUnits] = useState('imperial')

  const { cityName } = formData;

  const fetchWeathers = async () => {
    try {
      const response = await axios.get('/api/weathers', {
        params: {
          cityName,
          units: tempUnits,
        },
      });
      const { data } = response;
      setWeatherDetails(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClick = (e) => {
    setTempUnits(e.target.value);
  }

  useEffect(() => {
    if (tempUnits) {
      fetchWeathers();
    }
  }, [tempUnits]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { name, weather, main, wind } = weatherDetails || {};

  return (
    <div className="pages">
      <h1>Weather</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          name="cityName"
          placeholder="Enter city name"
          onChange={onChange}
        />
        <button className="search-button" onClick={fetchWeathers}>
          Search
        </button>
      </div>
      <div>
        <input type="radio" name='units' value='imperial' checked={tempUnits==='imperial'} onClick={onClick}/>Farenheit
        <TbTemperatureFahrenheit></TbTemperatureFahrenheit>
        <input type="radio" name='units' value='metric' checked={tempUnits==='metric'} onClick={onClick}/>Celcius
        <TbTemperatureCelsius></TbTemperatureCelsius>
      </div>
      <div className="weather-container">
        {name && (
          <div className="weather-details">
            {weather[0].id >= 200 && weather[0].id <= 232 && (
              <IoIosThunderstorm />
            )}
            {weather[0].id >= 300 && weather[0].id <= 321 && (
              <BsFillCloudDrizzleFill />
            )}
            {weather[0].id >= 500 && weather[0].id <= 504 && (
              <BsCloudRain />
            )}
           {(weather[0].id === 511 || (weather[0].id >= 600 && weather[0].id <= 622)) && (
              <FaSnowflake />
            )}
            {weather[0].id >= 520 && weather[0].id <= 531 && (
              <BsCloudRainFill />
            )}
            {weather[0].id >= 701 && weather[0].id <= 781 && (
              <BsCloudFog2Fill />
            )}
            {weather[0].id === 800 && (
              <FiSun />
            )}
            {weather[0].id >= 801 && weather[0].id <= 804 && (
              <BsCloudSunFill/>
            )}
            <h2>{name}</h2>
            <h1>{main.temp} {tempUnits === 'imperial' ? '°F' : '°C'}</h1>
            <p>{weather[0].description}</p>
            <p>Humidity: {main.humidity}%</p>
            <p>Wind Speed: {wind.speed} {tempUnits === 'imperial' ? 'mph' : 'm/s'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;

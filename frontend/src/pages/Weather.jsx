import React, { useEffect, useState, useCallback} from 'react';
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

  const fetchWeathers = useCallback(async () => {
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
  }, [cityName, tempUnits]);

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
  }, [tempUnits, fetchWeathers]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { name, weather, main, wind } = weatherDetails || {};

  return (
    <div className="pages">
      <div className='search-container-weather'>
        <h1>Weather</h1>
        <div className='input-container-weather'>
          <div className='search-box'>
            <input
              type='text'
              className='search-input'
              name='cityName'
              placeholder='Enter city name'
              onChange={onChange}
            />
            {/* <button className='search-button' onClick={fetchWeathers}>
              Search
            </button> */}
          </div>
          <div className='radio-input-weather'>
            <div className='radio-group'>
              <input type='radio' name='units' value='imperial' defaultChecked={tempUnits === 'imperial'} onClick={onClick} />
              <label>Fahrenheit</label>
            </div>
            <TbTemperatureFahrenheit></TbTemperatureFahrenheit>
            <div className='radio-group'>
              <input type='radio' name='units' value='metric' defaultChecked={tempUnits === 'metric'} onClick={onClick} />
              <label>Celsius</label>
            </div>
            <TbTemperatureCelsius></TbTemperatureCelsius>
          </div>
        </div>
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

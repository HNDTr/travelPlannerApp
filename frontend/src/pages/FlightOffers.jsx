import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function FlightOffers() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
      originLocationCode: '',
      destinationLocationCode: '',
      departureDate: '',
      returnDate:'',
      adults: '1',
  });
  const [flightOffers, setFlightOffers] = useState([]);

  const [showReturnDate, setShowReturnDate] = useState(false);
  
  const [tripType, setTripType] = useState('oneWay');

  const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = formData;

  const fetchFlightOffers = async () => {
      try {
          const response = await axios.get(`/api/flights`, {
              params: {
                  originLocationCode,
                  destinationLocationCode,
                  departureDate,
                  returnDate,
                  adults,
              }
          });
          const {data} = response.data;
          setFlightOffers(data);
      } catch (error) {
          console.error('Error fetching flight offers:', error);
      }
 };

  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }));
      console.log(formData)
  };

  const onClick = (e) => {
    setShowReturnDate(e.target.value === 'twoWay');
    setTripType(e.target.value);
  }

  useEffect(() => {
      if (!user) {
          navigate('/login');
      }
  }, [user, navigate]);


  return (
    <div className="pages">
    <h1 className="header">Flight Offers</h1>
    <div className="search-form">
      <div className="input-group-radio">
        <label className="radio-label">
          <input
            type="radio"
            name="tripType"
            value="oneWay"
            className="tripWay"
            onClick={onClick}
            defaultChecked={tripType === 'oneWay'}
          />
          One-Way
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="tripType"
            value="twoWay"
            className="tripWay"
            onClick={onClick}
            defaultChecked={tripType === 'twoWay'}
          />
          Round-Way
        </label>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="originLocationCode">From</label>
          <input
            type="text"
            name="originLocationCode"
            placeholder="Origin Location Code"
            onChange={onChange}
            className="filter-input"
          />
        </div>
        <div className="input-item">
          <label htmlFor="destinationLocationCode">To</label>
          <input
            type="text"
            name="destinationLocationCode"
            placeholder="Destination Location Code"
            onChange={onChange}
            className="filter-input"
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="departureDate">Departure</label>
          <input
            type="date"
            name="departureDate"
            onChange={onChange}
            className="input-item"
          />
        </div>
        <div
          className="input-item return-date"
          style={{ visibility: showReturnDate ? 'visible' : 'hidden' }}
        >
          <label htmlFor="returnDate">Return</label>
          <input
            type="date"
            name="returnDate"
            onChange={onChange}
            className="filter-input-date"
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="dropdown">Number of passengers</label>
          <select
            id="dropdown"
            name="adults"
            onChange={onChange}
            className="input-item"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div className="input-item">
          <button className="search-button" onClick={fetchFlightOffers}>
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="flight-offers-list">
      {flightOffers.map((offer, index) => (
        <div key={index} className="flight-offer-item">
          <div className="flight-offer-segments">
            <div className="flight-info">
              <ul className="segment-list">
                {offer.itineraries[0].segments.map((segment, idx) => (
                  <li key={idx} className="segment">
                    <span className="segment-info">
                      Origin: {segment.departure.iataCode} - Destination:{' '}
                      {segment.arrival.iataCode}
                    </span>
                    <span className="segment-info">
                      Departure: {segment.departure.at} - Arrival:{' '}
                      {segment.arrival.at}
                    </span>
                    <span className="segment-info">
                      Duration: {segment.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cost-info">
              {offer.price && (
                <p className="flight-offer-price">
                  Price: {offer.price.total} {offer.price.currency}
                </p>
              )}
              <div className="action-buttons">
                <button className="save-button">Save</button>
                <button className="book-button">Book</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>  
  );
}

export default FlightOffers;

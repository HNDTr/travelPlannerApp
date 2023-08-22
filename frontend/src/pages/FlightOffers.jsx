import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { createItinerary } from '../features/itineraries/itinerarySlice';
import axios from 'axios';

function FlightOffers() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false); 

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

  const [formErrors, setFormErrors] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
  });

  const fetchFlightOffers = async () => {
    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      // Set errors for the fields that are not filled out
      setFormErrors({
        originLocationCode: originLocationCode ? '' : 'Location code is required',
        destinationLocationCode: destinationLocationCode ? '' : 'Destination code is required',
        departureDate: departureDate ? '' : 'Departure date is required'
      });
      return;
    }
      try {
          setIsLoading(true); 
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
      } finally {
        setIsLoading(false); // Set isLoading back to false after the API call
      }
 };


  const today = new Date().toISOString().split('T')[0];

  // Handle save button click
  const handleSave = (offer) => {
    const { itineraries } = offer;
    const departureTime = itineraries[0].segments[0].departure.at;
    const origin = itineraries[0].segments[0].departure.iataCode
    const to = itineraries[0].segments[0].arrival.iataCode
    const to2 = itineraries[0].segments[1].arrival.iataCode
    const [datePart, timePart] = departureTime.split("T");

    const itineraryData = {
      title: `${to2 ? origin + "-" + to2  : (origin +  "-" + to)}`,
      travelDate: datePart,    // Pass the departure date
      time: timePart,    // Pass the departure time
    };

      dispatch(createItinerary(itineraryData))
  };

  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }));

      // Clear the error for the current field
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: '',
      }));
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="pages">
    <h1 className="header-flight">Flight Offers</h1>
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
        {formErrors.originLocationCode && <div className="error-message text-danger">{formErrors.originLocationCode}</div>}
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
          {formErrors.destinationLocationCode&& <div className="error-message text-danger">{formErrors.destinationLocationCode}</div>}
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
            min={today}
          />
          {formErrors.departureDate&& <div className="error-message text-danger">{formErrors.departureDate}</div>}
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
            min={today}
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
      {flightOffers ? (flightOffers.map((offer, index) => (
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
                <button className="save-button"  onClick={() => handleSave(offer)}>Save</button>
                <button className="book-button">Book</button>
              </div>
            </div>
          </div>
        </div>
      ))) : (<h1>No flight offers</h1>)}
    </div>
  </div>  
  );
}

export default FlightOffers;

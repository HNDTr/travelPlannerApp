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
          <h1>Flight Offers</h1>
            <div className='filter-box'>
              <div className='input-options'>
                <input
                  type="radio"
                  name="tripType"
                  value="oneWay"
                  className='tripWay'
                  onClick={onClick}
                  checked={tripType === 'oneWay'}
              />  <span className="radio-text">One-Way</span>
              <input
                  type="radio"
                  name="tripType"
                  value="twoWay"
                  className='tripWay'
                  onClick={onClick}
                  checked={tripType === 'twoWay'}
              /> <span className="radio-text">Round-Way</span>
              </div>
              <div className='filter-container'>
              <div className='filter-display'>
              <div className="input-container">
                <label htmlFor="originLocationCode">From</label>
                <input
                    type="text"
                    name="originLocationCode"
                    placeholder="Origin Location Code"
                    onChange={onChange}
                    className='filter-input'
                />
              </div>
              <div className="input-container">
                <label htmlFor="destinationLocationCode">To</label>
                <input
                    type="text"
                    name="destinationLocationCode"
                    placeholder="Destination Location Code"
                    onChange={onChange}
                    className='filter-input'
                />
              </div>
              </div>
              <div className='filter-display'>
                <div className="input-container">
                  <label htmlFor='departureDate'>Departure</label>
                  <input
                      type="date"
                      name="departureDate"
                      onChange={onChange}
                      className='filter-input-date'
                  />
                </div>
                <div className="input-container-date" style={{ visibility: showReturnDate ? 'visible' : 'hidden' }}>
                  <label htmlFor='returnDate'>Return</label>
                  <input
                      type="date"
                      name="returnDate"
                      onChange={onChange}
                      className='filter-input-date'
                  />
                </div>
              </div>
              <div className='filter-display'>
              <div className="input-container">
                <label htmlFor='dropdown'>Number of passengers</label>
                <select id="dropdown" name='adults' onChange={onChange}>
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
              <div className="input-container">
                  <button onClick={fetchFlightOffers}>Search</button>
              </div>
              </div>
              </div>
            </div>
          <div>
              {(
                  flightOffers.map((offer) => (
                    <ul className="flight-offers-list">
                      <li className="flight-offer-item">
                          {/* Accessing itineraries and segments */}
                          
                              <div className="flight-offer-segments">
                                <div className='flight-info'>
                                  <div >
                                      {offer.itineraries[0].segments.map((segment) => (
                                          <li >
                                            <span className='time-text'>Origin:</span>{segment.departure.iataCode} - <span className='time-text'> Destination: </span>{segment.arrival.iataCode}
                                          </li>
                                      ))}
                                  </div>
                                  <div>
                                        {offer.itineraries[0].segments.map((segment) => (
                                    <div>
                                          <span className='time-text'>Departure:</span><span className='time-num'>{segment.departure.at}</span>
                                          <span className='time-text'>Arrival:</span><span className='time-num'>{segment.arrival.at}</span>
                                          <span className='time-text'>Duration:</span><span className='time-num'>{segment.duration}</span>            
                                    </div>
                                          ))}
                                  </div>
                                </div>
                                <div className='cost-info'>
                                  {/* Accessing price */}
                                  {offer.price && (
                                    <p className="flight-offer-price">Price: {offer.price.total} {offer.price.currency}</p>
                                  )}
                                  <div>
                                    <button>Save</button>
                                    <button>Book</button>
                                  </div>
                                </div>
                              </div>
                        </li>
                      </ul>
                  ))
              )}
          </div>
    </div>
  );
}

export default FlightOffers;

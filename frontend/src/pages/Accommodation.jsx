import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Accommodation() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
      cityCode:'',
      amenities:'SPA, RESTAURANT, SWIMMING_POOL, FITNESS_CENTER, AIR_CONDITIONING, PARKING, PETS_ALLOWED, AIRPORT_SHUTTLE, BUSINESS_CENTER, DISABLED_FACILITIES, WIFI, MEETING_ROOMS, NO_KID_ALLOWED, TENNIS, GOLF, KITCHEN, ANIMAL_WATCHING, BABY-SITTING, BEACH, CASINO, JACUZZI, SAUNA, SOLARIUM, MASSAGE, VALET_PARKING, BAR or LOUNGE, KIDS_WELCOME, NO_PORN_FILMS, MINIBAR, TELEVISION, WI-FI_IN_ROOM, ROOM_SERVICE, GUARDED_PARKG, SERV_SPEC_MENU',
      ratings:4
  });

  const [formErrors, setFormErrors] = useState({
    cityCode: '',
  });

  const [hotelOffers, setHotelOffers] = useState([]);

  const { cityCode, amenities, ratings } = formData;

  const fetchHotelOffers = async () => {
    if (!cityCode || !amenities) {
      // Set errors for the fields that are not filled out
      setFormErrors({
        cityCode: cityCode ? '' : 'City Code is required',
        amenities: amenities ? '' : 'Amenities are required',
      });
      return;
    }
      try {
          const response = await axios.get(`/api/hotels`, {
              params: {
                  cityCode,
                  amenities,
                  ratings
              }
          });
          const {data} = response.data;
          console.log(data)
          setHotelOffers(data);
      } catch (error) {
          console.error('Error fetching hotel offers:', error);
      }
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

  useEffect(() => {
      if (!user) {
          navigate('/login');
      }
  }, [user, navigate]);


  return (
      <div className="pages">
          <h1>Hotel Search</h1>
            <div className='row g-3'>
              <div className="col">
                <label htmlFor="originLocationCode">City</label>
                <input
                    type="text"
                    name="cityCode"
                    placeholder="City Code"
                    onChange={onChange}
                    className='filter-input'
                />
                 {formErrors.cityCode && <div className="error-message text-danger">{formErrors.cityCode}</div>}
              </div>
              <div className="col">
                <label htmlFor='dropdown'>Rating</label>
                <select id="dropdown" name='ratings' onChange={onChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </div>
              <div className='col'>
                <label htmlFor="amenities">Filter Amenities:</label>
                <select
                    className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    id="amenities"
                    name="amenities"
                    onChange={onChange}
                >
                    <option selected>Services</option>
                    <option value="SPA">SPA</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="SWIMMING_POOL">Swimming Pool</option>
                    <option value="WIFI">Wifi</option>
                    <option value="FITNESS_CENTER">Fitness Center</option>
                    <option value="BAR or LOUNGE">Bar or Lounge</option>
                </select>
            </div>
              <div className="col">
                  <button onClick={fetchHotelOffers}>Search</button>
              </div>

            </div>
            {hotelOffers ? (
              <div>
              {hotelOffers.map((offer) => (
                <div key={offer.hotelId}>
                    <div>
                        <strong>{offer.name}</strong>
                        <span>Rating: {offer.rating}</span>
                    </div>
                    <div>
                        {offer.amenities ? (
                            <div>
                                {offer.amenities.map((segment) => (
                                    <div key={segment}>
                                        {segment}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>No amenities available</div>
                        )}
                    </div>
                </div>
            ))}
            </div>
            ) : (
              <div>
                <h1>Invalid Input</h1>
              </div>
            )}
    </div>
  );
}

export default Accommodation;

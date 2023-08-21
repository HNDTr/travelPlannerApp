import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ItineraryForm from '../components/ItineraryForm';
import ItineraryItem from '../components/ItineraryItem';
import Spinner from '../components/Spinner';
import { getItineraries, reset } from '../features/itineraries/itinerarySlice';

function Itineraries() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { itineraries, isLoading, isError, message } = useSelector(
    (state) => state.itineraries
  );

  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getItineraries());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='pages'>
      <div className='itineraryContainer'>
        <h1>Itineraries Dashboard</h1>

      {/* Toggle button */}
      <button  id='showForm' style={{ color: 'black' }} onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </button>


      {/* Conditionally render the form */}
      {isFormVisible && <ItineraryForm />}

      {/* <section className='pages'> */}
        {itineraries.length > 0 ? (
          <div className='itineraries'>
            {itineraries.map((itinerary) => (
              <ItineraryItem key={itinerary._id} itinerary={itinerary} />
            ))}
          </div>
        ) : (
          <h1>You have not set any itineraries</h1>
        )}
      {/* </section> */}
      </div>
    </div>
  );
}

export default Itineraries;

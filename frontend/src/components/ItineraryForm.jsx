import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItinerary } from '../features/itineraries/itinerarySlice'

function ItineraryForm() {
    const [formData, setFormData] = useState({
        title: '',
        travelDate: '',
        returnDate: '',
        time: '',
        description: '',
    });

    const { title, travelDate, returnDate, time, description } = formData;

    const [formErrors, setFormErrors] = useState({
      title: '',
      travelDate: '',
      time: '',
    });

    const dispatch = useDispatch()

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


    const onSubmit = (e) => {
        e.preventDefault()

        if (!title || !travelDate || !time) {
          // Set errors for the fields that are not filled out
          setFormErrors({
            title: title ? '' : 'Title is required',
            travelDate: travelDate ? '' : 'Travel date are required',
            time: time ? '' : 'Time is required'
          });
          return;
        }
    
        dispatch(createItinerary({ title, travelDate,returnDate, time, description }))
        setFormData({ title: '', travelDate: '', returnDate: '',time: '', description: '' });
      }

      return (
        <>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='text'>Trip Name</label>
              <input
                type='text'
                name='title'
                id='title'
                value={title}
                onChange={onChange}
              />
              {formErrors.title && <div className="error-message text-danger">{formErrors.title}</div>}
            </div>
            <div className='form-group'>
              <label htmlFor='text'>Travel Date</label>
              <input
                type='date'
                name='travelDate'
                id='travelDate'
                value={travelDate}
                onChange={onChange}
              />
              {formErrors.travelDate && <div className="error-message text-danger">{formErrors.travelDate}</div>}
            </div>
            <div className='form-group'>
              <label htmlFor='text'>Return Date</label>
              <input
                type='date'
                name='returnDate'
                id='returnDate'
                value={returnDate}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='text'>Time</label>
              <input
                type='text'
                name='time'
                id='time'
                value={time}
                onChange={onChange}
              />
              {formErrors.time && <div className="error-message text-danger">{formErrors.time}</div>}
            </div>
            <div className='form-group'>
              <label htmlFor='text'>Description</label>
              <input
                type='text'
                name='description'
                id='description'
                value={description}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <button className='btn btn-block' type='submit'>
                Add Itinerary
              </button>
            </div>
          </form>
        </>
      )
}

export default ItineraryForm
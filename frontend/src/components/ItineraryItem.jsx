import { useDispatch } from "react-redux";
import { useState } from "react"; 
import { deleteItinerary, updateItinerary } from "../features/itineraries/itinerarySlice";
import  {AiOutlineClose, AiFillEdit, AiFillDelete, AiFillSave} from 'react-icons/ai'
import { format } from 'date-fns';

function ItineraryItem({itinerary}) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false); // Initialize editing state

     // Initialize state for form fields
     const [updatedTitle, setUpdatedTitle] = useState(itinerary.title);
     const [updatedTravelDate, setUpdatedTravelDate] = useState(itinerary.travelDate);
     const [updatedReturnDate, setUpdatedReturnDate] = useState(itinerary.returnDate);
     const [updatedTime, setUpdatedTime] = useState(itinerary.time);
     const [updatedDescription, setUpdatedDescription] = useState(itinerary.description);
 
     // Function to handle save
    const handleSave = () => {
        console.log("Handle Save triggered");
        const updatedData = {
            title: updatedTitle,
            travelDate: updatedTravelDate,
            returnDate: updatedReturnDate,
            time: updatedTime,
            description: updatedDescription
        };
        console.log("Updated data:", updatedData);
        dispatch(updateItinerary({id: itinerary._id, Data: updatedData}));
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="itineraryItem">
            {isEditing ? (
                // Edit form
                <div className="edit-group">
                    <label htmlFor="">Title</label>
                    <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)}  maxLength={15} />
                    <label htmlFor="">Travel Date</label>
                    <input type="date" value={updatedTravelDate} onChange={(e) => setUpdatedTravelDate(e.target.value)} />
                    <label htmlFor="">Return Date</label>
                    <input type="date" value={updatedReturnDate} onChange={(e) => setUpdatedReturnDate(e.target.value)} /> 
                    <label htmlFor="">Time</label>
                    <input type="text" value={updatedTime} onChange={(e) => setUpdatedTime(e.target.value)} />
                    <label htmlFor="">Description</label>
                    <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
                    <button className="save" onClick={handleSave}><AiFillSave></AiFillSave></button>
                    <button className="close" onClick={() => setIsEditing(false)}><AiOutlineClose></AiOutlineClose></button>
                </div>
            ) : (
                // Display details
                <>    
                <div className="item">
                    <h2>{itinerary.title}</h2>
                    <h4>Depart: {format(new Date(itinerary.travelDate), 'MM/dd/yyyy')}</h4>
                    {itinerary.returnDate && <h4>Return: {format(new Date(itinerary.returnDate), 'MM/dd/yyyy')}</h4>}
                    <h5>{itinerary.time}</h5>
                    {itinerary.description && <p>{itinerary.description}</p>}
                    <button className="delete" onClick={() => dispatch(deleteItinerary(itinerary._id))}><AiFillDelete /></button>
                    <button className="edit" onClick={() => setIsEditing(true)}><AiFillEdit /></button>
                </div>
                </>
            )}
        </div>
    )
}

export default ItineraryItem
import React, {  useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import './EventManagementForm.css'
import { useParams,useNavigate } from 'react-router-dom';
const UpdateEvent = () => {
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category:'',

  });
  const [eventFormErrors, setEventFormErrors] = useState({});
  const {id} =useParams()

  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

//   const validateEventForm = () => {
//     let errors = {};
//     if (!eventForm.title.trim()) {
//       errors.title = 'A title is required';
//     }
//     if (!eventForm.date) {
//       errors.date = 'A date is required';
//     }
//     if (!eventForm.time) {
//       errors.time = 'Time is required';
//     }
//     if (!eventForm.location.trim()) {
//       errors.location = 'A location is required';
//     }
//     if (!eventForm.description.trim()) {
//       errors.description = 'A description is required';
//     }
//     setEventFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

const handleSubmitEventForm = (e) => {
  e.preventDefault();
  if (eventForm.title && eventForm.date && eventForm.time && eventForm.location && eventForm.description && eventForm.category) {
    fetch(`http://127.0.0.1:5555/events/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "PATCH",
      body: JSON.stringify(eventForm)
    })
      .then(response => {
        if (response.ok) {
          toast.success('Event updated successfully');
        } else {
          toast.error('Failed to update event');
        }
      })
      .catch(error => {
        console.error('Error updating event:', error);
        toast.error('An error occurred while updating event');
      });
  }
};

  console.log(eventForm)


  return (
    <div className="event-form">
      <h4>Update Event</h4>
      <form onSubmit={handleSubmitEventForm}>
        <input type="text" name="title" placeholder="Title" value={eventForm.title} onChange={handleEventFormChange} /><br />
        {eventFormErrors.title && <div className="error-message">{eventFormErrors.title}</div>}
        <input type="date" name="date" value={eventForm.date} onChange={handleEventFormChange} /><br />
        {eventFormErrors.date && <div className="error-message">{eventFormErrors.date}</div>}
        <input type="time" name="time" value={eventForm.time} onChange={handleEventFormChange} /><br />
        {eventFormErrors.time && <div className="error-message">{eventFormErrors.time}</div>}
        <input type="text" name="location" placeholder="Location" value={eventForm.location} onChange={handleEventFormChange} /><br />
        {eventFormErrors.location && <div className="error-message">{eventFormErrors.location}</div>}
        <textarea name="description" placeholder="Description" value={eventForm.description} onChange={handleEventFormChange} /><br />
        {eventFormErrors.description && <div className="error-message">{eventFormErrors.description}</div>}
        <input type="text" name="category" placeholder="Category" value={eventForm.category} onChange={handleEventFormChange} /><br />
        {/* <input type="text" name="organizer_id" placeholder="Organizer_id" value={eventForm.organizer_id} onChange={handleEventFormChange} /> */}
        <button type="submit">Update Event</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateEvent;

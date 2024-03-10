import React, { useState } from 'react';
import './EventManagementForm.css'

const EventManagementForm = ({ onSubmit }) => {
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [eventFormErrors, setEventFormErrors] = useState({});

  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const validateEventForm = () => {
    let errors = {};
    if (!eventForm.title.trim()) {
      errors.title = 'A title is required';
    }
    if (!eventForm.date) {
      errors.date = 'A date is required';
    }
    if (!eventForm.time) {
      errors.time = 'Time is required';
    }
    if (!eventForm.location.trim()) {
      errors.location = 'A location is required';
    }
    if (!eventForm.description.trim()) {
      errors.description = 'A description is required';
    }
    setEventFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEventForm = (e) => {
    e.preventDefault();
    if (validateEventForm()) {
      onSubmit(eventForm);
      setEventForm({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
      setEventFormErrors({});
    }
  };

  return (
    <div className="event-form">
      <h2>Add a New Event</h2>
      <form onSubmit={handleSubmitEventForm}>
        <input type="text" name="title" placeholder="Title" value={eventForm.title} onChange={handleEventFormChange} />
        {eventFormErrors.title && <div className="error-message">{eventFormErrors.title}</div>}
        <input type="date" name="date" value={eventForm.date} onChange={handleEventFormChange} />
        {eventFormErrors.date && <div className="error-message">{eventFormErrors.date}</div>}
        <input type="time" name="time" value={eventForm.time} onChange={handleEventFormChange} />
        {eventFormErrors.time && <div className="error-message">{eventFormErrors.time}</div>}
        <input type="text" name="location" placeholder="Location" value={eventForm.location} onChange={handleEventFormChange} />
        {eventFormErrors.location && <div className="error-message">{eventFormErrors.location}</div>}
        <textarea name="description" placeholder="Description" value={eventForm.description} onChange={handleEventFormChange} />
        {eventFormErrors.description && <div className="error-message">{eventFormErrors.description}</div>}
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventManagementForm;

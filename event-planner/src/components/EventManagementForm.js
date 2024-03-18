import React, { useState } from 'react';

const EventManagementForm = ({ onSubmit }) => {
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
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
        description: '',
        category: ''
      });
      setEventFormErrors({});
    }
  };

  return (
    <div className="event-form max-w-sm mx-auto">
      <h4 className="text-lg font-semibold mb-4">Add a New Event</h4>
      <form onSubmit={handleSubmitEventForm} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={eventForm.title} onChange={handleEventFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        {eventFormErrors.title && <div className="error-message text-red-500">{eventFormErrors.title}</div>}
        <input type="date" name="date" value={eventForm.date} onChange={handleEventFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        {eventFormErrors.date && <div className="error-message text-red-500">{eventFormErrors.date}</div>}
        <input type="time" name="time" value={eventForm.time} onChange={handleEventFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        {eventFormErrors.time && <div className="error-message text-red-500">{eventFormErrors.time}</div>}
        <input type="text" name="location" placeholder="Location" value={eventForm.location} onChange={handleEventFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        {eventFormErrors.location && <div className="error-message text-red-500">{eventFormErrors.location}</div>}
        <textarea name="description" placeholder="Description" value={eventForm.description} onChange={handleEventFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"></textarea>
        {eventFormErrors.description && <div className="error-message text-red-500">{eventFormErrors.description}</div>}
        <input type="text" name="category" placeholder="Category" value={eventForm.category} onChange={handleEventFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Event</button>
      </form>
    </div>
  );
};

export default EventManagementForm;

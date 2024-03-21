import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = () => {
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmitEventForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://event-planner-app-backend.onrender.com/events/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: "PATCH",
        body: JSON.stringify(eventForm)
      });

      if (response.ok) {
        toast.success('Event updated successfully');
        navigate('/dashboard');
      } else {
        toast.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('An error occurred while updating event');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Event</h1>
        <form onSubmit={handleSubmitEventForm}>
          <input type="text" name="title" placeholder="Title" value={eventForm.title} onChange={handleEventFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
          <input type="date" name="date" value={eventForm.date} onChange={handleEventFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
          <input type="time" name="time" value={eventForm.time} onChange={handleEventFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
          <input type="text" name="location" placeholder="Location" value={eventForm.location} onChange={handleEventFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
          <textarea name="description" placeholder="Description" value={eventForm.description} onChange={handleEventFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
          <input type="text" name="category" placeholder="Category" value={eventForm.category} onChange={handleEventFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update Event</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateEvent;

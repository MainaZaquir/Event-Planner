import React, { useState } from 'react';
import axios from 'axios';

const ResourceManagement = ({ eventId }) => {
  const [name, setResourceName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [resourceFormErrors, setResourceFormErrors] = useState({});

  const handleResourceFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setResourceName(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
  };

  const validateResourceForm = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = 'A name is required';
    }
    if (!quantity.trim()) {
      errors.quantity = 'A quantity is required';
    }
    setResourceFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitResourceForm = (e) => {
    e.preventDefault();
    
    if (validateResourceForm()) {
      // Get JWT token from localStorage
      const token = localStorage.getItem('jwt');
  
      // Check if token exists
      if (token) {
        // Include the token in the Authorization header
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
  
        // Send POST request with Axios
        axios.post('https://event-planner-app-backend.onrender.com/resource', {
          name,
          quantity,
          event_id: eventId
        }, { headers }) // Include headers in the request
        .then(response => {
          console.log(response);
          // Do something with the response if needed
          alert("Added successfuly")
        })
        .catch(error => console.error(error));
      } else {
        // Handle case when token is not available
        console.error('JWT token not found');
      }
    }
  
    // Reset form fields
    setResourceName('');
    setQuantity('');
  };
  

  return (
    <div className="resource-form">
      <h2 className="text-xl font-semibold mb-4">Resource Management</h2>
      <form className="w-full max-w-sm">
        <div className="mb-4">
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="name"
            value={name}
            onChange={handleResourceFormChange}
            placeholder="Name"
          />
          {resourceFormErrors.name && <div className="text-red-500">{resourceFormErrors.name}</div>}
        </div>
        <div className="mb-4">
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="quantity"
            value={quantity}
            onChange={handleResourceFormChange}
            placeholder="Quantity"
          />
          {resourceFormErrors.quantity && <div className="text-red-500">{resourceFormErrors.quantity}</div>}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmitResourceForm}
          type="submit"
        >
          Add Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceManagement;

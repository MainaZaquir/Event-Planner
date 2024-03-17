import React, { useState } from 'react';
import axios from 'axios';
import './ResourceManagement.css';

const ResourceManagement = ({eventId}) => {
  const [name, setResourceName] = useState('');
  const [quantity, setQuality] = useState('');
  const [event_id, setEventId] = useState('');
  // const [organizer, setOrganizer] =useState('')
  const [resourceFormErrors, setResourceFormErrors] = useState({});

  const handleResourceFormChange = (e) => {
    // const { name, value } = e.target;
    // if (name === 'resourceType') {
    //   setQuality(value);
    // } else {
    //   setResourceName(value);
    // }
    setResourceName()
  };
console.log(eventId)
  const validateResourceForm = () => {
    let errors = {};
    if (!name) {
      errors.resourceName = 'A name is required';
    }
    if (!quantity) {
      errors.resourceType = 'A quality type is required';
    }
    // if (!resourceLink.trim()) {
    //   errors.resourceLink = 'A resource link is required';
    // }
    setResourceFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitResourceForm = (e) => {
    e.preventDefault();
    setEventId(eventId)

    if (validateResourceForm()) {
      fetch('http://127.0.0.1:5555/resource',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: "POST",
        body:JSON.stringify({
          name,
          quantity,
          event_id:eventId

        })
        
      })
     
        
        .catch(error => console.error(error));
    }
    setResourceName('')
    setQuality('')
  };

  return (
    <div className="resource-form"> 
      <h2>Resource Management</h2>
      <form >
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setResourceName(e.target.value)}
          placeholder="Name"
        />
        {resourceFormErrors.name && <div className="error">{resourceFormErrors.name}</div>}
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuality(e.target.value)}
          placeholder="quantity"
        />
        {/* {resourceFormErrors.quality && <div className="error">{resourceFormErrors.quality}</div>}  */}
        
        {/* {resourceFormErrors.resourceLink && <div className="error">{resourceFormErrors.resourceLink}</div>}  */}
        <button onClick={ handleSubmitResourceForm} type="submit">Add a Resource</button>
      </form>
    </div>
  );
};

export default ResourceManagement;

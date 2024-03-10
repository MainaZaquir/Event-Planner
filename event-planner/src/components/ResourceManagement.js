import React, { useState } from 'react';
import axios from 'axios';
import './ResourceManagement.css';

const ResourceManagement = () => {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [resourceFormErrors, setResourceFormErrors] = useState({});

  const handleResourceFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'resourceType') {
      setResourceType(value);
    } else if (name === 'resourceLink') {
      setResourceLink(value);
    } else {
      setResourceName(value);
    }
  };

  const validateResourceForm = () => {
    let errors = {};
    if (!resourceName.trim()) {
      errors.resourceName = 'A resource name is required';
    }
    if (!resourceType.trim()) {
      errors.resourceType = 'A resource type is required';
    }
    if (!resourceLink.trim()) {
      errors.resourceLink = 'A resource link is required';
    }
    setResourceFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitResourceForm = (e) => {
    e.preventDefault();
    if (validateResourceForm()) {
      axios.post('/api/resources', { name: resourceName, type: resourceType, link: resourceLink })
        .then(response => {
          console.log('A resource has been added:', response.data);
          setResourceName('');
          setResourceType('');
          setResourceLink('');
          setResourceFormErrors({});
        })
        .catch(error => {
          console.error('Error adding resource:', error);
        });
    }
  };

  return (
    <div className="resource-form"> 
      <h2>Resource Management</h2>
      <form onSubmit={handleSubmitResourceForm}>
        <input
          type="text"
          name="resourceName"
          value={resourceName}
          onChange={handleResourceFormChange}
          placeholder="Resource Name"
        />
        {resourceFormErrors.resourceName && <div className="error">{resourceFormErrors.resourceName}</div>}
        <input
          type="text"
          name="resourceType"
          value={resourceType}
          onChange={handleResourceFormChange}
          placeholder="Resource Type"
        />
        {resourceFormErrors.resourceType && <div className="error">{resourceFormErrors.resourceType}</div>} 
        <input
          type="text"
          name="resourceLink"
          value={resourceLink}
          onChange={handleResourceFormChange}
          placeholder="Resource Link"
        />
        {resourceFormErrors.resourceLink && <div className="error">{resourceFormErrors.resourceLink}</div>} 
        <button type="submit">Add a Resource</button>
      </form>
    </div>
  );
};

export default ResourceManagement;

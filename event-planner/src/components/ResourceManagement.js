import React, { useState } from 'react';
import axios from 'axios';
import './ResourceManagement.css';

const ResourceManagement = () => {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [resourceFormErrors, setResourceFormErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  const handleResourceFormChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'resourceName':
        setResourceName(value);
        break;
      case 'resourceType':
        setResourceType(value);
        break;
      case 'resourceLink':
        setResourceLink(value);
        break;
      default:
        break;
    }
  };

  const validateResourceForm = () => {
    let errors = {};
    if (!resourceName.trim()) {
      errors.resourceName = 'Resource name is required.';
    }
    if (!resourceType.trim()) {
      errors.resourceType = 'Resource type is required.';
    }
    if (!resourceLink.trim()) {
      errors.resourceLink = 'Resource link is required.';
    }
    setResourceFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitResourceForm = async (e) => {
    e.preventDefault();
    if (validateResourceForm()) {
      try {
        const response = await axios.post('/api/resources', {
          name: resourceName,
          type: resourceType,
          link: resourceLink
        });
        if (response.status === 200) {
          setSubmitMessage('Successfully submitted!');
          // Reset form fields
          setResourceName('');
          setResourceType('');
          setResourceLink('');
          // Clear any previous errors
          setResourceFormErrors({});
        } else {
          setSubmitMessage(`Submission failed with status code ${response.status}.`);
        }
      } catch (error) {
        console.error(error);
        setSubmitMessage(`Submission failed: ${error.message}`);
      }
    } else {
      setSubmitMessage('Submission failed due to form validation error.');
    }
  };
  
  return (
    <div className="resource-form">
      <h2>Resource Management</h2>
      <form onSubmit={handleSubmitResourceForm}>
        <div className="form-group">
          <label htmlFor="resourceName">Resource Name:</label>
          <input
            type="text"
            id="resourceName"
            name="resourceName"
            value={resourceName}
            onChange={handleResourceFormChange}
            placeholder="Enter resource name"
          />
          {resourceFormErrors.resourceName && (
            <div className="error">{resourceFormErrors.resourceName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="resourceType">Resource Type:</label>
          <input
            type="text"
            id="resourceType"
            name="resourceType"
            value={resourceType}
            onChange={handleResourceFormChange}
            placeholder="Enter resource type"
          />
          {resourceFormErrors.resourceType && (
            <div className="error">{resourceFormErrors.resourceType}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="resourceLink">Resource Link:</label>
          <input
            type="text"
            id="resourceLink"
            name="resourceLink"
            value={resourceLink}
            onChange={handleResourceFormChange}
            placeholder="Enter resource link"
          />
          {resourceFormErrors.resourceLink && (
            <div className="error">{resourceFormErrors.resourceLink}</div>
          )}
        </div>
        <button type="submit" className="submit-button">Add Resource</button>
      </form>
      {submitMessage && <div className="submit-message">{submitMessage}</div>}
    </div>
  );
};

export default ResourceManagement;

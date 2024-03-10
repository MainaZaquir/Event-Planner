import React, { useState } from 'react';
import './CollaborationForm.css'; 

const CollaborationForm = ({ onSubmit }) => {
  const [collaborator, setCollaborator] = useState('');
  const [collaboratorError, setCollaboratorError] = useState('');

  const handleCollaboratorChange = (e) => {
    setCollaborator(e.target.value);
    setCollaboratorError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collaborator.trim()) {
      setCollaboratorError('A collaborator name is required');
      return;
    }
    onSubmit(collaborator);
    setCollaborator('');
  };

  return (
    <div className="collaboration-form">
      <h2>Collaboration Form</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="collaborator" 
          value={collaborator} 
          onChange={handleCollaboratorChange} 
          placeholder="Enter collaborator's name" 
        />
        {collaboratorError && <div className="error-message">{collaboratorError}</div>}
        <button type="submit">Add Collaborator</button>
      </form>
    </div>
  );
};

export default CollaborationForm;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = ({ eventId}) => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    // description: '',
    deadline: '',
    completed: 'False',
    event_id: eventId,
  });

  const [taskFormErrors, setTaskFormErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const validateTaskForm = () => {
    let errors = {};
    if (!taskForm.title) {
      errors.title = 'A title is required for the task';
    }
  
    if (!taskForm.deadline) {
      errors.deadline = 'A deadline is required for the task';
    }
    if (!taskForm.event_id) {
      errors.event_id = 'An event ID is required for the task';
    }
    setTaskFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const handleSubmitTaskForm = async (e) => {
    e.preventDefault();
    if(true){
      try {
        const response = await fetch(`http://127.0.0.1:5555/task_update/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: "PATCH",
          body: JSON.stringify(taskForm)
        });
  
        if (response.ok) {
          alert('Event updated successfully');
          navigate('/dashboard');
        } else {
          alert('Failed to update event');
        }
      } catch (error) {
        console.error('Error updating event:', error);
        alert('An error occurred while updating event');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover" style={{backgroundImage: "url('download.jpg')"}}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-400">
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-4">Update a Task</h4>
        <form onSubmit={handleSubmitTaskForm} className="task-form">
          <input
            type="text"
            name="title"
            value={taskForm.title}
            placeholder="Title"
            onChange={handleTaskFormChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          /><br />
          {taskFormErrors.title && <div className="text-red-500">{taskFormErrors.title}</div>}
          <input
            type="date"
            name="deadline"
            value={taskForm.deadline}
            placeholder="Deadline"
            onChange={handleTaskFormChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          /><br />
          {taskFormErrors.deadline && <div className="text-red-500">{taskFormErrors.deadline}</div>}
         
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">Update a Task</button>
        </form>
      </div>
    </div>
  </div>
  
  
  );
};

export default UpdateTask;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskManagementForm = ({ eventId, onTaskAdded }) => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    // description: '',
    deadline: '',
    completed: 'False',
    event_id: eventId,
  });

  const [taskFormErrors, setTaskFormErrors] = useState({});
  const navigate = useNavigate();

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const validateTaskForm = () => {
    let errors = {};
    if (!taskForm.title.trim()) {
      errors.title = 'A title is required for the task';
    }
    if (!taskForm.completed.trim()) {
      errors.completed = 'A complete status is required for the task';
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

  const handleSubmitTaskForm = (e) => {
    e.preventDefault();
    if (validateTaskForm()) {
      fetch('http://127.0.0.1:5555/task', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: "POST",
        body: JSON.stringify(taskForm)
      })
      .then(response => {
        if (response.ok) {
          alert('Task added successfully');
          navigate(`/event/${eventId}`);
        } else {
          alert('Failed to add task');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while adding task');
      });
    }
    setTaskForm({
      title: '',
      // description: '',
      deadline: '',
      completed: '',
      event_id: eventId,
    });
  };

  return (
    <>
    <div className="task-management-container">
      <h4 className="text-lg font-semibold mb-4">Add a Task</h4>
      <form onSubmit={handleSubmitTaskForm} className="task-form">
        <input type="text" name="title" value={taskForm.title} placeholder="Title" onChange={handleTaskFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
        {taskFormErrors.title && <div className="text-red-500">{taskFormErrors.title}</div>}
        <input type="date" name="deadline" value={taskForm.deadline} placeholder="Deadline" onChange={handleTaskFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
        {taskFormErrors.deadline && <div className="text-red-500">{taskFormErrors.deadline}</div>}
        <input name="complete" value={taskForm.completed} placeholder="Completed True or False" onChange={handleTaskFormChange} className="mb-4 p-2 border border-gray-300 rounded" /><br />
        {taskFormErrors.completed && <div className="text-red-500">{taskFormErrors.completed}</div>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add a Task</button>
      </form>
    </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
};

export default TaskManagementForm;

import React, { useState } from 'react';
import axios from 'axios';
import './TaskManagementForm.css'; 

const TaskManagementForm = ({ onTaskAdded }) => {
  const [taskForm, setTaskForm] = useState({
    description: '',
    deadline: '',
    priority: ''
  });
  const [taskFormErrors, setTaskFormErrors] = useState({});

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const validateTaskForm = () => {
    let errors = {};
    if (!taskForm.description.trim()) {
      errors.description = 'A description is required for the task';
    }
    if (!taskForm.deadline) {
      errors.deadline = 'A deadline is required for the task';
    }
    if (!taskForm.priority.trim()) {
      errors.priority = 'A priority is required for the task';
    }
    setTaskFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitTaskForm = (e) => {
    e.preventDefault();
    if (validateTaskForm()) {
      axios.post('/api/tasks', taskForm)
        .then(response => {
          onTaskAdded(response.data);
          setTaskForm({
            description: '',
            deadline: '',
            priority: ''
          });
          setTaskFormErrors({});
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="task-management-container"> 
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmitTaskForm} className="task-form"> 
        <input type="text" name="description" value={taskForm.description} onChange={handleTaskFormChange} />
        {taskFormErrors.description && <div className="error">{taskFormErrors.description}</div>} 
        <input type="date" name="deadline" value={taskForm.deadline} onChange={handleTaskFormChange} />
        {taskFormErrors.deadline && <div className="error">{taskFormErrors.deadline}</div>} 
        <input type="text" name="priority" value={taskForm.priority} onChange={handleTaskFormChange} />
        {taskFormErrors.priority && <div className="error">{taskFormErrors.priority}</div>} 
        <button type="submit">Add a Task</button>
      </form>
    </div>
  );
};

export default TaskManagementForm;

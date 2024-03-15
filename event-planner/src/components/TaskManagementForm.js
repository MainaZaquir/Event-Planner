import React, { useState } from 'react';
// import axios
import { useParams,useNavigate } from 'react-router-dom';
import './TaskManagementForm.css'; 

const TaskManagementForm = ({ onTaskAdded }) => {
  const {id} = useParams()
  const [taskForm, setTaskForm] = useState({
    title:'',
    description: '',
    deadline: '',
    // priority: '',
    user_id: 0,
    completed:"False",
    event_id:id,
    // organizer_id:0

  });
  const [taskFormErrors, setTaskFormErrors] = useState({});

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };
console.log(taskForm)
  const validateTaskForm = () => {
    let errors = {};
    if (!taskForm.description.trim()) {
      errors.description = 'A description is required for the task';
    }
    if (!taskForm.deadline) {
      errors.deadline = 'A deadline is required for the task';
    }
    if (!taskForm.title.trim()) {
      errors.priority = 'A title is required for the task';
    }
    if (!taskForm.event_id) {
      errors.priority = 'An event_id is required for the task';
    }
    setTaskFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitTaskForm = (e) => {
    e.preventDefault();
    if (validateTaskForm()) {
      fetch('http://127.0.0.1:5555/task',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: "POST",
        body:JSON.stringify(taskForm)
      })
        
        .catch(error => console.error(error));
    }
    setTaskForm({
      title:'',
      description: '',
      deadline: '',
      
      user_id: "",
      completed:"",
      event_id:"",
      
  
    })
  };

  return (
    <div className="task-management-container"> 
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmitTaskForm} className="task-form"> 
      <input type="text" name="title" value={taskForm.title} placeholder='title' onChange={handleTaskFormChange} />
      <input type="date" name="deadline" value={taskForm.deadline}  onChange={handleTaskFormChange} />
        {taskFormErrors.deadline && <div className="error">{taskFormErrors.deadline}</div>} 
        <input type="text" name="description" value={taskForm.description} placeholder='description' onChange={handleTaskFormChange} />
        {taskFormErrors.description && <div className="error">{taskFormErrors.description}</div>} 
        <input type="text" name="completed" value={taskForm.completed} placeholder='True or false' onChange={handleTaskFormChange} />
        <input type="text" name="user_id" value={taskForm.user_id} placeholder='user_id' onChange={handleTaskFormChange} />
        {/* <input type="text" name="organizer_id" value={taskForm.organizer_id} placeholder='orgaizer_id' onChange={handleTaskFormChange} /> */}

        {/* <input type="text" name="event_id" value={taskForm.event_id} placeholder='event_id' onChange={handleTaskFormChange} /> */}
        <button type="submit">Add a Task</button>
      </form>
    </div>
  );
};

export default TaskManagementForm;

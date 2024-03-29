import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskAssignment = ({user}) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  // const [taskFormErrors, setTaskFormErrors] = useState({});
  const [assignedTask, setAssignedTask] = useState({
    task_id: '',
    user_id: '',
    completed: false
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://event-planner-app-backend.onrender.com/task'); 
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://event-planner-app-backend.onrender.com/users'); 
      setUsers(response.data.map(user => ({ value: user.id, label: user.username })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignedTask((prev) => ({ ...prev, [name]: value }));
  };
  const validateTaskForm = () => {
    let errors = {};
    if (!assignedTask.task_id) {
      errors.task_id = 'A Task is required for the task assignment';
    }
    if (!assignedTask.user_id) {
      errors.user_id = 'A user  is required for the task assignment';
    }
  
    // setTaskFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateTaskForm()){
      fetch('https://event-planner-app-backend.onrender.com/task_management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(assignedTask)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          alert('Assigned Task successfuly')
          return response.json();
  
        })
        .then((data) => {
          console.log(data.message);
          fetchTasks(); 
        })
        .catch((error) => {
          console.error('Error assigning task:', error);
        });
    }

  };
  

  return (
    <>
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold text-white ">Task Assignment</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="task_id" className="mb-1 text-white">Task ID:</label>
          <select
            id="task_id"
            name="task_id"
            value={assignedTask.task_id}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">Select Task</option>
            {tasks.map(task => (
              task.organizer_id === user.user_id ?<option key={task.id} value={task.id}>{task.title}</option>: null
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="user_id" className="mb-1 text-white">User ID:</label>
          <select
            id="user_id"
            name="user_id"
            value={assignedTask.user_id}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.value} value={user.value}>{user.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={assignedTask.completed}
            onChange={(e) =>
              setAssignedTask((prev) => ({
                ...prev,
                completed: e.target.checked
              }))
            }
            className="mr-2 text-white"
          />
          <label htmlFor="completed" className="mb-1 text-white">Completed</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Assign Task</button>
      </form>

      {/* <h3 className="text-lg font-bold mb-2">Tasks:</h3> */}
      {/* <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <span className="font-bold">Task ID:</span> {task.id}, <span className="font-bold">User ID:</span> {task.user_id}, <span className="font-bold">Completed:</span> {task.completed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul> */}
    </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
};

export default TaskAssignment;

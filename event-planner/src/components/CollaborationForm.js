import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ResourceManagementForm from './ResourceManagement';
import TaskManagementForm from './TaskManagementForm';

const CollaborationForm = ({ user }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskAssignments, setTaskAssignments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [event, setEvent] = useState({});
  const [resource, setResource] = useState([]);
  const [showResourceForm, setShowResourceForm] = useState(false); // State to manage the visibility of the resource form
  const [showTaskForm, setShowTaskForm] = useState(false); // State to manage the visibility of the task form
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get(`http://127.0.0.1:5555/events/${id}`);
        setEvent(eventsResponse.data);

        const tasksResponse = await axios.get('http://127.0.0.1:5555/task');
        setTasks(tasksResponse.data);
        setFilteredTasks(tasksResponse.data);

        const messagesResponse = await axios.get('http://127.0.0.1:5555/resource');
        setResource(messagesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = (id) => {
    fetch(`http://127.0.0.1:5555/events/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "DELETE",
    })
      .then(() => navigate('/dashboard'))
      .catch(error => console.error('Error:', error));
  };

  const handleUpdate = (id) => {
    navigate(`/update_event/${id}`);
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setFilteredTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/task_update/${taskId}`);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteResource = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/resource/${taskId}`);
      const updatedResource = resource.filter(task => task.id !== taskId);
      setResource(updatedResource);
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/task_management'); // Assuming your API endpoint for fetching tasks is '/api/all_tasks'
            setTaskAssignments(response.data);
        } catch (error) {
            console.error('Error fetching task assignments:', error);
        }
    };

    fetchData();
}, []);
  console.log(taskAssignments)
  // console.log(resource)
  return (
    <div className='parent'>
{user.user_id === event['organizer_id'] ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
        <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
        <p className="text-sm text-gray-700">{event.description}</p>
      </div>
      <div>
        <button onClick={() => handleUpdate(event.id)}>Update</button><br />
        <button onClick={() => handleClick(event.id)}>Delete</button>
      </div>
    </div>

    {showResourceForm ? (
      <ResourceManagementForm eventId={event.id} />
    ) : (
      <button onClick={() => setShowResourceForm(true)}>Add Resource</button>
    )}

    <div className="grid grid-cols-1 gap-4">
      {resource.map(task => (
       task.event_id === event.id && task.organizer_id === user.user_id  ? (
          <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <h4>Resource</h4>
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-800 mb-1">{task.name}</h3>
              <p className="text-sm text-gray-600 mb-2">quantity: {task.quantity}</p>
              <button onClick={() => handleDeleteResource(task.id)}>Delete</button>
            </div>
          </div>
        ) : (
          task.event_id === event.id ? (
            <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <h4>Resource</h4>
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-800 mb-1">{task.name}</h3>
                <p className="text-sm text-gray-600 mb-2">quantity: {task.quantity}</p>
                {/* <button onClick={() => handleDeleteResource(task.id)}>Delete</button> */}
              </div>
            </div>
          ) : null
        )
      ))}
    </div>

    {showTaskForm ? (
      <TaskManagementForm eventId={event.id} onTaskAdded={handleTaskAdded} />
    ) : (
      <button onClick={() => setShowTaskForm(true)}>Add Task</button>
    )}

    <div className="grid grid-cols-1 gap-4">
      {tasks.map(task => (
        task.organizer_id === user.user_id && task.event_id === event.id ? (
          <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <h3>Task</h3>
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-800 mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Deadline: {task.deadline}</p>
              <p className="text-sm text-gray-700">Completed: {task.completed}</p>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
           
          </div>
        ) : (
          task.id === event.id ? (
            <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <h3>Task</h3>
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-800 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Deadline: {task.deadline}</p>
                <p className="text-sm text-gray-700">Completed: {task.completed}</p>
                {/* <button onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
              </div>
            </div>
          ) : null
        )
      ))}
    </div>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
        <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
        <p className="text-sm text-gray-700">{event.description}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {resource.map(task => (
        task.event_id === event.id ? (
          <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <h4>Resource</h4>
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-800 mb-1">{task.name}</h3>
              <p className="text-sm text-gray-600 mb-2">quantity: {task.quantity}</p>
              {/* <button onClick={() => handleDeleteResource(task.id)}>Delete</button> */}
            </div>
          </div>
        ) : null
      ))}
    </div>
  </div>
)}
</div>
  );
};

export default CollaborationForm;

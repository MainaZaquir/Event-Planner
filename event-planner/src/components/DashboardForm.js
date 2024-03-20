import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ResourceManagementForm from './ResourceManagement'; 
import TaskManagementForm from './TaskManagementForm';
import { useParams, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [messages] = useState([]);
  let { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get('https://event-planner-app-backend.onrender.com/events');
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };



  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setFilteredTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleClick = (id) => {
    navigate(`/event/${id}`);
  };


  return (
    <>
    <div className='parent'>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {events.map(event => (
          <div onClick={() => handleClick(event.id)} key={event.id} className="event-form max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer p-6 mb-6">
            <div className="p-4">
              <h3  className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
              <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>


    </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
};

export default Dashboard;

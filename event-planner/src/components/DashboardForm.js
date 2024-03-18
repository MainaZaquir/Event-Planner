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
        const eventsResponse = await axios.get('http://127.0.0.1:5555/events');
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTaskFilter = (category) => {
    let filtered = [];
    if (category === 'all') {
      filtered = tasks;
    } else if (category === 'completed') {
      filtered = tasks.filter(task => task.status === 'completed');
    } else if (category === 'pending') {
      filtered = tasks.filter(task => task.status !== 'completed');
    }
    setFilteredTasks(filtered);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(items);
    setFilteredTasks(items);
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setFilteredTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleClick = (id) => {
    navigate(`/event/${id}`);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);

    axios.delete(`http://127.0.0.1:5555/tasks/${taskId}`)
      .then(response => {
        console.log('Task deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className='parent'>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div onClick={() => handleClick(event.id)} key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3  className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
              <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      
       <h2>Tasks</h2>
      <div>
        <button onClick={() => handleTaskFilter('all')}>All</button>
        <button onClick={() => handleTaskFilter('completed')}>Completed</button>
        <button onClick={() => handleTaskFilter('pending')}>Pending</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{task.description}</p>
                      <p>Deadline: {task.deadline}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Status: {task.status}</p>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul> 

      { <ResourceManagementForm /> }
      { <TaskManagementForm onTaskAdded={handleTaskAdded} /> }
    </div>
  );
};

export default Dashboard;

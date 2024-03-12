import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ResourceManagementForm from './ResourceManagement'; 
import TaskManagementForm from './TaskManagementForm'; 

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get('/api/events');
        setEvents(eventsResponse.data);

        const tasksResponse = await axios.get('/api/tasks');
        setTasks(tasksResponse.data);
        setFilteredTasks(tasksResponse.data);

        const messagesResponse = await axios.get('/api/messages');
        setMessages(messagesResponse.data);
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

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Upcoming Events</h2>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.date} at {event.time}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>
        </div>
      ))}
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

      <ResourceManagementForm />
      <TaskManagementForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default Dashboard;

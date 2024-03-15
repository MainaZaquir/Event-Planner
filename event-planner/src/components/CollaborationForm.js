import React, { useEffect, useState } from 'react';
import './CollaborationForm.css'; 
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
const CollaborationForm = ({ onSubmit }) => {
  const [collaborator, setCollaborator] = useState('');
  const [collaboratorError, setCollaboratorError] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [event , setEvent] =useState({})
  let { id } = useParams();
  const navigate =useNavigate()

useEffect(() => {
  const fetchData = async () => {
    try {
      const eventsResponse = await axios.get(`http://127.0.0.1:5555/events/${id}`);
      setEvent(eventsResponse.data);

      const tasksResponse = await axios.get('http://127.0.0.1:5555/task');
      setTasks(tasksResponse.data);
      setFilteredTasks(tasksResponse.data);

      // const messagesResponse = await axios.get('/api/messages');
      // setMessages(messagesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

const handleClick = (id) =>{
  console.log(id)
  fetch(`http://127.0.0.1:5555/events/${id}`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    method: "DELETE",
  },
  
  navigate('/dashboard')
  )
}
return (
  <div className='parent'>
   
{/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
<h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2> */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3  className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
        <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
        <p className="text-sm text-gray-700">{event.description}</p>

      </div>
      <a href='/events'><button>Update</button></a><br />
      <button onClick={() => handleClick(event.id)}>Delete</button>
    </div>
  
</div>


    {/* <h2>Tasks</h2>
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
    </ul> */}

    {/* <ResourceManagementForm /> */}
    {/* <TaskManagementForm onTaskAdded={handleTaskAdded} /> */}
  </div>
);
};

export default CollaborationForm;

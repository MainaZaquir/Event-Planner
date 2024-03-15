import React, { useEffect, useState } from 'react';
import './CollaborationForm.css'; 
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import ResourceManagementForm from './ResourceManagement'; 
import TaskManagementForm from './TaskManagementForm';
import "./DashboardForm.css" 
const CollaborationForm = ({ user }) => {

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [event , setEvent] =useState({})
  const [resource, setResource]=useState([])
  let { id } = useParams();
  const navigate =useNavigate()
// console.log(event['organizer_id'])
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
console.log(tasks)
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

const handleUpdate = (id) =>{
  console.log(id)
  navigate(`/update_event/${id}`)
}

const handleTaskAdded = (newTask) => {
  setTasks(prevTasks => [...prevTasks, newTask]);
  setFilteredTasks(prevTasks => [...prevTasks, newTask]);
};
// delete task
const handleDeleteTask = async (taskId) => {
  console.log(taskId)
  try {
    await axios.delete(`http://127.0.0.1:5555/task_update/${taskId}`);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    // setFilteredTasks(updatedTasks);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
// delete resource
const handleDeleteResource = async (taskId) => {
  console.log(taskId)
  try {
    await axios.delete(`http://127.0.0.1:5555/resource/${taskId}`);
    const updatedResource = resource.filter(task => task.id !== taskId);
    setResource(updatedResource);
    // setFilteredTasks(updatedTasks);
  } catch (error) {
    console.error('Error deleting resource:', error);
  }
};

return (
  <div className='parent'>
   
{/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
<h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2> */}
{user.user_id === event['organizer_id'] ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <>
  </>
  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-4">
      <h3  className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
      <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-sm text-gray-700">{event.description}</p>

    </div>
  
      <>
      <button onClick={() => handleUpdate(event.id)}>Update</button><br />
    <button onClick={() => handleClick(event.id)}>Delete</button>
      </><br />
     
  </div>
  
  <ResourceManagementForm eventId={event.id} /> 
  {resource.map(task => (
     task.organizer_id === user.user_id ?  <div  key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
     <div className="p-4">
       <h3  className="text-lg font-bold text-blue-800 mb-1">{task.name}</h3>
       <p className="text-sm text-gray-600 mb-2">quantity: {task.quantity}</p>
      
    <button onClick={() => handleDeleteResource(task.id)}>Delete</button>
     </div>
   </div>:<h1></h1>

     
    ))}
  

    <TaskManagementForm onTaskAdded={handleTaskAdded} />

    {tasks.map(task => (
     task.organizer_id === user.user_id ?  <div  key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
     <div className="p-4">
       <h3  className="text-lg font-bold text-blue-800 mb-1">{task.title}</h3>
       {/* <p className="text-sm text-gray-600 mb-1">{task.date} at {event.time}</p> */}
       <p className="text-sm text-gray-600 mb-2">Deadline: {task.deadline}</p>
       <p className="text-sm text-gray-700">Completed: {task.completed}</p>
       <button onClick={() => handleUpdate(task.id)}>Update</button><br />
    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
     </div>
   </div>:<h1></h1>

     
    ))}

</div>: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-4">
      <h3  className="text-lg font-bold text-blue-800 mb-1">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{event.date} at {event.time}</p>
      <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-sm text-gray-700">{event.description}</p>

    </div>
  
     
    
  </div>

</div>}


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

   
  </div>
);
};

export default CollaborationForm;

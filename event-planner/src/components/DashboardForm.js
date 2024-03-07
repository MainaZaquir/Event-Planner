import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [messages, setMessages] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [taskForm, setTaskForm] = useState({
        description: '',
        deadline: '',
        priority: ''
    });
    const [taskFormErrors, setTaskFormErrors] = useState({});
    const [expenses, setExpenses] = useState([]);
    const [budget] = useState(0);
    const [expenseForm, setExpenseForm] = useState({
        
        description: '',
        amount: ''
    });
    const [expenseFormErrors, setExpenseFormErrors] = useState({});
    const [messageForm, setMessageForm] = useState({
        content: ''
    });

    useEffect(() => {
        axios.get('/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));

        axios.get('/api/tasks')
            .then(response => {
                setTasks(response.data);
                setFilteredTasks(response.data);
            })
            .catch(error => console.error(error));

        axios.get('/api/expenses')
            .then(response => setExpenses(response.data))
            .catch(error => console.error(error));

        axios.get('/api/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error(error));
    }, []);

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        axios.post('/api/messages', messageForm)
            .then(response => {
                setMessages(prevMessages => [...prevMessages, response.data]);
                setMessageForm({ content: '' });
            })
            .catch(error => console.error(error));
    };

    const handleMessageFormChange = (e) => {
        const { name, value } = e.target;
        setMessageForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const handleDeleteEvent = (eventId) => {
        axios.delete(`/api/events/${eventId}`)
            .then(response => {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            })
            .catch(error => console.error(error));
    };

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
            errors.description = 'Description is required';
        }
        if (!taskForm.deadline) {
            errors.deadline = 'Deadline is required';
        }
        if (!taskForm.priority.trim()) {
            errors.priority = 'Priority is required';
        }
        setTaskFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitTaskForm = (e) => {
        e.preventDefault();
        if (validateTaskForm()) {
            axios.post('/api/tasks', taskForm)
                .then(response => {
                    setTasks(prevTasks => [...prevTasks, response.data]);
                    setFilteredTasks(prevTasks => [...prevTasks, response.data]);
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

    const handleReminder = (task) => {
        const deadline = new Date(task.deadline);
        const now = new Date();
        const timeDifference = deadline.getTime() - now.getTime(); 
        const hoursDifference = Math.ceil(timeDifference / (1000 * 3600)); 

        if (hoursDifference <= 24 && hoursDifference > 0) {
            alert(`Reminder: Task "${task.description}" is due within 24 hours!`);
        } else if (hoursDifference <= 0) {
            alert(`Reminder: Task "${task.description}" is overdue!`);
        }
    };

    const handleMarkTaskCompleted = (taskId) => {
        axios.put(`/api/tasks/${taskId}`, { status: 'completed'})
            .then(response => {
                const updatedTasks = tasks.map(task => {
                    if (task.id === taskId) {
                        return {...task, status: 'completed' };
                    }
                    return task;
                });

                setTasks(updatedTasks);
                setFilteredTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    };

    const handleExpenseFormChange = (e) => {
        const { name, value } = e.target;
        setExpenseForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };
    
    const validateExpenseForm = () => {
        let errors = {};
        if (!expenseForm.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!expenseForm.amount.trim()) {
            errors.amount = 'Amount is required';
        } else if (isNaN(expenseForm.amount)) {
            errors.amount = 'Amount must be a number';
        }
        setExpenseFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmitExpenseForm = (e) => {
        e.preventDefault();
        if (validateExpenseForm()) {
            axios.post('/api/expenses', expenseForm)
                .then(response => {
                    setExpenses(prevExpenses => [...prevExpenses, response.data]);
                    setExpenseForm({
                        description: '',
                        amount: ''
                    });
                    setExpenseFormErrors({});
                })
                .catch(error => console.error(error));
        }
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`/api/tasks/${taskId}`)
            .then(response => {
                const updatedTasks = tasks.filter(task => task.id !== taskId);
                setTasks(updatedTasks);
                setFilteredTasks(updatedTasks);
            })
            .catch(error => console.error(error));
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
                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                </div>
            ))}
            <h2>Tasks</h2>
            <div>
                <button onClick={() => handleTaskFilter('all')}>All</button>
                <button onClick={() => handleTaskFilter('completed')}>Completed</button>
                <button onClick={() => handleTaskFilter('pending')}>Pending</button>
            </div>
            <form onSubmit={handleSubmitTaskForm}>
                <input type="text" name="description" value={taskForm.description} onChange={handleTaskFormChange} />
                {taskFormErrors.description && <div>{taskFormErrors.description}</div>}
                <input type="date" name="deadline" value={taskForm.deadline} onChange={handleTaskFormChange} />
                {taskFormErrors.deadline && <div>{taskFormErrors.deadline}</div>}
                <input type="text" name="priority" value={taskForm.priority} onChange={handleTaskFormChange} />
                {taskFormErrors.priority && <div>{taskFormErrors.priority}</div>}
                <button type="submit">Add Task</button>
            </form>
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
                                            {task.status !== 'completed' && (
                                                <>
                                                    <button onClick={() => handleMarkTaskCompleted(task.id)}>Mark Completed</button>
                                                    <button onClick={() => handleReminder(task)}>Set Reminder</button>
                                                </>
                                            )}
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
            <h2>Budget Planning and Expense Tracking</h2>
            <div>
                <h3>Budget: ${budget}</h3>
                <form onSubmit={handleSubmitExpenseForm}>
                    <input type="text" name="description" value={expenseForm.description} onChange={handleExpenseFormChange} />
                    {expenseFormErrors.description && <div>{expenseFormErrors.description}</div>}
                    <input type="text" name="amount" value={expenseForm.amount} onChange={handleExpenseFormChange} />
                    {expenseFormErrors.amount && <div>{expenseFormErrors.amount}</div>}
                    <button type="submit">Add Expense</button>
                </form>
                <h3>Expenses</h3>
                <ul>
                    {expenses.map(expense => (
                        <li key={expense.id}>
                            {expense.description}: ${expense.amount}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Collaboration and Communication</h2>
                <div>
                    <h3>Messages</h3>
                    <ul>
                        {messages.map(message => (
                            <li key={message.id}>{message.content}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleSendMessage}>
                        <textarea name="content" value={messageForm.content} onChange={handleMessageFormChange} />
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
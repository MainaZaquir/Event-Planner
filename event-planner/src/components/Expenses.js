import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Expense = ({ user }) => {
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: 0,
    event_id: null // Initialize event_id state to null
  });
  const navigate =useNavigate()

  const [events, setEvents] = useState([]);
  console.log(expenseForm);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://event-planner-app-backend.onrender.com/expenses', expenseForm, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });

      if (response.status === 201) {
        // Clear form fields after successful submission
        setExpenseForm({
          description: '',
          amount: 0,
          event_id: null // Change to null to match the initial state
        });

        alert('Expense added successfully');
        navigate('/expenses')

      } else {
        console.error('Failed to add expense');
        alert('Expense Not addedsuccessfully');
      }
    } catch (error) {
      console.error('Error adding expense:', error.message);
      alert('Expense Not added successfully');
    }
  };

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

  return (
    <>
    <div className="container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            className="form-control"
            id="expenseName"
            value={expenseForm.description}
            onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenseAmount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="expenseAmount"
            value={expenseForm.amount}
            onChange={(e) => setExpenseForm({ ...expenseForm, amount: parseFloat(e.target.value) })}
            required
          />
        </div><br />
        <div>
          <select
            id="event_id"
            name="event_id"
            type="number"
            className="border border-gray-300 rounded px-3 py-1"
            value={expenseForm.event_id}
            onChange={(e) => setExpenseForm({ ...expenseForm, event_id: parseFloat(e.target.value) })}
          >
            <option value="">Select Event</option><br /><br />
            {events.map(event => (
              // Filter events based on organizer_id
              event.organizer_id === user.user_id && <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div><br /><br />
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
};

export default Expense;

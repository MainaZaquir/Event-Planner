import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Expense = ({ user }) => {
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: 0,
    event_id: null // Initialize event_id state
  });

  const [events, setEvents] = useState([]);
  console.log(expenseForm);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5555/expenses`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(expenseForm) // Just pass expenseForm directly
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      // Clear form fields after successful submission
      setExpenseForm({
        description: '',
        amount: 0,
        event_id: null // Change to null to match the initial state
      });

      console.log('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };

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

  return (
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
        </div>
        <div>
          <select
            id="event_id"
            name="event_id"
            className="border border-gray-300 rounded px-3 py-1"
            value={expenseForm.event_id}
            onChange={(e) => setExpenseForm({ ...expenseForm, event_id: e.target.value })}
          >
            <option value="">Select Event</option>
            {events.map(event => (
              // Filter events based on organizer_id
              event.organizer_id === user.user_id && <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const BudgetManagementForm = ({ budget,user }) => {
  const [budgetData, setBudgetData] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    event_id: '',
    total: 0,
  });
  const [expenseFormErrors, setExpenseFormErrors] = useState({});
  const [eventOptions, setEventOptions] = useState([]);
  const onSubmit = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:5555/budgets', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Expense added successfully');
        // You may want to update the UI or refetch data after adding expense
      } else {
        const errorData = await response.json();
        console.error('Error adding expense:', errorData.message);
      }
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
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
    if (!expenseForm.event_id.trim()) {
      errors.event_id = 'An event ID is required';
    }
    return errors;
  };

  useEffect(() => {
    fetchBudgetData();
    fetchEventOptions();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/budgets', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBudgetData(data); 
      } else {
        console.error('Failed to fetch budget data');
      }
    } catch (error) {
      console.error('Error fetching budget data:', error.message);
    }
  };

  const fetchEventOptions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/events', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEventOptions(data.map(event => ({ value: event.id, label: event.id }))); 
      } else {
        console.error('Failed to fetch event options');
      }
    } catch (error) {
      console.error('Error fetching event options:', error.message);
    }
  };
  console.log(eventOptions)
  const handleSubmitExpenseForm = (e) => {
    e.preventDefault();
    const errors = validateExpenseForm();
    if (Object.keys(errors).length === 0) {
      onSubmit(expenseForm);
      setExpenseForm({
        event_id: '',
        total: '',
      });
      setExpenseFormErrors({});
    } else {
      setExpenseFormErrors(errors);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/budget/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: "DELETE"
      });
      if (response.ok) {
        console.log('Expense deleted successfully');
        // You may want to update the UI or refetch data after deleting expense
      } else {
        const errorData = await response.json();
        console.error('Error deleting expense:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };

  return (
    <div className="budget-management-container"><br /> <br /> <br /> <br />
      <h4>Budget Management and Expense Tracking</h4>
      <h5 className="card-title">Add an Budget</h5>
      <div>
        <form onSubmit={handleSubmitExpenseForm}>
          <select
            name="event_id"
            value={expenseForm.event_id}
            onChange={handleExpenseFormChange}
            className="form-select"
          >
            <option value="">Select Event</option>
            {eventOptions.map(option => (
              // remember to correct here option.event_id === user.user_id 
             true?<option key={option.value} value={option.value}>{option.label}</option>:null
            ))}
          </select>
          {expenseFormErrors.event_id && <div className="error-message">{expenseFormErrors.event_id}</div>}
          <input type="text" name="total" placeholder="Total" value={expenseForm.total} onChange={handleExpenseFormChange} className="form-control" />
          {expenseFormErrors.total && <div className="error-message">{expenseFormErrors.total}</div>}
          <button type="submit" className="btn btn-primary">Add Budget</button>
        </form>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Budget Table</h5>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event ID</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.id}</td>
                  <td>{expense.event_id}</td>
                  <td>{expense.total}</td>
                  <td><button onClick={() => handleDeleteExpense(expense.id)} className="btn btn-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagementForm;

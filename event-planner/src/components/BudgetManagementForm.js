import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const BudgetManagementForm = ({ budget, onSubmit }) => {
  const [budgetData, setBudgetData] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    event_id: '',
    total: 0,
  });
  const [expenseFormErrors, setExpenseFormErrors] = useState({});
  const [editingExpense, setEditingExpense] = useState(null);


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
      errors.event_id = 'A event_id is required';
    }
    fetch(`http://127.0.0.1:5555/budgets`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: "POST",
        body:JSON.stringify(expenseForm)})
   
  };

  useEffect(() => {
    fetchBudgetData();
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

  const handleSubmitExpenseForm = async (e) => {
    e.preventDefault();
    if (validateExpenseForm()) {
      if (editingExpense) {
        // If editing an existing expense, send a PATCH request
        try {
          const response = await fetch(`http://127.0.0.1:5555/budget/${editingExpense.id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            method: "PATCH",
            body: JSON.stringify(expenseForm)
          });
          if (response.ok) {
            console.log('Expense updated successfully');
            setEditingExpense(null);
          } else {
            const errorData = await response.json();
            console.error('Error updating expense:', errorData.message);
          }
        } catch (error) {
          console.error('Error updating expense:', error.message);
        }
      } else {
        // If adding a new expense, send a POST request
        try {
          const response = await fetch(`http://127.0.0.1:5555/budgets`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            method: "POST",
            body: JSON.stringify(expenseForm)
          });
          if (response.ok) {
            console.log('Expense added successfully');
            setExpenseForm({
              event_id: '',
              total: '',
            });
          } else {
            const errorData = await response.json();
            console.error('Error adding expense:', errorData.message);
          }
        } catch (error) {
          console.error('Error adding expense:', error.message);
        }
      }
    }
  };
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      event_id: expense.event_id,
      total: expense.total,
    });
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
  <div className="budget-management-container">
    <h2>Budget Management and Expense Tracking</h2>
    <h5 className="card-title">Add an Expense</h5>
    <div>
      <form onSubmit={handleSubmitExpenseForm}>
        <input type="text" name="event_id" placeholder="event_id" value={expenseForm.event_id} onChange={handleExpenseFormChange} />
        {expenseFormErrors.event_id && <div className="error-message">{expenseFormErrors.event_id}</div>}
        <input type="text" name="total" placeholder="total" value={expenseForm.total} onChange={handleExpenseFormChange} />
        {expenseFormErrors.total && <div className="error-message">{expenseFormErrors.total}</div>}
        <button type="submit">Add Expense</button>
      </form>
    </div>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Expense Table</h5>
        <table className="table">
          <thead>
            <tr>
              {/* <th>No</th> */}
              <th>Event ID</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          { /* Insert the tbody section here */ }
          <tbody>
            {budgetData.map((expense, index) => (
              <tr key={index}>
                {/* <td>{expense.id}</td> */}
                <td>{expense.event_id}</td>
                <td>{expense.total}</td>
                <td>
                  <button onClick={() => handleEditExpense(expense)}>Edit</button>
                  <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                </td>
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

import React, { useState } from 'react';

const BudgetManagementForm = ({ budget, onSubmit }) => {
  const [expenseForm, setExpenseForm] = useState({
    event_id: '',
    total: 0,
  });
  const [expenseFormErrors, setExpenseFormErrors] = useState({});

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

  const handleSubmitExpenseForm = (e) => {
    e.preventDefault();
    if (validateExpenseForm()) {
      // onSubmit(expenseForm);
      setExpenseForm({
        event_id: '',
        total: '',
      });
      setExpenseFormErrors({});
    }
  };

  return (
    <div className="budget-management-container">
      <h2>Budget Management and Expense Tracking</h2>
      <div>
        <h3>Budget: ${budget}</h3>
        <form onSubmit={handleSubmitExpenseForm}>
          <input type="text" name="event_id" placeholder="event_id" value={expenseForm.event_id} onChange={handleExpenseFormChange} />
          {expenseFormErrors.event_id && <div className="error-message">{expenseFormErrors.event_id}</div>}
          <input type="text" name="total" placeholder="total" value={expenseForm.total} onChange={handleExpenseFormChange} />
          {expenseFormErrors.total && <div className="error-message">{expenseFormErrors.total}</div>}
                    <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default BudgetManagementForm;

import React, { useState } from 'react';

const BudgetManagementForm = ({ budget, onSubmit }) => {
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    category: ''
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
    if (!expenseForm.description.trim()) {
      errors.description = 'A description is required';
    }
    if (!expenseForm.amount.trim()) {
      errors.amount = 'An amount is required';
    } else if (isNaN(expenseForm.amount)) {
      errors.amount = 'The amount must be a number';
    }
    if (!expenseForm.category.trim()) {
      errors.category = 'A category is required';
    }
    setExpenseFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitExpenseForm = (e) => {
    e.preventDefault();
    if (validateExpenseForm()) {
      onSubmit(expenseForm);
      setExpenseForm({
        description: '',
        amount: '',
        category: ''
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
          <input type="text" name="description" placeholder="Description" value={expenseForm.description} onChange={handleExpenseFormChange} />
          {expenseFormErrors.description && <div className="error-message">{expenseFormErrors.description}</div>}
          <input type="text" name="amount" placeholder="Amount" value={expenseForm.amount} onChange={handleExpenseFormChange} />
          {expenseFormErrors.amount && <div className="error-message">{expenseFormErrors.amount}</div>}
          <input type="text" name="category" placeholder="Category" value={expenseForm.category} onChange={handleExpenseFormChange} />
          {expenseFormErrors.category && <div className="error-message">{expenseFormErrors.category}</div>} {/* Add validation error display */}
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default BudgetManagementForm;

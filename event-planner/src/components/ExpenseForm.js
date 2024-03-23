import React, { useState } from 'react';

function ExpenseForm({ initialExpense, onSubmit, onDelete }) {
  const [expense, setExpense] = useState(initialExpense || { name: '', amount: '', date: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!expense.name || !expense.amount || !expense.date) {
      setErrors({
        ...errors,
        form: 'All fields are required.',
      });
      return;
    }
    setErrors({});
    onSubmit(expense);
  };

  const handleDelete = () => {
    onDelete(expense);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Expense Name:
        <input
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
        />
      </label>
      {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
      <button type="submit">Update Expense</button>
      <button type="button" onClick={handleDelete}>Delete Expense</button>
    </form>
  );
}

export default ExpenseForm;

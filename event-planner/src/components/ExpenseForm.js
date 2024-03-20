import React, { useState } from 'react';

function ExpenseForm({ initialExpense, onSubmit, onDelete }) {
  const [expense, setExpense] = useState(initialExpense);

  const handleChange = (event) => {
    setExpense({
      ...expense,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(expense);
  };

  const handleDelete = (event) => {
    event.preventDefault();
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
      <button type="submit">Update Expense</button>
      <button type="button" onClick={handleDelete}>Delete Expense</button>
    </form>
  );
}

export default ExpenseForm;

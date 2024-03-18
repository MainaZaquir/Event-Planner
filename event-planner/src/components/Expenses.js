import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Expense = ({ budget, user }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Expense Name:', expenseName);
    console.log('Expense Amount:', expenseAmount);
    setExpenseName('');
    setExpenseAmount(0);
  };

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
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenseAmount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="expenseAmount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;

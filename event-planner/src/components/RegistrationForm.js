import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        companyName,
        companyEmail,
        companyNumber,
        newPassword,
      });

      if (response.status === 200) {
        alert('Registration successful');
        // Redirect or reset form fields here
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div>
      <h1>Have an event coming up? Sign up with us for your ticket management.</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="company_name">Company Name:</label><br />
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        /><br />
        <label htmlFor="company_email">Company Email:</label><br />
        <input
          type="email"
          id="company_email"
          name="company_email"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
          required
        /><br />
        <label htmlFor="company_number">Company Number:</label><br />
        <input
          type="tel"
          id="company_number"
          name="company_number"
          inputmode="numeric"
          pattern="[0-9]{10}"
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
          required
        /><br />
        <label htmlFor="new_password">Enter New Password:</label><br />
        <input
          type="password"
          id="new_password"
          name="new_password"
          minLength="8"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        /><br />
        <label htmlFor="confirm_password">Confirm Password:</label><br />
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          minLength="8"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Log in.</a></p>
    </div>
  );
};

export default SignUpForm;

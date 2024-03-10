import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
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
        alert('Registration was successful');
      } else {
        alert('Registration has failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error has occurred during registration');
    }
  };

  return (
    <div className="sign-up-container"> 
      <h1>Have an event coming up? Sign up with us for your ticket management.</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}> 
        <label htmlFor="company_name">Company Name:</label><br />
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="form-input" 
        /><br />
        <label htmlFor="company_email">Company Email:</label><br />
        <input
          type="email"
          id="company_email"
          name="company_email"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
          required
          className="form-input"
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
          className="form-input" 
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
          className="form-input"
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
          className="form-input" 
        /><br />
        <button type="submit" className="form-button">Sign Up</button> 
      </form>
      <p>Already have an account? <a href="/login">Log in.</a></p>
    </div>
  );
};

export default RegistrationForm;

import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; 
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [firstName, setfirstName] = useState('');
  const[lastname,setlastname] = useState('');
  const [email, setCompanyEmail] = useState('');
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
        firstName,
        lastname,
        email,
        newPassword,
        confirmPassword
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
    <div className="container"> 
      <div className="card">
        <h1>Have an event coming up? Sign up with us for your ticket management.</h1>
        <form className="sign-up-form" onSubmit={handleSubmit}> 
          <label htmlFor="first name">First Name:</label><br />
          <input
            type="text"
            id="First Name"
            name="First Name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            className="form-input" 
          /><br />
            <label htmlFor="last name">Last Name:</label><br />
          <input
            type="text"
            id="last Name"
            name="last Name"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            required
            className="form-input" 
          /><br />
          <label htmlFor="user email">User Email:</label><br />
          <input
            type="email"
            id="user email"
            name="user email"
            value={email}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
            className="form-input"
          /><br />
          <label htmlFor="new_password">Enter New Password:</label><br />
          <input
            type="password"
            id="password"
            name="password"
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
        <p className="register">Already have an account? <Link to="/login">Log in.</Link></p>
      </div>
    </div>
  );
};

export default RegistrationForm;

import React, { useState } from 'react';
import './RegistrationForm.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [first_name, setfirstName] = useState('');
  const [last_name, setlastname] = useState('');
  const [email, setCompanyEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5555/sign_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          email,
          password
        })
      });

      if (response.ok) {
        alert('Registration was successful');
        navigate('/login');
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
            value={first_name}
            onChange={(e) => setfirstName(e.target.value)}
            required
            className="form-input" 
          /><br />
            <label htmlFor="last name">Last Name:</label><br />
          <input
            type="text"
            id="last Name"
            name="last Name"
            value={last_name}
            onChange={(e) => setlastname(e.target.value)}
            required
            className="form-input" 
          /><br />
           <label htmlFor="last name">Username:</label><br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
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

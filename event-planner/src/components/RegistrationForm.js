import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const response = await fetch('https://event-planner-app-backend.onrender.com/sign_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration was successful');
        localStorage.setItem('jwt', data[1].token);
        navigate('/dashboard');
      } else {
        alert('Registration has failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error has occurred during registration');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-input border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-input border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input border border-gray-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              minLength="8"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input border border-gray-300"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log in</Link></p>
      </div>
    </div>
  );
};

export default RegistrationForm;

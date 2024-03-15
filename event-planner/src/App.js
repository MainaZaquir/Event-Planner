import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import DashboardForm from './components/DashboardForm';
import EventManagementForm from './components/EventManagementForm';
import TaskManagementForm from './components/TaskManagementForm';
import ResourceManagement from './components/ResourceManagement';
import CollaborationForm from './components/CollaborationForm';
import BudgetManagementForm from './components/BudgetManagementForm';
import LandingPage from './components/LandingPage';
import './App.css';
import './components/LandingPage.css'
import './components/LoginForm.css';
import Navbar from './components/NavBar';
import UpdateEvent from './components/UpdateEvent';


function App() {
    const [user , setUser]=useState({})
    useEffect(() => {
        const checkSession = () => {
          fetch("http://127.0.0.1:5555/check_session", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to check session');
            }
          })
          .then(userData => {
            console.log(userData);
            // navigate(window.location.pathname); 
            setUser(userData)
          })
          .catch(error => {
            console.error('Error checking session:', error);
          });
        };
    checkSession();
    
      }, []);
    return (

        <div>
        {/* <Navbar /> */}
        <hr />
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/dashboard" element={<DashboardForm />} />
            <Route path="/events" element={<EventManagementForm user={user} />} />
            <Route path="/tasks" element={<TaskManagementForm user={user} />} />
            <Route path="/resources" element={<ResourceManagement user={user} />} />
            <Route path="/collaboration" element={<CollaborationForm />} />
            <Route path="/budget" element={<BudgetManagementForm user={user} />} />
            <Route path='/event/:id' element={<CollaborationForm user={user} />}/>
            <Route path='/update_event/:id' element={<UpdateEvent />}/>
        </Routes>
        </div>

    );
}

export default App;
import React, { useEffect, useState } from 'react';
import {  Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import DashboardForm from './components/DashboardForm';
import EventManagementForm from './components/EventManagementForm';
import TaskManagementForm from './components/TaskManagementForm';
import ResourceManagement from './components/ResourceManagement';
import CollaborationForm from './components/CollaborationForm';
import BudgetManagementForm from './components/BudgetManagementForm';
import LandingPage from './components/LandingPage';
import ExpenseForm from './components/ExpenseForm'; 
import './App.css';
import './components/LandingPage.css'
import './components/LoginForm.css';
import Navbar from './components/NavBar';
import UpdateEvent from './components/UpdateEvent';
import TaskAssignment from './components/TaskAssignment';
import UserStoryPage from './components/UserStoryPage';
import Footer from './components/Footer'; 
import Expense from './components/Expenses';

import UpdateTask from './components/UpdateTask';




import {useNavigate } from 'react-router-dom';

function App() {
    const [user , setUser]=useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const checkSession = () => {
            fetch("https://event-planner-app-backend.onrender.com/check_session", {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
              // navigate("/login")
            throw new Error('Failed to check session');
            }
            })
        .then(userData => {
            console.log(userData);
            // navigate(window.location.pathname); 
            setUser(userData)
        })
        .catch(error => {
            // console.error('Error checking session:', error);
            
        });
        };
    checkSession();
    
}, [navigate]);
        return (
        <div>
            <Navbar />
            <hr />
            <main>
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
                    <Route path='/event/:id' element={<CollaborationForm user={user} />} />
                    <Route path='/update_event/:id' element={<UpdateEvent />} />
                    <Route path='/update_task/:id' element={<UpdateTask />} />
                    <Route path='/task_assign' element={<TaskAssignment user={user} />} />
                    <Route path='/user_stories' element={<UserStoryPage user={user} />} />
                    <Route path="/update_expense/:id" element={<ExpenseForm />} />
                    <Route path='/expenses' element={<ExpenseForm user={user} />} />
                    <Route path='/expenses/:id' element={<Expense user={user} />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
    
}

export default App;

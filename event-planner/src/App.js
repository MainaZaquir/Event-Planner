import React from 'react';
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
import './components/LoginForm.css';
import Navbar from './components/NavBar';


function App() {
  return (
   
      <div>
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<DashboardForm />} />
          <Route path="/events" element={<EventManagementForm />} />
          <Route path="/tasks" element={<TaskManagementForm />} />
          <Route path="/resources" element={<ResourceManagement />} />
          <Route path="/collaboration" element={<CollaborationForm />} />
          <Route path="/budget" element={<BudgetManagementForm />} />
        </Routes>
      </div>
   
  );
}

export default App;

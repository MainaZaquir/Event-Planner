import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginForm';
import Registration from './components/RegistrationForm';
import Dashboard from './components/DashboardForm';
import EventManagement from './components/EventManagementForm';
import TaskManagement from './components/TaskManagementForm';
import ResourceManagement from './components/ResourceManagement';
import Collaboration from './components/CollaborationForm';
import BudgetManagement from './components/BudgetManagementForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/events" component={EventManagement} />
          <Route path="/tasks" component={TaskManagement} />
          <Route path="/resources" component={ResourceManagement} />
          <Route path="/collaboration" component={Collaboration} />
          <Route path="/budget" component={BudgetManagement} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                EVENT PLANNER
            </Link>
            <ul className="navbar-links">
                <li>
                    <Link to="/register" className="navbar-link">Register</Link>
                </li>
                <li>
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/events" className="navbar-link">Events</Link>
                </li>
                <li>
                    <Link to="/tasks" className="navbar-link">Tasks</Link>
                </li>
                <li>
                    <Link to="/resources" className="navbar-link">Resources</Link>
                </li>
                <li>
                    <Link to="/collaboration" className="navbar-link">Collaboration</Link>
                </li>
                <li>
                    <Link to="/budget" className="navbar-link">Budget</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

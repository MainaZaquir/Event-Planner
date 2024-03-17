import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h5>Event Planning App</h5>
                        <p>This is a platform to manage and plan your events effectively.</p>
                    </div>
                    <div className="col">
                        <h5>Quick Links</h5>
                        <ul>
                            <li><a href="/dashboard">Dashboard</a></li>
                            <li><a href="/events">Events</a></li>
                            <li><a href="/tasks">Tasks</a></li>
                            <li><a href="/resources">Resources</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Contact Us</h5>
                        <p>Email: info@eventplanning.com</p>
                        <p>Phone: +1234567890</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>© {new Date().getFullYear()} Event Planning App. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

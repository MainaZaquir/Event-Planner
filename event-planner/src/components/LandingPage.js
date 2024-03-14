import React from 'react';
import { createRoot } from 'react-dom'; 
import Navbar from './NavBar';
import './LandingPage.css';

function LandingPage() {
    return (
        <>
        <Navbar />
        <div className="landing-page">
            
            <header>
                <h1>Welcome to Event Planning Hub</h1>
                <p>Efficiently plan and organize all your events with us!</p>
            </header>
            
            <section className="features">
            <div className='container'>
            <div className="row">
                <div className="feature  col-md-4 mt-2">
                    <h2>Effective Orginisation</h2>
                    <p>Event planning involves meticulous coordination of various elements such as venue selection, logistics, scheduling, and budgeting. Proper planning ensures that all aspects of the event align seamlessly, resulting in a well-organized and efficient experience.</p>
                </div>
                <div className="feature col-md-4 mt-2">
                    <h2>Guest experience</h2>
                    <p>A well-planned event enhances the overall experience for attendees. Thoughtful arrangements, comfortable seating, engaging activities, and timely services contribute to positive memories and satisfaction.</p>
                </div>
                
                <div className="feature col-md-4 mt-2">
                    <h2>Budget Management</h2>
                    <p>Event planners allocate resources wisely, balancing costs while maintaining quality. Effective budgeting prevents overspending and ensures that funds are allocated appropriately to different aspects of the event.</p>
                </div>
                <div className="feature col-md-4 mt-2">
                    <h2>Time Management</h2>
                    <p>Events have specific timelines, and efficient planning ensures that everything happens on schedule. Timely setup, smooth transitions, and adherence to the agenda contribute to a successful event.</p>
                </div>
                
                </div>
            </div>
            </section>
            
            <footer>
                <p>© 2024 Event Planning Hub</p>
            </footer>
        </div>
        </>
    );
}

const root = document.getElementById('root');
const app = createRoot(root);
app.render(<LandingPage />);

export default LandingPage;

import React from 'react';

function Footer() {
    return (
        <footer className="bg-blue-500 py-8">
            <div className="container mx-auto px-4 flex flex-col justify-between h-full">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col">
                            <h5 className="text-white text-lg font-semibold mb-4">Event Planning App</h5>
                            <p className="text-white">This is a platform to manage and plan your events effectively.</p>
                        </div>
                        <div className="col">
                            <h5 className="text-white text-lg font-semibold mb-4">Quick Links</h5>
                            <ul>
                                <li><a href="/dashboard" className="text-white hover:underline">Dashboard</a></li>
                                <li><a href="/events" className="text-white hover:underline">Events</a></li>
                                <li><a href="/Task Assignment" className="text-white hover:underline">Tasks Assignment</a></li>
                                <li><a href="/user_stories" className="text-white hover:underline">User Story</a></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h5 className="text-white text-lg font-semibold mb-4">Contact Us</h5>
                            <p className="text-white">Email: info@eventplanning.com</p>
                            <p className="text-white">Phone: +1234567890</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-white text-center">© {new Date().getFullYear()} Event Planning App. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

// CollaborationForm.js

import React, { useState } from 'react';

function CollaborationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [formError, setFormError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.name || !formData.email || !formData.message) {
            setFormError('Please fill in all fields.');
            return;
        }

        // Handle form submission (e.g., send data to backend)
        alert('Form submitted successfully!');
    };

    return (
        <div>
            <h2>Collaboration Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    rows="4"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                {formError && <p style={{ color: 'red' }}>{formError}</p>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CollaborationForm;

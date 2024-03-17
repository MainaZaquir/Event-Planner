import React, { useState } from 'react';
import axios from 'axios'; 
import './LoginForm.css'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        const response = await fetch('http://127.0.0.1:5555/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('jwt', data.token);
            navigate('/dashboard');
        } else {
            alert("Wrong Credentials");
        }
    } catch (error) {
        console.error('Login failed:', error);
        setError('Invalid email or password. Please try again.');
    }
};
;

    return (
        <section>
            <div className="formbox">
                <div className="form-value">
                    <form onSubmit={handleSubmit}>
                        <h2>Login Form</h2>
                        <div className="inputbox">
                            <ion-icon name={showPassword ? "eye-outline" : "eye-off-outline"}></ion-icon>
                            <input type="username" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                name="password" 
                                placeholder="Enter password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <div className="forget">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={showPassword} 
                                    onChange={handleShowPassword} 
                                />
                                Show password 
                                <a href="#">Forgot my password</a>
                            </label>
                        </div>
                        <button type="submit">Login</button>
                        <div className="register">
                            <p>No account <a href="register">Register here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;

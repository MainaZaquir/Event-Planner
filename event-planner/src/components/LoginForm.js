import React, { useState } from 'react';
import axios from 'axios'; 
import './LoginForm.css'; 

function Login() {
    const [formData, setFormData] = useState({
        email: '',
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
        try {
            setTimeout(async () => {
                const response = await axios.post('/api/login', formData); 
                console.log(response.data); 
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <section>
            <div className="formbox">
                <div className="form-value">
                    <form onSubmit={handleSubmit}>
                        <h2>Login Form</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
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
                            <p>No account <a href="#">Register here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate,Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
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
            const response = await axios.post('http://127.0.0.1:5555/login', formData);
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.token);
                navigate('/dashboard');
            } else {
                setError('Wrong Credentials');
            }
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-md w-full p-8 bg-white rounded shadow-lg">
                <h2 className="text-3xl text-center font-semibold mb-8">Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={handleShowPassword}
                            className="mr-2"
                        />
                        <label htmlFor="showPassword">Show password</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                    <div className="text-center mt-4">
                        <p>No account <Link to="/register" className="text-blue-500 hover:text-blue-700">Register here</Link></p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate =useNavigate()
  useEffect(() => {
    fetch('http://127.0.0.1:5555/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setUser(null);
        setLoading(false);
        setError(error.message);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete('http://127.0.0.1:5555/del_user', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });
  
      if (response.status === 200) {
        alert('User deleted successfully');
        localStorage.removeItem('jwt'); // Remove JWT token on successful deletion
        navigate('/register'); // Redirect to register page
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <>
    <div className="flex justify-center">
      <div className="max-w-md mx-4 my-8 bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <ul>
            {users.map(userData => (
              userData.id === user.user_id ? (
                <React.Fragment key={userData.id}>
                  
                  <li className="mb-2"><span className="font-semibold">First Name:</span> {userData.first_name}</li>
                  <li className="mb-2"><span className="font-semibold">Last Name:</span> {userData.last_name}</li>
                  <li className="mb-2"><span className="font-semibold">Username:</span> {userData.username}</li>
                  <li className="mb-2"><span className="font-semibold">Email:</span> {userData.email}</li>
                  <br />
                  {/* <button onClick={() => handleDeleteUser(userData.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button> */}
                </React.Fragment>
              ) : null
            ))}
          </ul>
        </div>
      </div>
    </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}

export default Profile;

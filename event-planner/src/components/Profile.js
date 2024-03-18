import React, { useState, useEffect } from 'react';

function Profile({ user }) {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
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
                </React.Fragment>
              ) : null
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;

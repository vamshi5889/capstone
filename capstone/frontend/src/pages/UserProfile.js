import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-profile-page max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6">{user?.name}</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <p><strong>Department:</strong> {user?.department}</p>

      <h3 className="text-xl font-semibold mt-6">Projects</h3>
      {user?.projects && user.projects.length > 0 ? (
        <ul className="list-disc pl-6">
          {user.projects.map((project) => (
            <li key={project.id} className="mb-2">{project.title}</li>
          ))}
        </ul>
      ) : (
        <p>No projects found for this user.</p>
      )}
    </div>
  );
}

export default UserProfile;

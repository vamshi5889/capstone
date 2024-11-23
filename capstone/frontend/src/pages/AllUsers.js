import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to load users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="all-users-page max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Department</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="py-3 px-6 text-sm">{user.id}</td>
                <td className="py-3 px-6 text-sm">{user.name}</td>
                <td className="py-3 px-6 text-sm">{user.department || 'N/A'}</td>
                <td className="py-3 px-6 text-sm">
                  <Link
                    to={`/user/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;

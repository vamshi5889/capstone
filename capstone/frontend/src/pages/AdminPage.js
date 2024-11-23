import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-page max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => navigate('/all-users')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          List Users
        </button>
        <button
          onClick={() => navigate('/create-user')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Create User
        </button>
        <button
          onClick={() => navigate('/upload-project')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Upload Project
        </button>
      </div>
    </div>
  );
}

export default Admin;

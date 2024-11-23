import React, { useState, useEffect } from 'react';

function UploadProject() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(''); // State to hold selected user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('abstract', abstract);
    formData.append('team_members', teamMembers);
    formData.append('created_by', selectedUser); // Add selected user ID
    if (file) formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/upload_project', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Project uploaded successfully!');
      } else {
        alert('Error uploading project');
      }
    } catch (error) {
      console.error('Error uploading project:', error);
    }
  };

  return (
    <div className="upload-project-page max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6">Upload Your Project</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Abstract:</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Team Members:</label>
          <input
            type="text"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Created By:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.department})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Project File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Upload Project
        </button>
      </form>
    </div>
  );
}

export default UploadProject;

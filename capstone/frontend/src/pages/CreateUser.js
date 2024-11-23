import React, { useState, useEffect } from 'react';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/departments');
        const data = await response.json();
        setDepartments(data);
        if (data.length > 0) {
          setSelectedDepartment(data[0].id); 
        }
      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      name,
      email,
      password,
      role,
      department_id: selectedDepartment
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setMessage('User created successfully!');
        // Reset form fields after successful submission
        setName('');
        setEmail('');
        setPassword('');
        setRole('Student');
        setSelectedDepartment(departments[0]?.id || '');
      } else {
        setMessage('Error creating user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="create-user-page max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;

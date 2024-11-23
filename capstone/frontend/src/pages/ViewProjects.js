import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]); 
  const [selectedDept, setSelectedDept] = useState(''); 
  const [filteredProjects, setFilteredProjects] = useState([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); 
      } catch (error) {
        setError('Failed to load projects. Please try again later.');
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/departments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        setError('Failed to load departments. Please try again later.');
      }
    };

    fetchProjects();
    fetchDepartments();
  }, []);

  const handleSortByDept = (e) => {
    const selectedDept = e.target.value;
    setSelectedDept(selectedDept);

    if (selectedDept === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.department === selectedDept
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="view-projects-page max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6">All Capstone Projects</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label htmlFor="sortByDept" className="block mb-2 text-sm font-medium">
          Sort by Department:
        </label>
        <select
          id="sortByDept"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={selectedDept}
          onChange={handleSortByDept}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Projects List */}
      <ul className="space-y-6">
        {filteredProjects.map((project) => (
          <li key={project.id} className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p><strong>Department:</strong> {project.department}</p>
            {/* Link to project detail page */}
            <Link to={`/project/${project.id}`} className="text-blue-500">
              View Project Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewProjects;

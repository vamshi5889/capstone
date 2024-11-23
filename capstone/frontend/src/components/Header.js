import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';  

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Redirect or fetch search results based on the query
  };

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <header className="bg-gray-600 text-white p-6">
      <div className="header-container max-w-4xl mx-auto flex justify-between items-center">
        {/* Add Logo */}
        <div className="logo text-2xl font-bold">
          <Link to="/home">
            <img src={logo} alt="Capstone Portfolio Logo" className="h-12 w-auto" />
          </Link>
        </div>
        
        <nav className="flex space-x-6 items-center">
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/view-projects" className="hover:text-gray-300">View Projects</Link>

          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {isAuthenticated && (
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

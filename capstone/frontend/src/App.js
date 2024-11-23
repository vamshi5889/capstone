import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UploadProject from './pages/UploadProject';
import ViewProjects from './pages/ViewProjects';
import ProjectDetails from './pages/ProjectDetails';
import UserProfile from './pages/UserProfile'; 
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';  
import AllUsers from './pages/AllUsers'; 
import AdminPage from './pages/AdminPage'; 
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth_status', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="App min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/view-projects" element={<ViewProjects />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} /> {/* Project Details Route */}
          <Route path="/user/:userId" element={<UserProfile />} /> {/* User Profile Route */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/create-user" element={<CreateUser />} /> {/* Create User Route */}
          <Route path="/all-users" element={<AllUsers />} /> {/* All Users Route */}
          <Route path="/upload-project" element={<UploadProject />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Admin page route */}


          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

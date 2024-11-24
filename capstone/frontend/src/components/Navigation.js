import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import ProjectLits from "../pages/ProjectLits";
import ProjectDetails from "../pages/ProjectDetails";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import UserList from "../pages/UserList";
import "../index.css";

function Navigation({isAuthenticated, setIsAuthenticated}) {

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth_status", {
          credentials: "include",
        });
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
    <div className="App min-h-screen bg-gray-100">
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/projects"
          element={<ProjectLits isAuthenticated={isAuthenticated} />}
        />
        <Route path="/project/:projectId" element={<ProjectDetails />} />{" "}
        {/* Project Details Route */}
        <Route path="/user/:userId" element={<UserProfile />} />{" "}
        {/* User Profile Route */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Create User Route */}
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Navigation;

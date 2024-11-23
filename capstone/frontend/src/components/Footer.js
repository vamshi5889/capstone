import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer bg-gray-800 text-white py-4">
      <div className="footer-container max-w-4xl mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Capstone Portfolio</p>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/admin" className="hover:text-gray-400">Admin</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

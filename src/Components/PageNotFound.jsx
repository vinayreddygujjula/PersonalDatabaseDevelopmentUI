// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/PageNotFound.css'; // Assuming you might want to add some CSS styling

const NotFound = () => {
  return (
    <div className="pagenotfound-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};


export default NotFound;

// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/NotFound.css'; // Assuming you might want to add some CSS styling

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to="/" className="home-link">
        Take me home
      </Link>
      <div className="animation">
        {/* You can replace this with any creative animation or SVG */}
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;

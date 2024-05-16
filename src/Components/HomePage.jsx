// src/App.js
import React from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import '../CSS/Home.css'

const HomePage = () => {
  return (
    <div className='homeDiv'>
      <h1>Personal Database</h1>
      <h3>Your Personal Database</h3>
      
      <div className='homeBtnsDiv'>
        <Link to="/login" variant="outlined"><div className='signInUpBtn'>Sign In</div></Link>
        <Link to="/register" variant="outlined"><div className='signInUpBtn'>Sign Up</div></Link>
      </div>
    </div>
  );
};

export default HomePage;

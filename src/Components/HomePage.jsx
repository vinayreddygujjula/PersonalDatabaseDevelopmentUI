import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/Home.css';

const HomePage = () => {
  return (
    <div className='homeContainer'>
      <div className='formContainer'>
        <h1>Welcome back!</h1>
        <p>Simplify your workflow and organize your data.</p>
        
        <div className='illustrationContainer'>
          <img src='/illustration.png' alt='Illustration' />
        </div>
        
        <div className='buttonsContainer'>
          <Link to="/login" className='loginBtn'>Login</Link>
          <Link to="/register" className='loginBtn'>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

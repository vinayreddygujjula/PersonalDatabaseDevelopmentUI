import React, { useState } from "react";
import { resetPassword } from "../Firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await resetPassword(email);
      // setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setError('Failed to send password reset email: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Enter your email</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="login-button" type="submit">Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

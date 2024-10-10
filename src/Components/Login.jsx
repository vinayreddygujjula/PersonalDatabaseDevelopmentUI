import React, { useState } from "react";
import { loginWithEmail } from "../Firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import loginImage from "../Assets/illustration.png";
import '../CSS/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await loginWithEmail(email, password);
        // alert("Login successful!");
        navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <h2>Welcome back!</h2>
      <img src={loginImage} className="login-image" alt="loginImage"/>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-options">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={handleShowPasswordToggle}
            />
            Show Password
          </label>
          <Link to="/forgotpassword" className="forgot-password">Forgot Password?</Link>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
        <div className="signup-container">
          <Link to="/register" className="forgot-password">Don't have an account Sign Up</Link>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;

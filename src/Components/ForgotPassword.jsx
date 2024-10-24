import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/ForgotPassword.css'
import { useNavigate } from 'react-router-dom';
import forgotPasswordImage from "../Assets/resetpassword.jpg"
import { resetPassword } from "../Firebase/auth";
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleCancel = () => {
    navigate('/');
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!email) {
      toast.error('Please enter an email.');
      return;
    }

    try {
      await resetPassword(email);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Failed to send password reset email: ' + error.message);
    }
  };
 
  return (
    <div className="forgot-password-form-container">
      <h2>Reset Password</h2>
      <img className='forgot-password-image' src = { forgotPasswordImage } alt='forgotPassword'/> 
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className='info'>
          <p><span className ="glyphicon glyphicon-info-sign info-icon"></span>
            If you are registered, a password reset link will be sent to this email address.
          </p>
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">
            Reset Password
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
 
export default ForgotPassword;
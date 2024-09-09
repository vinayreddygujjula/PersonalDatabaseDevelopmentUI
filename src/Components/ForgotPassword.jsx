import React, { useState } from 'react';
import { forgotPassword } from "../Firebase/auth";
import '../CSS/ForgotPassword.css'; // Ensure this line is included to apply the styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-div">
      <h2 className='forgotPWTxt'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="fpemail"
          />
        </label>
        <button className="resetBtn" type="submit">Send Reset Email</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;

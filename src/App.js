import './App.css';
import React, { useState, useEffect } from 'react';
import { auth } from "./Firebase/firebaseConfig";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Register from './Components/Register';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Dashboard from './Components/Dashboard';
import JobsTemplate from './Components/JobsTemplate'
import ForgotPassword from './Components/ForgotPassword';
import SubCategoryDashboard from './Components/SubCategoryDashboard';
import SubCategoryDetail from './Components/SubCategoryDetail';

function App() {
  const [user, setUser] = useState(null); // Track the user state
  const [loading, setLoading] = useState(true); // Loading state while checking user

  // Firebase Auth listener to check user login status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false after checking user state
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Display a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={user? <Navigate to="/dashboard"/>:<HomePage />} />

        {/* Prevent logged-in users from accessing login and register */}
        <Route path="register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Forgot password page is accessible to everyone */}
        <Route path="forgotpassword" element={<ForgotPassword />} />

        {/* Dashboard is protected, only accessible if user is logged in */}
        <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

        {/* 404 page for undefined routes */}
        <Route path="*" element={<NotFound />} />

        {/* Dynamic category route */}
        <Route path="/category/:category" element={user ? <SubCategoryDashboard /> : <Navigate to="/login" />} />

        {/* SubCategoryDetail route */}
        <Route path="/category/:category/:index" element={user ? <SubCategoryDetail /> : <Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
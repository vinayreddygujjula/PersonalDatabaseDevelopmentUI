import './App.css';
import React, { useState, useEffect } from 'react';
import { auth } from "./Firebase/firebaseConfig";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Register from './Components/Register';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Dashboard from './Components/Dashboard';
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
        <Route path = "/" element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
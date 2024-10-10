import React, { useEffect, useState } from 'react';
import Header from './Header';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import '../CSS/Dashboard.css';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user ID from Firebase
  const fetchUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  useEffect(() => {
    const userId = fetchUserId();
    console.log(userId)
    if (userId) {
      // Fetch categories using the userId
      axios.get(`https://localhost:44392/getcategories/${userId}`)
        .then((response) => {
          setCategories(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
          setLoading(false);
        });
    } else {
      console.error('User not logged in.');
      setLoading(false);
    }
  }, []);

  return (
    <div className="dashboard">
      {/* Render Header with title "Dashboard" */}
      <Header title="Dashboard" />

      {/* Button to add a new category */}
      <div className="add-category-button">
        <button>+ Category</button>
      </div>

      {/* Display categories */}
      <div className="categories-container">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.length > 0 ? (
            categories.map((category) => (
              <div className="category-card" key={category.id}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))
          ) : (
            <p>No categories available. Please add a new category.</p>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;

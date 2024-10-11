import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import '../CSS/Dashboard.css';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [categoryNames, setCategoryNames] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');

  const fetchUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  useEffect(() => {
    const userId = fetchUserId();

    if (userId) {
      axios.get(`https://localhost:44392/getcategories/${userId}`)
        .then((response) => {
          const transformedCategories = response.data.map(item => {
            const category = {};
            item.forEach(pair => {
              category[pair.name] = pair.value;
              setCategoryNames(prev => [...prev, pair.name]);
            });
            return category;
          });
          setCategories(transformedCategories);
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
  }, [reload]);

  const handleCategoryClick = (category) => {
    navigate(`/subcategory`, { state: { category } });
  };

  const handleAddCategory = () => {
    const userId = fetchUserId();
    axios.post(`https://localhost:44392/addcategory/${name}/${userId}`)
      .then((response) => {
        const newCategory = {
          _id: response.data._id,
          name: name
        };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setCategoryNames((prevNames) => [...prevNames, name]);
        setShowAddModal(false);
        setName('');
        setReload(prev => !prev);
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleEditCategory = () => {
    axios.put(`https://localhost:44392/updatecategory/${selectedCategory._id}/${name}`)
      .then((response) => {
        setCategories(prevCategories =>
          prevCategories.map(sub =>
            sub._id === selectedCategory._id ? { ...sub, name: name } : sub
          )
        );
        setShowEditModal(false);
        setName('');
        setSelectedCategory(null);
        setReload(prev => !prev);
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  const handleDeleteCategory = () => {
    axios.delete(`https://localhost:44392/deletecategory/${selectedCategory._id}`)
      .then((response) => {
        setCategories(prevCategories =>
          prevCategories.filter(sub => sub._id !== selectedCategory._id)
        );
        setShowDeleteModal(false);
        setSelectedCategory(null);
        setReload(prev => !prev);
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Header title="Dashboard" />
      <div className='dashboard-body'>
        <div className="add-category-button">
          <input
            type="text"
            placeholder="Search category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setShowAddModal(true)}>+ Category</button>
        </div>

        <div className="categories-container">
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  className="category-card"
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="icon-actions">
                    <i
                      className="bi bi-pencil-square edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                        setShowEditModal(true);
                      }}
                    ></i>
                    <i
                      className="bi bi-trash delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                        setShowDeleteModal(true);
                      }}
                    ></i>
                  </div>
                  <h3>{category.name}</h3>
                </div>
              ))
            ) : (
              <p>No categories available. Please add a new category.</p>
            )
          )}
        </div>

        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add new category</h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
              />
              <button className="btn btn-primary" onClick={handleAddCategory}>Add</button>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit {selectedCategory.name} category</h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="update category name"
              />
              <button className="btn btn-primary" onClick={handleEditCategory}>Update</button>
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Do you want to delete {selectedCategory.name} category ?</h3>
              <button className="btn btn-danger" onClick={handleDeleteCategory}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;

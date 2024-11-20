import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../CSS/SubCategoryDashboard.css';

function SubCategory() {
  const location = useLocation();
  const { category } = location.state || {};
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [name, setName] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (category && category._id) {
      // Fetch subcategories using the categoryId
      axios.get(`http://localhost:20754/getsubcategories/${category._id}`)
        .then((response) => {
          const transformedSubcategories = response.data.map(item => {
            const subcategory = {};
            item.forEach(pair => {
              subcategory[pair.name] = pair.value;
            });
            return subcategory;
          });
          setSubcategories(transformedSubcategories);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching subcategories:', error);
          setLoading(false);
        });
    }
  }, [category]);

  const handleAddSubCategory = () => {
    axios.post(`http://localhost:20754/addsubcategory/${name}/${category._id}`)
      .then((response) => {
        const newSubCategory = {
          _id: response.data._id,
          name: name,
        };
        setSubcategories((prevSubcategories) => [...prevSubcategories, newSubCategory]);
        setShowAddModal(false);
        setName('');
      })
      .catch(error => {
        console.error('Error adding sub-category:', error);
      });
  };

  const handleEditSubCategory = () => {
    axios.put(`http://localhost:20754/updatesubcategoryname/${selectedSubCategory._id}/${name}`)
      .then(() => {
        setSubcategories(prevSubcategories =>
          prevSubcategories.map(sub =>
            sub._id === selectedSubCategory._id ? { ...sub, name: name } : sub
          )
        );
        setShowEditModal(false);
        setName('');
        setSelectedSubCategory(null);
      })
      .catch(error => {
        console.error('Error updating sub-category:', error);
      });
  };

  const handleDeleteSubCategory = () => {
    axios.delete(`http://localhost:20754/deletesubcategory/${selectedSubCategory._id}`)
      .then(() => {
        setSubcategories(prevSubcategories =>
          prevSubcategories.filter(sub => sub._id !== selectedSubCategory._id)
        );
        setShowDeleteModal(false);
        setSelectedSubCategory(null);
      })
      .catch(error => {
        console.error('Error deleting sub-category:', error);
      });
  };

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (subCategory) => {
    navigate(`/subcategorydetails`, { state: { subCategory } });
  };

  return (
    <div className="subcategory-dashboard">
      <Header title={category ? category.name : 'Subcategories'} />
      <div className="add-subcategory-button">
        <input
          type="text"
          placeholder="Search sub-category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setShowAddModal(true)}>+ { category.name }</button>
      </div>
      {loading ? (
        <p>Loading subcategories...</p>
      ) : (
        filteredSubcategories.length > 0 ? (
          <div className="subcategories-container">
            {filteredSubcategories.map((subcategory) => (
              <div
                className="subcategory-card"
                key={subcategory._id}
                onClick={() => handleCategoryClick(subcategory)}
              >
                <div className="icon-actions">
                  <i
                    className="bi bi-pencil-square edit-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubCategory(subcategory);
                      setName(subcategory.name);
                      setShowEditModal(true);
                    }}
                  ></i>
                  <i
                    className="bi bi-trash delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubCategory(subcategory);
                      setShowDeleteModal(true);
                    }}
                  ></i>
                </div>
                <h3>{subcategory.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No subcategories available.</p>
        )
      )}

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add new sub-category</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sub-category name"
            />
            <button className="btn btn-primary" onClick={handleAddSubCategory}>Add</button>
            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit {selectedSubCategory.name} subcategory</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Update sub-category name"
            />
            <button className="btn btn-primary" onClick={handleEditSubCategory}>Update</button>
            <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Do you want to delete {selectedSubCategory.name}?</h3>
            <button className="btn btn-danger" onClick={handleDeleteSubCategory}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubCategory;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import '../CSS/Dashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const [categoryImages, setCategoryImages] = useState([]);
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState('');

    const fetchUserId = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        return user ? user.uid : null;
    };

    useEffect(() => {
        axios.get('http://retoolapi.dev/sE2pEm/images')
            .then(response => {
                setCategoryImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching category images:', error);
            });
    }, []);

    useEffect(() => {
        const userId = fetchUserId();
        if (userId) {
            axios.get(`http://localhost:20754/getcategories/${userId}`)
                .then((response) => {
                    const transformedCategories = response.data.map(item => {
                        const category = {};
                        item.forEach(pair => {
                            category[pair.name] = pair.value;
                        });
                        return category;
                    });
                    setCategories(transformedCategories);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error('Error fetching categories');
                    console.error('Error fetching categories:', error);
                    setLoading(false);
                });
        } else {
            toast.error('User not logged in');
            console.error('User not logged in.');
            setLoading(false);
        }
    }, [reload]);



const handleCategoryClick = (category) => {
    navigate(`/subcategory`, { state: { category } });
};

const handleAddCategory = () => {
    const userId = fetchUserId();
    axios.post(`http://localhost:20754/addcategory/${name}/${userId}`)
        .then((response) => {
            const newCategory = {
                _id: response.data._id,
                name: name
            };
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            setShowAddModal(false);
            setName('');
            setReload(prev => !prev);
            toast.success('Category Added Sucessfully!')
        })
        .catch(error => {
            toast.error('Error adding category')
            console.error('Error adding category:', error);
        });
};

const handleEditCategory = () => {
    axios.put(`http://localhost:20754/updatecategory/${selectedCategory._id}/${name}`)
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
            toast.success('Category Edited Sucessfully!')
        })
        .catch(error => {
            toast.error('Error updating category')
            console.error('Error updating category:', error);
        });
};

const handleDeleteCategory = () => {
    axios.delete(`http://localhost:20754/deletecategory/${selectedCategory._id}`)
        .then((response) => {
            setCategories(prevCategories =>
                prevCategories.filter(sub => sub._id !== selectedCategory._id)
            );
            setShowDeleteModal(false);
            setSelectedCategory(null);
            setReload(prev => !prev);
            toast.success('Category Deleted Sucessfully!')
        })
        .catch(error => {
            toast.error('Error deleting category')
            console.error('Error deleting category:', error);
        });
};

const getCategoryImage = (categoryName) => {
    const matchedImage = categoryImages.find(image => image.Categories === categoryName);
    if (matchedImage) {
        return matchedImage.URL;
    } else {
        const defaultImage = categoryImages.find(image => image.Categories === "Default");
        return defaultImage ? defaultImage.URL : '';
    }
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
                                <div className="category-icon d-flex">
                                    <img
                                        src={getCategoryImage(category.name)}
                                        alt={category.name}
                                    />
                                    <h3>{category.name}</h3>
                                </div>
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
        <ToastContainer position="top-right" autoClose={1000} />
    </div>
);
}
export default Dashboard;

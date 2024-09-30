import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CategoryCard from './CategoryCard';
import '../CSS/Dashboard.css';
import Header from './Header';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([{ name: ""}]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/${category.toLowerCase()}`); // Navigate to /category page
  };

  // Load categories from sessionStorage on mount
  useEffect(() => {
    const savedCategories = sessionStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleDialogSubmit = () => {
    const newCategories = [...categories, { name: categoryInput }];
    setCategories(newCategories);
    sessionStorage.setItem('categories', JSON.stringify(newCategories)); // Save to sessionStorage
    setConfirmationMessage(`New Category "${categoryInput}" has been created`);
    setConfirmOpen(true);
    setOpen(false);
    setCategoryInput("");
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
    sessionStorage.setItem('categories', JSON.stringify(newCategories)); // Update sessionStorage
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <Header title="Dashboard"/>
        <div className="contentButton">
          <div className="button-container">
            <Button onClick={handleClickOpen} variant="contained" startIcon={<AddIcon />} className='create-btn'>
              Create New Category
            </Button>
          </div>
          <Grid container spacing={1}>
            {categories.filter(category => category.name.length > 1).map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CategoryCard
                  category={category.name}
                  onDelete={() => handleDelete(index)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>New Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter category name.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              value={categoryInput}
              onChange={handleCategoryInputChange}
              required
            />
            {/* <TextField
              margin="dense"
              label="Description for the Category"
              type="text"
              fullWidth
              value={descriptionInput}
              onChange={handleDescriptionInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'black', 
                    borderWidth: '2px', 
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" className='create-btn'>Cancel</Button>
            <Button onClick={categoryInput.length > 0 ? handleDialogSubmit : () => {}} variant="contained" className='create-btn'>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {confirmationMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className='create-btn' onClick={handleConfirmClose} variant="contained">OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;

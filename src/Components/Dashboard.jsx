import React, { useState, useEffect } from 'react';
import { Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryCard from './CategoryCard';
import '../CSS/Dashboard.css';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [categories, setCategories] = useState([{ name: "", description: "" }]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

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

  const handleDescriptionInputChange = (event) => {
    setDescriptionInput(event.target.value);
  };

  const handleDialogSubmit = () => {
    const newCategories = [...categories, { name: categoryInput, description: descriptionInput }];
    setCategories(newCategories);
    sessionStorage.setItem('categories', JSON.stringify(newCategories)); // Save to sessionStorage
    setConfirmationMessage(`New Category "${categoryInput}" has been created`);
    setConfirmOpen(true);
    setOpen(false);
    setCategoryInput("");
    setDescriptionInput("");
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleDelete = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
    sessionStorage.setItem('categories', JSON.stringify(newCategories)); // Update sessionStorage
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="header">
          <h1>Dashboard Page</h1>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} color="inherit" className="outlined-icon-button">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
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
                  description={category.description}
                  onDelete={() => handleDelete(index)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>New Category</DialogTitle>
          <DialogContent>
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
            <DialogContentText>
              Please enter category name.
            </DialogContentText>
            <TextField
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
            />
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

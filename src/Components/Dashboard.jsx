// src/components/Dashboard.js
import React, { useState } from 'react';
import { Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryCard from './CategoryCard';
import '../CSS/Dashboard.css';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDialogSubmit = () => {
    setCategories([...categories, input]);
    setConfirmationMessage(`New Category ${input} has been created`);
    setConfirmOpen(true);
    setOpen(false);
    setInput("");
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
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
            <Button onClick={handleClickOpen} variant="contained" startIcon={<AddIcon />}>
              Create New Category
            </Button>
          </div>
          <Grid container spacing={1}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CategoryCard
                  category={category}
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
              value={input}
              onChange={handleInputChange}
              required
            />
            <DialogContentText>
              Please enter category name.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">Cancel</Button>
            <Button onClick={input.length > 0 ? handleDialogSubmit : () => {}} variant="contained">Add</Button>
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
            <Button onClick={handleConfirmClose} variant="contained">OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;

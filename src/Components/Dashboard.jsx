// src/components/Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Dashboard.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
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
    setConfirmationMessage(`New Category ${input} has been created`);
    setConfirmOpen(true);
    setOpen(false);
    setInput("");
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
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
        <div className="content">
          <div className="button-container">
            <Button onClick={handleClickOpen} variant="contained" startIcon={<AddIcon />}>
              Create New Category
            </Button>
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
              <Button onClick={input.length > 0 ? handleDialogSubmit : () => {}} variant="contained">Submit</Button>
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
    </div>
  );
};

export default Dashboard;

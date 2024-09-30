import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, Box, DialogContent, DialogContentText, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SubCategoryCard from './SubCategoryCard';
import SCTextFieldsSet from './SCTextFieldsSet';
import '../CSS/SubCategoryDashboard.css';
import Header from './Header';
function SubCategoryDashboard() {
  // Capture the category from the URL
  const { category } = useParams();
  const [open, setOpen] = useState(false);
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategories, setSubCategories] = useState([{ name: "", fields:[] }]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (cate) => {
    navigate(`/${cate}`); // Navigate to /category page
  };

  // Load categories from sessionStorage on mount
  useEffect(() => {
    const savedSubCategories = sessionStorage.getItem("subCategory");
    console.log(category);
    if (savedSubCategories) {
      const parsedSubCategories = JSON.parse(savedSubCategories);
      setSubCategories(parsedSubCategories);
      
      // Load the textFieldValues of the last subcategory or adjust as needed
      if (parsedSubCategories.length > 0) {
        setTextFieldValues(parsedSubCategories[parsedSubCategories.length - 1].fields || []);
      }
    }
  }, []);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubCategoryInputChange = (event) => {
    setSubCategoryInput(event.target.value);
  };

  const handleDialogSubmit = () => {
    const newSubCategories = [
      ...subCategories, 
      { name: subCategoryInput, fields: textFieldValues }
    ]; // Include the dynamic fields
    setSubCategories(newSubCategories);
    sessionStorage.setItem("subCategory", JSON.stringify(newSubCategories)); // Save to sessionStorage
    setConfirmationMessage(`New Sub-Category "${subCategoryInput}" has been created`);
    setConfirmOpen(true);
    setOpen(false);
    setSubCategoryInput("");
    setTextFieldsSets([]); // Reset text fields after submission
    setTextFieldValues([]); // Reset field values
  };
  

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = (index) => {
    const newSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(newSubCategories);
    sessionStorage.setItem("subCategory", JSON.stringify(newSubCategories)); // Update sessionStorage
  };
  

  const [textFieldsSets, setTextFieldsSets] = useState([]); // Manage text field sets
  const [textFieldValues, setTextFieldValues] = useState([]); // Store values of all text fields

  // Handle click to add new text field set
  const handleAddTextFieldsSet = () => {
    setTextFieldsSets([...textFieldsSets, {}]); // Add new set
    setTextFieldValues([...textFieldValues, { field1: '', field2: '' }]); // Initialize value
  };

  // Handle delete text field set
  const handleDeleteTextFieldsSet = (index) => {
    // Remove the set at the specified index
    const updatedSets = [...textFieldsSets];
    const updatedValues = [...textFieldValues];
    updatedSets.splice(index, 1); // Remove set
    updatedValues.splice(index, 1); // Remove corresponding values
    setTextFieldsSets(updatedSets);
    setTextFieldValues(updatedValues);
  };

  // Handle input changes in text fields
  const handleTextFieldChange = (index, field, value) => {
    const updatedValues = [...textFieldValues];
    updatedValues[index][field] = value;
    setTextFieldValues(updatedValues); // Update values
  };



  return (
    <div className="dashboard">
      <div className="main-content">
        <Header title={category.toUpperCase()}/>
        <div className="contentButton">
          <div className="button-container-sc">
            <button className="backButton" onClick={() => navigate(-1)}>
              &larr; Back
            </button>
            <Button onClick={handleClickOpen} variant="contained" startIcon={<AddIcon />} className='create-btn'>
              Create New {category}
            </Button>
          </div>
          <Grid container spacing={1}>
            {subCategories.filter(cate => cate.name.length > 1).map((cate, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SubCategoryCard
                  category={category}
                  subCategory={cate.name}
                  index = {index}
                  onDelete={() => handleDelete(index)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>New {category}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter {category} name.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={subCategoryInput}
          onChange={handleSubCategoryInputChange}
          required
        />

        {/* Render the dynamically added text field sets */}
        {textFieldsSets.map((_, index) => (
          <SCTextFieldsSet
            key={index}
            index={index}
            values={textFieldValues[index]}
            handleChange={handleTextFieldChange}
            handleDelete={handleDeleteTextFieldsSet} // Pass the delete handler
          />
        ))}

        {/* Button to add new set of horizontally aligned text fields */}
        <Box mt={2}>
          <Button variant="contained" onClick={handleAddTextFieldsSet} className='create-btn'>
            Add More Fields
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" className="create-btn">
          Cancel
        </Button>
        <Button
          onClick={subCategoryInput.length > 0 ? handleDialogSubmit : () => {}}
          variant="contained"
          className="create-btn"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
      </div>
    </div>
  );
}

export default SubCategoryDashboard;

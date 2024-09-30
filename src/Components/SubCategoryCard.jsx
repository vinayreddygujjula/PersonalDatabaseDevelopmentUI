import React, { useState } from 'react';
import { Card, CardActions, CardContent, Typography, Button, CardHeader, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../CSS/SubCategoryCard.css';

function SubCategoryCard({ category, subCategory, index, onDelete }){
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    setAnchorEl(null);
  };

  const handleNavigate = (subCategory) => {
    navigate('/category/' + category.toLowerCase()+'/'+index); // Navigate to /category page
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" className="cardContent">
      <CardHeader
        avatar={<Avatar>{subCategory[0]}</Avatar>}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDelete}>
                <DeleteIcon fontSize="small" style={{ marginRight: '10px' }} />
                Delete
              </MenuItem>
            </Menu>
          </>
        }
        title={subCategory}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {subCategory}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          variant="contained"
          onClick={() => handleNavigate(subCategory)} 
          sx={{ width: '100%', mt: 'auto' }} 
          className='cate-nav-btn'
        >
          View Details <ArrowForwardIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubCategoryCard
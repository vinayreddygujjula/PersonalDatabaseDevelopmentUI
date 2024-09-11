import React, { useState } from 'react';
import { Card, CardActions, CardContent, Typography, Button, CardHeader, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../CSS/CategoryCard.css';

const CategoryCard = ({ category, onDelete }) => {
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

  const handleNavigate = (cate) => {
    navigate('/' + cate); // Navigate to /category page
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" className="cardContent">
      <CardHeader
        avatar={<Avatar>{category[0]}</Avatar>}
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
        title={category}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {category}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          variant="contained"
          onClick={() => handleNavigate(category)} 
          sx={{ width: '100%', mt: 'auto' }} 
          className='cate-nav-btn'
        >
          Go to {category} <ArrowForwardIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;

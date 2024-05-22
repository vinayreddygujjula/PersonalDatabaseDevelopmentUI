// src/components/CategoryCard.js
import React from 'react';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../CSS/CategoryCard.css';

const CategoryCard = ({ category, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 1 }} variant="outlined" className='cardContent'>
      <CardContent>
        <Typography variant="h5" component="div">
          {category}
        </Typography>
      </CardContent>
      <CardActions className='cardActions'>
        <Button size="small" variant="contained" startIcon={<DeleteIcon />} onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;

import React from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SCTextFieldsSet({ index, values, handleChange, handleDelete }) {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <TextField
        label="Key"
        value={values.field1}
        onChange={(e) => handleChange(index, 'field1', e.target.value)}
        fullWidth
      />
      <TextField
        label="Value "
        value={values.field2}
        onChange={(e) => handleChange(index, 'field2', e.target.value)}
        fullWidth
      />
      {/* Delete button */}
      <IconButton color="secondary" onClick={() => handleDelete(index)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default SCTextFieldsSet;

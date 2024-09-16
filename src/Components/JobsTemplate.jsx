import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

function JobTemplate() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobPostingLink: '',
    applicationDetails: '',
    applicationStatus: 'Not Started',
    dateApplied: '',
    documents: {
      resume: null,
      coverLetter: null,
      portfolio: null,
      references: null,
      certificates: [],
      others: [],
    },
    hiringContact: '',
    followUpDate: '',
    interviewDetails: '',
    notes: '',
  });

  const applicationStatus = [
    'Not Started',
    'In Progress',
    'Submitted',
    'Interview Scheduled',
    'Rejected',
    'Approved',
    'On hold',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file && !['application/pdf', 'application/msword', 'text/html'].includes(file.type)) {
      alert('Invalid file type. Only PDF, DOC, and HTML files are allowed.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      documents: {
        ...prevData.documents,
        [name]: file,
      },
    }));
  };

  const handleMultipleFileChange = (e, name) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      ['application/pdf', 'application/msword', 'text/html'].includes(file.type)
    );
    if (validFiles.length !== files.length) {
      alert('Invalid file type. Only PDF, DOC, and HTML files are allowed.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      documents: {
        ...prevData.documents,
        [name]: [...prevData.documents[name], ...validFiles],
      },
    }));
  };

  const handleFileDelete = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      documents: {
        ...prevData.documents,
        [name]: null,
      },
    }));
  };

  const handleMultipleFileDelete = (index, name) => {
    const updatedFiles = formData.documents[name].filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      documents: {
        ...prevData.documents,
        [name]: updatedFiles,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: '100%', margin: '0 auto', overflowX: 'auto', transform: 'scale(0.5)' }}>
      <Typography variant="h4" gutterBottom sx={{alignSelf:'center'}}>
        Job Application Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Job Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>

          {/* Company Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>

          {/* Job Posting Link */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Posting Link"
              name="jobPostingLink"
              value={formData.jobPostingLink}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>

          {/* Application Status */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Application Status</InputLabel>
              <Select
                name="applicationStatus"
                value={formData.applicationStatus}
                onChange={handleInputChange}
                label="Application Status"
              >
                {applicationStatus.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Applied */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date Applied"
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          {/* Follow-up Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Follow-up Date"
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          {/* Application Details */}
          <Grid item xs={12}>
            <TextField
              label="Application Details"
              name="applicationDetails"
              value={formData.applicationDetails}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          {/* Documents */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Documents</Typography>
            <Grid container spacing={2}>
              {/* Resume */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Resume:</label>
                  {formData.documents.resume ? (
                    <ListItem>
                      <ListItemText primary={formData.documents.resume.name} />
                      <IconButton onClick={() => handleFileDelete('resume')}>
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ) : (
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      required
                    />
                  )}
                </Box>
              </Grid>

              {/* Cover Letter */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Cover Letter:</label>
                  {formData.documents.coverLetter ? (
                    <ListItem>
                      <ListItemText primary={formData.documents.coverLetter.name} />
                      <IconButton onClick={() => handleFileDelete('coverLetter')}>
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ) : (
                    <input
                      type="file"
                      name="coverLetter"
                      onChange={handleFileChange}
                    />
                  )}
                </Box>
              </Grid>

              {/* Certificates (Multiple Files) */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Certificates:</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleMultipleFileChange(e, 'certificates')}
                  />
                  <List>
                    {formData.documents.certificates.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={file.name} />
                        <IconButton
                          onClick={() => handleMultipleFileDelete(index, 'certificates')}
                        >
                          <Delete />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>

              {/* Other Documents */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Other Documents:</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleMultipleFileChange(e, 'others')}
                  />
                  <List>
                    {formData.documents.others.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={file.name} />
                        <IconButton
                          onClick={() => handleMultipleFileDelete(index, 'others')}
                        >
                          <Delete />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Interview Details */}
          <Grid item xs={12}>
            <TextField
              label="Interview Details"
              name="interviewDetails"
              value={formData.interviewDetails}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default JobTemplate;

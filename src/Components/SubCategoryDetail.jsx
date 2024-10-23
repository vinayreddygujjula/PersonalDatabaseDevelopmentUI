import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import '../CSS/SubCategoryDetail.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubCategoryDetails() {
  const location = useLocation();
  const { subCategory } = location.state || {};
  const [subcategoryDetails, setSubcategoryDetails] = useState({});
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch subcategory details when the component mounts
  useEffect(() => {
    if (subCategory && subCategory._id) {
      const fetchSubCategoryDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/getsubcategory/${subCategory._id}`);
          const dataDictionary = response.data.reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
          }, {});
          setSubcategoryDetails(dataDictionary);
        } catch (error) {
          console.error('Error fetching sub-category details:', error);
        }
      };
      fetchSubCategoryDetails();
    }
  }, [subCategory]);

  const handleAddField = async () => {
    const fieldExist = Object.keys(subcategoryDetails).some(x => x.toLowerCase() === fieldName.toLowerCase());
    if(fieldExist){
      toast.error('field already exists!');
      // Clear the input fields
      setFieldName('');
      setFieldValue('');
      return;
    }
    if (fieldName && fieldValue && !fieldExist) {
      if(subcategoryDetails)
      try {
        // Prepare the request data
        const requestData = {
          fields: [
            {
              Name: fieldName,
              Value: fieldValue,
            },
          ],
        };

        // Send the request to update the subcategory
        await axios.put(`http://localhost:5000/updatesubcategory/${subcategoryDetails._id}`, requestData);

        // Update the state with the new field locally after a successful update
        setSubcategoryDetails((prevDetails) => ({
          ...prevDetails,
          [fieldName]: fieldValue,
        }));

        // Clear the input fields
        setFieldName('');
        setFieldValue('');
      } catch (error) {
        console.error('Error updating sub-category:', error);
      }
    }
  };

  const handleEditSubCategoryDetails = async () => {
    
    if (fieldName && fieldValue) {
      if(subcategoryDetails)
      try {
        // Prepare the request data
        const requestData = {
          fields: [
            {
              Name: fieldName,
              Value: fieldValue,
            },
          ],
        };

        // Send the request to update the subcategory
        await axios.put(`http://localhost:5000/updatesubcategory/${subcategoryDetails._id}`, requestData);

        // Update the state with the new field locally after a successful update
        setSubcategoryDetails((prevDetails) => ({
          ...prevDetails,
          [fieldName]: fieldValue,
        }));

        // Clear the input fields
        setFieldName('');
        setFieldValue('');

        toast.success('Field updated successfully!')
      } catch (error) {
        console.error('Error updating sub-category field:', error);
      }
    }
    setShowEditModal(false)
  };

  const handleDeleteSubCategoryDetails = async () => {
    console.log("deleting...");
    try {
      const requestData = {
        fields: [
          {
            Name: fieldName,
          },
        ]
      };

        // Send the DELETE request with a data payload
        await axios({
          method: 'delete',
          url: `http://localhost:5000/subcategory/deletefield/${subcategoryDetails._id}`,
          data: requestData,  // Send the requestData inside the body
          headers: {
              'Content-Type': 'application/json',
          }
      });

        setSubcategoryDetails(prevDetails =>
          Object.fromEntries(Object.entries(prevDetails).filter(([key]) => key !== fieldName))
      );

        // Clear the input fields
        setFieldName('');
        setFieldValue('');
        toast.success('Field deleted successfully!');
    } catch (error) {
        console.error('Error deleting sub-category field:', error);
    }
    setShowDeleteModal(false);
};

const handleUploadFiles = async () => {
  if (!selectedFile) {
    toast.error('Please select a file to upload.');
    return;
  }
  if(!fieldName){
    toast.error("Please enter the field name.");
    return;
  }
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('fieldName', fieldName);

  const requestData = {
    fields: [
      {
        file : selectedFile,
        Name : fieldName
      },
    ]
  }
  try {
      const response = await axios.post(`http://localhost:5000/uploadFile/${subcategoryDetails._id}`, requestData);

      // Update state with the new file URL (assuming it's an image)
      const fileUrl = response.data.fileUrl;
      setSubcategoryDetails((prevDetails) => ({
          ...prevDetails,
          [fieldName]: fileUrl,
      }));

      toast.success('File uploaded and subcategory updated!');
  } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
  }
  setFieldName('')
  setFieldValue('')
  setSelectedFile(null)
};


  // Filter out `_id` and `category_id` or any other fields you don't want to display
  const filteredDetails = Object.entries(subcategoryDetails).filter(
    ([key]) => !['_id', 'category_id'].includes(key)
  );

  return (
    <div className="subcategory-details">
      <Header title={subcategoryDetails.name || 'Subcategory Details'} />

      <table className="subcategory-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map(([key, value]) => (
            <tr key={key}>
              <td>
                {key}
              </td>
              <td>
                {typeof value === 'object' && value !== null
                  ? JSON.stringify(value) // If value is an object, display its JSON string
                  : value}
              </td>
              <td>
                  { typeof value !== 'object' &&
                    <i
                    className="bi bi-pencil-square edit-icon scd"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEditModal(true);
                      setFieldName(key)
                      setFieldValue(value)
                    }}
                  ></i>}
                  <i
                    className="bi bi-trash delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteModal(true);
                      setFieldName(key)
                    }}
                  ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-field-form">
        <input
          type="text"
          placeholder="Field name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Field value"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          required
        />
        <button className="btn btn-primary" onClick={handleAddField}>
          Add Field
        </button>
      </div>

      <div className="add-field-form">
        <input
          type="text"
          placeholder="Field name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e)=>setSelectedFile(e.target.files[0])}
          required
        />
        <button className="btn btn-primary" onClick={handleUploadFiles}>
          Upload file
        </button>
      </div>

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit subcategory</h3>
            <label>Field name:</label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => {
                setFieldName(e.target.value)
              }}
            />
            <label>Field value:</label>
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => {
                setFieldValue(e.target.value)
              }}
            />
            <button className="btn btn-primary" onClick={handleEditSubCategoryDetails}>Update</button>
            <button className="btn btn-secondary" onClick={() =>{
              setFieldName('')
              setFieldName('')
              setShowEditModal(false)
            } }>Cancel</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Do you want to delete {fieldName} ?</h3>
            <button className="btn btn-danger" onClick={handleDeleteSubCategoryDetails}>Delete</button>
            <button className="btn btn-secondary" onClick={() =>{
              setFieldName('')
              setShowDeleteModal(false)
            } }>Cancel</button>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default SubCategoryDetails;

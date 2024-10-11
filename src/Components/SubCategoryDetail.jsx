import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../CSS/SubCategoryDetail.css';
import axios from 'axios';

function SubCategoryDetails() {
  const location = useLocation();
  const { subCategory } = location.state || {};
  const [subcategoryDetails, setSubcategoryDetails] = useState({});
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const navigate = useNavigate();

  // Fetch subcategory details when the component mounts
  useEffect(() => {
    if (subCategory && subCategory._id) {
      const fetchSubCategoryDetails = async () => {
        try {
          const response = await axios.get(`https://localhost:44392/getsubcategory/${subCategory._id}`);
          const dataDictionary = response.data.reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
          }, {});
          setSubcategoryDetails(dataDictionary);
        } catch (error) {
          console.error('Error fetching sub-category details:', error);
        }
      };
      console.log("subcategoryDetails: ",subcategoryDetails);
      fetchSubCategoryDetails();
    }
  }, [subCategory]);

  const handleAddField = async () => {
    if (fieldName && fieldValue) {
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
        await axios.put(`https://localhost:44392/updatesubcategory/${subcategoryDetails._id}`, requestData);

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
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {typeof value === 'object' && value !== null
                  ? JSON.stringify(value) // If value is an object, display its JSON string
                  : value}
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
    </div>
  );
}

export default SubCategoryDetails;

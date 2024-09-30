import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/SubCategoryDetail.css';

const SubCategoryDetail = () => {
  const { index } = useParams(); // Get the index from the URL
  const [subCategory, setSubCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve subCategories from sessionStorage
    const savedSubCategories = sessionStorage.getItem('subCategories');
    if (savedSubCategories) {
      const subCategories = JSON.parse(savedSubCategories);
      setSubCategory(subCategories[index]); // Set the selected subcategory
    }
  }, [index]);

  if (!subCategory) {
    return <p>Loading...</p>;
  }

  return (
    <div className="subCategoryDetailContainer">
      {/* Back Button */}
      <button className="backButton" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      {/* Subcategory Title */}
      <h1 className="subCategoryTitle">{subCategory.name}</h1>
      <p className="subCategoryDescription">{subCategory.description}</p>

      {/* Render dynamic fields in a table */}
      {subCategory.fields && subCategory.fields.length > 0 ? (
        <table className="fieldsTable">
          <thead>
            <tr>
              <th>Field 1</th>
              <th>Field 2</th>
            </tr>
          </thead>
          <tbody>
            {subCategory.fields.map((fieldSet, fieldIndex) => (
              <tr key={fieldIndex}>
                <td>{fieldSet.field1}</td>
                <td>{fieldSet.field2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noFieldsMessage">No additional fields available.</p>
      )}
    </div>
  );
};

export default SubCategoryDetail;

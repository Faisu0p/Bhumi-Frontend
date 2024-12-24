import React, { useState, useEffect } from 'react';
import { getBuilders, verifyBuilder } from './apis/builderApi'; // Importing the updated API functions
import './ManageBuilderPage.css';

const ManageBuilderPage = () => {
  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [builders, setBuilders] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState('');

  // Fetch builders' names and IDs from backend on component mount
  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await getBuilders(); // Using getBuilders function from builderApi
        if (response && Array.isArray(response.data)) { // Ensure data is in the correct format
          setBuilders(response.data); // Set builders if data is an array
        } else {
          console.error('Expected an array of builders but got:', response);
        }
      } catch (error) {
        console.error('Error fetching builders:', error);
      }
    };

    fetchBuilders();
  }, []);

  const handleBuilderChange = (e) => {
    setSelectedBuilder(e.target.value);
    setVerificationMessage('');
  };

  const handleVerify = async () => {
    if (!selectedBuilder) {
      setVerificationMessage('Please select a builder');
      return;
    }
  
    try {
      const selectedBuilderObj = builders.find(builder => builder.Builder_id === parseInt(selectedBuilder));
  
      if (selectedBuilderObj) {
        const response = await verifyBuilder({
          builderId: selectedBuilderObj.Builder_id,  // Ensure this matches the field expected by the backend (builderId)
        });
  
        console.log("Response from verifyBuilder:", response);
  
        if (response && response.message) {
          setVerificationMessage(response.message);
        } else {
          setVerificationMessage('Unexpected response format from server');
        }
      }
    } catch (error) {
      setVerificationMessage('An error occurred while verifying the builder');
      console.error('Error verifying builder:', error);
    }
  };

  return (
    <div className="manage-builder-page">
      <div className="manage-builder-form-container">
        <h1 className="manage-builder-title">Manage Builders</h1>
        <div className="manage-builder-selection-container">
          {/* Label above the dropdown */}
          <label htmlFor="builderSelect" className="manage-builder-selection-label">
            Select a builder to verify
          </label>
          <select
            id="builderSelect"
            value={selectedBuilder}
            onChange={handleBuilderChange}
            className="manage-builder-selection-dropdown"
          >
            <option value="">Select a builder</option>
            {builders.map((builder) => (
              <option key={builder.Builder_id} value={builder.Builder_id}>
                {builder.FullName}
              </option>
            ))}
          </select>
          <button onClick={handleVerify} className="manage-builder-verify-button">
            Verify
          </button>
        </div>
        {verificationMessage && (
          <div className="manage-builder-verification-message">{verificationMessage}</div>
        )}
      </div>
    </div>
  );
  
  
};

export default ManageBuilderPage;

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
    <div className="manage-page">
      <h1>Manage Builders</h1>
      <div className="builder-selection">
        <select
          value={selectedBuilder}
          onChange={handleBuilderChange}
          className="builder-dropdown"
        >
          <option value="">Select a builder</option>
          {builders.map((builder) => (
            <option key={builder.Builder_id} value={builder.Builder_id}>
              {builder.FullName} (ID: {builder.Builder_id})
            </option>
          ))}
        </select>
        <button onClick={handleVerify} className="verify-button">
          Verify
        </button>
      </div>
      {verificationMessage && (
        <div className="verification-message">{verificationMessage}</div>
      )}
    </div>
  );
};

export default ManageBuilderPage;

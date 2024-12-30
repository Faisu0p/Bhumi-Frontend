import React, { useState, useEffect } from 'react';
import { getBuilders, verifyBuilder, getBuilderById } from './apis/builderApi'; // Import the updated API functions
import Select from 'react-select'; // Import react-select
import './ManageBuilderPage.css';

const ManageBuilderPage = () => {
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const [builders, setBuilders] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [builderDetails, setBuilderDetails] = useState(null); // State for builder details

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

  // Handle builder selection change
  const handleBuilderChange = async (selectedOption) => {
    setSelectedBuilder(selectedOption);
    setVerificationMessage('');
    
    if (selectedOption) {
      // Fetch the builder's details based on the selected ID
      const builderId = selectedOption.value;
      try {
        const data = await getBuilderById(builderId); // Get builder details by ID
        setBuilderDetails(data); // Set the fetched details to state
      } catch (error) {
        console.error('Error fetching builder details:', error);
        setBuilderDetails(null); // Reset builder details on error
      }
    } else {
      setBuilderDetails(null); // Reset builder details when selection is cleared
    }
  };

  // Handle verification of selected builder
  const handleVerify = async () => {
    if (!selectedBuilder) {
      setVerificationMessage('Please select a builder');
      return;
    }

    try {
      const selectedBuilderObj = builders.find(builder => builder.Builder_id === selectedBuilder.value);

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

  // Map builders to the format that react-select expects
  const builderOptions = builders.map((builder) => ({
    value: builder.Builder_id,
    label: builder.FullName,
  }));

  return (
    <div className="manage-builder-page">
      <div className="manage-builder-form-container">
        <h1 className="manage-builder-title">Manage Builders</h1>
        <div className="manage-builder-selection-container">
          {/* Label above the dropdown */}
          <label htmlFor="builderSelect" className="manage-builder-selection-label">
            Select a builder to verify or reject
          </label>
          
          {/* Replace regular select with react-select */}
          <Select
            id="builderSelect"
            value={selectedBuilder}
            onChange={handleBuilderChange}
            options={builderOptions}
            placeholder="Search for a builder..."
          />
          
          <button onClick={handleVerify} className="manage-builder-verify-button">
            Verify
          </button>
        </div>

        {verificationMessage && (
          <div className="manage-builder-verification-message">{verificationMessage}</div>
        )}

        {/* Display builder details if a builder is selected */}
        {builderDetails && (
          <div className="builder-details-container">
            <h3>Builder Details</h3>
            <p><strong>Builder Id:</strong> {builderDetails.Builder_id}</p>
            <p><strong>Full Name:</strong> {builderDetails.FullName}</p>
            <p><strong>Nick Name:</strong> {builderDetails.NickName}</p>
            <p><strong>State:</strong> {builderDetails.State}</p>
            <p><strong>City:</strong> {builderDetails.City}</p>
            <p><strong>Years of Experience:</strong> {builderDetails.Years_of_experience}</p>
            <p><strong>Short Description:</strong> {builderDetails.Short_Description}</p>
            <p><strong>Builder Logo (square):</strong> <img src={builderDetails.Builder_logo} alt="Builder Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} /></p>
            <p><strong>Builder Logo (Rectangle):</strong> <img src={builderDetails.Builder_logo_rectangle} alt="Builder Logo Rectangle" style={{ maxWidth: '200px', maxHeight: '100px' }} /></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBuilderPage;

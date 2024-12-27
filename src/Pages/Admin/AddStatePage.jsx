import React, { useState } from 'react';
import { addState } from './apis/locationApi';  // Adjust import if needed
import './AddStatePage.css';  // Import the CSS file

const AddStatePage = () => {
  const [stateName, setStateName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stateName) {
      setMessage('State name is required');
      return;
    }

    try {
      const response = await addState(stateName);
      setMessage(response.message || 'State added successfully');
      setStateName('');  // Clear the input field after success
    } catch (error) {
      setMessage(error.message || 'Failed to add state');
    }
  };

  return (
    <div className="state-page-container">
      <h1 className="state-page-title">Add State</h1>
      <form className="state-page-form" onSubmit={handleSubmit}>
        <div className="state-page-input-container">
          <label htmlFor="stateName" className="state-page-label">State Name</label>
          <input
            type="text"
            id="stateName"
            className="state-page-input"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            placeholder="Enter state name"
          />
        </div>
        <button type="submit" className="state-page-button">Add State</button>
      </form>
      {message && <p className="state-page-message">{message}</p>}
    </div>
  );
};

export default AddStatePage;

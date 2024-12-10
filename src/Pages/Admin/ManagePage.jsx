import React, { useState, useEffect } from 'react';
import './ManagePage.css';

function ManagePage() {
  const [builders, setBuilders] = useState([]); // State to store builder names
  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [builderStatus, setBuilderStatus] = useState('Unverified');
  const [message, setMessage] = useState('');

  // Fetch builder names from the backend
  useEffect(() => {
    async function fetchBuilders() {
      try {
        const response = await fetch('http://localhost:5000/api/builders'); // Replace with your backend URL
        const data = await response.json();
        if (data && data.data) {
          setBuilders(data.data); // Extract the array of builder names
        }
      } catch (error) {
        console.error('Error fetching builders:', error);
      }
    }

    fetchBuilders();
  }, []);

  // Handle builder selection
  const handleBuilderChange = (event) => {
    setSelectedBuilder(event.target.value);
    setBuilderStatus('Unverified'); // Reset the status when a new builder is selected
    setMessage(''); // Reset the message when a new builder is selected
  };

  // Handle builder verification
  const handleVerifyBuilder = async () => {
    if (!selectedBuilder) {
      alert('Please select a builder first!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/builders/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName: selectedBuilder }),
      });

      const data = await response.json();

      if (response.ok) {
        setBuilderStatus('Verified');
        setMessage('Builder verified successfully.');
      } else {
        setMessage(data.message || 'Verification failed.');
      }
    } catch (error) {
      console.error('Error verifying builder:', error);
      setMessage('Error verifying builder.');
    }
  };

  return (
    <div className="manage-page__container">
      <h2 className="manage-page__title">Builder Management</h2>

      <div className="manage-page__dropdown-container">
        <label htmlFor="builderDropdown" className="manage-page__dropdown-label">Select Builder:</label>
        <select
          id="builderDropdown"
          value={selectedBuilder}
          onChange={handleBuilderChange}
          className="manage-page__dropdown"
        >
          <option value="">--Select Builder--</option>
          {builders.map((builder, index) => (
            <option key={index} value={builder}>
              {builder}
            </option>
          ))}
        </select>
      </div>

      <div className="manage-page__status-container">
        <p className={`manage-page__status ${selectedBuilder ? '' : 'manage-page__status--placeholder'}`}>
          Builder Status: <strong>{builderStatus}</strong>
        </p>
      </div>

      <button
        onClick={handleVerifyBuilder}
        className="manage-page__button"
      >
        Verify Builder
      </button>

      {message && <p className="manage-page__message">{message}</p>}
    </div>
  );
}

export default ManagePage;

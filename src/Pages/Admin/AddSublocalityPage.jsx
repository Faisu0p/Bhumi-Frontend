import React, { useState, useEffect } from 'react';
import { getLocalities, addSubLocality } from './apis/locationApi'; // Importing the API functions
import './AddSubLocalityPage.css';

const AddSubLocalityPage = () => {
  const [localities, setLocalities] = useState([]); // State to hold the localities
  const [subLocalityName, setSubLocalityName] = useState(''); // State to hold the sublocality name
  const [selectedLocalityId, setSelectedLocalityId] = useState(''); // State to hold the selected locality ID
  const [error, setError] = useState(''); // State to handle error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to handle success messages

  // Fetch localities on component mount
  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const data = await getLocalities();
        setLocalities(data); // Populate the localities dropdown
      } catch (err) {
        setError('Failed to fetch localities');
      }
    };
    fetchLocalities();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subLocalityName || !selectedLocalityId) {
      setError('Please select a locality and enter a sublocality name');
      return;
    }
    try {
      await addSubLocality(subLocalityName, selectedLocalityId);
      setSuccessMessage('Sublocality added successfully!');
      setSubLocalityName(''); // Clear the input after submission
      setSelectedLocalityId(''); // Clear the selected locality
    } catch (err) {
      setError('Failed to add sublocality');
    }
  };

  return (
    <div className="add-sublocality-container">
      <h1 className="add-sublocality-title">Add SubLocality</h1>

      {error && <p className="add-sublocality-error">{error}</p>}
      {successMessage && <p className="add-sublocality-success">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="add-sublocality-form">
        <div className="add-sublocality-field">
          <label htmlFor="locality" className="add-sublocality-label">Select Locality:</label>
          <select
            id="locality"
            value={selectedLocalityId}
            onChange={(e) => setSelectedLocalityId(e.target.value)}
            className="add-sublocality-select"
          >
            <option value="">Select Locality</option>
            {localities.map((locality) => (
              <option key={locality.id} value={locality.id}>
                {locality.name}
              </option>
            ))}
          </select>
        </div>

        <div className="add-sublocality-field">
          <label htmlFor="subLocalityName" className="add-sublocality-label">Sublocality Name:</label>
          <input
            type="text"
            id="subLocalityName"
            value={subLocalityName}
            onChange={(e) => setSubLocalityName(e.target.value)}
            placeholder="Enter sublocality name"
            className="add-sublocality-input"
          />
        </div>

        <button type="submit" className="add-sublocality-button">Add Sublocality</button>
      </form>
    </div>
  );
};

export default AddSubLocalityPage;

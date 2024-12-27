import React, { useState, useEffect } from 'react';
import { getLocalities, addPincode } from './apis/locationApi'; // Importing the API functions
import './AddPincodePage.css';

const AddPincodePage = () => {
  const [localities, setLocalities] = useState([]); // State to hold the localities
  const [pincode, setPincode] = useState(''); // State to hold the pincode
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
    if (!pincode || !selectedLocalityId) {
      setError('Please select a locality and enter a pincode');
      return;
    }
    try {
      await addPincode(pincode, selectedLocalityId);
      setSuccessMessage('Pincode added successfully!');
      setPincode(''); // Clear the input after submission
      setSelectedLocalityId(''); // Clear the selected locality
    } catch (err) {
      setError('Failed to add pincode');
    }
  };

  return (
    <div className="add-pincode-container">
      <h1 className="add-pincode-title">Add Pincode</h1>

      {error && <p className="add-pincode-error">{error}</p>}
      {successMessage && <p className="add-pincode-success">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="add-pincode-form">
        <div className="add-pincode-field">
          <label className="add-pincode-label">Select Locality:</label>
          <select
            className="add-pincode-select"
            value={selectedLocalityId}
            onChange={(e) => setSelectedLocalityId(e.target.value)}
          >
            <option value="">Select Locality</option>
            {localities.map((locality) => (
              <option key={locality.id} value={locality.id}>
                {locality.name}
              </option>
            ))}
          </select>
        </div>

        <div className="add-pincode-field">
          <label className="add-pincode-label">Pincode:</label>
          <input
            className="add-pincode-input"
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
          />
        </div>

        <button className="add-pincode-button" type="submit">Add Pincode</button>
      </form>
    </div>
  );
};

export default AddPincodePage;

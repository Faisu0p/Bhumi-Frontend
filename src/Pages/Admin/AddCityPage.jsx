import React, { useState, useEffect } from 'react';
import { getStates, addCity } from './apis/locationApi';  // Import the necessary API functions
import './AddCityPage.css';

const AddCityPage = () => {
  const [states, setStates] = useState([]);  // To hold the list of states
  const [selectedStateId, setSelectedStateId] = useState('');  // To store the selected state ID
  const [cityName, setCityName] = useState('');  // To store the entered city name
  const [message, setMessage] = useState('');  // To store the success/error message

  // Fetch states when the component mounts
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const fetchedStates = await getStates();  // Fetch the states from API
        setStates(fetchedStates);  // Update the states state with the fetched list
      } catch (error) {
        setMessage('Failed to fetch states');
      }
    };

    fetchStates();
  }, []);

  // Handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!selectedStateId || !cityName) {
      setMessage('Both state and city name are required');
      return;
    }

    try {
      const response = await addCity(cityName, selectedStateId);  // Call the API to add the city
      setMessage(response.message || 'City added successfully');
      setCityName('');  // Clear the city input after successful submission
    } catch (error) {
      setMessage(error.message || 'Failed to add city');
    }
  };

  return (
    <div className="add-city-page-container">
      <h1 className="add-city-page-title">Add City</h1>

      {/* Dropdown for selecting state */}
      <div className="add-city-page-input-container">
        <label htmlFor="state" className="add-city-page-label">Select State</label>
        <select
          id="state"
          className="add-city-page-select"
          value={selectedStateId}
          onChange={(e) => setSelectedStateId(e.target.value)}
        >
          <option value="">--Select a State--</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* Input for entering city */}
      <div className="add-city-page-input-container">
        <label htmlFor="cityName" className="add-city-page-label">City Name</label>
        <input
          type="text"
          id="cityName"
          className="add-city-page-input"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
      </div>

      {/* Submit button to add the city */}
      <button className="add-city-page-button" onClick={handleSubmit}>
        Add City
      </button>

      {/* Display message */}
      {message && <p className="add-city-page-message">{message}</p>}
    </div>
  );
};

export default AddCityPage;

import React, { useState, useEffect } from 'react';
import { getCities, addLocality } from './apis/locationApi';  // Import the necessary API functions
import './AddLocalityPage.css';

const AddLocalityPage = () => {
  const [cities, setCities] = useState([]);      // State to store list of cities
  const [selectedCityId, setSelectedCityId] = useState('');  // State to store selected city id
  const [localityName, setLocalityName] = useState('');      // State to store locality name
  const [message, setMessage] = useState('');              // State to store success or error messages

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCities();  // Call the API to fetch cities
        setCities(citiesData);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
        setMessage('Failed to fetch cities');
      }
    };

    fetchCities();
  }, []);

  // Handle form submission to add locality
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCityId || !localityName) {
      setMessage('Please select a city and enter a locality name');
      return;
    }

    try {
      const response = await addLocality(localityName, selectedCityId);  // Call the API to add locality
      setMessage(response.message || 'Locality added successfully');
      setLocalityName(''); // Reset locality input
    } catch (error) {
      setMessage('Failed to add locality');
    }
  };

  return (
    <div className="add-location-page">
      <h1 className="page-title">Add Locality</h1>

      <form onSubmit={handleSubmit} className="location-form">
        <div className="form-group">
          <label htmlFor="city" className="form-label">Select City</label>
          <select
            id="city"
            className="form-control"
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
          >
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="locality" className="form-label">Locality Name</label>
          <input
            type="text"
            id="locality"
            className="form-control"
            value={localityName}
            onChange={(e) => setLocalityName(e.target.value)}
            placeholder="Enter locality name"
          />
        </div>

        <button type="submit" className="btn btn-red">Add Locality</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddLocalityPage;

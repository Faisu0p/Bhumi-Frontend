import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateAndCity = ({ onLocationChange }) => { // Receiving function as prop
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch states from the API
  useEffect(() => {
    axios.get('http://localhost:8021/api/project-locations/states')
      .then((response) => {
        setStates(response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch states:', err);
      });
  }, []);

  // Fetch cities based on the selected state
  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:8021/api/project-locations/cities/${selectedState}`)
        .then((response) => {
          setCities(response.data); // Set cities for the selected state
        })
        .catch((err) => {
          console.error('Failed to fetch cities:', err);
        });
    }
  }, [selectedState]);

  const handleStateChange = (e) => {
    const stateId = Number(e.target.value); // Ensure stateId is a number
    setSelectedState(stateId); // Update selected state
    setSelectedCity(''); // Reset city when state changes
  
    // Pass the state name to parent (not the id)
    const stateName = states.find(state => state.id === stateId)?.name || 'Unknown State';
    onLocationChange({ state: stateName, city: null });
  };
  
  const handleCityChange = (e) => {
    const cityId = Number(e.target.value); // Convert cityId to a number to avoid type mismatch
    setSelectedCity(cityId); // Update selected city
  
    // Find the city by id and get its name
    const cityName = cities.find(city => city.id === cityId)?.name || 'Unknown City';
  
    // Pass the city name to parent (not the id)
    onLocationChange({
      state: states.find(state => state.id === selectedState)?.name || 'Unknown State',
      city: cityName
    });
  };
  

  return (
    <div className="state-city-container">
      {/* State Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="state" className="label">State</label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className="dropdown"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="city" className="label">City</label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState} // Disable city dropdown if no state is selected
          className="dropdown"
        >
          <option value="">Select City</option>
          {cities.length === 0 ? (
            <option value="">No cities available</option>
          ) : (
            cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default StateAndCity;

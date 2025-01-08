import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StateCityDropdown.css';

const StateAndCity = ({ onLocationChange }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState({});
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);  // Track multiple cities

  // Fetch states from the API
  useEffect(() => {
    axios.get('http://localhost:8021/api/project-locations/states')
      .then((response) => {
        console.log('Fetched states:', response.data);  // Log states fetched from API
        setStates(response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch states:', err);
      });
  }, []);

  // Fetch cities based on selected states
  useEffect(() => {
    const fetchCitiesForStates = async () => {
      const citiesByState = {};

      for (const stateId of selectedStates) {
        try {
          const response = await axios.get(`http://localhost:8021/api/project-locations/cities/${stateId}`);
          console.log(`Fetched cities for state ${stateId}:`, response.data);  // Log cities for each state
          citiesByState[stateId] = response.data;
        } catch (err) {
          console.error(`Failed to fetch cities for state ${stateId}:`, err);
        }
      }
      setCities(citiesByState);
    };

    if (selectedStates.length > 0) {
      fetchCitiesForStates();
    } else {
      setCities({});
    }
  }, [selectedStates]);

  // Handle state selection
  const handleStateChange = (e) => {
    const stateId = Number(e.target.value);
    console.log('State selected:', stateId);  // Log selected state

    if (selectedStates.includes(stateId)) {
      setSelectedStates(selectedStates.filter((id) => id !== stateId));  // Remove state if already selected
    } else {
      setSelectedStates([...selectedStates, stateId]);  // Add state to selected
    }
    console.log('Selected states:', selectedStates);  // Log selected states after change
  };

  // Handle city selection for multiple cities
  const handleCityChange = (e) => {
    const selectedCityIds = Array.from(e.target.selectedOptions, option => Number(option.value));  // Get all selected city ids
    console.log('City selected:', selectedCityIds);  // Log selected city ids
  
    // Update selected cities with the new set of selected cities
    setSelectedCities(prevSelectedCities => {
      const updatedCities = new Set(prevSelectedCities);  // Ensure no duplicates
      selectedCityIds.forEach(cityId => updatedCities.add(cityId));  // Add new city ids
      return Array.from(updatedCities);  // Convert back to an array and return
    });
  
    // Now correctly group cities by state
    const formattedCitiesAndStates = [];

    // For each selected state, map cities for that state
    selectedStates.forEach((stateId) => {
      const stateName = states.find(state => state.id === stateId)?.name;
      if (stateName) {
        // Get cities for the current stateId
        const citiesForState = cities[stateId] || [];
        
        // Only map selected cities for that state
        selectedCityIds.forEach((cityId) => {
          const city = citiesForState.find(city => city.id === cityId);
          if (city) {
            formattedCitiesAndStates.push({ state: stateName, city: city.name });
          }
        });
      }
    });

    console.log('Formatted cities and states to pass to parent:', formattedCitiesAndStates);  // Log the formatted cities and states
  
    // Pass this array to the parent component
    onLocationChange(formattedCitiesAndStates);

    // Final log to check the data passed to parent
    console.log('Final formatted data passed to parent:', formattedCitiesAndStates);
  };
  
  return (
    <div className="builder-location-dropdown-container">
      {/* State Dropdown */}
      <div className="builder-location-dropdown-dropdown-container">
        <label htmlFor="state" className="builder-location-dropdown-label">Select States <span className="required-asterisk">*</span></label>
        <select
          id="state"
          multiple
          value={selectedStates}
          onChange={handleStateChange}
          className="builder-location-dropdown-dropdown"
          required
        >
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="builder-location-dropdown-dropdown-container">
        <label htmlFor="city" className="builder-location-dropdown-label">Select Cities <span className="required-asterisk">*</span></label>
        <select
          id="city"
          multiple
          value={selectedCities}
          onChange={handleCityChange}
          disabled={selectedStates.length === 0}  // Disable if no states selected
          className="builder-location-dropdown-dropdown"
          required
        >
          <option value="">Select City</option>
          {Object.values(cities).flat().map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StateAndCity;

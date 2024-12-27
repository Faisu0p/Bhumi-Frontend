import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationsDropdown = ({ onLocationChange }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [sublocalities, setSublocalities] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedSublocality, setSelectedSublocality] = useState('');
  const [selectedPincode, setSelectedPincode] = useState('');

  // Handle selection change and pass data to parent component with names
  const handleSelectionChange = () => {
    const stateName = states.find(state => state.id === selectedState)?.name || 'Unknown State';
    const cityName = cities.find(city => city.id === selectedCity)?.name || 'Unknown City';
    const localityName = localities.find(locality => locality.id === selectedLocality)?.name || 'Unknown Locality';
    const sublocalityName = sublocalities.find(sublocality => sublocality.id === selectedSublocality)?.name || 'Unknown Sublocality';

    console.log('Selected Locations:', {
      state: { id: selectedState, name: stateName },
      city: { id: selectedCity, name: cityName },
      locality: { id: selectedLocality, name: localityName },
      sublocality: { id: selectedSublocality, name: sublocalityName }
    });

    onLocationChange({
      state: { id: selectedState, name: stateName },
      city: { id: selectedCity, name: cityName },
      locality: { id: selectedLocality, name: localityName },
      sublocality: { id: selectedSublocality, name: sublocalityName }
    });
  };

  // Fetch all states
  useEffect(() => {
    axios.get('http://localhost:8021/api/project-locations/states')
      .then((response) => {
        console.log('States:', response.data); // Check the API response
        setStates(response.data);
      })
      .catch((err) => console.error('Failed to fetch states:', err));
  }, []);

  // Fetch cities based on the selected state
  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:8021/api/project-locations/cities/${selectedState}`)
        .then((response) => {
          console.log('Cities:', response.data); // Check the API response
          setCities(response.data);
        })
        .catch((err) => console.error('Failed to fetch cities:', err));
    }
  }, [selectedState]);

  // Fetch localities based on the selected city
  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost:8021/api/project-locations/localities/${selectedCity}`)
        .then((response) => {
          console.log('Localities:', response.data); // Check the API response
          setLocalities(response.data);
        })
        .catch((err) => console.error('Failed to fetch localities:', err));
    }
  }, [selectedCity]);

  // Fetch sublocalities based on the selected locality
  useEffect(() => {
    if (selectedLocality) {
      axios.get(`http://localhost:8021/api/project-locations/sublocalities/${selectedLocality}`)
        .then((response) => {
          console.log('Sublocalities:', response.data); // Check the API response
          setSublocalities(response.data);
        })
        .catch((err) => console.error('Failed to fetch sublocalities:', err));
    }
  }, [selectedLocality]);

  // Fetch pincodes based on the selected locality
  useEffect(() => {
    if (selectedLocality) {
      axios.get(`http://localhost:8021/api/project-locations/pincodes/${selectedLocality}`)
        .then((response) => setPincodes(response.data))
        .catch((err) => console.error('Failed to fetch pincodes:', err));
    }
  }, [selectedLocality]);

  // Trigger selection change when any field changes
  useEffect(() => {
    handleSelectionChange();
  }, [selectedState, selectedCity, selectedLocality, selectedSublocality]);

  return (
    <div>
      <h2>Select Location</h2>

      {/* State Dropdown */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      {/* Locality Dropdown */}
      <select
        value={selectedLocality}
        onChange={(e) => setSelectedLocality(e.target.value)}
        disabled={!selectedCity}
      >
        <option value="">Select Locality</option>
        {localities.map((locality) => (
          <option key={locality.id} value={locality.id}>
            {locality.name}
          </option>
        ))}
      </select>

      {/* Sublocality Dropdown */}
      <select
        value={selectedSublocality}
        onChange={(e) => setSelectedSublocality(e.target.value)}
        disabled={!selectedLocality}
      >
        <option value="">Select Sublocality</option>
        {sublocalities.map((sublocality) => (
          <option key={sublocality.id} value={sublocality.id}>
            {sublocality.name}
          </option>
        ))}
      </select>

      {/* Pincode Dropdown */}
      <select
        value={selectedPincode}
        onChange={(e) => setSelectedPincode(e.target.value)}
        disabled={!selectedSublocality}
      >
        <option value="">Select Pincode</option>
        {pincodes.map((pincode) => (
          <option key={pincode.id} value={pincode.id}>
            {pincode.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationsDropdown;

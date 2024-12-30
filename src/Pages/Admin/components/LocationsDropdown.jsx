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

  // Fetch data based on user selection
  useEffect(() => {
    axios.get('http://localhost:8021/api/project-locations/states')
      .then((response) => setStates(response.data))
      .catch((err) => console.error('Failed to fetch states:', err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:8021/api/project-locations/cities/${selectedState}`)
        .then((response) => setCities(response.data))
        .catch((err) => console.error('Failed to fetch cities:', err));
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost:8021/api/project-locations/localities/${selectedCity}`)
        .then((response) => setLocalities(response.data))
        .catch((err) => console.error('Failed to fetch localities:', err));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedLocality) {
      axios.get(`http://localhost:8021/api/project-locations/sublocalities/${selectedLocality}`)
        .then((response) => setSublocalities(response.data))
        .catch((err) => console.error('Failed to fetch sublocalities:', err));
    }
  }, [selectedLocality]);

  useEffect(() => {
    if (selectedLocality) {
      axios.get(`http://localhost:8021/api/project-locations/pincodes/${selectedLocality}`)
        .then((response) => setPincodes(response.data))
        .catch((err) => console.error('Failed to fetch pincodes:', err));
    }
  }, [selectedLocality]);

  const handleSelectionChange = () => {
    console.log('Current Selections:', {
      selectedState,
      selectedCity,
      selectedLocality,
      selectedSublocality,
      selectedPincode
    });

    const selectedStateNum = Number(selectedState);
    const selectedCityNum = Number(selectedCity);
    const selectedLocalityNum = Number(selectedLocality);
    const selectedSublocalityNum = Number(selectedSublocality);
    const selectedPincodeNum = Number(selectedPincode);

    const stateName = states.find(state => state.id === selectedStateNum)?.name || 'Unknown State';
    const cityName = cities.find(city => city.id === selectedCityNum)?.name || 'Unknown City';
    const localityName = localities.find(locality => locality.id === selectedLocalityNum)?.name || 'Unknown Locality';
    const sublocalityName = sublocalities.find(sublocality => sublocality.id === selectedSublocalityNum)?.name || 'Unknown Sublocality';
    const pincodeName = pincodes.find(pincode => pincode.id === selectedPincodeNum)?.pincode || 'Unknown Pincode';

    console.log('Final Selected Data:', {
      state: { id: selectedStateNum, name: stateName },
      city: { id: selectedCityNum, name: cityName },
      locality: { id: selectedLocalityNum, name: localityName },
      sublocality: { id: selectedSublocalityNum, name: sublocalityName },
      pincode: { id: selectedPincodeNum, pincode: pincodeName }
    });

    onLocationChange({
      state: { id: selectedStateNum, name: stateName },
      city: { id: selectedCityNum, name: cityName },
      locality: { id: selectedLocalityNum, name: localityName },
      sublocality: { id: selectedSublocalityNum, name: sublocalityName },
      pincode: { id: selectedPincodeNum, pincode: pincodeName }
    });
  };

  useEffect(() => {
    if (selectedState && selectedCity && selectedLocality && selectedSublocality && selectedPincode) {
      handleSelectionChange();
    }
  }, [selectedState, selectedCity, selectedLocality, selectedSublocality, selectedPincode]);

  return (
    <div className="project-dropdown-locations-container">

      {/* State Dropdown */}
      <div className="project-dropdown-locations-form-container">
        <label className="project-dropdown-locations-label">State <span className="required-asterisk">*</span></label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="project-dropdown-locations-select"
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
      <div className="project-dropdown-locations-form-container">
        <label className="project-dropdown-locations-label">City <span className="required-asterisk">*</span></label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          className="project-dropdown-locations-select"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Locality Dropdown */}
      <div className="project-dropdown-locations-form-container">
        <label className="project-dropdown-locations-label">Locality <span className="required-asterisk">*</span></label>
        <select
          value={selectedLocality}
          onChange={(e) => setSelectedLocality(e.target.value)}
          disabled={!selectedCity}
          className="project-dropdown-locations-select"
        >
          <option value="">Select Locality</option>
          {localities.map((locality) => (
            <option key={locality.id} value={locality.id}>
              {locality.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sublocality Dropdown */}
      <div className="project-dropdown-locations-form-container">
        <label className="project-dropdown-locations-label">Sublocality</label>
        <select
          value={selectedSublocality}
          onChange={(e) => setSelectedSublocality(e.target.value)}
          disabled={!selectedLocality}
          className="project-dropdown-locations-select"
        >
          <option value="">Select Sublocality</option>
          {sublocalities.map((sublocality) => (
            <option key={sublocality.id} value={sublocality.id}>
              {sublocality.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pincode Dropdown */}
      <div className="project-dropdown-locations-form-container">
        <label className="project-dropdown-locations-label">Pincode</label>
        <select
          value={selectedPincode}
          onChange={(e) => setSelectedPincode(e.target.value)}
          disabled={!selectedLocality}
          className="project-dropdown-locations-select"
        >
          <option value="">Select Pincode</option>
          {pincodes.map((pincode) => (
            <option key={pincode.id} value={pincode.id}>
              {pincode.pincode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationsDropdown;

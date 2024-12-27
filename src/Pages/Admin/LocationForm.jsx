import React, { useState, useEffect } from 'react';
import { addState, addCity, addLocality, addSublocality, addPincode } from './apis/locationApi';
import { getStates, getCitiesByState, getLocalitiesByCity, getSublocalitiesByLocality, getPincodesByLocality } from './apis/locationApi';
import StateSelect from './components/StateSelect';
import CitySelect from './components/CitySelect';
import LocalitySelect from './components/LocalitySelect';
import SublocalitySelect from './components/SublocalitySelect';
import PincodeSelect from './components/PincodeSelect';

const LocationForm = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [sublocalities, setSublocalities] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedLocalityId, setSelectedLocalityId] = useState(null);

  // Fetching States
  const fetchStates = async () => {
    try {
      const response = await getStates();  // API call to fetch states
      setStates(response);  // Assuming API response is an array
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  // Fetching Cities by State
  const fetchCities = async (stateId) => {
    try {
      const response = await getCitiesByState(stateId);  // API call to fetch cities
      setCities(response);  // Assuming API response is an array
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Fetching Localities by City
  const fetchLocalities = async (cityId) => {
    try {
      const response = await getLocalitiesByCity(cityId);  // API call to fetch localities
      setLocalities(response);  // Assuming API response is an array
    } catch (error) {
      console.error('Error fetching localities:', error);
    }
  };

  // Fetching Sublocalities by Locality
  const fetchSublocalities = async (localityId) => {
    try {
      const response = await getSublocalitiesByLocality(localityId);  // API call to fetch sublocalities
      setSublocalities(response);  // Assuming API response is an array
    } catch (error) {
      console.error('Error fetching sublocalities:', error);
    }
  };

  // Fetching Pincodes by Locality
  const fetchPincodes = async (localityId) => {
    try {
      const response = await getPincodesByLocality(localityId);  // API call to fetch pincodes
      setPincodes(response);  // Assuming API response is an array
    } catch (error) {
      console.error('Error fetching pincodes:', error);
    }
  };

  // Fetch initial states when component mounts
  useEffect(() => {
    fetchStates();
  }, []);

  // Handle state changes
  const handleLocationChange = (id, type) => {
    switch (type) {
      case 'state':
        setSelectedStateId(id);
        fetchCities(id);
        break;
      case 'city':
        setSelectedCityId(id);
        fetchLocalities(id);
        break;
      case 'locality':
        setSelectedLocalityId(id);
        fetchSublocalities(id);
        break;
      case 'sublocality':
        fetchPincodes(id);
        break;
      default:
        break;
    }
  };

  // Handle adding new state
  const handleAddState = async (stateName) => {
    try {
      const result = await addState(stateName);
      fetchStates();  // Re-fetch the states after adding a new state
      setSelectedStateId(result.id); // Update the selected state
    } catch (error) {
      console.error('Error adding state:', error);
    }
  };

  // Handle adding a new city
  const handleAddCity = async (cityName, stateId) => {
    try {
      const result = await addCity(cityName, stateId);  // Call the addCity API
      fetchCities(stateId);  // Re-fetch the cities after adding a new city
      setSelectedCityId(result.id);  // Update the selected city
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  // Handle adding a new locality
  const handleAddLocality = async (localityName, cityId) => {
    try {
      const result = await addLocality(localityName, cityId);  // Call the addLocality API
      fetchLocalities(cityId);  // Re-fetch the localities after adding a new locality
      setSelectedLocalityId(result.id);  // Update the selected locality
    } catch (error) {
      console.error('Error adding locality:', error);
    }
  };

  // Handle adding a new sublocality
  const handleAddSublocality = async (sublocalityName, localityId) => {
    try {
      const result = await addSublocality(sublocalityName, localityId);  // Call the addSublocality API
      fetchSublocalities(localityId);  // Re-fetch the sublocalities after adding a new sublocality
    } catch (error) {
      console.error('Error adding sublocality:', error);
    }
  };

  // Handle adding a new pincode
  const handleAddPincode = async (pincode, localityId) => {
    try {
      const result = await addPincode(pincode, localityId);  // Call the addPincode API
      fetchPincodes(localityId);  // Re-fetch the pincodes after adding a new pincode
    } catch (error) {
      console.error('Error adding pincode:', error);
    }
  };

  return (
    <div>
      <h2>Location Form</h2>

      <StateSelect
        states={states}
        onAddState={handleAddState}
        selectedStateId={selectedStateId}
        onChange={handleLocationChange}
      />

      <CitySelect
        cities={cities}
        selectedStateId={selectedStateId}
        selectedCityId={selectedCityId}
        onAddCity={handleAddCity}
        onChange={handleLocationChange}
      />

      <LocalitySelect
        localities={localities}
        selectedCityId={selectedCityId}
        selectedLocalityId={selectedLocalityId}
        onAddLocality={handleAddLocality}
        onChange={handleLocationChange}
      />

      <SublocalitySelect
        sublocalities={sublocalities}
        selectedLocalityId={selectedLocalityId}
        onAddSublocality={handleAddSublocality}
        onChange={handleLocationChange}
      />

      <PincodeSelect
        pincodes={pincodes}
        selectedLocalityId={selectedLocalityId}
        onAddPincode={handleAddPincode}
        onChange={handleLocationChange}
      />
    </div>
  );
};

export default LocationForm;

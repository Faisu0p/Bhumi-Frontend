import axios from 'axios';

// Base API URL (adjust as needed)
const BASE_API_URL = 'http://localhost:8021/api/locations';

// Add a new state
export const addState = async (stateName) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/add`, { type: 'state', name: stateName });
    return response.data;  // Assuming backend returns { message, id }
  } catch (error) {
    console.error('Error adding state:', error);
    throw new Error('Failed to add state. Please try again later.');
  }
};

// Add a new city
export const addCity = async (cityName, stateId) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/add`, { type: 'city', name: cityName, parentId: stateId });
    return response.data;  // Assuming backend returns { message, id }
  } catch (error) {
    console.error('Error adding city:', error);
    throw new Error('Failed to add city. Please try again later.');
  }
};

// Add a new locality
export const addLocality = async (localityName, cityId) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/add`, { type: 'locality', name: localityName, parentId: cityId });
    return response.data;  // Assuming backend returns { message, id }
  } catch (error) {
    console.error('Error adding locality:', error);
    throw new Error('Failed to add locality. Please try again later.');
  }
};

// Add a new sublocality
export const addSublocality = async (sublocalityName, localityId) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/add`, { type: 'sublocality', name: sublocalityName, parentId: localityId });
    return response.data;  // Assuming backend returns { message, id }
  } catch (error) {
    console.error('Error adding sublocality:', error);
    throw new Error('Failed to add sublocality. Please try again later.');
  }
};

// Add a new pincode
export const addPincode = async (pincode, localityId) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/add`, { type: 'pincode', name: pincode, parentId: localityId });
    return response.data;  // Assuming backend returns { message, id }
  } catch (error) {
    console.error('Error adding pincode:', error);
    throw new Error('Failed to add pincode. Please try again later.');
  }
};

// Fetch all states
export const getStates = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/states`);
    return response.data;  // Assuming backend returns an array of states
  } catch (error) {
    console.error('Error fetching states:', error);
    throw new Error('Failed to fetch states. Please try again later.');
  }
};

// Fetch cities by state
export const getCitiesByState = async (stateId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/cities`, { params: { parentId: stateId } });
    return response.data;  // Assuming backend returns an array of cities
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error('Failed to fetch cities. Please try again later.');
  }
};

// Fetch localities by city
export const getLocalitiesByCity = async (cityId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/localities`, { params: { parentId: cityId } });
    return response.data;  // Assuming backend returns an array of localities
  } catch (error) {
    console.error('Error fetching localities:', error);
    throw new Error('Failed to fetch localities. Please try again later.');
  }
};

// Fetch sublocalities by locality
export const getSublocalitiesByLocality = async (localityId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/sublocalities`, { params: { parentId: localityId } });
    return response.data;  // Assuming backend returns an array of sublocalities
  } catch (error) {
    console.error('Error fetching sublocalities:', error);
    throw new Error('Failed to fetch sublocalities. Please try again later.');
  }
};

// Fetch pincodes by locality
export const getPincodesByLocality = async (localityId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/pincodes`, { params: { parentId: localityId } });
    return response.data;  // Assuming backend returns an array of pincodes
  } catch (error) {
    console.error('Error fetching pincodes:', error);
    throw new Error('Failed to fetch pincodes. Please try again later.');
  }
};

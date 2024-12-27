import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:8021/api/locations';  // Update this to your backend URL

// Function to add a state
export const addState = async (stateName) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-state`, { stateName });
    return response.data;  // Return the success message
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add state');
  }
};

// Function to add a city
export const addCity = async (cityName, stateId) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-city`, { cityName, stateId });
    return response.data;  // Return the success message
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add city');
  }
};

// Function to add a locality
export const addLocality = async (localityName, cityId) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-locality`, { localityName, cityId });
    return response.data;  // Return the success message
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add locality');
  }
};

// Function to add a sublocality
export const addSubLocality = async (subLocalityName, localityId) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-sublocality`, { subLocalityName, localityId });
    return response.data;  // Return the success message
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add sublocality');
  }
};

// Function to add a pincode
export const addPincode = async (pincode, localityId) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-pincode`, { pincode, localityId });
    return response.data;  // Return the success message
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add pincode');
  }
};

// Function to fetch all states (id and name)
export const getStates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/states`);
    return response.data;  // Return the list of states
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch states');
  }
};

// Function to fetch all cities (id and name)
export const getCities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);
    return response.data;  // Return the list of cities
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch cities');
  }
};

// Function to fetch all localities (id and name)
export const getLocalities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/localities`);
    return response.data;  // Return the list of localities
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch localities');
  }
};

const BASE_URL = 'http://localhost:8021/api/builders';

// Add a new builder
export const createBuilder = async (builderData) => {
  const response = await fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(builderData),
  });
  const data = await response.json();
  return data;
};

// Get all builders' information
export const getAllBuildersInfo = async () => {
  const response = await fetch(`${BASE_URL}/details`);
  const data = await response.json();
  return data;
};

// Get all builders' names and IDs
export const getBuilders = async () => {
  const response = await fetch(`${BASE_URL}/names_id`);
  const data = await response.json();
  return data;
};

// Verify a builder by name or ID
export const verifyBuilder = async (builderData) => {
  const response = await fetch(`${BASE_URL}/verifyByid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(builderData),
  });
  const data = await response.json();
  return data;
};

const BASE_URL = 'http://localhost:8021/api/projects';

// Helper function to make a POST request
const postRequest = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error('Failed to parse response as JSON');
  }
};

// Helper function to make a GET request
const getRequest = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error('Failed to parse response as JSON');
  }
};

// Submit a new project with all its details
export const createProject = async (projectData) => {
  const url = `${BASE_URL}/submitProject`;  // Corrected API endpoint
  const result = await postRequest(url, projectData);
  return result;
};

// Fetch all projects
export const fetchAllProjects = async () => {
  const url = `${BASE_URL}/all_projects`;  // Corrected API endpoint
  const result = await getRequest(url);
  return result;
};

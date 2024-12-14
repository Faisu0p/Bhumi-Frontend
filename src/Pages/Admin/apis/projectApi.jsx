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

  const result = await response.json();
  return result;
};

// Submit a new project with all its details
export const submitProject = async (projectData) => {
  const url = `${BASE_URL}/submitProject`;
  const result = await postRequest(url, projectData);
  return result;
};

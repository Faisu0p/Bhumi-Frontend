import React, { useState, useEffect } from 'react';
import { fetchProjectNamesAndIds, verifyProject } from './apis/projectApi'; // Importing the correct API functions


const ManageProjectPage = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState('');

  // Fetch project names and IDs from the backend on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchProjectNamesAndIds(); // Fetch project names and IDs
        if (response && Array.isArray(response.data)) {
          setProjects(response.data); // Set projects if data is an array
        } else {
          console.error('Expected an array of projects but got:', response);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Handle project selection change
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setVerificationMessage('');
  };

  // Handle project verification
  const handleVerify = async () => {
    if (!selectedProject) {
      setVerificationMessage('Please select a project');
      return;
    }

    try {
      const response = await verifyProject(selectedProject); // Send the selected project ID to verify

      console.log("Response from verifyProject:", response);

      if (response && response.message) {
        setVerificationMessage(response.message); // Show the verification message
      } else {
        setVerificationMessage('Unexpected response format from server');
      }
    } catch (error) {
      setVerificationMessage('An error occurred while verifying the project');
      console.error('Error verifying project:', error);
    }
  };

  return (
    <div className="manage-page">
      <h1>Manage Projects</h1>
      <div className="project-selection">
        <select
          value={selectedProject}
          onChange={handleProjectChange}
          className="project-dropdown"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.Project_id} value={project.Project_id}>
              {project.Project_Name} (ID: {project.Project_id})
            </option>
          ))}
        </select>
        <button onClick={handleVerify} className="verify-button">
          Verify
        </button>
      </div>
      {verificationMessage && (
        <div className="verification-message">{verificationMessage}</div>
      )}
    </div>
  );
};

export default ManageProjectPage;

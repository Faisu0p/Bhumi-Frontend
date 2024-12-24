import React, { useState, useEffect } from 'react';
import { fetchProjectNamesAndIds, verifyProject } from './apis/projectApi';
import './ManageProjectPage.css';

const ManageProjectPage = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState('');

  // Fetch project names and IDs from backend on component mount
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

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setVerificationMessage('');
  };

  const handleVerify = async () => {
    if (!selectedProject) {
      setVerificationMessage('Please select a project');
      return;
    }
  
    try {
      const response = await verifyProject(selectedProject); // Send the selected project ID to verify
  
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
    <div className="manage-project-page">
      <div className="manage-project-form-container">
        <h1 className="manage-project-title">Manage Projects</h1>
        <div className="manage-project-selection-container">
          {/* Label above the dropdown */}
          <label htmlFor="projectSelect" className="manage-project-selection-label">
            Select a project to verify
          </label>
          <select
            id="projectSelect"
            value={selectedProject}
            onChange={handleProjectChange}
            className="manage-project-selection-dropdown"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.Project_id} value={project.Project_id}>
                {project.Project_Name}
              </option>
            ))}
          </select>
          <button onClick={handleVerify} className="manage-project-verify-button">
            Verify
          </button>
        </div>
        {verificationMessage && (
          <div className="manage-project-verification-message">{verificationMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ManageProjectPage;

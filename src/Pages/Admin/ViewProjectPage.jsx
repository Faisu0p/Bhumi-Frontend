import React from 'react';
import './ViewProjectPage.css'; // Import the CSS file
import ProjectList from './components/ProjectList'; // Import the ProjectList component

const ViewProjectPage = () => {
  return (
    <div className="view-project-container">
      <ProjectList />
    </div>
  );
};

export default ViewProjectPage;

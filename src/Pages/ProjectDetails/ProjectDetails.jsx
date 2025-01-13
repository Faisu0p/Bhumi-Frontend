import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to access the id from the URL
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import './ProjectDetails.css';

function ProjectDetails() {
  const { id } = useParams();  // Get the project ID from the URL
  const [projectData, setProjectData] = useState(null);  // Store project data
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Fetch project data based on the ID
    axios.get(`http://localhost:8021/api/projects/${id}`)
      .then((response) => {
        setProjectData(response.data);  // Set fetched data
        setLoading(false);  // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching project data:', error);
        setLoading(false);  // Stop loading even in case of an error
      });
  }, [id]);

  const downloadPDF = (e) => {
    e.preventDefault();
    const element = document.body; // Specify the content to include in the PDF
    html2pdf()
      .from(element)
      .save(`${projectData?.projectName || 'project'}.pdf`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!projectData) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="property-details-container">
      <div className="property-hero-section">
        <img src={projectData.masterLayoutPlan} alt={projectData.projectName} className="property-hero-image" />
        <div className="property-hero-overlay">
          <h1>{projectData.projectName}</h1>
          <p>{projectData.sublocality}, {projectData.locality}, {projectData.city}</p>
          <a href="#" className="property-download-button" onClick={downloadPDF}>Download</a>
        </div>
      </div>

      <main className="property-main-content">
        <div className="property-card project-details-card">
          <h2>Project Details</h2>
          <div className="property-details-grid">
            <div>
              <span>Builder</span>
              <p>{projectData.builderName}</p>
            </div>
            <div>
              <span>Property Type</span>
              <p>{projectData.propertyType}</p>
            </div>
            <div>
              <span>Delivery Date</span>
              <p>{new Date(projectData.deliveryDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span>RERA Number</span>
              <p>{projectData.reraNumber}</p>
            </div>
          </div>
        </div>

        <div className="property-card project-status-card">
          <h2>Project Status</h2>
          <div className="property-status-badge">{projectData.deliveryStatus}</div>
          <div>
            <span>Total Towers</span>
            <p>{projectData.totalTowers}</p>
          </div>
          <div>
            <span>Total Units</span>
            <p>{projectData.totalFlats}</p>
          </div>
        </div>

        <div className="property-card project-overview-card">
          <h2>Project Overview</h2>
          <div>
            <h3>Location Advantage</h3>
            <p>{projectData.sectorBriefing}</p>
          </div>
          <hr />
          <div>
            <h3>About Project</h3>
            <p>{projectData.projectBriefing}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetails;

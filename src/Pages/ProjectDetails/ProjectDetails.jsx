import React from 'react';
import './ProjectDetails.css';
import html2pdf from 'html2pdf.js';

const projectData = {
  id: "prop001",
  city: "Gurgaon",
  locality: "Sohna Road",
  sublocality: "Sector 33",
  builderName: "Antriksh Group",
  projectName: "Antriksh Central Avenue",
  companyName: "Antriksh Developers Ltd",
  launchDate: "2023-01-15",
  shortCode: "ACA-S33",
  deliveryStatus: "Under Construction",
  deliveryDate: "2025-12-31",
  reraNumber: "RERA2023GRG001",
  totalTowers: 2,
  totalFlats: 114,
  towerPhaseWise: "Phase 1: Tower A & B",
  constructionType: "Premium High-Rise",
  propertyCategory: "Residential",
  propertyType: "Apartment",
  sectorBriefing: "Prime location in Sector-33 on Sohna Road, offering excellent connectivity",
  projectBriefing: "Discover the epitome of luxury living at Central Avenue, Gurugram's most sought-after residential project. Nestled in the prime location of Sector-33 on Sohna Road, this project offers unparalleled connectivity and convenience.",
  masterLayoutPlan: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
};

function ProjectDetails() {

  const downloadPDF = (e) => {
    e.preventDefault();
    const element = document.body; // You can specify any part of the page here
    html2pdf()
      .from(element)
      .save("page.pdf");
  };
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

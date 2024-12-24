import React, { useState } from 'react';
import './ProjectForm.css';
import MediaSection from './MediaSection';
import BuilderDropdown from './BuilderDropdown';

const ProjectForm = ({ onNext }) => {

  const [projectData, setProjectData] = useState({
    projectName: 'New ',
    builderId: '1',
    launchDate: '12-12-2012',
    city: 'New ',
    locality: 'New ',
    sublocality: 'New ',
    companyName: 'New ',
    shortCode: 'New ',
    deliveryStatus: 'New ',
    deliveryDate: '12-12-2020',
    reraNumber: 'New ',
    totalTowers: '12',
    totalResidentialUnits: '12',
    totalCommercialUnits: '12',
    projectType: 'New ',
    sectorBriefing: 'New ',
    projectBriefing: 'New ',
    projectIsVerified: false,
    projectMedia: 'New ',
    state: 'New ',
    completeAddress: 'New ',
    landmark: 'New ',
    pinCode: '12345',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'deliveryDate') {
      const launchDate = new Date(projectData.launchDate);
      const deliveryDate = new Date(value);

      if (deliveryDate <= launchDate) {
        alert('Delivery date must be after the launch date.');
        return;
      }

      const thirtyYearsAfterLaunch = new Date(launchDate);
      thirtyYearsAfterLaunch.setFullYear(launchDate.getFullYear() + 30);

      if (deliveryDate > thirtyYearsAfterLaunch) {
        alert('Delivery date cannot be more than 30 years after the launch date.');
        return;
      }
    }

    setProjectData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project form called", projectData);
    onNext(projectData);
  };

  const updateMediaUrl = (urls) => {
    if (Array.isArray(urls)) {
      const mediaString = urls.join(', ');
      setProjectData((prev) => ({ ...prev, projectMedia: mediaString }));
    } else {
      setProjectData((prev) => ({ ...prev, projectMedia: urls }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form-container">
      <h2 className="project-form-title">Project Details</h2>

      <label className="project-form-label">Enter Project Name</label>
      <input
        type="text"
        name="projectName"
        value={projectData.projectName}
        onChange={handleChange}
        placeholder="Project Name"
        required
        className="project-form-input"
      />

      <label className="project-form-label">Select Builder</label>
      <BuilderDropdown
        projectDetails={projectData}
        handleInputChange={handleChange}
        className="project-form-dropdown"
      />

      <label className="project-form-label">Enter Launch Date</label>
      <input
        type="date"
        name="launchDate"
        value={projectData.launchDate}
        onChange={handleChange}
        className="project-form-input"
      />

      <label className="project-form-label">Enter State</label>
      <input
        type="text"
        name="state"
        value={projectData.state}
        onChange={handleChange}
        placeholder="State"
        className="project-form-input"
      />

      <label className="project-form-label">Select City</label>
      <select
        name="city"
        value={projectData.city}
        onChange={handleChange}
        className="project-form-select"
      >
        <option value="">Select City</option>
        <option value="Delhi">Delhi</option>
        <option value="Gurgaon">Gurgaon</option>
        <option value="Noida">Noida</option>
        <option value="Greater Noida">Greater Noida</option>
      </select>

      <label className="project-form-label">Enter Locality</label>
      <input
        type="text"
        name="locality"
        value={projectData.locality}
        onChange={handleChange}
        placeholder="Locality"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Sublocality</label>
      <input
        type="text"
        name="sublocality"
        value={projectData.sublocality}
        onChange={handleChange}
        placeholder="Sublocality"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Complete Address</label>
      <input
        type="text"
        name="completeAddress"
        value={projectData.completeAddress}
        onChange={handleChange}
        placeholder="Complete Address"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Landmark</label>
      <input
        type="text"
        name="landmark"
        value={projectData.landmark}
        onChange={handleChange}
        placeholder="Landmark"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Pin Code</label>
      <input
        type="number"
        name="pinCode"
        value={projectData.pinCode}
        onChange={handleChange}
        placeholder="Pin Code"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Company Name</label>
      <input
        type="text"
        name="companyName"
        value={projectData.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Short Code</label>
      <input
        type="text"
        name="shortCode"
        value={projectData.shortCode}
        onChange={handleChange}
        placeholder="Short Code"
        className="project-form-input"
      />

      <label className="project-form-label">Select Project Status</label>
      <select
        name="deliveryStatus"
        value={projectData.deliveryStatus}
        onChange={handleChange}
        className="project-form-select"
      >
        <option value="">Select Project Status</option>
        <option value="Completed">Completed</option>
        <option value="Under Construction">Under Construction</option>
      </select>

      {projectData.deliveryStatus && (
        <div className="project-form-date-container">
          <label className="project-form-label">
            {projectData.deliveryStatus === 'Completed'
              ? 'Enter Completion Date'
              : 'Expected Completion Date'}
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={projectData.deliveryDate}
            onChange={handleChange}
            placeholder={projectData.deliveryStatus === 'Completed' ? 'Enter Completion Date' : 'Expected Completion Date'}
            className="project-form-input"
          />
        </div>
      )}

      <label className="project-form-label">Enter RERA Number</label>
      <input
        type="text"
        name="reraNumber"
        value={projectData.reraNumber}
        onChange={handleChange}
        placeholder="RERA Number"
        className="project-form-input"
      />

      <label className="project-form-label">Select Project Type</label>
      <select
        name="projectType"
        value={projectData.projectType}
        onChange={handleChange}
        className="project-form-select"
      >
        <option value="">Select Project Type</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Mixed">Mixed</option>
      </select>

      <label className="project-form-label">Enter Total Towers</label>
      <input
        type="number"
        name="totalTowers"
        value={projectData.totalTowers}
        onChange={handleChange}
        placeholder="Total Towers"
        min="0"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Total Residential Units</label>
      <input
        type="number"
        name="totalResidentialUnits"
        value={projectData.totalResidentialUnits}
        onChange={handleChange}
        placeholder="Total Residential Units"
        min="0"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Total Commercial Units</label>
      <input
        type="number"
        name="totalCommercialUnits"
        value={projectData.totalCommercialUnits}
        onChange={handleChange}
        placeholder="Total Commercial Units"
        min="0"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Sector Briefing</label>
      <textarea
        name="sectorBriefing"
        value={projectData.sectorBriefing}
        onChange={handleChange}
        placeholder="Sector Briefing"
        className="project-form-textarea"
      />

      <label className="project-form-label">Enter Project Briefing</label>
      <textarea
        name="projectBriefing"
        value={projectData.projectBriefing}
        onChange={handleChange}
        placeholder="Project Briefing"
        className="project-form-textarea"
      />

      <label className="project-form-label">Add the Project Media here</label>
      <MediaSection updateMasterLayoutPlan={updateMediaUrl} maxSize={500 * 1024} />
      <input
        type="url"
        name="projectMedia"
        value={projectData.projectMedia}
        onChange={handleChange}
        placeholder="Project Media URL"
        readOnly
        className="project-form-input"
      />

      <button type="submit" className="project-form-submit-button">Next</button>
    </form>

  );
  
};

export default ProjectForm;

import React, { useState } from 'react';
import './ProjectForm.css';
import MediaSection from './MediaSection';
import BuilderDropdown from './BuilderDropdown';

const ProjectForm = ({ onNext }) => {


  const [projectData, setProjectData] = useState({

    projectName: '',
    builderId: '',
    launchDate: '',
    city: '',
    locality: '',
    sublocality: '',
    companyName: '',
    shortCode: '',
    deliveryStatus: '',
    deliveryDate: '',
    reraNumber: '',
    totalTowers: '',
    totalResidentialUnits: '',
    totalCommercialUnits: '',
    projectType: '',
    sectorBriefing: '',
    projectBriefing: '',
    projectIsVerified: false,
    projectMedia: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // If the field is "deliveryDate", validate it
    if (name === 'deliveryDate') {
      const launchDate = new Date(projectData.launchDate);
      const deliveryDate = new Date(value);
  
      // Check if delivery date is after launch date
      if (deliveryDate <= launchDate) {
        alert('Delivery date must be after the launch date.');
        return; // Prevents setting invalid delivery date
      }
  
      // Check if delivery date is more than 30 years after the launch date
      const thirtyYearsAfterLaunch = new Date(launchDate);
      thirtyYearsAfterLaunch.setFullYear(launchDate.getFullYear() + 30);
  
      if (deliveryDate > thirtyYearsAfterLaunch) {
        alert('Delivery date cannot be more than 30 years after the launch date.');
        return; // Prevents setting invalid delivery date
      }
    }
  
    // Update project data with the valid value
    setProjectData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // // Basic validation (ensure fields are filled)
    // if (!projectData.projectName || !projectData.builderId) {
    //   alert('Please fill in the required fields');
    //   return;
    // }
    console.log("Project form called",projectData);
    onNext(projectData);
  };

    // Media URL update function
    const updateMediaUrl = (url) => {
      setProjectData((prev) => ({ ...prev, projectMedia: url }));
    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Project Details</h2>
      
      <input
        type="text"
        name="projectName"
        value={projectData.projectName}
        onChange={handleChange}
        placeholder="Project Name"
        required
      />

     
        <BuilderDropdown
          projectDetails={projectData} 
          handleInputChange={handleChange}
        />
      

      <input
        type="date"
        name="launchDate"
        value={projectData.launchDate}
        onChange={handleChange}
        placeholder="Launch Date"
      />
      <select
        name="city"
        value={projectData.city}
        onChange={handleChange}
        placeholder="City"
      >
        <option value="">Select City</option> {/* Default option */}
        <option value="Delhi">Delhi</option>
        <option value="Gurgaon">Gurgaon</option>
        <option value="Noida">Noida</option>
        <option value="Greater Noida">Greater Noida</option>
      </select>
      <input
        type="text"
        name="locality"
        value={projectData.locality}
        onChange={handleChange}
        placeholder="Locality"
      />
      <input
        type="text"
        name="sublocality"
        value={projectData.sublocality}
        onChange={handleChange}
        placeholder="Sublocality"
      />
      <input
        type="text"
        name="companyName"
        value={projectData.companyName}
        onChange={handleChange}
        placeholder="Company Name"
      />
      <input
        type="text"
        name="shortCode"
        value={projectData.shortCode}
        onChange={handleChange}
        placeholder="Short Code"
      />
      <select
        name="deliveryStatus"
        value={projectData.deliveryStatus}
        onChange={handleChange}
        placeholder="Select Project Status"
      >
        <option value="">Select Project Status</option>
        <option value="Completed">Completed</option>
        <option value="Under Construction">Under Construction</option>
      </select>

      {/* Conditional rendering for deliveryDate */}
      {projectData.deliveryStatus && (
        <div>
          <label>
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
          />
        </div>
      )}
      <input
        type="text"
        name="reraNumber"
        value={projectData.reraNumber}
        onChange={handleChange}
        placeholder="RERA Number"
      />
      <select
        name="projectType"
        value={projectData.projectType}
        onChange={handleChange}
        placeholder="Select Project Type"
      >
        <option value="">Select Project Type</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Mixed">Mixed</option>
      </select>
      <input
        type="number"
        name="totalTowers"
        value={projectData.totalTowers}
        onChange={handleChange}
        placeholder="Total Towers"
        min="0"
      />
      <input
        type="number"
        name="totalResidentialUnits"
        value={projectData.totalResidentialUnits}
        onChange={handleChange}
        placeholder="Total Residential Units"
        min="0"
      />
      <input
        type="number"
        name="totalCommercialUnits"
        value={projectData.totalCommercialUnits}
        onChange={handleChange}
        placeholder="Total Commercial Units"
        min="0"
      />
      <textarea
        name="sectorBriefing"
        value={projectData.sectorBriefing}
        onChange={handleChange}
        placeholder="Sector Briefing"
      />
      <textarea
        name="projectBriefing"
        value={projectData.projectBriefing}
        onChange={handleChange}
        placeholder="Project Briefing"
      />

      {/* MediaSection Component */}
      <label>Add the Project Media here</label>
      <MediaSection updateMasterLayoutPlan={updateMediaUrl} maxSize={500 * 1024} />
      <input
        type="url"
        name="projectMedia"
        value={projectData.projectMedia}
        onChange={handleChange}
        placeholder="Project Media URL"
        readOnly
      />

 
      
      <button type="submit">Next</button>
    </form>
  );
};

export default ProjectForm;

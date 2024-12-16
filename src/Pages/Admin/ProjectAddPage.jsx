import React, { useState } from 'react';
import axios from 'axios';
import BuilderDropdown from './components/BuilderDropdown'; // Make sure this is correctly imported

const ProjectAddPage = () => {
  const [projectDetails, setProjectDetails] = useState({
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
    totalUnitDeclaration: '',
    totalCommercialUnits: '',
    projectType: '', // Residential, Commercial, Mixed
    sectorBriefing: '',
    projectBriefing: '',
  });

  const [phases, setPhases] = useState([]);
  const [UnitDeclaration, setUnitDeclaration] = useState([]);
  const [commercialUnits, setCommercialUnits] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPhases = [...phases];
    updatedPhases[index][name] = value;
    setPhases(updatedPhases);
  };

  const handleUnitDeclarationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUnits = [...UnitDeclaration];
    updatedUnits[index][name] = value;
    setUnitDeclaration(updatedUnits);
  };

  const handleCommercialUnitChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUnits = [...commercialUnits];
    updatedUnits[index][name] = value;
    setCommercialUnits(updatedUnits);
  };

  const addPhase = () => {
    setPhases([
      ...phases,
      {
        Phase_Number: phases.length + 1,
        Rera_Number: '',
        Phase_Status: '',
        Delivery_Date: '',
        Total_Towers: '',
        Description: '',
      },
    ]);
  };

  const removePhase = (index) => {
    const updatedPhases = phases.filter((_, i) => i !== index);
    setPhases(updatedPhases);
  };

  const addUnitDeclaration = () => {
    setUnitDeclaration([
      ...UnitDeclaration,
      {
        unitCategory:'',
        unitType: '',
        size: '',
        layout: '',
        facing: '',
        bedrooms: '',
        bathrooms: '',
        balconies: '',
        studyRoom: false,
        servantRoom: false,
        poojaRoom: false,
        fullyFurnished: false,
        semiFurnished: false,
        unfurnished: false,
      },
    ]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      projectDetails: {
        projectName: projectDetails.projectName || null,
        builderId: projectDetails.builderId || null,
        launchDate: projectDetails.launchDate || null,
        city: projectDetails.city || null,
        locality: projectDetails.locality || null,
        sublocality: projectDetails.sublocality || null,
        companyName: projectDetails.companyName || null,
        shortCode: projectDetails.shortCode || null,
        deliveryStatus: projectDetails.deliveryStatus || null,
        deliveryDate: projectDetails.deliveryDate || null,
        reraNumber: projectDetails.reraNumber || null,
        totalTowers: projectDetails.totalTowers || null,
        totalUnitDeclaration: projectDetails.totalUnitDeclaration || null,
        totalCommercialUnits: projectDetails.totalCommercialUnits || null,
        projectType: projectDetails.projectType || null,
        sectorBriefing: projectDetails.sectorBriefing || null,
        projectBriefing: projectDetails.projectBriefing || null,
      },
      phases: phases,
      UnitDeclaration: UnitDeclaration,
    };

    console.log(projectData);

    try {
      const response = await axios.post('http://localhost:8021/api/projects/submitProject', projectData);
      console.log('Project added successfully:', response.data);
    } catch (error) {
      console.error('Error adding project:', error.response ? error.response.data : error.message);
    }
  };


  const removeUnitDeclaration = (index) => {
    const updatedUnits = UnitDeclaration.filter((_, i) => i !== index);
    setUnitDeclaration(updatedUnits);
  };


  
  
  
  

  return (
    <div className="container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Details Section */}
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            name="projectName"
            value={projectDetails.projectName}
            onChange={handleInputChange}
          />
        </div>





        <div className="form-group">
          
          <BuilderDropdown
            projectDetails={projectDetails}
            handleInputChange={handleInputChange}
          />
        </div>







        <div className="form-group">
          <label>Project Launch Date</label>
          <input
            type="date"
            className="form-control"
            name="launchDate"
            value={projectDetails.launchDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={projectDetails.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Locality</label>
          <input
            type="text"
            className="form-control"
            name="locality"
            value={projectDetails.locality}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Sublocality</label>
          <input
            type="text"
            className="form-control"
            name="sublocality"
            value={projectDetails.sublocality}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            className="form-control"
            name="companyName"
            value={projectDetails.companyName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Short Code</label>
          <input
            type="text"
            className="form-control"
            name="shortCode"
            value={projectDetails.shortCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Delivery Status</label>
          <select
            className="form-control"
            name="deliveryStatus"
            value={projectDetails.deliveryStatus}
            onChange={handleInputChange}
          >
            <option value="">Select Delivery Status</option>
            <option value="Completed">Completed</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>

        <div className="form-group">
          <label>Delivery Date</label>
          <input
            type="date"
            className="form-control"
            name="deliveryDate"
            value={projectDetails.deliveryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>RERA Number</label>
          <input
            type="text"
            className="form-control"
            name="reraNumber"
            value={projectDetails.reraNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Total Towers</label>
          <input
            type="number"
            className="form-control"
            name="totalTowers"
            value={projectDetails.totalTowers}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Total Residential Units</label>
          <input
            type="number"
            className="form-control"
            name="totalUnitDeclaration"
            value={projectDetails.totalUnitDeclaration}
            onChange={handleInputChange}
          />
        </div>
      
        <div className="form-group">
          <label>Project Type</label>
          <select
            className="form-control"
            name="projectType"
            value={projectDetails.projectType}
            onChange={handleInputChange}
          >
            <option value="">Select Project Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sector Briefing</label>
          <textarea
            className="form-control"
            name="sectorBriefing"
            value={projectDetails.sectorBriefing}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Project Briefing</label>
          <textarea
            className="form-control"
            name="projectBriefing"
            value={projectDetails.projectBriefing}
            onChange={handleInputChange}
          />
        </div>

      {/* Phases Section */}
    <h3>Project Phases</h3>
    {phases.map((phase, index) => (
      <div key={index}>
        <h4>Phase {phase.Phase_Number}</h4>
        <div className="form-group">
          <label>Phase Number</label>
          <input
            type="number"
            className="form-control"
            name="Phase_Number"
            value={phase.Phase_Number}
            readOnly // Make Phase_Number read-only as it auto-calculates
          />
        </div>
        <div className="form-group">
          <label>RERA Number</label>
          <input
            type="text"
            className="form-control"
            name="Rera_Number"
            value={phase.Rera_Number}
            onChange={(e) => handlePhaseChange(index, e)}
          />
        </div>
        <div className="form-group">
          <label>Phase Status</label>
          <select
            className="form-control"
            name="Phase_Status"
            value={phase.Phase_Status} // Dynamically set the selected option
            onChange={(e) => handlePhaseChange(index, e)} // Update the phase status
          >
            <option value="">Select Status</option> {/* Default placeholder */}
            <option value="Complete">Complete</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>

        <div className="form-group">
          <label>Delivery Date</label>
          <input
            type="date"
            className="form-control"
            name="Delivery_Date"
            value={phase.Delivery_Date}
            onChange={(e) => handlePhaseChange(index, e)}
          />
        </div>
        <div className="form-group">
          <label>Total Towers</label>
          <input
            type="number"
            className="form-control"
            name="Total_Towers"
            value={phase.Total_Towers}
            onChange={(e) => handlePhaseChange(index, e)}
          />
        </div>
        <div className="form-group">
          <label>Phase Description</label>
          <input
            type="text"
            className="form-control"
            name="Description"
            value={phase.Description}
            onChange={(e) => handlePhaseChange(index, e)}
          />
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => removePhase(index)}
        >
          Remove Phase
        </button>
            <h3> Unit Declaration</h3>
            {UnitDeclaration.map((unit, index) => (
              <div key={index}>
                <h4>Unit {index + 1}</h4>


                <div className="form-group">
                  <label>Unit Category</label>
                  <select
                    className="form-control"
                    name="uniCategory"
                    value={phase.unitCategory} // Dynamically set the selected option
                    onChange={(e) => handlePhaseChange(index, e)} // Update the phase status
                  >
                    <option value="">Select Status</option> {/* Default placeholder */}
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Unit Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unitType"
                    value={unit.unitType}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>

                
                <div className="form-group">
                  <label>Size (sq. ft.)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="size"
                    value={unit.size}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>

                <div className="form-group">
                  <label>Furnished Status</label>
                  <select
                    className="form-control"
                    name="furnishedStatus"
                    value={phase.furnishedStatus} // Dynamically set the selected option
                    onChange={(e) => handlePhaseChange(index, e)} // Update the phase status
                  >
                    <option value="">Select Status</option> {/* Default placeholder */}
                    <option value="Completed">Completed</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>Layout</label>
                  <input
                    type="text"
                    className="form-control"
                    name="layout"
                    value={unit.layout}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Facing</label>
                  <input
                    type="text"
                    className="form-control"
                    name="facing"
                    value={unit.facing}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bedrooms"
                    value={unit.bedrooms}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Bathrooms</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bathrooms"
                    value={unit.bathrooms}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Balconies</label>
                  <input
                    type="number"
                    className="form-control"
                    name="balconies"
                    value={unit.balconies}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Study Room</label>
                  <input
                    type="checkbox"
                    name="studyRoom"
                    checked={unit.studyRoom}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Servant Room</label>
                  <input
                    type="checkbox"
                    name="servantRoom"
                    checked={unit.servantRoom}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Pooja Room</label>
                  <input
                    type="checkbox"
                    name="poojaRoom"
                    checked={unit.poojaRoom}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Fully Furnished</label>
                  <input
                    type="checkbox"
                    name="fullyFurnished"
                    checked={unit.fullyFurnished}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Semi Furnished</label>
                  <input
                    type="checkbox"
                    name="semiFurnished"
                    checked={unit.semiFurnished}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Unfurnished</label>
                  <input
                    type="checkbox"
                    name="unfurnished"
                    checked={unit.unfurnished}
                    onChange={(e) => handleUnitDeclarationChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeUnitDeclaration(index)}
                >
                  Remove Unit
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={addUnitDeclaration}
            >
              Add A Unit
            </button>
      </div>
    ))}
    <button type="button" className="btn btn-primary" onClick={addPhase}>
      Add Phase
    </button>

        

        <button type="submit" className="btn btn-success">
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectAddPage;

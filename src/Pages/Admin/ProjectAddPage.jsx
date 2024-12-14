import React, { useState } from 'react';
import axios from 'axios';

const ProjectAddPage = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectName: 'Project A',
    builderId: '5',
    launchDate: '12-12-2025',
    city: 'Delhi',
    locality: 'Delhi',
    sublocality: 'asd',
    companyName: 'asd',
    shortCode: 'sad',
    deliveryStatus: 'asd',
    deliveryDate: '12-11-2024',
    reraNumber: '12',
    totalTowers: '12',
    totalResidentialUnits: '12',
    totalCommercialUnits: '12',
    projectType: 'asd', // Residential, Commercial, Mixed
    sectorBriefing: 'sada',
    projectBriefing: 'sada',
  });

  const [phases, setPhases] = useState([]);
  const [residentialUnits, setResidentialUnits] = useState([]);
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

  const handleResidentialUnitChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUnits = [...residentialUnits];
    updatedUnits[index][name] = value;
    setResidentialUnits(updatedUnits);
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
        phase_Number: '1',
        Rera_Number: '1212',
        Phase_Status: 'asd',
        Delivery_Date: '12-12-2024',
        Total_Towers: '123',
      },
    ]);
  };

  const removePhase = (index) => {
    const updatedPhases = phases.filter((_, i) => i !== index);
    setPhases(updatedPhases);
  };

  const addResidentialUnit = () => {
    setResidentialUnits([
      ...residentialUnits,
      {
        unitType: 'asd',
        size: '123',
        layout: 'sad',
        facing: 'ad',
        bedrooms: '1',
        bathrooms: '1',
        balconies: '1',
        studyRoom: false,
        servantRoom: false,
        poojaRoom: false,
        fullyFurnished: false,
        semiFurnished: false,
        unfurnished: false,
      },
    ]);
  };

  const addCommercialUnit = () => {
    setCommercialUnits([
      ...commercialUnits,
      {
        unitType: 'ad',
        size: '11',
        layout: 'ad',
        floorArea: '11',
        facing: 'asd',
        parkingSpaces: '2',
        isRenovated: false,
        commercialFurnishings: false,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the project data in the same format as in Postman
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
        totalResidentialUnits: projectDetails.totalResidentialUnits || null,
        totalCommercialUnits: projectDetails.totalCommercialUnits || null,
        projectType: projectDetails.projectType || null,
        sectorBriefing: projectDetails.sectorBriefing || null,
        projectBriefing: projectDetails.projectBriefing || null,
      },
      phases: phases,
      residentialUnits: residentialUnits,
      commercialUnits: commercialUnits,
    };

    console.log(projectData);
     try {
      const response = await axios.post('http://localhost:8021/api/projects/submitProject', projectData);
       console.log('Project added successfully:', response.data);
     } catch (error) {
       console.error('Error adding project:', error.response ? error.response.data : error.message);
     }
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
          <label>Select Builder</label>
          <select
            className="form-control"
            name="builderId"
            value={projectDetails.builderId}
            onChange={handleInputChange}
          >
            <option value="">Select Builder</option>
            {/* Populate builder options dynamically */}
            <option value="1">Builder 1</option>
            <option value="2">Builder 2</option>
            <option value="3">Builder 3</option>
            <option value="4">Builder 4</option>
            <option value="5">Builder 5</option>
          </select>
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
          <input
            type="text"
            className="form-control"
            name="deliveryStatus"
            value={projectDetails.deliveryStatus}
            onChange={handleInputChange}
          />
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
            name="totalResidentialUnits"
            value={projectDetails.totalResidentialUnits}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Total Commercial Units</label>
          <input
            type="number"
            className="form-control"
            name="totalCommercialUnits"
            value={projectDetails.totalCommercialUnits}
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
            <h4>Phase {index + 1}</h4>
            <div className="form-group">
              <label>Phase Number</label>
              <input
                type="number"
                className="form-control"
                name="phaseNumber"
                value={phase.Phase_Number}
                onChange={(e) => handlePhaseChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label>RERA Number</label>
              <input
                type="text"
                className="form-control"
                name="reraNumber"
                value={phase.Rera_Number}
                onChange={(e) => handlePhaseChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label>Phase Status</label>
              <input
                type="text"
                className="form-control"
                name="phaseStatus"
                value={phase.Phase_Status}
                onChange={(e) => handlePhaseChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label>Delivery Date</label>
              <input
                type="date"
                className="form-control"
                name="deliveryDate"
                value={phase.Delivery_Date}
                onChange={(e) => handlePhaseChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label>Total Towers</label>
              <input
                type="number"
                className="form-control"
                name="totalTowers"
                value={phase.Total_Towers}
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
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addPhase}>
          Add Phase
        </button>

        {/* Residential/Commercial Units Section */}
        {projectDetails.projectType === 'Residential' || projectDetails.projectType === 'Mixed' ? (
          <>
            <h3>Residential Units</h3>
            {residentialUnits.map((unit, index) => (
              <div key={index}>
                <h4>Unit {index + 1}</h4>
                <div className="form-group">
                  <label>Unit Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unitType"
                    value={unit.unitType}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Size (sq. ft.)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="size"
                    value={unit.size}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Layout</label>
                  <input
                    type="text"
                    className="form-control"
                    name="layout"
                    value={unit.layout}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Facing</label>
                  <input
                    type="text"
                    className="form-control"
                    name="facing"
                    value={unit.facing}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bedrooms"
                    value={unit.bedrooms}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Bathrooms</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bathrooms"
                    value={unit.bathrooms}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Balconies</label>
                  <input
                    type="number"
                    className="form-control"
                    name="balconies"
                    value={unit.balconies}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Study Room</label>
                  <input
                    type="checkbox"
                    name="studyRoom"
                    checked={unit.studyRoom}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Servant Room</label>
                  <input
                    type="checkbox"
                    name="servantRoom"
                    checked={unit.servantRoom}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Pooja Room</label>
                  <input
                    type="checkbox"
                    name="poojaRoom"
                    checked={unit.poojaRoom}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Fully Furnished</label>
                  <input
                    type="checkbox"
                    name="fullyFurnished"
                    checked={unit.fullyFurnished}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Semi Furnished</label>
                  <input
                    type="checkbox"
                    name="semiFurnished"
                    checked={unit.semiFurnished}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Unfurnished</label>
                  <input
                    type="checkbox"
                    name="unfurnished"
                    checked={unit.unfurnished}
                    onChange={(e) => handleResidentialUnitChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeResidentialUnit(index)}
                >
                  Remove Unit
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={addResidentialUnit}
            >
              Add Residential Unit
            </button>
          </>
        ) : null}

        {projectDetails.projectType === 'Commercial' || projectDetails.projectType === 'Mixed' ? (
          <>
            <h3>Commercial Units</h3>
            {commercialUnits.map((unit, index) => (
              <div key={index}>
                <h4>Unit {index + 1}</h4>
                <div className="form-group">
                  <label>Unit Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unitType"
                    value={unit.unitType}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Size (sq. ft.)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="size"
                    value={unit.size}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Layout</label>
                  <input
                    type="text"
                    className="form-control"
                    name="layout"
                    value={unit.layout}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Floor Area</label>
                  <input
                    type="text"
                    className="form-control"
                    name="floorArea"
                    value={unit.floorArea}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Facing</label>
                  <input
                    type="text"
                    className="form-control"
                    name="facing"
                    value={unit.facing}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Parking Spaces</label>
                  <input
                    type="number"
                    className="form-control"
                    name="parkingSpaces"
                    value={unit.parkingSpaces}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Renovated</label>
                  <input
                    type="checkbox"
                    name="isRenovated"
                    checked={unit.isRenovated}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Commercial Furnishings</label>
                  <input
                    type="checkbox"
                    name="commercialFurnishings"
                    checked={unit.commercialFurnishings}
                    onChange={(e) => handleCommercialUnitChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeCommercialUnit(index)}
                >
                  Remove Unit
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={addCommercialUnit}
            >
              Add Commercial Unit
            </button>
          </>
        ) : null}

        <button type="submit" className="btn btn-success">
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectAddPage;

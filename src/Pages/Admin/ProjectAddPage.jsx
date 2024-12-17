import React, { useState } from 'react';
import axios from 'axios';
import BuilderDropdown from './components/BuilderDropdown'; 
import AmenitiesSection from './components/AmenitiesSection';
import MediaSection from './components/MediaSection';

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
    projectType: '', 
    totalTowers: '',
    totalResidentialUnits: '',
    totalCommercialUnits: '',
    sectorBriefing: '',
    projectBriefing: '',
    projectIsVerified: 0,
    uploadedMedia:'',
    selectedAmenities:[],
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
        Start_Date: '',
        Delivery_Date: '',
        Total_Towers: '',
        Phase_Description: '',
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
        unitFriendlyName:'',
        superArea: '',
        buildUpArea: '',
        carpetArea: '',
        unitFurnishedStatus:'',
        unitLayout: '',
        unitDetails:[],
      },
    ]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    // Prepare project data for submission
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
        totalResidentialUnits: projectDetails.totalResidentialUnits || null, // Fixed key
        totalCommercialUnits: projectDetails.totalCommercialUnits || null,
        projectType: projectDetails.projectType || null,
        sectorBriefing: projectDetails.sectorBriefing || null,
        projectBriefing: projectDetails.projectBriefing || null,
        projectIsVerified: projectDetails.projectIsVerified ? 1 : 0,
        uploadedMedia: projectDetails.uploadedMedia || null,
      },
      amenities: [
        {
          Swimming_Pool: projectDetails.selectedAmenities.includes('Swimming_Pool') ? 1 : 0,
          Gymnasium: projectDetails.selectedAmenities.includes('Gymnasium') ? 1 : 0,
          Clubhouse: projectDetails.selectedAmenities.includes('Clubhouse') ? 1 : 0,
          Children_Play_Area: projectDetails.selectedAmenities.includes('Children_Play_Area') ? 1 : 0,
          Parking: projectDetails.selectedAmenities.includes('Parking') ? 1 : 0,
          Security_Guards: projectDetails.selectedAmenities.includes('Security_Guards') ? 1 : 0,
          CCTV_Surveillance: projectDetails.selectedAmenities.includes('CCTV_Surveillance') ? 1 : 0,
          Power_Backup: projectDetails.selectedAmenities.includes('Power_Backup') ? 1 : 0,
          Water_Supply: projectDetails.selectedAmenities.includes('Water_Supply') ? 1 : 0,
          Elevator: projectDetails.selectedAmenities.includes('Elevator') ? 1 : 0,
        },
      ],
      
      phases: phases.map(phase => ({
        ...phase,
        Rera_Number: phase.Rera_Number || null,
        Phase_Status: phase.Phase_Status || null,
        Start_Date: phase.Start_Date || null,
        Delivery_Date: phase.Delivery_Date || null,
        Total_Towers: phase.Total_Towers || null,
        Phase_Description: phase.Phase_Description || null,
      })),
      units: UnitDeclaration.map(unit => ({
        ...unit,
        phase_id: unit.phase_id || (phases[0] ? phases[0].Phase_id : null),
        unitCategory: unit.unitCategory || null,
        unitType: unit.unitType || null,
        Friendly_name: unit.unitFriendlyName || null,
        super_area: unit.superArea || null,
        build_area: unit.buildUpArea || null,
        carpet_area: unit.carpetArea || null,
        furnished: unit.unitFurnishedStatus || null,
        layout: unit.unitLayout || null,
        unitDetails: unit.unitDetails.map(space => ({
          spaceType: space.spaceType || null,
          spaceArea: space.spaceArea || null,
          furnished_status: space.furnished_status || null,
        })),
      })),
    };
  
    console.log("Submitting Project Data:", projectData);
  
    try {
      const response = await axios.post(
        'http://localhost:8021/api/projects/submitProject',
        projectData
      );
      console.log('Project added successfully:', response.data);
      alert('Project submitted successfully!');
    } catch (error) {
      console.error(
        'Error adding project:',
        error.response ? error.response.data : error.message
      );
      alert(`Error submitting project: ${error.response?.data?.message || error.message}`);
    }
  };
  


  const removeUnitDeclaration = (index) => {
    const updatedUnits = UnitDeclaration.filter((_, i) => i !== index);
    setUnitDeclaration(updatedUnits);
  };


   // Helper function to calculate the max delivery date (30 years from launch date)
   const getMaxDate = () => {
    if (!projectDetails.launchDate) return "";
    const launchDate = new Date(projectDetails.launchDate);
    launchDate.setFullYear(launchDate.getFullYear() + 30); // Add 30 years
    return launchDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Helper function for validation messages
  const validateDate = (date) => {
    if (!projectDetails.launchDate) return true;

    const launchDate = new Date(projectDetails.launchDate);
    const selectedDate = new Date(date);
    const maxDate = new Date(getMaxDate());

    return selectedDate > launchDate && selectedDate <= maxDate;
  };



    const [unitCategory, setUnitCategory] = useState('');
    const [unitType, setUnitType] = useState('');
  
    // Handle change in unit category
    const handleCategoryChange = (e) => {
      setUnitCategory(e.target.value);
      setUnitType(''); // Reset unit type when category changes
    };
  
    // Handle change in unit type
    const handleTypeChange = (e) => {
      setUnitType(e.target.value);
    };



    const setAmenities = (newAmenities) => {
      setProjectDetails({
        ...projectDetails,
        selectedAmenities: newAmenities
      });
    };



      // Add a space to each unit
  const addSpaceToUnit = (unitIndex) => {
    const updatedUnitDeclaration = [...UnitDeclaration];
    updatedUnitDeclaration[unitIndex].unitDetails = [
      ...updatedUnitDeclaration[unitIndex].unitDetails,
      { spaceType: '', spaceArea: '', furnished_status:'' }, // You can add other space fields here
    ];
    setUnitDeclaration(updatedUnitDeclaration);
  };

  // Handle space input changes
  const handleSpaceChange = (unitIndex, spaceIndex, e) => {
    const { name, value } = e.target;
    const updatedUnitDeclaration = [...UnitDeclaration];
    updatedUnitDeclaration[unitIndex].unitDetails[spaceIndex][name] = value;
    setUnitDeclaration(updatedUnitDeclaration);
  };
  
    // Function to handle MediaSection callback
    const updateMediaUrl = (uploadedUrls) => {
      if (uploadedUrls.length > 0) {
        const url = uploadedUrls[0]; // Assuming a single file is uploaded
        setProjectDetails((prevDetails) => ({
          ...prevDetails,
          uploadedMedia: url, // Update the uploaded media URL
        }));
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
          
          <BuilderDropdown
            projectDetails={projectDetails}
            handleInputChange={handleInputChange}
          />
        </div>







        <div className="form-group">
          <label htmlFor="launchDate">Project Start Date</label>
          <input
            type="date"
            className="form-control"
            id="launchDate"
            name="launchDate"
            value={projectDetails.launchDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Select City</label>
          <select
            className="form-control"
            name="city" // Matches the key in `projectDetails`
            value={projectDetails.city} // Controlled by React state
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
            <option value="Greater Noida">Greater Noida</option>
          </select>
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



          {/* Delivery Status Dropdown */}
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

          {/* Delivery Date (Completed) */}
          {projectDetails.deliveryStatus === "Completed" && (
            <div className="form-group">
              <label>Delivery Date</label>
              <input
                type="date"
                className="form-control"
                name="deliveryDate"
                value={projectDetails.deliveryDate}
                onChange={handleInputChange}
                min={projectDetails.launchDate || ""}
                max={getMaxDate()}
              />
              {!validateDate(projectDetails.deliveryDate) && (
                <small className="text-danger">
                  Delivery Date must be after Launch Date and within 30 years.
                </small>
              )}
            </div>
          )}

          {/* Expected Delivery Date (Under Construction) */}
          {projectDetails.deliveryStatus === "Under Construction" && (
            <div className="form-group">
              <label>Expected Delivery Date</label>
              <input
                type="date"
                className="form-control"
                name="expectedDeliveryDate"
                value={projectDetails.deliveryDate}
                onChange={handleInputChange}
                min={projectDetails.launchDate || ""}
                max={getMaxDate()}
              />
              {!validateDate(projectDetails.expectedDeliveryDate) && (
                <small className="text-danger">
                  Expected Delivery Date must be after Launch Date and within 30 years.
                </small>
              )}
            </div>
          )}




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



      {/* MediaSection Component */}
      <div className="mb-3">
        <label>Upload Media</label>
        <MediaSection updateMasterLayoutPlan={updateMediaUrl} />
      </div>

      {/* Uploaded Media URL Input Field */}
      <div className="mb-3">
        <label>Uploaded Media URL</label>
        <input
          type="text"
          name="uploadedMedia"
          value={projectDetails.uploadedMedia}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Uploaded media URL will appear here"
          readOnly
        />
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
            readOnly 
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
            value={phase.Phase_Status} 
            onChange={(e) => handlePhaseChange(index, e)}
          >
            <option value="">Select Status</option> 
            <option value="Complete">Complete</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>



        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            name="Start_Date"
            value={phase.Start_Date}
            onChange={(e) => handlePhaseChange(index, e)}
          />
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
            name="Phase_Description"
            value={phase.Phase_Description}
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
            {/* Iterate over all units */}
      {UnitDeclaration.map((unit, index) => (
        <div key={index}>
          <h4>Unit {index + 1}</h4>

          {/* Unit Category Dropdown */}
          <div className="form-group">
            <label>Unit Category</label>
            <select
              className="form-control"
              name="unitCategory"
              value={unit.unitCategory}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            >
              <option value="">Select Category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Unit Type Dropdown */}
          <div className="form-group">
            <label>Unit Type</label>
            <select
              className="form-control"
              name="unitType"
              value={unit.unitType}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            >
              <option value="">Select Unit Type</option>
              {unit.unitCategory === 'Residential' ? (
                <>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="Penthouse">Penthouse</option>
                </>
              ) : unit.unitCategory === 'Commercial' ? (
                <>
                  <option value="Office">Office</option>
                  <option value="Retail">Retail</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Warehouse">Warehouse</option>
                </>
              ) : null}
            </select>
          </div>

          <div className="form-group">
            <label>Unit Friednly Name</label>
            <input
              type="text"
              className="form-control"
              name="unitFriendlyName"
              value={unit.unitFriendlyName}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            />
          </div>

          {/* Other fields */}
          <div className="form-group">
            <label>Super Area (sq. ft.)</label>
            <input
              type="number"
              className="form-control"
              name="superArea"
              value={unit.superArea}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Build Up Area (sq. ft.)</label>
            <input
              type="number"
              className="form-control"
              name="buildUpArea"
              value={unit.buildUpArea}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Carpet Area (sq. ft.)</label>
            <input
              type="number"
              className="form-control"
              name="carpetArea"
              value={unit.carpetArea}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            />
          </div>

          <div className="form-group">
            <label>Furnished Status</label>
            <select
              className="form-control"
              name="unitFurnishedStatus"
              value={unit.unitFurnishedStatus}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            >
              <option value="">Select Category</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Fully-Furnished">Fully-Furnished</option>
            </select>
          </div>

          <div className="form-group">
            <label>Layout</label>
            <input
              type="text"
              className="form-control"
              name="unitLayout"
              value={unit.unitLayout}
              onChange={(e) => handleUnitDeclarationChange(index, e)}
            />
          </div>




            {/* Add unitDetails Button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => addSpaceToUnit(index)}
            >
              Add Space
            </button>

            {/* unitDetails for the current unit */}
            {unit.unitDetails?.map((space, spaceIndex) => (
              <div key={spaceIndex} className="form-group">
                


                <label>Space Type</label>
                  <select
                    className="form-control"
                    name="spaceType"
                    value={space.spaceType}
                    onChange={(e) => handleSpaceChange(index, spaceIndex, e)}
                  >
                    <option value="">Select Space Type</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Studyroom">Studyroom</option>
                    <option value="Poojaroom">Poojaroom</option>
                    <option value="Servantroom">Servantroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Balcony">Balcony</option>
                    <option value="Storage">Storage</option>
                    {/* Add more space types as needed */}
                  </select>



                <label>Space Area</label>
                <input
                  type="number"
                  className="form-control"
                  name="spaceArea"
                  value={space.spaceArea}
                  onChange={(e) => handleSpaceChange(index, spaceIndex, e)}
                />


                  <label>Furnished Status</label>
                  <select
                    className="form-control"
                    name="furnished_status"
                    value={space.furnished_status}
                    onChange={(e) => handleSpaceChange(index, spaceIndex, e)}
                  >
                    <option value="">Select Furnished Status</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>

                    {/* Add more space types as needed */}
                  </select>


              </div>
            ))}

            {/* Remove Unit Button */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeUnitDeclaration(index)}
            >
              Remove Unit
            </button>
          </div>
        ))}

      {/* Button to add a new unit */}
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




{/* Amenities Section */}
<h3>Amenities</h3>
        <AmenitiesSection
          selectedAmenities={projectDetails.selectedAmenities}
          setAmenities={setAmenities}
        />

        

        <button type="submit" className="btn btn-success">
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectAddPage;

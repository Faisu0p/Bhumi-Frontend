import React, { useState, useEffect } from 'react';
import './ProjectAddPage.css';

const ProjectAddPage = () => {
  const [phases, setPhases] = useState([]);  // No phases by default
  const [projectData, setProjectData] = useState({
    city: '',
    builderName: '',
    projectName: '',
    companyUnder: '',
    launchDate: '',
    shortCode: '',
    status: '',
    deliveryMonthYear: '',
    reraNo: '',
    totalTowers: '',
    totalFlats: '',
    sectorBriefing: '',
    projectBriefing: '',
    masterLayout: '',
    category1: {
      apartments: false,
      flats: false,
      penthouse: false,
      kothi: false,
      villa: false,
      plot: false,
      builderIndependentFloor: false,
      farmhouse: false,
      studio: false,
      serviceApartment: false,
    },
    category2: {
      apartments: false,
      flats: false,
      retail: false,
      storage: false,
      industry: false,
      warehouse: false,
      hospitality: false,
    },
    amenities: {
      maintenanceStaff: false,
      waterStorage: false,
      securityPersonnel: false,
      park: false,
      visitorParking: false,
      ownersParking: false,
    }
  });
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target; // Destructure input attributes
  
    // Check if it's a checkbox or a regular input field (like text or select)
    if (type === 'checkbox') {
      if (name in projectData.category1) {
        // Handle category1 checkboxes
        setProjectData((prevData) => ({
          ...prevData,
          category1: {
            ...prevData.category1,
            [name]: checked,
          },
        }));
      } else if (name in projectData.category2) {
        // Handle category2 checkboxes
        setProjectData((prevData) => ({
          ...prevData,
          category2: {
            ...prevData.category2,
            [name]: checked,
          },
        }));
      } else if (name in projectData.amenities) {
        // Handle amenities checkboxes
        setProjectData((prevData) => ({
          ...prevData,
          amenities: {
            ...prevData.amenities,
            [name]: checked,
          },
        }));
      }
    } else {
      // Handle non-checkbox inputs (like text inputs and select)
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value, // Update the value of the specific input field
      }));
    }
  };
  
  
  

  const handlePhaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPhases = [...phases];
    updatedPhases[index][name] = value;
    
    setPhases(updatedPhases);
    
    // Update projectData with the new values of towers and apartments if phase is delivered
    if (updatedPhases[index].status === 'Delivered') {
      setProjectData((prevData) => ({
        ...prevData,
        totalDeliveredPhases: phases.filter((phase) => phase.status === 'Delivered').length, // Update total delivered phases
        totalTowersCompleted: phases.filter((phase) => phase.status === 'Delivered')
                                    .reduce((total, phase) => total + parseInt(phase.noOfTowers || 0), 0), // Update towers completed
        totalApartmentsCompleted: phases.filter((phase) => phase.status === 'Delivered')
                                         .reduce((total, phase) => total + parseInt(phase.noOfApartments || 0), 0), // Update apartments completed
      }));
    }
  };
  

  const addPhase = () => {
    const newPhase = {
      phaseNumber: phases.length + 1,
      status: '',
      deliveryDate: '',
      noOfTowers: 0,
      noOfApartments: 0,
    };
    
    setPhases([...phases, newPhase]);
    
    setProjectData((prevData) => ({
      ...prevData,
      totalPhases: phases.length + 1, // Update total number of phases
    }));
  };
  

  const removePhase = (index) => {
    const updatedPhases = phases.filter((_, i) => i !== index); // Remove phase by index
    setPhases(updatedPhases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newProjectData = {
      ...projectData,
      phases: phases,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProjectData),
      });
  
      // Check for non-OK responses
      if (!response.ok) {
        const errorDetails = await response.text(); // Log the error details
        console.error("Error response from server:", errorDetails);
        throw new Error("Failed to add project");
      }
  
      const data = await response.json();
      console.log("Project added successfully:", data);
      setProjectData({});
      setPhases([]);
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };
  
  

  const [builders, setBuilders] = useState([]);

  useEffect(() => {
    // Fetch builder names from the backend
    async function fetchBuilders() {
      try {
        const response = await fetch("http://localhost:5000/api/builders"); // Your backend URL
        const data = await response.json();
        if (data && data.data) {
          setBuilders(data.data); // Use `data.data` as the builder names array
        }
      } catch (error) {
        console.error("Error fetching builders:", error);
      }
    }

    fetchBuilders();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="project-add-form">
      {/* General Project Info */}
      <div className="project-info-section">
        <label>City</label>
        <input type="text" name="city" value={projectData.city} onChange={handleInputChange} />

        <label>Builder Name</label>
          <select
            name="builderName"
            value={projectData.builderName}
            onChange={handleInputChange}
          >
            <option value="">Select a builder</option>
            {builders.map((builder, index) => (
              <option key={index} value={builder}>
                {builder}
              </option>
            ))}
          </select>


        <label>Project Name</label>
        <input type="text" name="projectName" value={projectData.projectName} onChange={handleInputChange} />

        <label>Company Under Project Launched</label>
        <input type="text" name="companyUnder" value={projectData.companyUnder} onChange={handleInputChange} />

        <label>Project Launch Date</label>
        <input type="date" name="launchDate" value={projectData.launchDate} onChange={handleInputChange} />

        <label>Project Short Code</label>
        <input type="text" name="shortCode" value={projectData.shortCode} onChange={handleInputChange} />

        <label>Delivered or Under Construction</label>
        <select name="status" value={projectData.status} onChange={handleInputChange}>
          <option value="Delivered">Delivered</option>
          <option value="Under Construction">Under Construction</option>
        </select>

        {projectData.status === 'Delivered' && (
          <>
            <label>Delivery Month and Year</label>
            <input type="month" name="deliveryMonthYear" value={projectData.deliveryMonthYear} onChange={handleInputChange} />
          </>
        )}

        <label>RERA No</label>
        <input type="text" name="reraNo" value={projectData.reraNo} onChange={handleInputChange} />
      </div>

      {/* Total Number of Towers and Flats in the Society */}
      <div className="towers-flats-section">
        <label>Total No of Towers in the Society</label>
        <input type="number" name="totalTowers" value={projectData.totalTowers} onChange={handleInputChange} />

        <label>Total No of Flats in the Society</label>
        <input type="number" name="totalFlats" value={projectData.totalFlats} onChange={handleInputChange} />
      </div>

      {/* Phases Section */}
      {phases.length === 0 && <p>No phases added yet. Click "Add Phase" to start.</p>}
      {phases.map((phase, index) => (
        <div key={index} className="phase-info-section">
          <h3>Phase {phase.phaseNumber}</h3>

          <label>Delivered or Under Construction</label>
          <select name="status" value={phase.status} onChange={(e) => handlePhaseChange(index, e)}>
            <option value="Delivered">Delivered</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          {phase.status === 'Delivered' && (
            <>
              <label>Delivery Month and Year</label>
              <input type="month" name="deliveryDate" value={phase.deliveryDate} onChange={(e) => handlePhaseChange(index, e)} />
            </>
          )}

          <label>No of Towers in this Phase</label>
          <input type="number" name="noOfTowers" onChange={(e) => handlePhaseChange(index, e)} />

          <label>No of Apartments in this Phase</label>
          <input type="number" name="noOfApartments" onChange={(e) => handlePhaseChange(index, e)} />

          <button type="button" onClick={() => removePhase(index)}>Remove Phase</button>
        </div>
      ))}
      <button type="button" className="add-phase-btn" onClick={addPhase}>Add Phase</button>

      {/* Total Society Info */}
      <div className="society-info-section">
        <label>Sector Briefing</label>
        <textarea name="sectorBriefing" value={projectData.sectorBriefing} onChange={handleInputChange} />

        <label>Project Briefing</label>
        <textarea name="projectBriefing" value={projectData.projectBriefing} onChange={handleInputChange} />

        <label>Master Layout Plan (Enter Image URL)</label>
        <input
          type="text"
          name="masterLayout"
          placeholder="Enter the image URL here"
          value={projectData.masterLayout}
          onChange={handleInputChange}
        />
      </div>

      {/* Category Selection */}
      <div className="category-selection-section">
        <h4>Residential Units</h4>
        <label>
          <input type="checkbox" name="apartments" checked={projectData.category1.apartments} onChange={(e) => handleInputChange(e)} />
          Apartments
        </label>
        <label>
          <input type="checkbox" name="flats" checked={projectData.category1.flats} onChange={(e) => handleInputChange(e)} />
          Flats
        </label>
        <label>
          <input type="checkbox" name="penthouse" checked={projectData.category1.penthouse} onChange={(e) => handleInputChange(e)} />
          Penthouse
        </label>
        <label>
          <input type="checkbox" name="kothi" checked={projectData.category1.kothi} onChange={(e) => handleInputChange(e)} />
          Kothi
        </label>
        <label>
          <input type="checkbox" name="villa" checked={projectData.category1.villa} onChange={(e) => handleInputChange(e)} />
          Villa
        </label>
        <label>
          <input type="checkbox" name="plot" checked={projectData.category1.plot} onChange={(e) => handleInputChange(e)} />
          Plot
        </label>
        <label>
          <input type="checkbox" name="builderIndependentFloor" checked={projectData.category1.builderIndependentFloor} onChange={(e) => handleInputChange(e)} />
          Builder Independent Floor
        </label>
        <label>
          <input type="checkbox" name="farmhouse" checked={projectData.category1.farmhouse} onChange={(e) => handleInputChange(e)} />
          Farmhouse
        </label>
        <label>
          <input type="checkbox" name="studio" checked={projectData.category1.studio} onChange={(e) => handleInputChange(e)} />
          Studio
        </label>
        <label>
          <input type="checkbox" name="serviceApartment" checked={projectData.category1.serviceApartment} onChange={(e) => handleInputChange(e)} />
          Service Apartment
        </label>

        <h4>Commercial Units</h4>

        <label>
          <input type="checkbox" name="retail" checked={projectData.category2.retail} onChange={(e) => handleInputChange(e)} />
          Retail
        </label>
        <label>
          <input type="checkbox" name="storage" checked={projectData.category2.storage} onChange={(e) => handleInputChange(e)} />
          Storage
        </label>
        <label>
          <input type="checkbox" name="industry" checked={projectData.category2.industry} onChange={(e) => handleInputChange(e)} />
          Industry
        </label>
        <label>
          <input type="checkbox" name="warehouse" checked={projectData.category2.warehouse} onChange={(e) => handleInputChange(e)} />
          Warehouse
        </label>
        <label>
          <input type="checkbox" name="hospitality" checked={projectData.category2.hospitality} onChange={(e) => handleInputChange(e)} />
          Hospitality
        </label>
      </div>



      {/* Amenities Section */}
      <div className="amenities-selection-section">
        <h4>Amenities</h4>
        <label>
          <input type="checkbox" name="maintenanceStaff" checked={projectData.amenities.maintenanceStaff} onChange={(e) => handleInputChange(e)} />
          Maintenance Staff
        </label>
        <label>
          <input type="checkbox" name="waterStorage" checked={projectData.amenities.waterStorage} onChange={(e) => handleInputChange(e)} />
          Water Storage
        </label>
        <label>
          <input type="checkbox" name="securityPersonnel" checked={projectData.amenities.securityPersonnel} onChange={(e) => handleInputChange(e)} />
          Security Personnel
        </label>
        <label>
          <input type="checkbox" name="park" checked={projectData.amenities.park} onChange={(e) => handleInputChange(e)} />
          Park 
        </label>
        <label>
          <input type="checkbox" name="visitorParking" checked={projectData.amenities.visitorParking} onChange={(e) => handleInputChange(e)} />
          Visitor Parking
        </label>
        <label>
          <input type="checkbox" name="ownersParking" checked={projectData.amenities.ownersParking} onChange={(e) => handleInputChange(e)} />
          Owners Parking
        </label>
      </div>
      



      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default ProjectAddPage;

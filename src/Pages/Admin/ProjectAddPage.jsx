import React, { useState, useEffect } from 'react';
import './ProjectAddPage.css';

const ProjectAddPage = () => {
  const [formData, setFormData] = useState({
    city: '',
    builderName: '',
    builderId: '',
    projectName: '',
    companyUnderProjectLaunched: '',
    projectLaunchedDate: '',
    projectShortCode: '',
    completionStatus: '',
    reraNumber: '',
    totalTowers: '',
    totalApartments: '',
    sectorBriefing: '',
    projectBriefing: '',
    masterLayout: '',
    residentialUnits: [],
    commercialUnits: [],
    amenities: [],
    phases: []
  });

  // State for storing builder data from the backend
  const [builders, setBuilders] = useState([]);

    // Fetch builder names and IDs from backend
    useEffect(() => {
      const fetchBuilders = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/builders/');
          const data = await response.json();
          console.log(data); // Log to check the structure
    
          if (data && data.data) {
            // Assuming 'data.data' holds the builders array
            setBuilders(data.data); 
          } else {
            console.error("Builder data not found in response");
          }
        } catch (error) {
          console.error("Error fetching builder names:", error);
        }
      };
    
      fetchBuilders();
    }, []);
    

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'builder') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [category]: [...formData[category], value] });
    } else {
      setFormData({ ...formData, [category]: formData[category].filter(item => item !== value) });
    }
  };

  const handleAddPhase = () => {
    setFormData({
      ...formData,
      phases: [
        ...formData.phases,
        { status: '', noOfTowers: '', noOfApartments: '' }
      ]
    });
  };

  const handleRemovePhase = (index) => {
    const newPhases = formData.phases.filter((_, i) => i !== index);
    setFormData({ ...formData, phases: newPhases });
  };

  const handlePhaseChange = (index, field, value) => {
    const newPhases = formData.phases.map((phase, i) => {
      if (i === index) {
        return { ...phase, [field]: value };
      }
      return phase;
    });
    setFormData({ ...formData, phases: newPhases });
  };

  const handleBuilderChange = (e) => {
    const builderId = e.target.value;
    
    setFormData({
      ...formData,
      builderId, // Update builderId with the selected value
      builderName: builders.find(builder => builder.builder_id === parseInt(builderId))?.fullName || '', // Optional: Update builderName
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Optional: Client-side validation
    if (!formData.projectName || !formData.builderId) {
      alert('Please fill in required fields.');
      return;
    }
  
    try {
      const response = await fetch('/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert('Submission failed: ' + (errorData.message || 'Unknown error'));
      } else {
        alert('Project added successfully!');
        setFormData(initialFormState); // Reset form on success
      }
    } catch (error) {
      console.error('Request Error:', error);
      alert('Error submitting form: ' + error.message);
    }
  };
  
  

  return (
    <div className="project-add-page">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="builder">Builder</label>
          <select
  id="builder"
  name="builder"
  value={formData.builderId} // This should be linked to builderId in formData
  onChange={handleBuilderChange}
  required
>
  <option value="">Select a builder</option>
  {builders.map((builder) => (
    <option key={builder.builder_id} value={builder.builder_id}>
      {builder.fullName}
    </option>
  ))}
</select>


        </div>


        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="companyUnderProjectLaunched">Company under project launched</label>
          <input type="text" id="companyUnderProjectLaunched" name="companyUnderProjectLaunched" value={formData.companyUnderProjectLaunched} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="projectLaunchedDate">Project launched date</label>
          <input type="date" id="projectLaunchedDate" name="projectLaunchedDate" value={formData.projectLaunchedDate} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="projectShortCode">Project short code</label>
          <input type="text" id="projectShortCode" name="projectShortCode" value={formData.projectShortCode} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="completionStatus">Completion status</label>
          <select id="completionStatus" name="completionStatus" value={formData.completionStatus} onChange={handleInputChange} required>
            <option value="">Select status</option>
            <option value="completed">Completed</option>
            <option value="under construction">Under Construction</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reraNumber">RERA Number</label>
          <input type="text" id="reraNumber" name="reraNumber" value={formData.reraNumber} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="totalTowers">Total number of towers</label>
          <input type="number" id="totalTowers" name="totalTowers" value={formData.totalTowers} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="totalApartments">Total number of apartments</label>
          <input type="number" id="totalApartments" name="totalApartments" value={formData.totalApartments} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="sectorBriefing">Sector briefing</label>
          <textarea id="sectorBriefing" name="sectorBriefing" value={formData.sectorBriefing} onChange={handleInputChange} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="projectBriefing">Project Briefing</label>
          <textarea id="projectBriefing" name="projectBriefing" value={formData.projectBriefing} onChange={handleInputChange} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="masterLayout">Master layout (enter URL)</label>
          <input type="url" id="masterLayout" name="masterLayout" value={formData.masterLayout} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Residential Units</label>
          <div className="checkbox-group">
            {['Apartments', 'Flats', 'Penthouse', 'Kothi', 'Villa', 'Plot', 'Builder Independent Floor', 'Farmhouse', 'Studio', 'Service Apartment'].map((unit) => (
              <label key={unit}>
                <input
                  type="checkbox"
                  value={unit}
                  checked={formData.residentialUnits.includes(unit)}
                  onChange={(e) => handleCheckboxChange(e, 'residentialUnits')}
                />
                {unit}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Commercial Units</label>
          <div className="checkbox-group">
            {['Retail', 'Storage', 'Industry', 'Warehouse', 'Hospitality'].map((unit) => (
              <label key={unit}>
                <input
                  type="checkbox"
                  value={unit}
                  checked={formData.commercialUnits.includes(unit)}
                  onChange={(e) => handleCheckboxChange(e, 'commercialUnits')}
                />
                {unit}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Amenities</label>
          <div className="checkbox-group">
            {['Pool', 'Maintenance Staff', 'Water Storage', 'Security Personnel', 'Park', 'Visitor Parking', 'Owners Parking'].map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={(e) => handleCheckboxChange(e, 'amenities')}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <h2>Phases</h2>
          {formData.phases.map((phase, index) => (
            <div key={index} className="phase">
              <h3>Phase {index + 1}</h3>
              <div className="form-group">
                <label htmlFor={`phase-${index}-status`}>Status</label>
                <select
                  id={`phase-${index}-status`}
                  value={phase.status}
                  onChange={(e) => handlePhaseChange(index, 'status', e.target.value)}
                  required
                >
                  <option value="">Select status</option>
                  <option value="completed">Completed</option>
                  <option value="under construction">Under Construction</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={`phase-${index}-towers`}>No of towers in this phase</label>
                <input
                  type="number"
                  id={`phase-${index}-towers`}
                  value={phase.noOfTowers}
                  onChange={(e) => handlePhaseChange(index, 'noOfTowers', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`phase-${index}-apartments`}>No of apartments in this phase</label>
                <input
                  type="number"
                  id={`phase-${index}-apartments`}
                  value={phase.noOfApartments}
                  onChange={(e) => handlePhaseChange(index, 'noOfApartments', e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={() => handleRemovePhase(index)}>Remove Phase</button>
            </div>
          ))}
          <button type="button" onClick={handleAddPhase}>Add Phase</button>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ProjectAddPage;


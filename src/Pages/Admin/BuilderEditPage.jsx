import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBuilderById, editBuilder } from "./apis/builderApi";
import MediaSection from "./components/MediaSection";
import StateCityDropdown from "./components/StateCityDropdown ";
import './BuilderEditPage.css';

const BuilderEditPage = () => {
  const { id } = useParams(); // Access the builder ID from the URL
  const [formData, setFormData] = useState({
    citiesAndStates: [],
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: "",
    yearsInRealEstate: 0,
    shortDescription: "",
    builderLogoRectangle: "",
  });

  // Fetch builder data on component mount
  useEffect(() => {
    const fetchBuilderData = async () => {
      try {
        const response = await getBuilderById(id); // Get builder data by ID
        const builderData = response;

        // Prefill the form with fetched builder data
        setFormData({
          builderCompleteName: builderData.FullName,
          builderShortName: builderData.NickName,
          builderLogo: builderData.Builder_logo,
          yearsInRealEstate: builderData.Years_of_experience,
          shortDescription: builderData.Short_Description,
          builderLogoRectangle: builderData.Builder_logo_rectangle,
          citiesAndStates: builderData.State_Name.split(",").map((state, index) => ({
            state: state.trim(),
            city: builderData.City_Name.split(",")[index].trim(),
          })),
        });
      } catch (error) {
        console.error("Error fetching builder data:", error); // Log error if occurs
      }
    };

    fetchBuilderData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle numeric inputs (e.g., years in real estate)
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? "" : Math.max(0, Number(value)) });
  };

  // Handle the builder logo update
  const updatebuilderLogo = (url) => {
    setFormData({ ...formData, builderLogo: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure logos are not treated as arrays
    const updatedFormData = {
      ...formData,
      builderLogo: Array.isArray(formData.builderLogo)
        ? formData.builderLogo[0]
        : formData.builderLogo,
  
      builderLogoRectangle: Array.isArray(formData.builderLogoRectangle)
        ? formData.builderLogoRectangle[0]
        : formData.builderLogoRectangle,
    };
  
    // Prepare the cities and states data (array of state-city objects)
    const citiesAndStates = formData.citiesAndStates.map((location) => ({
      state: location.state,
      city: location.city,
    }));
  
    // Prepare the data to be sent (match the backend's expected keys)
    const updatedBuilderData = {
      builderCompleteName: updatedFormData.builderCompleteName,  // Match builderCompleteName
      builderShortName: updatedFormData.builderShortName,    // Match builderShortName
      builderLogo: updatedFormData.builderLogo,     // Match builderLogo
      yearsInRealEstate: updatedFormData.yearsInRealEstate,  // Match yearsInRealEstate
      shortDescription: updatedFormData.shortDescription,  // Match shortDescription
      builderLogoRectangle: updatedFormData.builderLogoRectangle, // Match builderLogoRectangle
      citiesAndStates: citiesAndStates,  // citiesAndStates remains the same
    };
  
    // Print the final data before sending the request
    console.log("Final data being sent to the request:", updatedBuilderData);
  
    try {
      // Call the update API to submit the updated builder data, builderId in URL
      const response = await editBuilder(id, updatedBuilderData);  // Use builder ID in the URL
      alert("Builder information updated successfully!");
  
      // Reset the form after successful submission
      setFormData({
        citiesAndStates: [],
        builderCompleteName: "",
        builderShortName: "",
        builderLogo: "",
        yearsInRealEstate: 0,
        shortDescription: "",
        builderLogoRectangle: "",
      });
    } catch (error) {
      console.error("Error updating builder data:", error); // Log error if update fails
      alert("There was an error updating the builder information.");
    }
  };
  
  

  // Handle state and city selection changes
  const handleLocationChange = (formattedCitiesAndStates) => {
    setFormData((prevData) => {
      // Track cities that have already been added
      const citiesAlreadyAdded = new Set(prevData.citiesAndStates.map((location) => location.city));

      // Filter out cities that have already been added in previous selections
      const updatedCitiesAndStates = [
        ...prevData.citiesAndStates,
        ...formattedCitiesAndStates.filter((newLocation) => {
          if (!citiesAlreadyAdded.has(newLocation.city)) {
            citiesAlreadyAdded.add(newLocation.city);  // Add city to the set
            return true;
          }
          return false;
        }),
      ];

      return { ...prevData, citiesAndStates: updatedCitiesAndStates };
    });
  };

  return (
    <div className="builder-container builder-flex-center builder-page">
      <div className="builder-card builder-shadow builder-form-card">
        <h2 className="builder-text-center builder-text-danger">Edit Builder</h2>
        <form onSubmit={handleSubmit}>

          {/* Builder Complete Name Input */}
          <div className="builder-form-group">
            <label htmlFor="builderCompleteName" className="builder-form-label">Enter Builder Complete Name <span className="required-asterisk">*</span></label>
            <input
              type="text"
              name="builderCompleteName"
              value={formData.builderCompleteName}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Bhumi Builders Pvt. Ltd."
            />
          </div>

          {/* Builder Short Name Input */}
          <div className="builder-form-group">
            <label htmlFor="builderShortName" className="builder-form-label">Enter Builder's Nick/Short Name <span className="required-asterisk">*</span></label>
            <input
              type="text"
              name="builderShortName"
              value={formData.builderShortName}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Bhumi Builders"
            />
          </div>

          {/* State and City Input */}
          <div className="builder-form-group">
            <StateCityDropdown onLocationChange={handleLocationChange} />
          </div>

          {/* Display List of States */}
          <div className="builder-form-group">
            <label htmlFor="statesList" className="builder-form-label">List of States</label>
            <input
              type="text"
              id="statesList"
              name="statesList"
              value={formData.citiesAndStates.map(location => location.state).join(", ")}
              readOnly
              className="builder-form-control"
              placeholder="Selected States"
            />
          </div>

          {/* Display List of Cities */}
          <div className="builder-form-group">
            <label htmlFor="citiesList" className="builder-form-label">List of Cities</label>
            <input
              type="text"
              id="citiesList"
              name="citiesList"
              value={formData.citiesAndStates.map(location => location.city).join(", ")}
              readOnly
              className="builder-form-control"
              placeholder="Selected Cities"
            />
          </div>

          {/* Media Section for uploading Builder Logo Square */}
          <div className="builder-form-group">
            <label htmlFor="masterLayoutPlan" className="builder-form-label">Upload Builder Logo Square <span className="required-asterisk">*</span></label>
            <MediaSection
              key={formData.builderLogo}
              updateMasterLayoutPlan={updatebuilderLogo}
              maxSize={1024 * 1024}
              previewStyle={{
                objectFit: "contain", 
                width: "100%",        
                maxWidth: "250px",     
                height: "auto",       
                maxHeight: "250px",    
                margin: "0 auto",      
                display: "block"       
              }}
              allowedTypes={["image/png"]}
              labelText="Select Your Logo"
              fileLabelText="Max Size: 1 MB | PNG | Square (500x500)"
              requiredWidth={500}
              requiredHeight={500}
            />
          </div>

          {/* Builder Logo URL Input */}
          <div className="builder-form-group">
            <input
              type="text"
              id="builderLogo"
              name="builderLogo"
              value={formData.builderLogo}
              onChange={handleChange} 
              readOnly
              className="builder-form-control"
              placeholder="e.g., https://example.com/logo.jpg"
            />
          </div>

          {/* Media Section for uploading Builder Logo Rectangle */}
          <div className="builder-form-group">
            <label htmlFor="builderLogoRectangle" className="builder-form-label">Upload Builder Logo Rectangle <span className="required-asterisk">*</span></label>
            <MediaSection
              key={formData.builderLogoRectangle}
              updateMasterLayoutPlan={(url) => setFormData({ ...formData, builderLogoRectangle: url })}
              maxSize={1024 * 1024}
              previewStyle={{
                objectFit: "contain", 
                width: "100%",        
                maxWidth: "300px",    
                height: "auto",       
                maxHeight: "300px",   
                margin: "0 auto",     
                display: "block"      
              }}
              allowedTypes={["image/png"]}
              labelText="Select Your Logo"
              fileLabelText="Max Size: 1 MB | PNG | Rectangle (1200x600)"
              requiredWidth={1200}
              requiredHeight={600}
            />
          </div>

          {/* Builder Short Description */}
          <div className="builder-form-group">
            <label htmlFor="shortDescription" className="builder-form-label">Enter Builder Short Description <span className="required-asterisk">*</span></label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="builder-form-control"
              placeholder="Enter Description"
              required
            />
          </div>

          {/* Years in Real Estate */}
          <div className="builder-form-group">
            <label htmlFor="yearsInRealEstate" className="builder-form-label">Years in Real Estate</label>
            <input
              type="number"
              name="yearsInRealEstate"
              value={formData.yearsInRealEstate}
              onChange={handleNumberChange}
              className="builder-form-control"
              placeholder="e.g., 5"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="builder-btn builder-btn-danger">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BuilderEditPage;

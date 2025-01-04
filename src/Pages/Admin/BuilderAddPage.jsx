import React, { useState } from "react";
import { createBuilder } from "./apis/builderApi";
import MediaSection from "./components/MediaSection";
import StateCityDropdown from "./components/StateCityDropdown ";
import './BuilderAddPage.css';

const BuilderAddPage = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: null,
    yearsInRealEstate: 0,
    shortDescription: "",
    state: "",
    builderLogoRectangle: "",
  });

  // Add this state for unique keys
  const [mediaSectionKeys, setMediaSectionKeys] = useState({
    builderLogo: Date.now(), // Unique key for the square logo MediaSection
    builderLogoRectangle: Date.now() + 1, // Unique key for the rectangular logo MediaSection
  });



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? "" : Math.max(0, Number(value)) });
  };

  // Function to update builderLogo with the uploaded image URL
  const updatebuilderLogo = (url) => {
    setFormData({ ...formData, builderLogo: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Manually validate the builderLogo field
  if (!formData.builderLogo) {
    alert("Builder Square Logo URL is required!");
    return;
  }

  if (!formData.builderLogoRectangle) {
    alert("Builder Rectangular Logo URL is required!");
    return;
  }

    const updatedFormData = {
      ...formData,
      builderLogo: Array.isArray(formData.builderLogo)
        ? formData.builderLogo[0]
        : formData.builderLogo,

      builderLogoRectangle: Array.isArray(formData.builderLogoRectangle)
      ? formData.builderLogoRectangle[0]
      : formData.builderLogoRectangle,
    };

    try {
      console.log("Form data before submission:", updatedFormData);
      const response = await createBuilder(updatedFormData);
      console.log("Builder Data Submitted:", response);
      alert("Builder information submitted successfully!");

      // Reset form data after successful submission
      setFormData({
        city: "",
        builderCompleteName: "",
        builderShortName: "",
        builderLogo: "",
        yearsInRealEstate: 0,
        shortDescription: "",
        state: "",
        builderLogoRectangle: "",
      });
    } catch (error) {
      console.error("Error submitting builder data:", error);
      alert("There was an error submitting the builder information.");
    }

    setMediaSectionKeys({
      builderLogo: Date.now(),
      builderLogoRectangle: Date.now() + 1,
    });
  };

    // Function to handle state and city changes
    const handleLocationChange = ({ state, city }) => {
      setFormData((prevData) => ({
        ...prevData,
        state: state || prevData.state,  // Only update state if a state is selected
        city: city || prevData.city,      // Only update city if a city is selected
      }));
    };

  return (
    <div className="builder-container builder-flex-center builder-page">
      <div className="builder-card builder-shadow builder-form-card">
        <h2 className="builder-text-center builder-text-danger">Add Builder</h2>
        <form onSubmit={handleSubmit}>


          {/* State and City Input */}
          <div className="builder-form-group">
            <StateCityDropdown onLocationChange={handleLocationChange} />
          </div>


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

          {/* Media Section for uploading Builder Logo Square */}
          <div className="builder-form-group">
            <label htmlFor="masterLayoutPlan" className="builder-form-label">Upload Builder Logo Square <span className="required-asterisk">*</span></label>

            <MediaSection
            key={mediaSectionKeys.builderLogo} // Unique key for the square logo MediaSection
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
            key={mediaSectionKeys.builderLogoRectangle} // Unique key for the rectangular logo MediaSection
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

          {/* Builder Logo Rectangle URL Input */}
          <div className="builder-form-group">
            <input
              type="text"
              id="builderLogoRectangle"
              name="builderLogoRectangle"
              value={formData.builderLogoRectangle}
              onChange={handleChange}
              readOnly
              className="builder-form-control"
              placeholder="e.g., https://example.com/logo-rectangle.jpg"
            />
          </div>


          {/* Years in Real Estate */}
          <div className="builder-form-group">
            <label htmlFor="yearsInRealEstate" className="builder-form-label">Enter Years in Real Estate <span className="required-asterisk">*</span></label>
            <div className="builder-input-group">
              <input
                type="number"
                id="yearsInRealEstate"
                name="yearsInRealEstate"
                value={formData.yearsInRealEstate || ""}
                onChange={handleNumberChange}
                onBlur={(e) => {
                  if (formData.yearsInRealEstate === "") {
                    setFormData({ ...formData, yearsInRealEstate: "" });
                  }
                }}
                required
                min="0"
                max="100"
                className="builder-form-control"
                placeholder="e.g., 10"
              />
              <span className="builder-input-group-text">Years</span>
            </div>
          </div>

          {/* Short Description */}
          <div className="builder-form-group">
            <label htmlFor="shortDescription" className="builder-form-label">Enter Short Description <span className="required-asterisk">*</span></label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows="3"
              className="builder-form-control"
              placeholder="e.g., We specialize in residential and commercial buildings."
            />
          </div>

          {/* Submit Button */}
          <div className="builder-flex-center">
            <button type="submit" className="builder-btn builder-btn-danger">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderAddPage;
import React, { useState } from "react";
import { createBuilder } from "./apis/builderApi";
import MediaSection from "./components/MediaSection";
import './BuilderAddPage.css';

const BuilderAddPage = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: null,
    yearsInRealEstate: 0,
    shortDescription: "",
    listOfProjects: "",
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

    const updatedFormData = {
      ...formData,
      builderLogo: Array.isArray(formData.builderLogo)
        ? formData.builderLogo[0]
        : formData.builderLogo,
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
        builderLogo: null,
        yearsInRealEstate: 0,
        shortDescription: "",
        listOfProjects: "",
      });
    } catch (error) {
      console.error("Error submitting builder data:", error);
      alert("There was an error submitting the builder information.");
    }
  };

  return (
    <div className="builder-container builder-flex-center builder-page">
      <div className="builder-card builder-shadow builder-form-card">
        <h2 className="builder-text-center builder-text-danger">Builder Information Form</h2>
        <form onSubmit={handleSubmit}>
          {/* City Input */}
          <div className="builder-form-group">
            <label htmlFor="city" className="builder-form-label">Enter City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., New Delhi"
            />
          </div>

          {/* Builder Complete Name Input */}
          <div className="builder-form-group">
            <label htmlFor="builderCompleteName" className="builder-form-label">Enter Builder Complete Name</label>
            <input
              type="text"
              name="builderCompleteName"
              value={formData.builderCompleteName}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Sharma Builders Pvt. Ltd."
            />
          </div>

          {/* Builder Short Name Input */}
          <div className="builder-form-group">
            <label htmlFor="builderShortName" className="builder-form-label">Enter Builder's Nick/Short Name</label>
            <input
              type="text"
              name="builderShortName"
              value={formData.builderShortName}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Sharma Builders"
            />
          </div>

          {/* Media Section for uploading image */}
          <div className="builder-form-group">
            <label htmlFor="masterLayoutPlan" className="builder-form-label">Upload Builder Logo</label>
            <MediaSection updateMasterLayoutPlan={updatebuilderLogo} maxSize={100 * 1024} /> 
          </div>

          {/* Builder Logo URL Input */}
          <div className="builder-form-group">
            <label htmlFor="builderLogo" className="builder-form-label">Enter Builder Logo URL</label>
            <input
              type="text"
              id="builderLogo"
              name="builderLogo"
              value={formData.builderLogo}
              onChange={handleChange}
              className="builder-form-control"
              placeholder="e.g., https://example.com/logo.jpg"
            />
          </div>

          {/* Years in Real Estate */}
          <div className="builder-form-group">
            <label htmlFor="yearsInRealEstate" className="builder-form-label">Enter Years in Real Estate</label>
            <div className="builder-input-group">
              <input
                type="number"
                id="yearsInRealEstate"
                name="yearsInRealEstate"
                value={formData.yearsInRealEstate}
                onChange={handleNumberChange}
                onBlur={(e) => {
                  if (formData.yearsInRealEstate === "") {
                    setFormData({ ...formData, yearsInRealEstate: 0 });
                  }
                }}
                required
                min="0"
                className="builder-form-control"
                placeholder="e.g., 10"
              />
              <span className="builder-input-group-text">Years</span>
            </div>
          </div>

          {/* Short Description */}
          <div className="builder-form-group">
            <label htmlFor="shortDescription" className="builder-form-label">Enter Short Description</label>
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

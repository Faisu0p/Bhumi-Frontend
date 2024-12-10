import React, { useState } from 'react';
import axios from 'axios';
import './BuilderAddPage.css';

function BuilderAddPage() {
  const [formData, setFormData] = useState({
    city: '',
    fullName: '',
    shortName: '',
    yearsInRealEstate: '',
    shortDescription: '',
    projects: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/builders/add', formData);
      console.log('Builder added:', response.data);
      alert('Builder added successfully!');
    } catch (err) {
      console.error('Error adding builder:', err);
      alert('Error adding builder');
    }
  };

  return (
    <div className="builder-add-page-container">
      <h1 className="builder-add-page-title">Add Builder</h1>
      <form className="builder-add-page-form" onSubmit={handleSubmit}>
        <div className="builder-add-page-form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="builder-add-page-form-group">
          <label htmlFor="fullName">Builder Complete Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="builder-add-page-form-group">
          <label htmlFor="shortName">Builder's Nick/Short Name</label>
          <input
            type="text"
            id="shortName"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="builder-add-page-form-group">
          <label htmlFor="yearsInRealEstate">No. of Years in Real Estate</label>
          <input
            type="number"
            id="yearsInRealEstate"
            name="yearsInRealEstate"
            value={formData.yearsInRealEstate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="builder-add-page-form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="builder-add-page-form-group">
          <label htmlFor="projects">List of Projects</label>
          <textarea
            id="projects"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="builder-add-page-submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default BuilderAddPage;

import React, { useState } from 'react';
import UnitDetailForm from './UnitDetailForm';
import './UnitForm.css';
import MediaSection from './MediaSection'; // Adjust the path if necessary


const UnitForm = ({ onUnitChange, unit }) => {
  const [unitDetails, setUnitDetails] = useState(unit.unitDetails || []);
  const [category, setCategory] = useState(unit.unitCategory || '');
  const [unitType, setUnitType] = useState(unit.unitType || '');
  const [unitFriendlyName, setUnitFriendlyName] = useState('');
  const [unitFurnishedStatus, setUnitFurnishedStatus] = useState('');

  const updateMediaUrl = (url) => {
    const updatedUrl = Array.isArray(url) ? url[0] : url; // Use the first URL if it's an array
    onUnitChange('unitLayout', updatedUrl); // Update the unitLayout field with the single URL
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUnitChange(name, value);
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategory(value);
    // Reset unitType when category changes
    setUnitType('');
    onUnitChange('unitCategory', value); // Send updated category to parent
  };

  const handleUnitTypeChange = (e) => {
    const { value } = e.target;
    setUnitType(value);
    onUnitChange('unitType', value); // Send updated unitType to parent
  };

  const handleUnitFriendlyNameChange = (e) => {
    const value = e.target.value;
    setUnitFriendlyName(value);
    onUnitChange('unitFriendlyName', value); // Notify parent
  };
  

  const handleUnitFurnishedStatusChange = (e) => {
    const value = e.target.value;
    setUnitFurnishedStatus(value);
    onUnitChange('unitFurnishedStatus', value); // Notify parent
  };
  

  const handleUnitDetailChange = (index, name, value) => {
    const updatedDetails = [...unitDetails];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    setUnitDetails(updatedDetails);
    onUnitChange('unitDetails', updatedDetails);
  };

  const addUnitDetail = () => {
    const newDetail = { spaceType: '', unitSize: '', unitFurnishedStatus: '' };
    setUnitDetails((prev) => [...prev, newDetail]);
    onUnitChange('unitDetails', [...unitDetails, newDetail]);
  };

  const removeUnitDetail = (index) => {
    const updatedDetails = unitDetails.filter((_, i) => i !== index);
    setUnitDetails(updatedDetails);
    onUnitChange('unitDetails', updatedDetails);
  };

  return (
    <div className="unit-form-container">
      <h4 className="unit-form-heading">Unit Information</h4>
      <h4 className="unit-form-definition">A Unit is a piece of property you can buy, sell, or rent. 
        It could be a plot of land, an apartment, a studio, or something similar.</h4>

      {/* Category Dropdown */}
      <label className="unit-form-label" htmlFor="unitCategory">
        Select the Category <span className="required-asterisk">*</span>
      </label>
      <select
        name="unitCategory"
        id="unitCategory"
        className="unit-form-select"
        value={category}
        onChange={handleCategoryChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
      </select>

      {/* Conditionally render Unit Type Dropdown based on Category */}
      {category === 'Residential' && (
        <>
          <label className="unit-form-label" htmlFor="unitType">
            Select the Unit Type <span className="required-asterisk">*</span>
          </label>
          <select
            name="unitType"
            id="unitType"
            className="unit-form-select"
            value={unitType}
            onChange={handleUnitTypeChange}
            required
          >
            <option value="">Select Unit Type</option>
            <option value="Service Apartment">Service Apartment</option>
            <option value="Flat">Flat</option>
            <option value="Duplex">Duplex</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Studio">Studio</option>
            <option value="Condo">Condo</option>
          </select>
        </>
      )}

      {category === 'Commercial' && (
        <>
          <label className="unit-form-label" htmlFor="unitType">
            Select the Unit Type <span className="required-asterisk">*</span>
          </label>
          <select
            name="unitType"
            id="unitType"
            className="unit-form-select"
            value={unitType}
            onChange={handleUnitTypeChange}
            required
          >
            <option value="">Select Unit Type</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Showroom">Showroom</option>
            <option value="Co-working Space">Co-working Space</option>
          </select>
        </>
      )}

<label htmlFor="unitFriendlyName" className="unit-form-label">
    Enter Unit Friendly Name <span className="required-asterisk">*</span>
  </label>
  <input
    id="unitFriendlyName"
    type="text"
    value={unitFriendlyName}
    onChange={handleUnitFriendlyNameChange}
    className="unit-form-input"
    required
    placeholder="Unit Friendly Name"
  />

<label htmlFor="unitFurnishedStatus" className="unit-form-label">
    Select Furnished Status <span className="required-asterisk">*</span>
  </label>
  <select
    id="unitFurnishedStatus"
    value={unitFurnishedStatus}
    onChange={handleUnitFurnishedStatusChange}
    className="unit-form-input"
    required
  >
    <option value="" disabled hidden>
      Select Furnished Status
    </option>
    <option value="Fully Furnished">Fully Furnished</option>
    <option value="Semi Furnished">Semi Furnished</option>
    <option value="Unfurnished">Unfurnished</option>
  </select>

      {/* Super Area Input */}
      <label className="unit-form-label" htmlFor="superArea">
        Enter Super Area (sq. ft.) <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        name="superArea"
        id="superArea"
        className="unit-form-input"
        value={unit.superArea || ''}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (value < 0) {
            alert("Super Area cannot be less than 0.");
            return;
          }
          if (value > 900000) {
            alert("Super Area cannot exceed 900,000.");
            return;
          }

          handleChange(e);
        }}
        required
        placeholder="Super Area (sq. ft.)"
      />

      {/* Built-up Area Input */}
      <label className="unit-form-label" htmlFor="buildUpArea">
        Enter Built-up Area (sq. ft.) <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        name="buildUpArea"
        id="buildUpArea"
        className="unit-form-input"
        value={unit.buildUpArea || ''}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (value < 0) {
            alert("Built-up Area cannot be less than 0.");
            return;
          }
          if (value > 900000) {
            alert("Built-up Area cannot exceed 900,000.");
            return;
          }
          if (value >= unit.superArea) {
            alert("Built-up Area must be less than Super Area.");
            return;
          }

          handleChange(e);
        }}
        required
        placeholder="Built-up Area (sq. ft.)"
      />

      {/* Carpet Area Input */}
      <label className="unit-form-label" htmlFor="carpetArea">
        Enter Carpet Area (sq. ft.) <span className="required-asterisk">*</span>
      </label>
      <input
        type="number"
        name="carpetArea"
        id="carpetArea"
        className="unit-form-input"
        value={unit.carpetArea || ''}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (value < 0) {
            alert("Carpet Area cannot be less than 0.");
            return;
          }
          if (value > 900000) {
            alert("Carpet Area cannot exceed 900,000.");
            return;
          }
          if (value >= unit.buildUpArea) {
            alert("Carpet Area must be less than Built-up Area.");
            return;
          }

          handleChange(e);
        }}
        required
        placeholder="Carpet Area (sq. ft.)"
      />


      {/* Unit Layout Textarea */}
      <label className="unit-form-label" htmlFor="unitLayout">
        Add Unit Layout <span className="required-asterisk">*</span>
      </label>

      {/* Media Section for uploading unit layout image */}
      {/* <MediaSection
        updateMasterLayoutPlan={updateMediaUrl}
        maxSize={5 * 1024 * 1024}  // 5 MB max size
        previewStyle={{
          objectFit: "contain",
          width: "100%",
          maxWidth: "600px",
          height: "auto"
        }}
      /> */}

      <MediaSection
        // key={mediaSectionKeys.updateMediaUrl} // Unique key for the master layout plan MediaSection
        updateMasterLayoutPlan={updateMediaUrl}
        maxSize={1024 * 1024} // Max file size of 1 MB
        previewStyle={{
          objectFit: "contain",  
          width: "100%",        
          maxWidth: "150px",   // Adjusted for wider display (landscape)
          height: "auto",       
          maxHeight: "150px",   // Adjusted for a taller display (landscape)
          margin: "0 auto",      
          display: "block"       
        }}
        allowedTypes={["image/png", "image/jpeg"]} // Allow both PNG and JPEG formats
        labelText="Select Your Master Layout Plan"
        fileLabelText="Max Size: 1 MB | PNG, JPEG | Landscape (150x150)px"
        requiredWidth={150}  // Required width for the layout plan
        requiredHeight={150} // Required height for the layout plan
      />

      <textarea
        name="unitLayout"
        id="unitLayout"
        className="unit-form-textarea"
        value={unit.unitLayout || ''}
        onChange={handleChange}
        required
        placeholder="Unit Layout"
      />

      {/* Unit Details */}
      <h4 className="unit-form-heading">Unit Details</h4>
      {unitDetails.map((detail, index) => (
        <div key={index}>
          <UnitDetailForm
            key={index}
            index={index}
            unitDetailData={detail}
            onChange={handleUnitDetailChange}
          />
          <button
            type="button"
            className="unit-form-btn remove-unit-detail-btn"
            onClick={() => removeUnitDetail(index)}
          >
            Remove Unit Detail
          </button>
        </div>
      ))}
      <button
        type="button"
        className="unit-form-btn"
        onClick={addUnitDetail}
      >
        Add Unit Detail
      </button>
    </div>
  );
};

export default UnitForm;

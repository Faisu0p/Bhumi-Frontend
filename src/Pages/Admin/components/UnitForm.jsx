import React, { useState } from 'react';
import UnitDetailForm from './UnitDetailForm';
import './UnitForm.css';

const UnitForm = ({ onNext, units }) => {
  const [unitData, setUnitData] = useState({
    // unitCategory: '',
    // unitType: '',
    // superArea: '',
    // unitFurnishedStatus: '',
    // unitFriendlyName: '',
    // buildUpArea: '',
    // carpetArea: '',
    // unitLayout: ''
     unitCategory: '1BHK',
  unitType: 'Apartment',
  superArea: '1000',
  unitFurnishedStatus: 'Unfurnished',
  unitFriendlyName: 'Unit 1A',
  buildUpArea: '1200',
  carpetArea: '800',
  unitLayout: 'Layout details here.',
  });

  const [unitDetails, setUnitDetails] = useState([]); // State to track UnitDetailForm data

  // Handle the change in the main unit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the change in a specific UnitDetailForm
  const handleUnitDetailChange = (index, name, value) => {
    const updatedUnitDetails = [...unitDetails];
    updatedUnitDetails[index] = { ...updatedUnitDetails[index], [name]: value };
    setUnitDetails(updatedUnitDetails);
  };

  // Add a new UnitDetailForm
  const addUnitDetail = () => {
    setUnitDetails([...unitDetails, { unitSize: '', unitFurnishedStatus: '', spaceType: '' }]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!unitData.unitCategory || !unitData.unitType || !unitData.superArea) {
      alert('Please fill in all required fields');
      return;
    }

    // Ensure all UnitDetailForm fields are filled
    const allDetailsValid = unitDetails.every(
      (detail) => detail.unitSize && detail.unitFurnishedStatus && detail.spaceType
    );
    if (!allDetailsValid) {
      alert('Please fill in all unit detail fields');
      return;
    }

    // Combine unit data and unit details, then pass to the next step
    onNext([...units, { ...unitData, unitDetails }]);

    // Reset form after submission
    setUnitData({
      unitCategory: '',
      unitType: '',
      superArea: '',
      unitFurnishedStatus: '',
      unitFriendlyName: '',
      buildUpArea: '',
      carpetArea: '',
      unitLayout: ''
    });
    setUnitDetails([]); // Clear the unit details
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Unit Details</h2>

      {/* Unit Category */}
      <select
        name="unitCategory"
        value={unitData.unitCategory}
        onChange={handleChange}
        required
      >
        <option value="">Select Unit Category</option>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
        <option value="Studio">Studio</option>
        <option value="Commercial">Commercial</option>
      </select>

      {/* Unit Type */}
      <select
        name="unitType"
        value={unitData.unitType}
        onChange={handleChange}
        required
      >
        <option value="">Select Unit Type</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Office">Office</option>
        <option value="Shop">Shop</option>
      </select>

      {/* Friendly Name */}
      <input
        type="text"
        name="unitFriendlyName"
        value={unitData.unitFriendlyName}
        onChange={handleChange}
        placeholder="Friendly Name"
      />

      {/* Super Area */}
      <input
        type="number"
        name="superArea"
        value={unitData.superArea}
        onChange={handleChange}
        placeholder="Super Area (sq. ft.)"
        required
      />

      {/* Built-up Area */}
      <input
        type="number"
        name="buildUpArea"
        value={unitData.buildUpArea}
        onChange={handleChange}
        placeholder="Built-up Area (sq. ft.)"
      />

      {/* Carpet Area */}
      <input
        type="number"
        name="carpetArea"
        value={unitData.carpetArea}
        onChange={handleChange}
        placeholder="Carpet Area (sq. ft.)"
      />

      {/* Furnished Status */}
      <select
        name="unitFurnishedStatus"
        value={unitData.unitFurnishedStatus}
        onChange={handleChange}
      >
        <option value="">Select Furnished Status</option>
        <option value="Fully Furnished">Fully Furnished</option>
        <option value="Semi Furnished">Semi Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>

      {/* Unit Layout */}
      <textarea
        name="unitLayout"
        value={unitData.unitLayout}
        onChange={handleChange}
        placeholder="Unit Layout Description"
      />

      {/* Dynamic Unit Detail Forms */}
      <h3>Unit Details</h3>
      {unitDetails.map((unitDetail, index) => (
        <UnitDetailForm
          key={index}
          index={index}
          unitDetailData={unitDetail}
          onChange={handleUnitDetailChange}
        />
      ))}

      <button type="button" onClick={addUnitDetail}>
        Add Unit Details
      </button>

      <button type="submit">Next</button>
    </form>
  );
};

export default UnitForm;

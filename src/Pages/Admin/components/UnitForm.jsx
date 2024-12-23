import React, { useState } from 'react';
import UnitDetailForm from './UnitDetailForm';

const UnitForm = ({ onUnitChange, unit }) => {
  const [unitDetails, setUnitDetails] = useState(unit.unitDetails || []);
  const [category, setCategory] = useState(unit.unitCategory || '');
  const [unitType, setUnitType] = useState(unit.unitType || '');

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

  return (
    <div className="unit-form">
      <h4>Unit Information</h4>

      {/* Category Dropdown */}
      <select
        name="unitCategory"
        value={category}
        onChange={handleCategoryChange}
        placeholder="Select Category"
      >
        <option value="">Select Category</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
      </select>

      {/* Conditionally render Unit Type Dropdown based on Category */}
      {category === 'Residential' && (
        <select
          name="unitType"
          value={unitType}
          onChange={handleUnitTypeChange}
          placeholder="Select Unit Type"
        >
          <option value="">Select Unit Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Flat">Flat</option>
          <option value="Duplex">Duplex</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
        </select>
      )}

      {category === 'Commercial' && (
        <select
          name="unitType"
          value={unitType}
          onChange={handleUnitTypeChange}
          placeholder="Select Unit Type"
        >
          <option value="">Select Unit Type</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Showroom">Showroom</option>
          <option value="Co-working Space">Co-working Space</option>
        </select>
      )}
      <input
        type="number"
        name="superArea"
        value={unit.superArea || ''}
        onChange={handleChange}
        placeholder="Super Area (sq. ft.)"
      />
      <input
        type="number"
        name="buildUpArea"
        value={unit.buildUpArea || ''}
        onChange={handleChange}
        placeholder="Built-up Area (sq. ft.)"
      />
      <input
        type="number"
        name="carpetArea"
        value={unit.carpetArea || ''}
        onChange={handleChange}
        placeholder="Carpet Area (sq. ft.)"
      />
      <textarea
        name="unitLayout"
        value={unit.unitLayout || ''}
        onChange={handleChange}
        placeholder="Unit Layout"
      />

      {/* Unit Details */}
      <h4>Unit Details</h4>
      {unitDetails.map((detail, index) => (
        <UnitDetailForm
          key={index}
          index={index}
          unitDetailData={detail}
          onChange={handleUnitDetailChange}
        />
      ))}
      <button type="button" onClick={addUnitDetail}>
        Add Unit Detail
      </button>
    </div>
  );
};

export default UnitForm;

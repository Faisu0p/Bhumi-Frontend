import React, { useState } from 'react';
import UnitDetailForm from './UnitDetailForm';

const UnitForm = ({ onUnitChange, unit }) => {
  const [unitDetails, setUnitDetails] = useState(unit.unitDetails || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUnitChange(name, value);
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

      {/* Unit Fields */}
      <input
        type="text"
        name="unitCategory"
        value={unit.unitCategory || ''}
        onChange={handleChange}
        placeholder="Unit Category"
      />
      <input
        type="text"
        name="unitType"
        value={unit.unitType || ''}
        onChange={handleChange}
        placeholder="Unit Type"
      />
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

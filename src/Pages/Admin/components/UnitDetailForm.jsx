import React from 'react';
import './UnitDetailForm.css';

const UnitDetailForm = ({ index, onChange, unitDetailData }) => {
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  return (
    <div className="unit-detail-form-container">
      <h4 className="unit-detail-form-heading">Unit Detail {index + 1}</h4>

      {/* Space Type */}
      <label htmlFor="spaceType" className="unit-detail-form-label">
        Select Room Type
      </label>
      <select
        name="spaceType"
        className="unit-detail-form-select"
        value={unitDetailData.spaceType || ''}
        onChange={handleFieldChange}
      >
        <option value="">Select Room Type</option>
        <option value="Living Room">Living Room</option>
        <option value="Dining Room">Dining Room</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Bedroom">Bedroom</option>
        <option value="Study Room">Study Room</option>
        <option value="Servant Room">Servant Room</option>
        <option value="Bathroom">Bathroom</option>
        <option value="Pooja Room">Pooja Room</option>
        <option value="Balcony">Balcony</option>
        <option value="Storage">Storage</option>
      </select>

      {/* Unit Size */}
      <label htmlFor="unitSize" className="unit-detail-form-label">
        Enter Total Area (sq. ft.)
      </label>
      <input
        type="number"
        name="unitSize"
        className="unit-detail-form-input"
        value={unitDetailData.unitSize || ''}
        onChange={handleFieldChange}
        placeholder="Unit Size (sq. ft.)"
      />

      {/* Unit Length */}
      <label htmlFor="unitLength" className="unit-detail-form-label">
        Enter Length (sq. ft.)
      </label>
      <input
        type="number"
        name="unitLength"
        className="unit-detail-form-input"
        value={unitDetailData.unitLength || ''}
        onChange={handleFieldChange}
        placeholder="Unit Length (sq. ft.)"
      />

      {/* Unit Bredth */}
      <label htmlFor="unitBredth" className="unit-detail-form-label">
        Enter Bredth (sq. ft.)
      </label>
      <input
        type="number"
        name="unitBredth"
        className="unit-detail-form-input"
        value={unitDetailData.unitBredth || ''}
        onChange={handleFieldChange}
        placeholder="Unit Bredth (sq. ft.)"
      />

      {/* Furnished Status */}
      <label htmlFor="unitFurnishedStatus" className="unit-detail-form-label">
        Select Furnished Status
      </label>
      <select
        name="unitFurnishedStatus"
        className="unit-detail-form-select"
        value={unitDetailData.unitFurnishedStatus || ''}
        onChange={handleFieldChange}
      >
        <option value="">Select Furnished Status</option>
        <option value="Fully Furnished">Fully Furnished</option>
        <option value="Semi Furnished">Semi Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>
    </div>
  );
};

export default UnitDetailForm;

import React, { useState } from 'react';
import './PropertyFilters.css';

const PropertyFilters = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [budget, setBudget] = useState({ min: 0, max: 100 });
  const [minInput, setMinInput] = useState('0');
  const [maxInput, setMaxInput] = useState('100');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);

  const propertyTypes = ['Residential Apartment', 'Independent House/Villa'];
  const amenities = ['Swimming Pool', 'Gymnasium', 'Lift', 'Club house', 'Park'];
  const localities = [
    { name: 'Sector 128 Noida', count: 43 },
    { name: 'Noida Greater Noida Expressway', count: 42 },
    { name: 'Noida Extension', count: 44 },
    { name: 'Central Noida', count: 45 },
    { name: 'Sector 150', count: 42 }
  ];
  const bedrooms = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'];
  const floors = ['G-1', '1-5', '6-10', '11-15', '16-20', '21-25', '26-30', '30+'];

  const removeFilter = (filter) => {
    setAppliedFilters(appliedFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setSelectedLocalities([]);
    setSelectedBedrooms([]);
    setSelectedFloors([]);
    setBudget({ min: 0, max: 100 });
    setMinInput('0');
    setMaxInput('100');
  };

  const updateAppliedFilters = (category, item, isSelected) => {
    if (isSelected) {
      setAppliedFilters(prev => [...prev, `${category}: ${item}`]);
    } else {
      setAppliedFilters(prev => prev.filter(filter => filter !== `${category}: ${item}`));
    }
  };

  const handleBudgetChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min' && value < budget.max) {
      setBudget(prev => ({ ...prev, min: value }));
      setMinInput(value.toString());
      updateAppliedFilters('Budget', `₹${value} - ₹${budget.max}`, true);
    } else if (type === 'max' && value > budget.min) {
      setBudget(prev => ({ ...prev, max: value }));
      setMaxInput(value.toString());
      updateAppliedFilters('Budget', `₹${budget.min} - ₹${value}`, true);
    }
  };

  const handleBudgetInput = (e, type) => {
    const value = e.target.value;
    if (type === 'min') {
      setMinInput(value);
      if (value !== '' && parseInt(value) < budget.max) {
        setBudget(prev => ({ ...prev, min: parseInt(value) }));
        updateAppliedFilters('Budget', `₹${value} - ₹${budget.max}`, true);
      }
    } else {
      setMaxInput(value);
      if (value !== '' && parseInt(value) > budget.min) {
        setBudget(prev => ({ ...prev, max: parseInt(value) }));
        updateAppliedFilters('Budget', `₹${budget.min} - ₹${value}`, true);
      }
    }
  };

  return (
    <div className="property-filters">
      <div className="filters-section">
        <div className="section-header">
          <h3>Applied Filters</h3>
          <button onClick={clearAllFilters} className="clear-btn">Clear All</button>
        </div>
        <div className="applied-filters">
          {appliedFilters.map((filter, index) => (
            <span key={index} className="filter-tag">
              {filter}
              <button onClick={() => removeFilter(filter)} className="remove-filter">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="section-header">
          <h3>Budget</h3>
        </div>
        <div className="budget-slider">
          <span className="budget-label">₹0</span>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={budget.min}
              onChange={(e) => handleBudgetChange(e, 'min')}
              className="slider min-slider"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={budget.max}
              onChange={(e) => handleBudgetChange(e, 'max')}
              className="slider max-slider"
            />
          </div>
          <span className="budget-label">100+ Crores</span>
        </div>
        <div className="budget-inputs">
          <input
            type="text"
            value={minInput}
            onChange={(e) => handleBudgetInput(e, 'min')}
            placeholder="Min Budget"
            className="budget-input"
          />
          <input
            type="text"
            value={maxInput}
            onChange={(e) => handleBudgetInput(e, 'max')}
            placeholder="Max Budget"
            className="budget-input"
          />
        </div>
      </div>

      <div className="filters-section">
        <div className="section-header">
          <h3>Type of property</h3>
        </div>
        <div className="property-types">
          {propertyTypes.map((type, index) => (
            <button
              key={index}
              className={`property-type-btn ${selectedPropertyTypes.includes(type) ? 'selected' : ''}`}
              onClick={() => {
                const isSelected = !selectedPropertyTypes.includes(type);
                if (isSelected) {
                  setSelectedPropertyTypes(prev => [...prev, type]);
                } else {
                  setSelectedPropertyTypes(prev => prev.filter(t => t !== type));
                }
                updateAppliedFilters('Property Type', type, isSelected);
              }}
            >
              <span className="icon">
                {selectedPropertyTypes.includes(type) ? '✓' : '+'}
              </span>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="section-header">
          <h3>Amenities</h3>
        </div>
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <button
              key={index}
              className={`amenity-btn ${selectedAmenities.includes(amenity) ? 'selected' : ''}`}
              onClick={() => {
                const isSelected = !selectedAmenities.includes(amenity);
                if (isSelected) {
                  setSelectedAmenities(prev => [...prev, amenity]);
                } else {
                  setSelectedAmenities(prev => prev.filter(a => a !== amenity));
                }
                updateAppliedFilters('Amenity', amenity, isSelected);
              }}
            >
              <span className="icon">
                {selectedAmenities.includes(amenity) ? '✓' : '+'}
              </span>
              {amenity}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="section-header">
          <h3>Localities</h3>
        </div>
        <div className="localities-list">
          {localities.map((locality, index) => (
            <label key={index} className="locality-item">
              <input
              className='check-box'
                type="checkbox"
                checked={selectedLocalities.includes(locality.name)}
                onChange={() => {
                  const isSelected = !selectedLocalities.includes(locality.name);
                  if (isSelected) {
                    setSelectedLocalities(prev => [...prev, locality.name]);
                  } else {
                    setSelectedLocalities(prev => prev.filter(l => l !== locality.name));
                  }
                  updateAppliedFilters('Locality', locality.name, isSelected);
                }}
              />
              <span className="locality-name">{locality.name}</span>
              <span className="locality-count">({locality.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="section-header">
          <h3>Bedrooms</h3>
        </div>
        <div className="bedrooms-list">
          {bedrooms.map((bedroom, index) => (
            <button
              key={index}
              className={`bedroom-btn ${selectedBedrooms.includes(bedroom) ? 'selected' : ''}`}
              onClick={() => {
                const isSelected = !selectedBedrooms.includes(bedroom);
                if (isSelected) {
                  setSelectedBedrooms(prev => [...prev, bedroom]);
                } else {
                  setSelectedBedrooms(prev => prev.filter(b => b !== bedroom));
                }
                updateAppliedFilters('Bedrooms', bedroom, isSelected);
              }}
            >
              {bedroom}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="section-header">
          <h3>Floors</h3>
        </div>
        <div className="floors-list">
          {floors.map((floor, index) => (
            <button
              key={index}
              className={`floor-btn ${selectedFloors.includes(floor) ? 'selected' : ''}`}
              onClick={() => {
                const isSelected = !selectedFloors.includes(floor);
                if (isSelected) {
                  setSelectedFloors(prev => [...prev, floor]);
                } else {
                  setSelectedFloors(prev => prev.filter(f => f !== floor));
                }
                updateAppliedFilters('Floor', floor, isSelected);
              }}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;

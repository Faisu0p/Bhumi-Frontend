import React, { useState } from 'react';
import './PhaseForm.css';
import UnitForm from './UnitForm';

const PhaseForm = ({ onNext }) => {
  const [phases, setPhases] = useState([]);

  // Handle phase field changes
  const handlePhaseChange = (e, phaseIndex) => {
    const { name, value } = e.target;
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      [name]: value,
    };
    setPhases(updatedPhases);
  };

  // Handle adding a new phase
  const handleAddPhase = () => {
    const newPhase = {
      phaseNumber: '',
      reraNumber: '',
      phaseStatus: '',
      deliveryDate: '',
      totalTowers: '',
      phaseDescription: '',
      startDate: '',
      units: [],
    };
    setPhases((prevPhases) => [...prevPhases, newPhase]);
  };

  // Handle removing a phase
  const handleRemovePhase = (index) => {
    const updatedPhases = phases.filter((_, phaseIndex) => phaseIndex !== index);
    setPhases(updatedPhases);
  };

  // Handle adding a unit to a phase
  const handleAddUnit = (phaseIndex) => {
    const newUnit = {
      unitCategory: '',
      unitType: '',
      superArea: '',
      unitFurnishedStatus: '',
      unitFriendlyName: '',
      buildUpArea: '',
      carpetArea: '',
      unitLayout: '',
      unitDetails: [],
    };
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].units.push(newUnit);
    setPhases(updatedPhases);
  };

  // Handle removing a unit from a phase
  const handleRemoveUnit = (phaseIndex, unitIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].units = updatedPhases[phaseIndex].units.filter((_, idx) => idx !== unitIndex);
    setPhases(updatedPhases);
  };

  // Handle changes in a unit
  const handleUnitChange = (phaseIndex, unitIndex, field, value) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].units[unitIndex] = {
      ...updatedPhases[phaseIndex].units[unitIndex],
      [field]: value,
    };
    setPhases(updatedPhases);
  };

  // Handle form submission
  const handleNext = () => {
    // Validation: Check if all required fields are filled
    const allValid = phases.every((phase) => {
      return (
        phase.phaseNumber &&
        phase.reraNumber &&
        phase.phaseStatus &&
        phase.deliveryDate &&
        phase.startDate &&
        phase.totalTowers &&
        phase.phaseDescription
      );
    });

    if (!allValid) {
      alert('Please fill in all required fields for all phases.');
      return;
    }

    // Pass the data to the next step
    onNext(phases);
  };

  return (
    <form>
      <h2 className='phase-form-heading'>Phase Form</h2>

      {/* Iterate over phases */}
      {phases.map((phase, index) => (
        <div key={index} className="phase-form-phase">
          <h3>Phase {index + 1}</h3>

          {/* Phase Number */}
          <label className="phase-form-label" htmlFor={`phaseNumber-${index}`}>
            Enter Phase Number
          </label>
          <input
            type="text"
            name="phaseNumber"
            id={`phaseNumber-${index}`}
            value={index + 1}
            onChange={(e) => handlePhaseChange(e, index)}
            className="phase-form-input"
            placeholder="Phase Number"
          />

          {/* RERA Number */}
          <label className="phase-form-label" htmlFor={`reraNumber-${index}`}>
            Enter RERA Number <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            name="reraNumber"
            id={`reraNumber-${index}`}
            value={phase.reraNumber || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            className="phase-form-input"
            placeholder="RERA Number"
            required
          />

          {/* Phase Status */}
          <label className="phase-form-label" htmlFor={`phaseStatus-${index}`}>
            Select Phase Status <span className="required-asterisk">*</span>
          </label>
          <select
            name="phaseStatus"
            id={`phaseStatus-${index}`}
            value={phase.phaseStatus || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            className="phase-form-input"
            required
          >
            <option value="">Select Phase Status</option>
            <option value="Completed">Completed</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          {/* Start Date */}
          <label className="phase-form-label" htmlFor={`startDate-${index}`}>
            Select Start Date <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            id={`startDate-${index}`}
            value={phase.startDate || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            onKeyDown={(e) => e.preventDefault()} // Disable manual typing
            required // Make the field required
            className="phase-form-input"
          />

          {/* Conditionally Render Delivery Date Field */}
          {phase.phaseStatus && (
            <>
              <label className="phase-form-label" htmlFor={`deliveryDate-${index}`}>
                {phase.phaseStatus === 'Completed' ? 'Enter Delivery Date' : 'Expected Delivery Date'} <span className="required-asterisk">*</span>
              </label>
              <input
                type="date"
                name="deliveryDate"
                id={`deliveryDate-${index}`}
                value={phase.deliveryDate || ''}
                onChange={(e) => handlePhaseChange(e, index)}
                onKeyDown={(e) => e.preventDefault()} // Disable manual typing
                required // Make the field required
                className="phase-form-input"
              />
            </>
          )}

          {/* Total Towers */}
          <label className="phase-form-label" htmlFor={`totalTowers-${index}`}>
            Enter Total Towers <span className="required-asterisk">*</span>
          </label>
          <input
            type="number"
            name="totalTowers"
            id={`totalTowers-${index}`}
            value={phase.totalTowers || ''}
            onChange={(e) => {
              const value = e.target.value;

              // Custom validation to enforce the min and max limits
              if (value < 0) {
                alert("Total Towers cannot be less than 0.");
                return; // Prevent further execution if value is invalid
              }

              if (value > 200) {
                alert("Total Towers cannot exceed 200.");
                return; // Prevent further execution if value is invalid
              }

              // Handle valid input
              handlePhaseChange(e, index);
            }}
            className="phase-form-input"
            placeholder="Total Towers"
            required
            min="0"
            max="200"
          />




          {/* Phase Description */}
          <label className="phase-form-label" htmlFor={`phaseDescription-${index}`}>
            Enter Phase Description <span className="required-asterisk">*</span>
          </label>
          <textarea
            name="phaseDescription"
            id={`phaseDescription-${index}`}
            value={phase.phaseDescription || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            className="phase-form-input"
            placeholder="Phase Description"
            required
          />

          {/* Units */}
          <h4 className="phase-form-heading">Units</h4>


          {phase.units.map((unit, unitIndex) => (
            <div key={unitIndex} className="unit-form-container">
              <UnitForm
                unit={unit}
                onUnitChange={(field, value) =>
                  handleUnitChange(index, unitIndex, field, value)
                }
              />
              {/* Remove Unit Button */}
              <button
                type="button"
                className="phase-form-btn remove-unit-btn"
                onClick={() => handleRemoveUnit(index, unitIndex)}
              >
                Remove Unit
              </button>
            </div>
          ))}
          
          <button type="button" className="phase-form-btn" onClick={() => handleAddUnit(index)}>
            Add Unit
          </button>

          {/* Remove Phase Button */}
          <button
            type="button"
            className="phase-form-btn remove-phase-btn"
            onClick={() => handleRemovePhase(index)}
          >
            Remove Phase
          </button>
        </div>
      ))}

<div className="phase-form-buttons">
  <button type="button" className="phase-form-btn" onClick={handleAddPhase}>
    Add Phase
  </button>

  <button type="button" className="phase-form-btn" onClick={handleNext}>
    Next
  </button>
</div>

    </form>
  );
};

export default PhaseForm;

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
      <h2>Phase Form</h2>

      {/* Add Phase Button */}
      <button type="button" onClick={handleAddPhase}>
        Add Phase
      </button>

      {/* Iterate over phases */}
      {phases.map((phase, index) => (
        <div key={index} className="phase">
          <h3>Phase {index + 1}</h3>

          {/* Phase Number */}
          <input
            type="text"
            name="phaseNumber"
            value={phase.phaseNumber || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Phase Number"
          />

          {/* RERA Number */}
          <input
            type="text"
            name="reraNumber"
            value={phase.reraNumber || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="RERA Number"
          />

          {/* Phase Status */}
          <select
            name="phaseStatus"
            value={phase.phaseStatus || ''}
            onChange={(e) => handlePhaseChange(e, index)}
          >
            <option value="">Select Phase Status</option>
            <option value="Completed">Completed</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Planned">Planned</option>
          </select>

          {/* Delivery Date */}
          <input
            type="date"
            name="deliveryDate"
            value={phase.deliveryDate || ''}
            onChange={(e) => handlePhaseChange(e, index)}
          />

          {/* Start Date */}
          <input
            type="date"
            name="startDate"
            value={phase.startDate || ''}
            onChange={(e) => handlePhaseChange(e, index)}
          />

          {/* Total Towers */}
          <input
            type="number"
            name="totalTowers"
            value={phase.totalTowers || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Total Towers"
          />

          {/* Phase Description */}
          <textarea
            name="phaseDescription"
            value={phase.phaseDescription || ''}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Phase Description"
          />

          {/* Units */}
          <h4>Units</h4>
          <button type="button" onClick={() => handleAddUnit(index)}>
            Add Unit
          </button>

          {phase.units.map((unit, unitIndex) => (
            <UnitForm
              key={unitIndex}
              unit={unit}
              onUnitChange={(field, value) =>
                handleUnitChange(index, unitIndex, field, value)
              }
            />
          ))}
        </div>
      ))}

      {/* Submit Button */}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
};

export default PhaseForm;

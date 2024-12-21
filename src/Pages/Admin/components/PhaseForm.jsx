import React, { useState } from 'react';
import './PhaseForm.css';
import UnitForm from './UnitForm';

const PhaseForm = ({ onNext }) => {
  const [phases, setPhases] = useState([]);

  const [phaseData, setPhaseData] = useState({
    // phaseNumber: '',
    // reraNumber: '',
    // phaseStatus: '',
    // deliveryDate: '',
    // totalTowers: '',
    // phaseDescription: '',
    // startDate: ''
     phaseNumber: '1',
  reraNumber: 'RERA789012',
  phaseStatus: 'Under Development',
  deliveryDate: '2025-06-30',
  totalTowers: '3',
  phaseDescription: 'Phase 1 of the project.',
  startDate: '2024-06-01',
  });

  const handlePhaseChange = (e, phaseIndex) => {
    const { name, value } = e.target;
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex][name] = value;
    setPhases(updatedPhases);
  };

  const handleAddPhase = () => {
    // Add the current phase data to the phases array
    setPhases((prevPhases) => [
      ...prevPhases,
      { ...phaseData, units: [] } // Adding an empty array for units inside each phase
    ]);
    setPhaseData({
      phaseNumber: '',
      reraNumber: '',
      phaseStatus: '',
      deliveryDate: '',
      totalTowers: '',
      phaseDescription: '',
      startDate: ''
    }); // Reset form for the next phase
  };

  const handleAddUnit = (phaseIndex) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].units.push({}); // Add a new unit in the units array for this phase
    setPhases(newPhases);
  };

  const handleNext = () => {
    // Pass the phase data to the next form
    onNext(phases);
  };

  return (
    <form>
      <h2>Phases</h2>

      {/* Button to add a new phase */}
      <button type="button" onClick={handleAddPhase}>
        Add Phase
      </button>

      {/* Render phases */}
      {phases.map((phase, index) => (
        <div key={index} className="phase">
          <h3>Phase {phase.phaseNumber}</h3>

          {/* Phase Number */}
          <input
            type="number"
            name="phaseNumber"
            value={phase.phaseNumber}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Phase Number"
            required
          />

          {/* RERA Number */}
          <input
            type="text"
            name="reraNumber"
            value={phase.reraNumber}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="RERA Number"
            required
          />

          {/* Phase Status */}
          <select
            name="phaseStatus"
            value={phase.phaseStatus}
            onChange={(e) => handlePhaseChange(e, index)}
            required
          >
            <option value="">Select Phase Status</option>
            <option value="Completed">Completed</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          {/* Display Delivery Date only if the Phase has a status */}
          {phase.phaseStatus && (
            <div>
              <label>
                {phase.phaseStatus === 'Completed'
                  ? 'Enter Completion Date'
                  : 'Expected Completion Date'}
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={phase.deliveryDate}
                onChange={(e) => handlePhaseChange(e, index)}
                placeholder="Delivery Date"
              />
            </div>
          )}

          {/* Total Towers */}
          <input
            type="number"
            name="totalTowers"
            value={phase.totalTowers}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Total Towers"
            required
          />

          {/* Phase Description */}
          <textarea
            name="phaseDescription"
            value={phase.phaseDescription}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Phase Description"
          />

          {/* Add Units button */}
          <button type="button" onClick={() => handleAddUnit(index)}>
            Add Unit
          </button>

          {/* Render units for this phase */}
          {phase.units.map((unit, unitIndex) => (
            <div key={unitIndex} className="unit">
              <h4>Unit {unitIndex + 1}</h4>
              <UnitForm /> {/* Render UnitForm component for each unit */}
            </div>
          ))}
        </div>
      ))}

      {/* "Next" button to go to the next page */}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
};

export default PhaseForm;

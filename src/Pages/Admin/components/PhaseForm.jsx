import React, { useState } from 'react';
import './PhaseForm.css';
import UnitForm from './UnitForm';

const PhaseForm = ({ onNext }) => {
  const [phases, setPhases] = useState([]);

  const [phaseData, setPhaseData] = useState({
    phaseNumber: '1',
    reraNumber: 'RERA789012',
    phaseStatus: 'Under Development',
    deliveryDate: '2025-06-30',
    totalTowers: '3',
    phaseDescription: 'Phase 1 of the project.',
    startDate: '2024-06-01',
    units: []
  });

  const handlePhaseChange = (e, phaseIndex) => {
    const { name, value } = e.target;
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      [name]: value
    };
    setPhases(updatedPhases);
  };

  const handleAddPhase = () => {
    const newPhase = { ...phaseData, units: [] }; // Start with empty units array
    setPhases((prevPhases) => [...prevPhases, newPhase]);
    setPhaseData({
      phaseNumber: '',
      reraNumber: '',
      phaseStatus: '',
      deliveryDate: '',
      totalTowers: '',
      phaseDescription: '',
      startDate: '',
      units: []
    });
  };

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
      unitDetails: []
    };
    const newPhases = [...phases];
    newPhases[phaseIndex].units.push(newUnit);
    setPhases(newPhases);
  };

  const handleNext = () => {
    onNext(phases); // Pass the full phases data
  };

  return (
    <form>
      <h2>Phases</h2>
      <button type="button" onClick={handleAddPhase}>Add Phase</button>

      {phases.map((phase, index) => (
        <div key={index} className="phase">
          <h3>Phase {phase.phaseNumber}</h3>

          <input
            type="number"
            name="phaseNumber"
            value={phase.phaseNumber}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Phase Number"
            required
          />
          <input
            type="text"
            name="reraNumber"
            value={phase.reraNumber}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="RERA Number"
            required
          />
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

          <input
            type="number"
            name="totalTowers"
            value={phase.totalTowers}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Total Towers"
            required
          />

          <textarea
            name="phaseDescription"
            value={phase.phaseDescription}
            onChange={(e) => handlePhaseChange(e, index)}
            placeholder="Phase Description"
          />

          <button type="button" onClick={() => handleAddUnit(index)}>
            Add Unit
          </button>

          {phase.units.map((unit, unitIndex) => (
            <div key={unitIndex} className="unit">
              <h4>Unit {unitIndex + 1}</h4>
              <UnitForm
                onNext={(unitData) => handleAddUnit(index, unitData)}
                units={phase.units}
              />
            </div>
          ))}
        </div>
      ))}

      <button type="button" onClick={handleNext}>Next</button>
    </form>
  );
};

export default PhaseForm;

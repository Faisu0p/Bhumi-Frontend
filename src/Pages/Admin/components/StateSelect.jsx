import React, { useState } from 'react';

const StateSelect = ({ states, onAddState, selectedStateId, onChange }) => {
  const [stateName, setStateName] = useState('');

  const handleSubmit = () => {
    if (stateName) {
      onAddState(stateName);
      setStateName('');  // Clear the input after submission
    }
  };

  return (
    <div>
      <h3>Select State</h3>
      <select
        value={selectedStateId || ''}
        onChange={(e) => onChange(e.target.value, 'state')}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add new state"
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
      />
      <button onClick={handleSubmit}>Add State</button>
    </div>
  );
};

export default StateSelect;


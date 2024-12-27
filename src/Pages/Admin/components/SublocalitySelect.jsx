import React, { useState } from 'react';

const SublocalitySelect = ({ sublocalities, onAddSublocality, selectedLocalityId, onChange }) => {
  const [sublocalityName, setSublocalityName] = useState('');

  const handleSubmit = () => {
    if (sublocalityName && selectedLocalityId) {
      onAddSublocality(sublocalityName, selectedLocalityId);
      setSublocalityName('');  // Clear the input after submission
    }
  };

  return (
    <div>
      <h3>Select Sublocality</h3>
      <select
        value={selectedLocalityId || ''}
        onChange={(e) => onChange(e.target.value, 'sublocality')}
      >
        <option value="">Select Sublocality</option>
        {sublocalities.map((sublocality) => (
          <option key={sublocality.id} value={sublocality.id}>
            {sublocality.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add new sublocality"
        value={sublocalityName}
        onChange={(e) => setSublocalityName(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Sublocality</button>
    </div>
  );
};

export default SublocalitySelect;


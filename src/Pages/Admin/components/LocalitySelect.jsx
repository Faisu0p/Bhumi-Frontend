import React, { useState } from 'react';

const LocalitySelect = ({ localities, onAddLocality, selectedCityId, selectedLocalityId, onChange }) => {
  const [localityName, setLocalityName] = useState('');

  const handleSubmit = () => {
    if (localityName && selectedCityId) {
      onAddLocality(localityName, selectedCityId);
      setLocalityName('');  // Clear the input after submission
    }
  };

  return (
    <div>
      <h3>Select Locality</h3>
      <select
        value={selectedLocalityId || ''}
        onChange={(e) => onChange(e.target.value, 'locality')}
      >
        <option value="">Select Locality</option>
        {localities.map((locality) => (
          <option key={locality.id} value={locality.id}>
            {locality.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add new locality"
        value={localityName}
        onChange={(e) => setLocalityName(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Locality</button>
    </div>
  );
};

export default LocalitySelect;


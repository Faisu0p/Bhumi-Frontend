import React, { useState } from 'react';

const CitySelect = ({ cities, onAddCity, selectedStateId, selectedCityId, onChange }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = () => {
    if (cityName && selectedStateId) {
      onAddCity(cityName, selectedStateId);
      setCityName('');  // Clear the input after submission
    }
  };

  return (
    <div>
      <h3>Select City</h3>
      <select
        value={selectedCityId || ''}
        onChange={(e) => onChange(e.target.value, 'city')}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add new city"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={handleSubmit}>Add City</button>
    </div>
  );
};

export default CitySelect;


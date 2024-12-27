import React, { useState } from 'react';

const PincodeSelect = ({ pincodes, onAddPincode, selectedLocalityId, onChange }) => {
  const [pincode, setPincode] = useState('');

  const handleSubmit = () => {
    if (pincode && selectedLocalityId) {
      onAddPincode(pincode, selectedLocalityId);
      setPincode('');  // Clear the input after submission
    }
  };

  return (
    <div>
      <h3>Select Pincode</h3>
      <select
        value={selectedLocalityId || ''}
        onChange={(e) => onChange(e.target.value, 'pincode')}
      >
        <option value="">Select Pincode</option>
        {pincodes.map((pincodeItem) => (
          <option key={pincodeItem.id} value={pincodeItem.id}>
            {pincodeItem.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add new pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Pincode</button>
    </div>
  );
};

export default PincodeSelect;


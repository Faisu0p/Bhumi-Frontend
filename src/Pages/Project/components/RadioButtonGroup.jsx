import React, { useState } from "react";
import "./RadioButtonGroup.css";

function RadioButtonGroup() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="radio-group">
      <h3>Select an Option</h3>
      
      <input
        type="radio"
        id="option1"
        name="options"
        value="Option 1"
        checked={selectedOption === "Option 1"}
        onChange={handleChange}
      />
      <label htmlFor="option1">NOIDA</label>

      <input
        type="radio"
        id="option2"
        name="options"
        value="Option 2"
        checked={selectedOption === "Option 2"}
        onChange={handleChange}
      />
      <label htmlFor="option2">GREATER NOIDA</label>

      <input
        type="radio"
        id="option3"
        name="options"
        value="Option 3"
        checked={selectedOption === "Option 3"}
        onChange={handleChange}
      />
      <label htmlFor="option3">YEIDA</label>

      <input
        type="radio"
        id="option4"
        name="options"
        value="Option 4"
        checked={selectedOption === "Option 4"}
        onChange={handleChange}
      />
      <label htmlFor="option4">GURGAON</label>

      <input
        type="radio"
        id="option5"
        name="options"
        value="Option 5"
        checked={selectedOption === "Option 5"}
        onChange={handleChange}
      />
      <label htmlFor="option5">DELHI</label>
    </div>
  );
}

export default RadioButtonGroup;

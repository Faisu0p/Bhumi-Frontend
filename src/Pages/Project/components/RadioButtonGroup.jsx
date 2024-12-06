import React, { useState } from "react";
import "./RadioButtonGroup.css";

function RadioButtonGroup() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleBHKChange = (event) => {
    setSelectedBHK(event.target.value);
  };

  return (
    <div className="radio-group">
      <h3>Select a Location</h3>
      {/* Location Options */}
      <input
        type="radio"
        id="option1"
        name="locations"
        value="NOIDA"
        checked={selectedLocation === "NOIDA"}
        onChange={handleLocationChange}
      />
      <label htmlFor="option1">NOIDA</label>

      <input
        type="radio"
        id="option2"
        name="locations"
        value="GREATER NOIDA"
        checked={selectedLocation === "GREATER NOIDA"}
        onChange={handleLocationChange}
      />
      <label htmlFor="option2">GREATER NOIDA</label>

      <input
        type="radio"
        id="option3"
        name="locations"
        value="YEIDA"
        checked={selectedLocation === "YEIDA"}
        onChange={handleLocationChange}
      />
      <label htmlFor="option3">YEIDA</label>

      <input
        type="radio"
        id="option4"
        name="locations"
        value="GURGAON"
        checked={selectedLocation === "GURGAON"}
        onChange={handleLocationChange}
      />
      <label htmlFor="option4">GURGAON</label>

      <input
        type="radio"
        id="option5"
        name="locations"
        value="DELHI"
        checked={selectedLocation === "DELHI"}
        onChange={handleLocationChange}
      />
      <label htmlFor="option5">DELHI</label>

      <h3>Select BHK Type</h3>
      {/* BHK Options */}
      <input
        type="radio"
        id="bhk1"
        name="bhk"
        value="1 BHK"
        checked={selectedBHK === "1 BHK"}
        onChange={handleBHKChange}
      />
      <label htmlFor="bhk1">1 BHK</label>

      <input
        type="radio"
        id="bhk2"
        name="bhk"
        value="2 BHK"
        checked={selectedBHK === "2 BHK"}
        onChange={handleBHKChange}
      />
      <label htmlFor="bhk2">2 BHK</label>

      <input
        type="radio"
        id="bhk3"
        name="bhk"
        value="3 BHK"
        checked={selectedBHK === "3 BHK"}
        onChange={handleBHKChange}
      />
      <label htmlFor="bhk3">3 BHK</label>

      <input
        type="radio"
        id="bhk4"
        name="bhk"
        value="4 BHK"
        checked={selectedBHK === "4 BHK"}
        onChange={handleBHKChange}
      />
      <label htmlFor="bhk4">4 BHK</label>

      <input
        type="radio"
        id="bhkMore"
        name="bhk"
        value="More+"
        checked={selectedBHK === "More+"}
        onChange={handleBHKChange}
      />
      <label htmlFor="bhkMore">More+</label>
    </div>
  );
}

export default RadioButtonGroup;

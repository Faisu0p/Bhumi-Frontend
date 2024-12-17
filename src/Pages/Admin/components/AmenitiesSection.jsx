const amenitiesList = [
    "Swimming_Pool",
    "Gymnasium",
    "Clubhouse",
    "Children_Play_Area",
    "Parking",
    "Security_Guards",
    "CCTV_Surveillance",
    "Power_Backup",
    "Water_Supply",
    "Elevator",
  ];
  
  const AmenitiesSection = ({ selectedAmenities, setAmenities }) => {
    const handleToggle = (amenity) => {
      if (selectedAmenities.includes(amenity)) {
        setAmenities(selectedAmenities.filter((item) => item !== amenity));
      } else {
        setAmenities([...selectedAmenities, amenity]);
      }
    };
  
    return (
      <div>
        {amenitiesList.map((amenity) => (
          <div key={amenity}>
            <label>
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleToggle(amenity)}
              />
              {amenity}
            </label>
          </div>
        ))}
      </div>
    );
  };
  
  export default AmenitiesSection;
  
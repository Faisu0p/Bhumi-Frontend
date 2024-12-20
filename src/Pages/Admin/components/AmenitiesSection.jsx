import React from 'react';

// Updated amenities data based on your list
const amenitiesList = [
  { label: "Water Supply", key: "waterSupply" },
  { label: "Power Backup", key: "powerBackup" },
  { label: "Adequate Parking (Covered/Uncovered)", key: "adequateParking" },
  { label: "Gated Security with CCTV Surveillance", key: "gatedSecurity" },
  { label: "High-speed Elevators", key: "highSpeedElevators" },
  { label: "Fire Safety Systems", key: "fireSafetySystems" },
  { label: "Clubhouse", key: "clubhouse" },
  { label: "Swimming Pool (ALL WEATHER)", key: "swimmingPool" },
  { label: "Gymnasium", key: "gymnasium" },
  { label: "Kids’ Play Area", key: "kidsPlayArea" },
  { label: "Landscaped Gardens/Parks", key: "landscapedGardens" },
  { label: "Jogging and Cycling Tracks", key: "joggingCyclingTracks" },
  { label: "Indoor Games Room (Table Tennis, Carrom, Chess, etc.)", key: "indoorGamesRoom" },
  { label: "Sports Facilities (Tennis, Basketball, Badminton Courts)", key: "sportsFacilities" },
  { label: "Multipurpose Hall for Events", key: "multipurposeHall" },
  { label: "Rainwater Harvesting", key: "rainwaterHarvesting" },
  { label: "Solar Power Panels", key: "solarPowerPanels" },
  { label: "Sewage Treatment Plant (STP)", key: "sewageTreatmentPlant" },
  { label: "Organic Waste Composting", key: "organicWasteComposting" },
  { label: "Energy-efficient Lighting in Common Areas", key: "energyEfficientLighting" },
  { label: "Video Door Phones", key: "videoDoorPhones" },
  { label: "Digital/Smart Locks", key: "digitalSmartLocks" },
  { label: "Wi-Fi Connectivity in Common Areas", key: "wifiConnectivity" },
  { label: "Intercom Facility", key: "intercomFacility" },
  { label: "Earthquake-resistant Design", key: "earthquakeDesign" },
  { label: "Shopping Arcade/Convenience Store", key: "shoppingArcade" },
  { label: "Pharmacy/Clinic", key: "pharmacyClinic" },
  { label: "Cafeteria/Restaurant", key: "cafeteriaRestaurant" },
  { label: "Visitor Parking", key: "visitorParking" },
  { label: "Dedicated Service Elevators", key: "serviceElevators" },
  { label: "Infinity Pool", key: "infinityPool" },
  { label: "Sky Lounge/Terrace Garden", key: "skyLounge" },
  { label: "Private Theater/Media Room", key: "privateTheater" },
  { label: "Business Center/Co-working Spaces", key: "businessCenter" },
  { label: "Pet-friendly Zones", key: "petFriendlyZones" },
  { label: "Amphitheater/Open-air Seating", key: "amphitheater" },
  { label: "Temple/Prayer Room", key: "templePrayerRoom" },
  { label: "Senior Citizen Area", key: "seniorCitizenArea" },
  { label: "Community Library", key: "communityLibrary" },
  { label: "Barbecue/Picnic Zones", key: "barbecuePicnicZones" },
  { label: "Spa and Sauna", key: "spaAndSauna" },
  { label: "Meditation/Yoga Deck", key: "meditationYogaDeck" },
  { label: "Open Gym/Fitness Stations in the Park", key: "openGymFitness" },
  { label: "Walking Reflexology Path", key: "walkingReflexology" },
  { label: "Health Check-up Kiosk", key: "healthCheckupKiosk" },
  { label: "Electric Vehicle (EV) Charging Stations", key: "evChargingStations" },
  { label: "Smart Home Automation Features (Lighting, Curtains, Thermostats)", key: "smartHomeAutomation" },
  { label: "Automated Parking Systems", key: "automatedParkingSystems" },
  { label: "Smart Waste Management System", key: "smartWasteManagement" },
  { label: "App-based Visitor Management System", key: "appVisitorManagement" },
  { label: "Exclusive Private Pools for Penthouses", key: "privatePoolsForPenthouses" },
  { label: "Helipad (for High-end Projects)", key: "helipad" },
  { label: "Wine Cellar or Tasting Lounge", key: "wineCellar" },
  { label: "Golf Simulator/Putting Green", key: "golfSimulator" },
  { label: "Serviced Apartments for Guests", key: "servicedApartments" },
  { label: "Dedicated Work-from-Home Cabins", key: "workFromHomeCabins" },
  { label: "Soundproof Study Pods for Students", key: "studyPods" },
  { label: "Conference Rooms with AV Facilities", key: "conferenceRooms" },
  { label: "E-learning Zone for Kids", key: "elearningZone" },
  { label: "Art & Craft Studio for Hobbies", key: "artCraftStudio" },
  { label: "Cricket Nets", key: "cricketNets" },
  { label: "Skating Rink", key: "skatingRink" },
  { label: "Futsal Court", key: "futsalCourt" },
  { label: "Archery Range", key: "archeryRange" },
  { label: "Outdoor Adventure Activities (Zipline, Obstacle Courses)", key: "outdoorAdventureActivities" },
  { label: "Art Gallery or Exhibition Hall", key: "artGallery" },
  { label: "Cultural Amphitheater", key: "culturalAmphitheater" },
  { label: "Dance and Music Studios", key: "danceMusicStudios" },
  { label: "Cooking Class Zone or Open Kitchen", key: "cookingClassZone" },
  { label: "Event Plaza for Festivals", key: "eventPlaza" },
  { label: "Skywalk or Observation Deck", key: "skywalk" },
  { label: "Waterfront with Boating Facilities", key: "waterfrontBoating" },
  { label: "Private Cabanas or Gazebos", key: "privateCabanas" },
  { label: "Luxury Concierge Services", key: "luxuryConcierge" },
  { label: "Rooftop Solar Observatory", key: "rooftopSolarObservatory" },
  { label: "Emergency Panic Buttons in Common Areas", key: "emergencyPanicButtons" },
  { label: "Physically Disabled-friendly Pathways and Facilities", key: "disabledFriendlyPathways" },
  { label: "Dedicated Space for Ambulance Parking", key: "ambulanceParking" },
  { label: "Dedicated Delivery Lockers for E-commerce Parcels", key: "deliveryLockers" },
  { label: "Drone Delivery Landing Zones", key: "droneDeliveryLandingZones" }
];

// Categories and their respective ranges
const categories = [
  "Basic Amenities",
  "Lifestyle & Recreation Amenities",
  "Green & Sustainable Features",
  "Advanced Safety & Technology Features",
  "Convenience Features",
  "Premium/High-end Features (Optional)",
  "Community-oriented Features",
  "Health & Wellness Amenities",
  "Technology & Automation Amenities",
  "Luxury Lifestyle Features",
  "Work & Study Amenities",
  "Sports & Adventure Amenities",
  "Social & Cultural Amenities",
  "Specialized Premium Amenities",
  "Security and Accessibility Features"
];

const categoryRanges = {
  "Basic Amenities": [0, 5],
  "Lifestyle & Recreation Amenities": [5, 14],
  "Green & Sustainable Features": [14, 19],
  "Advanced Safety & Technology Features": [19, 24],
  "Convenience Features": [24, 29],
  "Premium/High-end Features (Optional)": [29, 34],
  "Community-oriented Features": [34, 39],
  "Health & Wellness Amenities": [39, 44],
  "Technology & Automation Amenities": [44, 49],
  "Luxury Lifestyle Features": [49, 54],
  "Work & Study Amenities": [54, 59],
  "Sports & Adventure Amenities": [59, 64],
  "Social & Cultural Amenities": [64, 69],
  "Specialized Premium Amenities": [69, 74],
  "Security and Accessibility Features": [74, 79]
};

const AmenitiesSection = ({ selectedAmenities, setAmenities }) => {
  const handleToggle = (amenityKey) => {
    if (selectedAmenities.includes(amenityKey)) {
      setAmenities(selectedAmenities.filter((item) => item !== amenityKey));
    } else {
      setAmenities([...selectedAmenities, amenityKey]);
    }
  };

  return (
    <div>
      {categories.map((category) => {
        const [start, end] = categoryRanges[category];
        const categoryItems = amenitiesList.slice(start, end);
        
        return (
          <div key={category}>
            <h3>{category}</h3>
            {categoryItems.map(({ label, key }) => (
              <div key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(key)}
                    onChange={() => handleToggle(key)}
                  />
                  {label}
                </label>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AmenitiesSection;

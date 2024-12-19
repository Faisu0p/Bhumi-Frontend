import React from 'react';

// Single flat array of amenities
const amenitiesList = [
  "24/7 Water Supply",
  "24/7 Power Backup",
  "Adequate Parking (Covered/Uncovered)",
  "Gated Security with CCTV Surveillance",
  "High-speed Elevators",
  "Fire Safety Systems",
  
  "Clubhouse",
  "Swimming Pool (ALL WEATHER)",
  "Gymnasium",
  "Kids’ Play Area",
  "Landscaped Gardens/Parks",
  "Jogging and Cycling Tracks",
  "Indoor Games Room (Table Tennis, Carrom, Chess, etc.)",
  "Sports Facilities (Tennis, Basketball, Badminton Courts)",
  "Multipurpose Hall for Events",
  
  "Rainwater Harvesting",
  "Solar Power Panels",
  "Sewage Treatment Plant (STP)",
  "Organic Waste Composting",
  "Energy-efficient Lighting in Common Areas",
  
  "Video Door Phones",
  "Digital/Smart Locks",
  "Wi-Fi Connectivity in Common Areas",
  "Intercom Facility",
  "Earthquake-resistant Design",
  
  "Shopping Arcade/Convenience Store",
  "Pharmacy/Clinic",
  "Cafeteria/Restaurant",
  "Visitor Parking",
  "Dedicated Service Elevators",
  
  "Infinity Pool",
  "Sky Lounge/Terrace Garden",
  "Private Theater/Media Room",
  "Business Center/Co-working Spaces",
  "Pet-friendly Zones",
  
  "Amphitheater/Open-air Seating",
  "Temple/Prayer Room",
  "Senior Citizen Area",
  "Community Library",
  "Barbecue/Picnic Zones",
  
  "Spa and Sauna",
  "Meditation/Yoga Deck",
  "Open Gym/Fitness Stations in the Park",
  "Walking Reflexology Path",
  "Health Check-up Kiosk",
  
  "Electric Vehicle (EV) Charging Stations",
  "Smart Home Automation Features (Lighting, Curtains, Thermostats)",
  "Automated Parking Systems",
  "Smart Waste Management System",
  "App-based Visitor Management System",
  
  "Exclusive Private Pools for Penthouses",
  "Helipad (for High-end Projects)",
  "Wine Cellar or Tasting Lounge",
  "Golf Simulator/Putting Green",
  "Serviced Apartments for Guests",
  
  "Dedicated Work-from-Home Cabins",
  "Soundproof Study Pods for Students",
  "Conference Rooms with AV Facilities",
  "E-learning Zone for Kids",
  "Art & Craft Studio for Hobbies",
  
  "Cricket Nets",
  "Skating Rink",
  "Futsal Court",
  "Archery Range",
  "Outdoor Adventure Activities (Zipline, Obstacle Courses)",
  
  "Art Gallery or Exhibition Hall",
  "Cultural Amphitheater",
  "Dance and Music Studios",
  "Cooking Class Zone or Open Kitchen",
  "Event Plaza for Festivals",
  
  "Skywalk or Observation Deck",
  "Waterfront with Boating Facilities",
  "Private Cabanas or Gazebos",
  "Luxury Concierge Services",
  "Rooftop Solar Observatory",
  
  "Emergency Panic Buttons in Common Areas",
  "Physically Disabled-friendly Pathways and Facilities",
  "Dedicated Space for Ambulance Parking",
  "Dedicated Delivery Lockers for E-commerce Parcels",
  "Drone Delivery Landing Zones"
];

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

const AmenitiesSection = ({ selectedAmenities, setAmenities }) => {
  // Define ranges for each category manually, based on the order in amenitiesList
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

  const handleToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setAmenities(selectedAmenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...selectedAmenities, amenity]);
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
            {categoryItems.map((amenity) => (
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
      })}
    </div>
  );
};

export default AmenitiesSection;

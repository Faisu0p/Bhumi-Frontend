import React from 'react';

import { Building2, MapPin, Maximize2, BadgeCheck } from 'lucide-react'
import './Tiles.css'

import test1 from '../../../Media/Images/test_1.jpg';
import test2 from '../../../Media/Images/test_2.jpg';


// Mock data array
const propertyData = [
  {
    id: 1,
    name: "Signature Global Titanium SPR",
    isVerified: true,
    location: "Sector 71, Southern Periphery Road, Gurgaon",
    areaRange: "2780 - 3780 Sq.Ft",
    priceRange: "4.50 Cr - 7 Cr",
    configurations: ["3 BHK", "4 BHK"],
    possession: "Quarter 3, 2028",
    builder: "Signature Global (India) Ltd",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  },
  {
    id: 2,
    name: "Another Property",
    isVerified: true,
    location: "Sector 82, Golf Course Road, Gurgaon",
    areaRange: "1800 - 2200 Sq.Ft",
    priceRange: "2.5 Cr - 3.2 Cr",
    configurations: ["2 BHK", "3 BHK"],
    possession: "Quarter 4, 2025",
    builder: "Sample Builder Ltd",
    image: test2
  },
  {
    id: 3,
    name: "Another Property",
    isVerified: true,
    location: "Sector 82, Golf Course Road, Gurgaon",
    areaRange: "1800 - 2200 Sq.Ft",
    priceRange: "2.5 Cr - 3.2 Cr",
    configurations: ["2 BHK", "3 BHK"],
    possession: "Quarter 4, 2025",
    builder: "Sample Builder Ltd",
    image: test1
  },
  {
    id: 4,
    name: "Another Property",
    isVerified: true,
    location: "Sector 82, Golf Course Road, Gurgaon",
    areaRange: "1800 - 2200 Sq.Ft",
    priceRange: "2.5 Cr - 3.2 Cr",
    configurations: ["2 BHK", "3 BHK"],
    possession: "Quarter 4, 2025",
    builder: "Sample Builder Ltd",
    image: "https://ibb.co/FnCdQYc"
  }
  
]

export default function PropertyTiles() {
  return (
    <div className="property-container">
      {propertyData.map((property) => (
        <div key={property.id} className="property-tile">
          <div className="property-image">
            <img src={property.image} alt={property.name} />
          </div>
          <div className="property-content">
            <div className="property-header">
              <h2>
                {property.name}
                {property.isVerified && (
                  <BadgeCheck className="verified-badge" />
                )}
              </h2>
              <p className="location">
                <MapPin className="icon" />
                {property.location}
              </p>
            </div>

            <div className="property-details">
              <div className="detail-item">
                <Maximize2 className="icon" />
                <span>{property.areaRange}</span>
              </div>
              <div className="price-range">
                <span>₹ {property.priceRange}</span>
              </div>
            </div>

            <div className="property-config">
              {property.configurations.map((config, index) => (
                <span key={index} className="config-badge">
                  {config}
                </span>
              ))}
            </div>

            


          </div>
        </div>
      ))}
    </div>
  )
}


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, MapPin, Maximize2, BadgeCheck } from 'lucide-react';
import './Tiles.css';

export default function PropertyTiles({ searchQuery }) {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch property data from the backend
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setPropertyData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = propertyData.filter(property =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, propertyData]);

  return (
    <div className="property-container">
      {filteredData.length === 0 ? (
        <p>No properties match your search.</p>
      ) : (
        filteredData.map((property) => (
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
                {property.configurations.split(',').map((config, index) => (
                  <span key={index} className="config-badge">
                    {config.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

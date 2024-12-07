import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Maximize2, BadgeCheck } from 'lucide-react';
import './Tiles.css';

export default function PropertyTiles({ searchQuery, selectedLocation }) {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    // Fetch property data from the backend
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setPropertyData(response.data);
        setFilteredData(response.data); // Initially, no filter applied
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }, []);

  // Apply filtering based on search query and selected location
  useEffect(() => {
    let filtered = propertyData;

    // Filter by location if a location is selected
    if (selectedLocation) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Further filter by search query (property name or location)
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedLocation, propertyData]); // Trigger filter on location or search query change

  const handleTileClick = (id) => {
    navigate(`/project-details/${id}`);  // Navigate to the details page with the selected ID
  };

  return (
    <div className="property-container">
      {filteredData.length === 0 ? (
        <p>No properties match your filters.</p>
      ) : (
        filteredData.map((property) => (
          <div 
            key={property.id} 
            className="property-tile"
            onClick={() => handleTileClick(property.id)}  // Handle tile click
          >
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

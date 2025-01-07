import React, { useState, useEffect } from 'react';
import { fetchAllProjects } from '../../Admin/apis/projectApi';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './Tiles.css';

export default function PropertyTiles({ searchQuery, selectedLocation }) {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch project data from the API
    const fetchProjects = async () => {
      try {
        const response = await fetchAllProjects();
        if (response?.success) {
          setPropertyData(response.data);
          setFilteredData(response.data);
        } else {
          console.error(response?.message || 'Error: Invalid response data');
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on searchQuery and selectedLocation
  useEffect(() => {
    let filtered = [...propertyData];

    if (selectedLocation) {
      filtered = filtered.filter(property =>
        property.City.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.Project_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.City.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedLocation, propertyData]);

  const handleTileClick = (projectName) => {
    navigate(`/project-details/${encodeURIComponent(projectName)}`);
  };

  return (
    <div className="property-container">
      {filteredData.length === 0 ? (
        <p>No projects match your filters.</p>
      ) : (
        filteredData.map((property) => (
          <div
            key={property.Project_Name}
            className="property-tile"
            onClick={() => handleTileClick(property.Project_Name)}
          >
            <div className="property-image">
              <img
                src={'https://via.placeholder.com/300x200?text=Project+Image'}
                alt={property.Project_Name}
              />
            </div>
            <div className="property-content">
              <div className="property-header">
                <h2>{property.Project_Name}</h2>
                <p className="location">
                  <MapPin className="icon" />
                  {property.City}
                </p>
              </div>
              <div className="property-details">
                <div className="detail-item">
                  <span><strong>Builder:</strong> {property.BuilderName}</span>
                </div>
                <div className="detail-item">
                  <span><strong>Company:</strong> {property.Company_Name}</span>
                </div>
                <div className="detail-item">
                  <span><strong>Total Towers:</strong> {property.Total_Towers}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

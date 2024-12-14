import React, { useState, useEffect } from 'react';
import { fetchAllProjects } from '../../Admin/apis/projectApi';  // Import the fetchAllProjects function
import { useNavigate } from 'react-router-dom';
import { MapPin, BadgeCheck } from 'lucide-react';
import './Tiles.css';

export default function PropertyTiles({ searchQuery, selectedLocation }) {
  const [propertyData, setPropertyData] = useState([]);  // Store project data
  const [filteredData, setFilteredData] = useState([]);  // Store filtered project data
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    // Fetch project data from the project API
    const fetchProjects = async () => {
      try {
        const response = await fetchAllProjects();  // Call the API function to get all projects
        if (response && response.success) {
          setPropertyData(response.data);  // Assuming 'data' contains the list of projects
          setFilteredData(response.data);  // Initially, no filter applied
        } else {
          console.error('Error: Invalid response data');
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjects();
  }, []);

  // Apply filtering based on search query and selected location
  useEffect(() => {
    let filtered = propertyData;

    // Filter by location if a location is selected
    if (selectedLocation) {
      filtered = filtered.filter(property =>
        property.City.toLowerCase().includes(selectedLocation.toLowerCase())  // Adjusting based on backend field
      );
    }

    // Further filter by search query (property name or location)
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.Project_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||  // Adjusting based on backend field
        property.City.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedLocation, propertyData]);  // Trigger filter on location or search query change

  const handleTileClick = (id) => {
    navigate(`/project-details/${id}`);  // Navigate to the details page with the selected project ID
  };

  return (
    <div className="property-container">
      {filteredData.length === 0 ? (
        <p>No projects match your filters.</p>
      ) : (
        filteredData.map((property) => (
          <div 
            key={property.Project_Name}  // Assuming 'Project_Name' is a unique identifier
            className="property-tile"
            onClick={() => handleTileClick(property.Project_Name)}  // Handle tile click to navigate
          >
            <div className="property-image">
              <img 
                src={'https://via.placeholder.com/300x200?text=Project+Image'}  // Use a placeholder image for now
                alt={property.Project_Name} 
              />
            </div>
            <div className="property-content">
              <div className="property-header">
                <h2>
                  {property.Project_Name}
                  {property.isVerified && (  // Assuming 'isVerified' is part of the project data
                    <BadgeCheck className="verified-badge" />
                  )}
                </h2>
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

import React, { useState } from "react";
import './ProjectPage.css';
import { useNavigate } from 'react-router-dom';

import Tiles from './components/Tiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import logo from '../../Media/Images/logo.png';
import RadioButtonGroup from "./components/RadioButtonGroup";

const ProjectPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(""); 

  const handleNavigate = () => {
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location); 
  };

  return (
    <div>
      <div className="project-page-container">
        <div className="project-header">
          <div className="project-header-logo">
            <img src={logo} alt="Logo" className="project-header-logo-img" />
          </div>
          <div className="project-header-left"></div>
          <div className="project-header-right-section">
            <button onClick={()=>navigate('/admin')} className="project-login-button">Admin</button>
            <button className="project-login-button">Login</button>
          </div>
        </div>

        <div className="project-page-center">
          <div className="project-page-filter">
            <div>
              <RadioButtonGroup onLocationChange={handleLocationChange} /> {/* Pass handler */}
            </div>
          </div>
          <div className="search-container-project">
            <div className="project-header-search-container">
              <input
                type="text"
                className="project-header-search-input"
                placeholder="Search here....."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span className="project-header-search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>

        <div className="tiles-project-container">
          <div className="tiles-project-left">
            <Tiles searchQuery={searchQuery} selectedLocation={selectedLocation} /> {/* Pass filters */}
          </div>
          <div className="tiles-project-right">RIGHT</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

import React, { useState, useEffect } from "react";
import { fetchAllProjects } from "../apis/projectApi"; // Import the API function
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ViewProjects = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchAllProjects(); // Call the fetchAllProjects API function
        if (response && response.success) {
          setProjects(response.data); // Assuming the response has a 'data' field
        } else {
          setError("Error: Invalid response data");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle click event to show more details of a project
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>View All Projects</h2>



      {/* Display projects in a grid layout */}
      <div className="row">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.Project_Name} className="col-md-4 mb-4">
              <div
                className="card h-100"
                onMouseEnter={() => setSelectedProject(project)} // Show details on hover
                onClick={() => handleProjectClick(project)} // Show details on click
              >
                <img
                  src={
                    project.imageUrl ||
                    "https://via.placeholder.com/300x200?text=Project+Image"
                  }
                  className="card-img-top"
                  alt={project.Project_Name}
                />
                <div className="card-body">
                  <h5 className="card-title">{project.Project_Name}</h5>
                  <p className="card-text">Builder: {project.Company_Name}</p>
                  <p className="card-text">
                    Location: {project.City}
                  </p>
                  <p className="card-text">
                    Total Towers: {project.Total_Towers}
                  </p>
                  <p className="card-text">
                    Briefing: {project.Project_Briefing}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProjects;

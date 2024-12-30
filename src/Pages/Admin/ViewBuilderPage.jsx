import React, { useState, useEffect } from "react";
import { getAllBuildersInfo } from "./apis/builderApi";
import "bootstrap/dist/css/bootstrap.min.css";
import './ViewBuilderPage.css'

const ViewBuilderPage = () => {
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await getAllBuildersInfo();
        if (response.data) {
          setBuilders(response.data); // Ensure you get the correct data from the response
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchBuilders();
  }, []);

  if (loading) {
    return (
      <div className="view-builder-spinner-container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-builder-alert-error text-center my-5">
        Error fetching builders: {error.message}
      </div>
    );
  }

  return (
    <div className="view-builder-container">
      <h1 className="view-builder-title">All Builders</h1>
      {builders.length === 0 ? (
        <div className="view-builder-alert-no-builders text-center">
          No builders found.
        </div>
      ) : (
        <table className="view-builder-table table table-striped table-hover">
          <thead className="view-builder-thead">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Short Name</th>
              <th>State</th>
              <th>City</th>
              <th>Experience</th>
              <th>Projects</th>
              <th>Description</th>
              <th>approvalStatus</th>
              <th>Logo</th>
              <th>Builder_logo_rectangle</th>
            </tr>
          </thead>
          <tbody>
            {builders.map((builder) => (
              <tr key={builder.Builder_id}>
                <td>{builder.Builder_id}</td>
                <td>{builder.FullName}</td>
                <td>{builder.NickName}</td>
                <td>{builder.State}</td>
                <td>{builder.City}</td>
                <td>{builder.Years_of_experience}</td>
                <td>
                  {Array.isArray(builder.listOfProjects)
                    ? builder.listOfProjects.join(", ")
                    : builder.listOfProjects || "No Projects"}
                </td>
                <td>{builder.Short_Description}</td>
                <td>{builder.approvalStatus}</td>
                <td>
                  {builder.Builder_logo_rectangle ? (
                    <img
                      src={builder.Builder_logo_rectangle}
                      alt={`${builder.NickName} logo`}
                      className="view-builder-logo-rectangle"
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
                <td>
                  {builder.Builder_logo ? (
                    <img
                      src={builder.Builder_logo}
                      alt={`${builder.NickName} logo`}
                      className="view-builder-logo-square"
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default ViewBuilderPage;

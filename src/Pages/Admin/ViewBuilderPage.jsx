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
        console.log(response); // Debugging API response
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
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        Error fetching builders: {error.message}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">All Builders</h1>
      {builders.length === 0 ? (
        <div className="alert alert-warning text-center">
          No builders found.
        </div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Full Name</th>
              <th>Short Name</th>
              <th>Logo</th>
              <th>Years in Real Estate</th>
              <th>Description</th>
              <th>Projects</th>
            </tr>
          </thead>
          <tbody>
            {builders.map((builder) => (
              <tr key={builder.Builder_id}>
                <td>{builder.Builder_id}</td>
                <td>{builder.City}</td>
                <td>{builder.FullName}</td>
                <td>{builder.NickName}</td>
                <td>
                  {builder.Builder_logo ? (
                    <img
                      src={builder.Builder_logo}
                      alt={`${builder.NickName} logo`}
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
                <td>{builder.Years_of_experience}</td>
                <td>{builder.Short_Description}</td>
                <td>
                  {Array.isArray(builder.listOfProjects)
                    ? builder.listOfProjects.join(", ")
                    : builder.listOfProjects || "No Projects"}
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

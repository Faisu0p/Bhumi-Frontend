import React, { useEffect, useState } from "react";
import { getVerifiedBuilders } from "../apis/builderApi";
import '../ProjectAddPage.css';

const BuilderDropdown = ({ projectDetails, handleInputChange }) => {
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const data = await getVerifiedBuilders();  // Fetch only verified builders
        console.log("Fetched Verified Builders Data:", data);  // Debug log to inspect the data structure
        
        // Ensure the data is an array before setting it
        if (Array.isArray(data?.data)) {
          setBuilders(data.data);  // Access 'data' property which contains the verified builders array
        } else {
          throw new Error("Fetched data is not an array");
        }

        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Failed to fetch builders:", error);
        setError("Failed to fetch builders.");
        setLoading(false);
      }
    };

    fetchBuilders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Display loading message
  }

  if (error) {
    return <div>{error}</div>;  // Display error message if any
  }

  return (
    <div className="form-group">
      <select
        className="project-form-select"  // Use the same class as other inputs
        name="builderId"
        value={projectDetails?.builderId || ""}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Builder</option>
        {builders.map((builder) => (
          <option key={builder.Builder_id} value={builder.Builder_id}>
            {builder.FullName}
          </option>
        ))}
      </select>
    </div>
  );  
};

export default BuilderDropdown;

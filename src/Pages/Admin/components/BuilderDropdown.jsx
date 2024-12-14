import React, { useEffect, useState } from "react";
import { getVerifiedBuilders } from "../apis/builderApi";

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
      <label>Select Builder</label>
      <select
        className="form-control"
        name="builderId"
        value={projectDetails?.builderId || ""}  // Ensure projectDetails is defined
        onChange={handleInputChange} // Use the parent-provided function
      >
        <option value="">Select Builder</option>
        {builders.map((builder) => (
          <option key={builder.Builder_id} value={builder.Builder_id}> {/* Updated key and value */}
            {builder.FullName} {/* Display builder's full name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BuilderDropdown;

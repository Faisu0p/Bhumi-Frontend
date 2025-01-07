import React from 'react';

const ReviewPage = ({ data, phases, amenities, onSubmit }) => {
  return (
    <div>
      <h2>Review Project Data</h2>
      
      {/* Display project details */}
      <div className="review-details">
        <h3>Project Details</h3>
        <p><strong>Project Name:</strong> {data.projectName || 'N/A'}</p>
        <p><strong>Builder ID:</strong> {data.builderId || 'N/A'}</p>
        <p><strong>Launch Date:</strong> {data.launchDate || 'N/A'}</p>
        <p><strong>City:</strong> {data.city || 'N/A'}</p>
        <p><strong>Locality:</strong> {data.locality || 'N/A'}</p>
        <p><strong>Sublocality:</strong> {data.sublocality || 'N/A'}</p>
        <p><strong>Company Name:</strong> {data.companyName || 'N/A'}</p>
        <p><strong>Short Code:</strong> {data.shortCode || 'N/A'}</p>
        <p><strong>Delivery Status:</strong> {data.deliveryStatus || 'N/A'}</p>
        <p><strong>Delivery Date:</strong> {data.deliveryDate || 'N/A'}</p>
        <p><strong>RERA Number:</strong> {data.reraNumber || 'N/A'}</p>
        <p><strong>Total Towers:</strong> {data.totalTowers || 'N/A'}</p>
        <p><strong>Total Residential Units:</strong> {data.totalResidentialUnits || 'N/A'}</p>
        <p><strong>Total Commercial Units:</strong> {data.totalCommercialUnits || 'N/A'}</p>
        <p><strong>Project Type:</strong> {data.projectType || 'N/A'}</p>
        <p><strong>Sector Briefing:</strong> {data.sectorBriefing || 'N/A'}</p>
        <p><strong>Project Briefing:</strong> {data.projectBriefing || 'N/A'}</p>
        <p><strong>Project Verified:</strong> {data.projectIsVerified ? 'Yes' : 'No'}</p>
        <p><strong>Project Media:</strong> {data.projectMedia || 'N/A'}</p>
        <p><strong>State:</strong> {data.state || 'N/A'}</p>
        <p><strong>Complete Address:</strong> {data.completeAddress || 'N/A'}</p>
        <p><strong>Landmark:</strong> {data.landmark || 'N/A'}</p>
        <p><strong>Pin Code:</strong> {data.pinCode || 'N/A'}</p>
      </div>

      {/* Display phases */}
      <h3>Phases</h3>
      {phases && phases.length > 0 ? (
        phases.map((phase, index) => (
          <div key={index}>
            <p><strong>Phase {phase.phaseNumber}:</strong></p>
            <p><strong>RERA Number:</strong> {phase.reraNumber}</p>
            <p><strong>Phase Status:</strong> {phase.phaseStatus}</p>
            <p><strong>Delivery Date:</strong> {phase.deliveryDate}</p>
            <p><strong>Total Towers:</strong> {phase.totalTowers}</p>
            <p><strong>Phase Description:</strong> {phase.phaseDescription}</p>
            <p><strong>Start Date:</strong> {phase.startDate}</p>
            
            <h4>Units</h4>
            {phase.units && phase.units.length > 0 ? (
              phase.units.map((unit, unitIndex) => (
                <div key={unitIndex}>
                  <p><strong>Unit Category:</strong> {unit.unitCategory || 'N/A'}</p>
                  <p><strong>Unit Type:</strong> {unit.unitType || 'N/A'}</p>
                  <p><strong>Super Area:</strong> {unit.superArea || 'N/A'}</p>
                  <p><strong>Unit Furnished Status:</strong> {unit.unitFurnishedStatus || 'N/A'}</p>
                  <p><strong>Unit Friendly Name:</strong> {unit.unitFriendlyName || 'N/A'}</p>
                  <p><strong>Build Up Area:</strong> {unit.buildUpArea || 'N/A'}</p>
                  <p><strong>Carpet Area:</strong> {unit.carpetArea || 'N/A'}</p>
                  <p><strong>Unit Layout:</strong> {unit.unitLayout || 'N/A'}</p>

                  <h5>Unit Details</h5>
                  {unit.unitDetails && unit.unitDetails.length > 0 ? (
                    unit.unitDetails.map((detail, detailIndex) => (
                      <div key={detailIndex}>
                        <p><strong>Unit Size:</strong> {detail.unitSize || 'N/A'}</p>
                        <p><strong>Unit Length:</strong> {detail.unitLength || 'N/A'}</p>
                        <p><strong>Unit Breadth:</strong> {detail.unitBredth || 'N/A'}</p>
                        <p><strong>Unit Furnished Status:</strong> {detail.unitFurnishedStatus || 'N/A'}</p>
                        <p><strong>Space Type:</strong> {detail.spaceType || 'N/A'}</p>
                      </div>
                    ))
                  ) : (
                    <p>No unit details available.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No units available.</p>
            )}
          </div>
        ))
      ) : (
        <p>No phases available.</p>
      )}

      <h3>Amenities</h3>
      {amenities && amenities.length > 0 ? (
        amenities.map((amenity, index) => (
          <div key={index}>
            {Object.entries(amenity).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value ? 'Yes' : 'No'}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p>No amenities available.</p>
      )}

      {/* Submit button */}
      <button onClick={onSubmit} className="project-add-submit-button">
        Submit Project
      </button>
    </div>
  );
};

export default ReviewPage;

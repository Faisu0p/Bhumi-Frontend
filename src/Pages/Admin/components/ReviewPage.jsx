import React from 'react';
import './ReviewPage.css';

const ReviewPage = ({ data, phases, amenities, onSubmit }) => {
  return (
    <div className="review-project-submission-container">
      <h2 className="review-project-submission-title">Review Project Data</h2>
      
      {/* Display project details */}
      <div className="review-project-submission-details">
        <h3 className="review-project-submission-section-title">Project Details</h3>
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="review-project-submission-detail">
            <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
          </p>
        ))}
      </div>

      {/* Display phases */}
      <h3 className="review-project-submission-section-title">Phases</h3>
      {phases && phases.length > 0 ? (
        phases.map((phase, index) => (
          <div key={index} className="review-project-submission-phase">
            <p><strong>Phase {phase.phaseNumber}:</strong></p>
            {Object.entries(phase).map(([key, value]) => (
              key !== 'units' && (
                <p key={key} className="review-project-submission-phase-detail">
                  <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
                </p>
              )
            ))}
            {phase.units && phase.units.length > 0 && (
              <div className="review-project-submission-units">
                <h4 className="review-project-submission-units-title">Units</h4>
                {phase.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="review-project-submission-unit">
                    {Object.entries(unit).map(([key, value]) => (
                      <p key={key} className="review-project-submission-unit-detail">
                        <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No phases available.</p>
      )}

      <h3 className="review-project-submission-section-title">Amenities</h3>
      {amenities && amenities.length > 0 ? (
        amenities.map((amenity, index) => (
          <div key={index} className="review-project-submission-amenity">
            {Object.entries(amenity).map(([key, value]) => (
              <p key={key} className="review-project-submission-amenity-detail">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value ? 'Yes' : 'No'}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p>No amenities available.</p>
      )}

      {/* Submit button */}
      <button onClick={onSubmit} className="review-project-submission-submit-button">
        Submit Project
      </button>
    </div>
  );
};

export default ReviewPage;

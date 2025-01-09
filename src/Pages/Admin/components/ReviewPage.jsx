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
            <span className="review-project-submission-detail-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span> {value || 'N/A'}
          </p>
        ))}
      </div>

      {/* Display phases */}
      <h3 className="review-project-submission-section-title">Phases</h3>
      {phases && phases.length > 0 ? (
        phases.map((phase, index) => (
          <div key={index} className="review-project-submission-phase">
            <p><span className="review-project-submission-phase-label">Phase {phase.phaseNumber}:</span></p>
            {Object.entries(phase).map(([key, value]) => (
              key !== 'units' && (
                <p key={key} className="review-project-submission-phase-detail">
                  <span className="review-project-submission-phase-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span> {value || 'N/A'}
                </p>
              )
            ))}
            {phase.units && phase.units.length > 0 && (
              <div className="review-project-submission-units">
                <h4 className="review-project-submission-units-title">Units</h4>
                {phase.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="review-project-submission-unit">
                    {Object.entries(unit).map(([key, value]) => {
                      if (key === 'unitDetails' && Array.isArray(value)) {
                        return (
                          <div key={key} className="review-project-submission-unit-details">
                            <h5 className="review-project-submission-unit-details-title">Unit Details</h5>
                            {value.map((detail, detailIndex) => (
                              <div key={detailIndex} className="review-project-submission-unit-detail-item">
                                {Object.entries(detail).map(([detailKey, detailValue]) => (
                                  <p key={detailKey} className="review-project-submission-unit-detail-info">
                                    <span className="review-project-submission-unit-detail-label">{detailKey.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span> {detailValue || 'N/A'}
                                  </p>
                                ))}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <p key={key} className="review-project-submission-unit-detail">
                          <span className="review-project-submission-unit-detail-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span> {value || 'N/A'}
                        </p>
                      );
                    })}
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
                <span className="review-project-submission-amenity-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span> {value ? 'Yes' : 'No'}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    city: '',
    area: '',
    alternateNumber: '',
    otp: '',
    companyName: '',
    reraNumber: '',
    hasRera: false,
    documents: {
      profilePic: null,
      companyLogo: null,
      visitingCard: null,
    },
  });
  const [otpSent, setOtpSent] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, documents: { ...formData.documents, [name]: files[0] } });
  };

  const handleReraChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, hasRera: value === 'yes' });
  };

  const handleCheckUsername = () => {
    setUsernameAvailable(true); // Simulate username check
  };

  const handleGetOtp = () => {
    setOtpSent(true); // Simulate OTP send
  };

  const handleNext = () => {
    setStep(2); // Move to Step 2
  };

  const handleSubmit = () => {
    console.log("Form submitted", formData);
    navigate('/feed'); // Redirect to home page
  };

  return (
    <div className="signup-container">
      <h2>Step {step} of 2</h2>

      {step === 1 && (
        <>
          <h3>Please enter your details</h3>
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {/* Username */}
          <div className="input-with-btn">
            <input
              type="text"
              placeholder="Select username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <button onClick={handleCheckUsername}>
              {usernameAvailable ? '✔' : 'Check'}
            </button>
          </div>
          {/* City */}
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          {/* Area */}
          <input
            type="text"
            placeholder="Enter Area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />
          {/* Alternate Number */}
          <div className="input-with-btn">
            <input
              type="text"
              placeholder="Alternate Number"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleInputChange}
            />
            <button onClick={handleGetOtp}>
              {otpSent ? 'Sent' : 'OTP'}
            </button>
          </div>
          {/* OTP Input */}
          {otpSent && (
            <div className="otp-section">
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
              />
            </div>
          )}
          {/* NEXT BUTTON */}
          <button onClick={handleNext}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Profile Picture Section */}
          <div className="profile-picture-container">
            <label htmlFor="profilePic">
              <div className="plus-icon">+</div>
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Keeps the file input hidden
            />
          </div>
          <p>Please Add Your Profile Picture</p>

          {/* Company/Office/Shop Details */}
          <h3>Enter Company/Office/Shop details:</h3>
          <div className="company-details">
            <label htmlFor="companyName"></label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your Shop Name*"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* RERA Number Section */}
          <div className="rera-section">
            <label>RERA Number:</label>
            <div className="radio-group">
              <input
                type="radio"
                name="hasRera"
                value="yes"
                checked={formData.hasRera === true}
                onChange={handleReraChange}
              />
              <label>Yes</label>
              <input
                type="radio"
                name="hasRera"
                value="no"
                checked={formData.hasRera === false}
                onChange={handleReraChange}
              />
              <label>No</label>
            </div>
            {formData.hasRera === true && (
              <input
                type="text"
                placeholder="Enter Rera Number"
                name="reraNumber"
                value={formData.reraNumber}
                onChange={handleInputChange}
              />
            )}
          </div>

          {/* Upload Documents Section */}
          <h3>Upload your documents (Supports: jpg, png)</h3>
          {/* Company Logo Upload */}
          <div className="file-upload">
            <label htmlFor="companyLogo" className="file-upload-label">
              <div className="file-upload-icon">
                <div className="plus-icon">+</div>
              </div>
              <p className="file-upload-title">Company/Office/Shop Logo</p>
              <p className="file-upload-description">Add a shop banner/logo to expand the face of your business.</p>
            </label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Visiting Card Upload */}
          <div className="file-upload">
            <label htmlFor="visitingCard" className="file-upload-label">
              <div className="file-upload-icon">
                <div className="plus-icon">+</div>
              </div>
              <p className="file-upload-title">Visiting Card</p>
              <p className="file-upload-description">Add a photo, if not available, the shop banner/logo will work perfectly.</p>
            </label>
            <input
              type="file"
              id="visitingCard"
              name="visitingCard"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default SignupPage;

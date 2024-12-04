import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import img1 from "../../Media/Images/img1.png";
import google from "../../Media/Images/google.png";
import apple from "../../Media/Images/apple.png";
import fb from "../../Media/Images/fb.png";

function LoginPage() {
  const [otpRequested, setOtpRequested] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = () => {
    if (otp) {
      setOtpRequested(false); // Reset OTP request state
      setOtp('');
      setPhone('');
      alert("OTP Verified!! YAyyy");
      navigate('/feed'); // Navigate to Signup page
    }
  };

  const handleSocialLogin = () => {
    navigate('/signup');  // Redirect to signup page
  };

  const handleGetOtp = () => {
    if (phone) {
      setOtpRequested(true);
    }
  };

  // Function to save data to the backend
  const saveData = async (mobile_number) => {
    try {
      const response = await fetch('http://localhost:5000/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile_number }),
      });

      if (response.ok) {
        alert('Data saved successfully');
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save data. Please try again later.');
    }
  };
  
  

  return (
    
    <div className="login-container">
      <img src={img1} alt="Login Page" className="login-image" />
      <h1 className="login-text">Login or Signup</h1>

      {/* Phone Number Input */}
      <input
        type="text"
        placeholder="Enter Mobile Number*"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input-field"
      />

      {!otpRequested && (
        <div className="otp-button-container">
          <button onClick={() => { handleGetOtp(); saveData(phone);}} className="red-capsule-button">Get OTP</button>
        </div>
      )}

      {/* OTP Input */}
      <div className="otp-container">
        {otpRequested && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />
            <button onClick={handleVerifyOtp} className="otp-button">Verify OTP</button>
          </>
        )}
      </div>

      {/* Lines with "or" */}
      <div className="line-container">
        <hr className="line" />
        <span className="or-text">or</span>
        <hr className="line" />
      </div>

      {/* Social Buttons */}
      <div className="button-container">
      <button className="social-button" onClick={handleSocialLogin}>
        <img src={google} alt="" className="social-logo" />
        <span>Continue with Google</span>
      </button>

      <button className="social-button" onClick={handleSocialLogin}>
        <img src={apple} alt="" className="social-logo" />
        <span>Continue with Apple</span>
      </button>

      <button className="social-button" onClick={handleSocialLogin}>
        <img src={fb} alt="" className="social-logo" />
        <span>Continue with Facebook</span>
      </button>

      </div>
    </div>

  );
}

export default LoginPage;

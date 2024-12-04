import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import companyLogo from '../../Media/Images/Logo.png';
import appleLogo from "../../Media/Images/Apple_Button.png";
import googlePlayLogo from "../../Media/Images/Google_Button.png";
import insta from "../../Media/Images/insta.png";
import vid from "../../Media/Videos/Vid1.mp4";
import p1 from "../../Media/Images/p1.png";
import invest from "../../Media/Images/invest.png";
import facebook from "../../Media/Images/facebook.png";
import LinkedIn from "../../Media/Images/LinkedIn.png";
import yt from "../../Media/Images/yt.png";
import x from "../../Media/Images/x.png";
import instagram from "../../Media/Images/instagram.png";
import c1 from "../../Media/Images/c1.png";
import c2 from "../../Media/Images/c2.png";
import c3 from "../../Media/Images/c3.png";
import c4 from "../../Media/Images/c4.png";
import c5 from "../../Media/Images/c5.png";
import c6 from "../../Media/Images/c6.png";
import c7 from "../../Media/Images/c7.png";
import c8 from "../../Media/Images/c8.png";
import image1 from "../../Media/Images/i1.png";
import mobile_app from "../../Media/Images/mobile-app.png";

import test1 from "../../Media/Images/test_1.jpg";
import test2 from "../../Media/Images/test_2.jpg";
import test3 from "../../Media/Images/test_3.jpg";
import test4 from "../../Media/Images/test_4.jpg";
import test5 from "../../Media/Images/test_5.jpg";
import test6 from "../../Media/Images/test_6.jpg";
import test7 from "../../Media/Images/test_7.jpg";
import test8 from "../../Media/Images/test_8.jpg";
import test_new from "../../Media/Images/test_new.jpg";
import test_image_new from "../../Media/Images/test_image_new.jpg";

import video_main from "../../Media/Videos/Video_main.mp4";
import 'font-awesome/css/font-awesome.min.css';


import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';



const HomePage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const redirectToLogin = () => {
    navigate("/login");
  };
  const redirectToProject = () => {
    navigate("/project");
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

    const handleGetAppClick = () => {
/*    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
    } else {
      setError("");
      // Trigger the action to get the app link
      alert("App link sent to your phone!");
    }*/
  };


  return (
    <div className="home-container">


      <div className="header-wrapper">
        <header className="home-header">
          <img src={companyLogo} alt="Company Logo" className="company-logo" />

          <div className="buttons-container">
            <div className="download-container">
              <div className="download-button">
                <div className="download-icon">
                  <i className="fas fa-download"></i>
                </div>
              </div>
              <p className="d-btn">Download Project/Map</p>
            </div>

            <button className="login-button" onClick={redirectToLogin}>
              Login
            </button>
          </div>
        </header>
      </div>









      <div className="store-container">
        <button className="market-btn apple-btn">
          <span className="market-button-subtitle">Download on the</span>
          <span className="market-button-title">App Store</span>
        </button>

        <button className="market-btn google-btn">
          <span className="market-button-subtitle">Download on the</span>
          <span className="market-button-title">Google Play</span>
        </button>
      </div>



      <div className="mobile_container">
        <div className="motto">
          <h2>
            India’s #1 <span className="highlight">Real Estate</span><br />
            Inventory Exchange Platform.
          </h2>
          <p>Made for Brokers, By a Broker</p>
        </div>
        <div className="video-container-top">
          <video autoPlay loop muted>
            <source src={video_main} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="phone-input-section">
        <input
          type="text"
          placeholder="+91"
          className="country-code-input"
          maxLength="3"
          value="+91"
          readOnly
        />
        <input
          type="text"
          placeholder="Please enter your phone number"
          className="phone-number-input"
          maxLength="10"
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
        <button className="get-app-button" /*onClick={handleGetAppClick}*/>Get the App</button>
      </div>

      {/* Error message for phone number */}
      {/*{error && <p className="error-message">{error}</p>}*/}




      <div class="services-text">Services</div>
      <div class="capability-text">Our Capabilities</div>


      <div className="grid-wrapper">
        <div className="image-grid">
          <div className="image-container">
            <img src={test_image_new} alt="Image 1" className="hover-image" />
            <div className="bottom-text">llTESTsSSSSSSSSSSSSSSsaaaaaaaa</div>
          </div>
          <div className="image-container">
            <img src={test2} alt="Image 2" className="hover-image" />
            <div className="bottom-text">Image 2 Text</div>
          </div>
          <div className="image-container">
            <img src={test3} alt="Image 3" className="hover-image" />
            <div className="bottom-text">Image 3 Text</div>
          </div>
          <div className="image-container">
            <img src={test4} alt="Image 4" className="hover-image" />
            <div className="bottom-text">Image 4 Text</div>
          </div>
          <div className="image-container">
            <img src={test5} alt="Image 5" className="hover-image" />
            <div className="bottom-text">Image 5 Text</div>
          </div>
          <div className="image-container">
            <img src={test6} alt="Image 6" className="hover-image" />
            <div className="bottom-text">Image 6 Text</div>
          </div>
          <div className="image-container">
            <img src={test7} alt="Image 7" className="hover-image" />
            <div className="bottom-text">Image 7 Text</div>
          </div>
          <div className="image-container">
            <img src={test8} alt="Image 8" className="hover-image" />
            <div className="bottom-text">Image 8 Text</div>
          </div>
        </div>
      </div>

      <div class="Quote-container">
        <p class="text">
          We're on the journey to become one of the<br />
          most <span class="highlight">influential agencies</span> in the world one<br />
          that truly cares about the people in it.
        </p>
      </div>

      <div class="video-container">
        <p class="description">What sellers has to say</p>
        <div className="video-slider">
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
          <video className="slider-video" src={vid} autoPlay loop muted></video>
        </div>
      </div>


      <div class="team-container">
        <h2 class="team-heading">Our Team</h2>
        <div class="team-slider">
          <div class="team-tile">
            <img src={p1} alt="Team Member 1" class="team-image"/>
            <div class="image-text">Team Member 1</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 2" class="team-image"/>
            <div class="image-text">Team Member 2</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 1" class="team-image"/>
            <div class="image-text">Team Member 1</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 2" class="team-image"/>
            <div class="image-text">Team Member 2</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 1" class="team-image"/>
            <div class="image-text">Team Member 1</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 2" class="team-image"/>
            <div class="image-text">Team Member 2</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 2" class="team-image"/>
            <div class="image-text">Team Member 2</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 1" class="team-image"/>
            <div class="image-text">Team Member 1</div>
          </div>
          <div class="team-tile">
            <img src={p1} alt="Team Member 2" class="team-image"/>
            <div class="image-text">Team Member 2</div>
          </div>
        </div>
      </div>


      <div class="news-media-container">
        <h2 class="news-heading">News and Media</h2>
        <p class="news-description">Know more about us from the media coverage we have received.</p>

        <div class="news-slider">
          <div class="news-block">
            <img src={p1} alt="Media coverage 1" class="news-image"/>
            <h2 class="news-text">Prop-tech startup HouseEazy raises $375,000</h2>
            <p class="news-text">HouseEazy, a Delhi-NCR based peop-tech firm, has raised $375,000...</p>
            <button class="learn-more-button">Learn More</button>
          </div>
          <div class="news-block">
            <img src={p1} alt="Media coverage 1" class="news-image"/>
            <h2 class="news-text">Prop-tech startup HouseEazy raises $375,000</h2>
            <p class="news-text">HouseEazy, a Delhi-NCR based peop-tech firm, has raised $375,000...</p>
            <button class="learn-more-button">Learn More</button>
          </div>
          <div class="news-block">
            <img src={p1} alt="Media coverage 1" class="news-image"/>
            <h2 class="news-text">Prop-tech startup HouseEazy raises $375,000</h2>
            <p class="news-text">HouseEazy, a Delhi-NCR based peop-tech firm, has raised $375,000...</p>
            <button class="learn-more-button">Learn More</button>
          </div>
          <div class="news-block">
            <img src={p1} alt="Media coverage 1" class="news-image"/>
            <h2 class="news-text">Prop-tech startup HouseEazy raises $375,000</h2>
            <p class="news-text">HouseEazy, a Delhi-NCR based peop-tech firm, has raised $375,000...</p>
            <button class="learn-more-button">Learn More</button>
          </div>
          <div class="news-block">
            <img src={p1} alt="Media coverage 2" class="news-image"/>
            <h2 class="news-text">Description of media coverage 1.</h2>
            <p class="news-text">Description of media coverage 2.</p>
            <button class="learn-more-button">Learn More</button>
          </div>
          <div class="news-block">
            <img src={p1} alt="Media coverage 1" class="news-image"/>
            <h2 class="news-text">Description of media coverage 1.</h2>
            <p class="news-text">Description of media coverage 1.</p>
            <button class="learn-more-button">Learn More</button>
          </div>
        </div>
      </div> 

      <div class="content-container">
        <div class="text-section">
          <h1>Are you joining us?</h1>
          <h2>Brands</h2>
          <p>Email: xyz@gmail.com</p>
          <h2>Contact Us</h2>
          <p>Phone: (123) 456-7890</p>
          <h2>Address</h2>
          <p>123 Brand St, City, Country</p>
        </div>
        <div class="image-section">
          <img src={p1} alt="Brand Image" class="content-image"/>
        </div>
      </div>  

      <div class="custom-section">
        <h1 class="header-text">Newsletter</h1>
        <p class="description-text">Stay up to date with our latest news and products.</p>
        <input type="email" class="email-input" placeholder="Enter your email address" />
        <button class="subscribe-btn">Subscribe</button>
      </div>

      <div className="invest_container">
        <img src={invest} alt="Invest Image" className="invest_style" />
      </div>




      <footer className="footer">
      <div className="container">
        <nav className="nav-links">
          <a href="#" className="nav-link">Properties & Flats Sales</a>
          <a href="#" className="nav-link">Flats for Rent</a>
          <a href="#" className="nav-link">PG/Hostels</a>
          <a href="#" className="nav-link">Flatmates</a>
          <a href="#" className="nav-link">Commercial</a>
          <a href="#" className="nav-link">New Projects & Plots</a>
          <a href="#" className="nav-link">Villas</a>
        </nav>

        <div className="footer-content">
          <div className="footer-section">
            <h3>Properties & Sales</h3>
            <ul>
              <li><a href="#">Apartments for Sale</a></li>
              <li><a href="#">Independent Houses</a></li>
              <li><a href="#">Premium Properties</a></li>
              <li><a href="#">New Launches</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Rental Properties</h3>
            <ul>
              <li><a href="#">Furnished Apartments</a></li>
              <li><a href="#">Bachelor Friendly</a></li>
              <li><a href="#">Family Apartments</a></li>
              <li><a href="#">Studio Apartments</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Commercial</h3>
            <ul>
              <li><a href="#">Office Spaces</a></li>
              <li><a href="#">Retail Shops</a></li>
              <li><a href="#">Warehouses</a></li>
              <li><a href="#">Industrial Properties</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>New Projects</h3>
            <ul>
              <li><a href="#">Under Construction</a></li>
              <li><a href="#">Ready to Move</a></li>
              <li><a href="#">Luxury Projects</a></li>
              <li><a href="#">Plot Projects</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="app-downloads">
            <a href="https://play.google.com/store" className="app-link" target="_blank" rel="noopener noreferrer">
              <img
                src="/placeholder.svg?height=40&width=135"
                alt="Get it on Google Play"
                width="135"
                height="40"
              />
            </a>
            <a href="https://www.apple.com/app-store/" className="app-link" target="_blank" rel="noopener noreferrer">
              <img
                src="/placeholder.svg?height=40&width=135"
                alt="Download on the App Store"
                width="135"
                height="40"
              />
            </a>
          </div>

          <div className="social-links">
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer"><Twitter /></a>
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer"><Youtube /></a>
          </div>

          <p className="copyright">
            Bhoomiguru.com is a product of Zillion Ventures having GST number as 09AADFZ0227B1ZJ.
            <br />
            Copyright, All Rights Reserved - ZILLION VENTURES.
          </p>
        </div>
      </div>
    </footer>



    </div>      
      
  );
};

export default HomePage;

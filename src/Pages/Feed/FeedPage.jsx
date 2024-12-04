import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './FeedPage.css';
import logo from '../../Media/Images/logo.png'
import profile_pic from '../../Media/Images/profile-pic.png'
import { ChevronDown, Heart, MessageCircle, Share2 } from 'lucide-react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


import '@fortawesome/fontawesome-free/css/all.min.css';


import { useEffect } from "react";

import p1 from '../../Media/Images/project_1.webp'



import PropertyFilters from './PropertyFilters';

// Mock data - replace with backend data later
const mockListings = [
  {
    id: '1',
    status: { sell: true, flat: true, urgent: true },
    images: [
      'https://localleader.com/wp-content/uploads/2017/09/Online-real-estate-listings.jpg',
      'https://localleader.com/wp-content/uploads/2017/07/shutterstock_266465897.jpg',
      'https://cdn.prod.website-files.com/62a4f1b9ff17080082bbb71e/644fc31364259263aa27958e_644fc2c6b9f236395293af68_real-estate-ads.webp',
    ],
    name: 'Jaypee Greens Kosmos',
    poster: {
      name: 'Mahipal Chaudhary',
      company: 'JSR Consultants',
      avatar: 'https://s3-alpha-sig.figma.com/img/5100/fe3b/e9e1da5b2f2babc5ec224180fe7ddc83?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQQpQPY73FYvZ4r9HfyGtaxGAxmSbXKb0sWkr1ZD2QG5LK2JMmm9U2ETEG2AAbj38hn7YkCzHstgxRIbpdvq1dsbxIPYiukE79JG8b8Gcd5UzsVuolDIAMJsjjUawnqleifycZQoUVN5SGkzHCOCSZKrPIxshZ2eZcd7emtl3UihuBlu7CKL7yXEUJ09S-gkeVxOEN5EqtOBCLH2x6RI3390ejcBn4lfaiptrlI9WL70WvVGqkoKAO0KI1EY3LwBBpn2ASqnvvALQyuh0cEqdDh-QFTrHM0MbuGgmaqj9~wodBbZP4N-ZMv~ikO82bHcGjze971nlb-ja2IE3dEuvg__',
    },
    details: {
      type: '2 Bhk',
      area: { size: 11000, unit: 'sqft' },
      price: { amount: 26.03, perSqft: 40000 },
    },
    features: { beds: 3, baths: 2, parking: 4 },
    tags: ['File in Hand', 'Exchange'],
    location: 'Sector 134, Noida',
    listingCount: 26,
  },

  {
    id: '2',
    status: { sell: true, flat: true, urgent: true },
    images: [
      'https://localleader.com/wp-content/uploads/2017/09/Online-real-estate-listings.jpg',
      'https://localleader.com/wp-content/uploads/2017/07/shutterstock_266465897.jpg',
      'https://cdn.prod.website-files.com/62a4f1b9ff17080082bbb71e/644fc31364259263aa27958e_644fc2c6b9f236395293af68_real-estate-ads.webp',
    ],
    name: 'Jaypee Greens Kosmos',
    poster: {
      name: 'Mahipal Chaudhary',
      company: 'JSR Consultants',
      avatar: 'https://s3-alpha-sig.figma.com/img/5100/fe3b/e9e1da5b2f2babc5ec224180fe7ddc83?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQQpQPY73FYvZ4r9HfyGtaxGAxmSbXKb0sWkr1ZD2QG5LK2JMmm9U2ETEG2AAbj38hn7YkCzHstgxRIbpdvq1dsbxIPYiukE79JG8b8Gcd5UzsVuolDIAMJsjjUawnqleifycZQoUVN5SGkzHCOCSZKrPIxshZ2eZcd7emtl3UihuBlu7CKL7yXEUJ09S-gkeVxOEN5EqtOBCLH2x6RI3390ejcBn4lfaiptrlI9WL70WvVGqkoKAO0KI1EY3LwBBpn2ASqnvvALQyuh0cEqdDh-QFTrHM0MbuGgmaqj9~wodBbZP4N-ZMv~ikO82bHcGjze971nlb-ja2IE3dEuvg__',
    },
    details: {
      type: '2 Bhk',
      area: { size: 11000, unit: 'sqft' },
      price: { amount: 26.03, perSqft: 40000 },
    },
    features: { beds: 3, baths: 2, parking: 4 },
    tags: ['File in Hand', 'Exchange'],
    location: 'Sector 134, Noida',
    listingCount: 26,
  },
  {
    id: '3',
    status: { sell: true, flat: true, urgent: true },
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://static.vecteezy.com/system/resources/thumbnails/023/309/311/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg',
      'https://img.freepik.com/free-psd/close-up-house-isolated_23-2151616317.jpg',
    ],
    name: 'Jaypee Greens Kosmos',
    poster: {
      name: 'Mahipal Chaudhary',
      company: 'JSR Consultants',
      avatar: 'https://s3-alpha-sig.figma.com/img/5100/fe3b/e9e1da5b2f2babc5ec224180fe7ddc83?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQQpQPY73FYvZ4r9HfyGtaxGAxmSbXKb0sWkr1ZD2QG5LK2JMmm9U2ETEG2AAbj38hn7YkCzHstgxRIbpdvq1dsbxIPYiukE79JG8b8Gcd5UzsVuolDIAMJsjjUawnqleifycZQoUVN5SGkzHCOCSZKrPIxshZ2eZcd7emtl3UihuBlu7CKL7yXEUJ09S-gkeVxOEN5EqtOBCLH2x6RI3390ejcBn4lfaiptrlI9WL70WvVGqkoKAO0KI1EY3LwBBpn2ASqnvvALQyuh0cEqdDh-QFTrHM0MbuGgmaqj9~wodBbZP4N-ZMv~ikO82bHcGjze971nlb-ja2IE3dEuvg__',
    },
    details: {
      type: '2 Bhk',
      area: { size: 11000, unit: 'sqft' },
      price: { amount: 26.03, perSqft: 40000 },
    },
    features: { beds: 3, baths: 2, parking: 4 },
    tags: ['File in Hand', 'Exchange'],
    location: 'Sector 134, Noida',
    listingCount: 26,
  },
  {
    id: '4',
    status: { sell: true, flat: true, urgent: true },
    images: [
      'https://localleader.com/wp-content/uploads/2017/09/Online-real-estate-listings.jpg',
      'https://localleader.com/wp-content/uploads/2017/07/shutterstock_266465897.jpg',
      'https://cdn.prod.website-files.com/62a4f1b9ff17080082bbb71e/644fc31364259263aa27958e_644fc2c6b9f236395293af68_real-estate-ads.webp',
    ],
    name: 'Jaypee Greens Kosmos',
    poster: {
      name: 'Mahipal Chaudhary',
      company: 'JSR Consultants',
      avatar: 'https://s3-alpha-sig.figma.com/img/5100/fe3b/e9e1da5b2f2babc5ec224180fe7ddc83?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQQpQPY73FYvZ4r9HfyGtaxGAxmSbXKb0sWkr1ZD2QG5LK2JMmm9U2ETEG2AAbj38hn7YkCzHstgxRIbpdvq1dsbxIPYiukE79JG8b8Gcd5UzsVuolDIAMJsjjUawnqleifycZQoUVN5SGkzHCOCSZKrPIxshZ2eZcd7emtl3UihuBlu7CKL7yXEUJ09S-gkeVxOEN5EqtOBCLH2x6RI3390ejcBn4lfaiptrlI9WL70WvVGqkoKAO0KI1EY3LwBBpn2ASqnvvALQyuh0cEqdDh-QFTrHM0MbuGgmaqj9~wodBbZP4N-ZMv~ikO82bHcGjze971nlb-ja2IE3dEuvg__',
    },
    details: {
      type: '2 Bhk',
      area: { size: 11000, unit: 'sqft' },
      price: { amount: 26.03, perSqft: 40000 },
    },
    features: { beds: 3, baths: 2, parking: 4 },
    tags: ['File in Hand', 'Exchange'],
    location: 'Sector 134, Noida',
    listingCount: 26,
  },
  {
    id: '5',
    status: { sell: true, flat: true, urgent: true },
    images: [
      'https://localleader.com/wp-content/uploads/2017/09/Online-real-estate-listings.jpg',
      'https://localleader.com/wp-content/uploads/2017/07/shutterstock_266465897.jpg',
      'https://cdn.prod.website-files.com/62a4f1b9ff17080082bbb71e/644fc31364259263aa27958e_644fc2c6b9f236395293af68_real-estate-ads.webp',
    ],
    name: 'Jaypee Greens Kosmos',
    poster: {
      name: 'Mahipal Chaudhary',
      company: 'JSR Consultants',
      avatar: 'https://s3-alpha-sig.figma.com/img/5100/fe3b/e9e1da5b2f2babc5ec224180fe7ddc83?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQQpQPY73FYvZ4r9HfyGtaxGAxmSbXKb0sWkr1ZD2QG5LK2JMmm9U2ETEG2AAbj38hn7YkCzHstgxRIbpdvq1dsbxIPYiukE79JG8b8Gcd5UzsVuolDIAMJsjjUawnqleifycZQoUVN5SGkzHCOCSZKrPIxshZ2eZcd7emtl3UihuBlu7CKL7yXEUJ09S-gkeVxOEN5EqtOBCLH2x6RI3390ejcBn4lfaiptrlI9WL70WvVGqkoKAO0KI1EY3LwBBpn2ASqnvvALQyuh0cEqdDh-QFTrHM0MbuGgmaqj9~wodBbZP4N-ZMv~ikO82bHcGjze971nlb-ja2IE3dEuvg__',
    },
    details: {
      type: '2 Bhk',
      area: { size: 11000, unit: 'sqft' },
      price: { amount: 26.03, perSqft: 40000 },
    },
    features: { beds: 3, baths: 2, parking: 4 },
    tags: ['File in Hand', 'Exchange'],
    location: 'Sector 134, Noida',
    listingCount: 26,
  },
  {
    id: '6',
    status: { sell: true, flat: true, urgent: true },
    images: [
      'https://localleader.com/wp-content/uploads/2017/09/Online-real-estate-listings.jpg',
      'https://localleader.com/wp-content/uploads/2017/07/shutterstock_266465897.jpg',
      'https://cdn.prod.website-files.com/62a4f1b9ff17080082bbb71e/644fc31364259263aa27958e_644fc2c6b9f236395293af68_real-estate-ads.webp',
    ],
    name: 'Jaypee Greens Kosmos',
    poster: {
      name: 'Mahipal Chaudhary',
      company: 'JSR Consultants',
      avatar: 'https://s3-alpha-sig.figma.com/img/5100/fe3b/e9e1da5b2f2babc5ec224180fe7ddc83?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQQpQPY73FYvZ4r9HfyGtaxGAxmSbXKb0sWkr1ZD2QG5LK2JMmm9U2ETEG2AAbj38hn7YkCzHstgxRIbpdvq1dsbxIPYiukE79JG8b8Gcd5UzsVuolDIAMJsjjUawnqleifycZQoUVN5SGkzHCOCSZKrPIxshZ2eZcd7emtl3UihuBlu7CKL7yXEUJ09S-gkeVxOEN5EqtOBCLH2x6RI3390ejcBn4lfaiptrlI9WL70WvVGqkoKAO0KI1EY3LwBBpn2ASqnvvALQyuh0cEqdDh-QFTrHM0MbuGgmaqj9~wodBbZP4N-ZMv~ikO82bHcGjze971nlb-ja2IE3dEuvg__',
    },
    details: {
      type: '2 Bhk',
      area: { size: 11000, unit: 'sqft' },
      price: { amount: 26.03, perSqft: 40000 },
    },
    features: { beds: 3, baths: 2, parking: 4 },
    tags: ['File in Hand', 'Exchange'],
    location: 'Sector 134, Noida',
    listingCount: 26,
  },
  // Add more mock listings as needed
];

const FeedTile = ({ listing }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  // Auto-advance images every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="feed-tile">
      <div className="image-carousel">
        <img src={listing.images[currentImage]} alt={`Property view ${currentImage + 1}`} />
        <div className="carousel-dots">
          {listing.images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <div className="status-tags">
          {listing.status.sell && <span className="tag sell">Sell</span>}
          {listing.status.flat && <span className="tag flat">Flat</span>}
          {listing.status.urgent && <span className="tag urgent">Urgent</span>}
        </div>
      </div>

      <div className="property-info">
        <div className="property-header">
          
          <div className="poster-info">
            <img src={listing.poster.avatar} alt={listing.poster.name} className="avatar" />
            <div>
              <h3>{listing.poster.name}</h3>
              <p>{listing.poster.company}</p>
            </div>
            <h2>{listing.name}</h2>
          </div>
        </div>

        <div className="property-details">
          <div className="detail-item">
            <span className="detail-value">{listing.details.type}</span>
            <span className="detail-label">{listing.location}</span>
          </div>
          <div className="detail-separator" />
          <div className="detail-item">
            <span className="detail-value">{listing.details.area.size} {listing.details.area.unit}</span>
            <span className="detail-label">Super Area</span>
          </div>
          <div className="detail-separator" />
          <div className="detail-item">
            <span className="detail-value">₹{listing.details.price.amount} Lac</span>
            <span className="detail-label">₹{listing.details.price.perSqft}/sqft</span>
          </div>
        </div>

        <div className="property-features">
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <span>{listing.features.beds} Beds</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚿</span>
            <span>{listing.features.baths} Baths</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🅿️</span>
            <span>{listing.features.parking} Parking</span>
          </div>
        </div>

        <div className="property-tags">
          {listing.tags.map((tag, index) => (
            <span key={index} className="property-tag">{tag}</span>
          ))}
        </div>

        <div className="property-actions">
          <button className="action-button">
            <span>{listing.listingCount}</span>
            <span>Listings</span>
          </button>
          <button className="action-button">
            <Heart className="action-icon" />
            <span>Save</span>
          </button>
          <button className="action-button">
            <Share2 className="action-icon" />
            <span>Share</span>
          </button>
          <button className="action-button" onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronDown className={`action-icon ${isExpanded ? 'expanded' : ''}`} />
            <span>View more</span>
          </button>
          <button className="action-button chat">
            <MessageCircle className="action-icon" />
            <span>Chat now</span>
          </button>
        </div>

        {isExpanded && (
          <div className="expanded-content">
            {/* Add your expanded content here */}
            <p>Additional property details will go here...</p>
          </div> 
        )}
      </div>
    </div>
  );
};






const cities = [
  {
    id: 1,
    name: 'Delhi / NCR',
    properties: '17,000+',
    image: 'https://mediacdn.99acres.com/media1/11848/1/236961707D-1594715125517.jpg',
  },
  {
    id: 2,
    name: 'Bangalore',
    properties: '1,200+',
    image: 'https://mediacdn.99acres.com/media1/11846/12/236932009D-1594709336922.jpg',
  },
  {
    id: 3,
    name: 'Pune',
    properties: '3,300+',
    image: 'https://mediacdn.99acres.com/media1/16807/3/336143474D-1640587363487.jpg',
  },
  {
    id: 4,
    name: 'Chennai',
    properties: '1,100+',
    image: 'https://mediacdn.99acres.com/media1/11848/0/236960749D-1594714810078.jpg',
  },
  {
    id: 5,
    name: 'Mumbai',
    properties: '2,800+',
    image: 'https://mediacdn.99acres.com/media1/11848/15/236975527D-1594718126587.jpg',
  },
  {
    id: 6,
    name: 'Hyderabad',
    properties: '930+',
    image: 'https://mediacdn.99acres.com/media1/20718/6/414366500D-1679814327585.jpg',
  },
  {
    id: 7,
    name: 'Kolkata',
    properties: '1,400+',
    image: 'https://mediacdn.99acres.com/media1/11848/13/236973031D-1594717541096.jpg',
  },
  {
    id: 8,
    name: 'Ahmedabad',
    properties: '3,900+',
    image: 'https://imagecdn.99acres.com/media1/24073/2/481462274D-1711002313632.jpg',
  },
];







const upcomingProjects = [
  {
    id: 1,
    name: 'The Omaxe State',
    location: 'Sector 19B Dwarka, Delhi',
    type: 'Shop',
    price: '₹77.5 L',
    builder: 'Omaxe',
    image: p1, // Replace with actual image path
  },
  {
    id: 2,
    name: 'The Sky Mall',
    location: 'Sector 21 Gurgaon, Haryana',
    type: 'Office Space',
    price: '₹1.5 Cr',
    builder: 'Skyline Builders',
    image: "https://cdn.pixabay.com/photo/2023/10/06/18/33/ai-generated-8298892_1280.jpg", // Replace with actual image path
  },
  // Add more projects as needed
];




const menuItems = [
  { icon: "🔔", label: "Notifications" },
  { icon: "🛡️", label: "Security" },
  { icon: "❓", label: "Help" },
  { icon: "📝", label: "Terms And Conditions" },
  { icon: "ℹ️", label: "About Us" },
  { icon: "⏻", label: "LogOut" }
];

const profileDetails = {
  name: "Mahipal Choudhary",
  image: "http://localhost:5173/src/Media/Images/profile-pic.png",
  status: "Vrified",
  subtitle: "Noida, India",
  stats: [
    { number: '20,080', label: 'FOLLOWERS' },
    { number: '88', label: 'FOLLOWING' },
    { number: '24', label: 'LISTINGS' }
  ]
};










const FeedPage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };






  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % cities.length); // Update every 2 cards
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [cities.length]);

  const nextCards = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % cities.length);
  };

  const prevCards = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 2 + cities.length) % cities.length
    );
  };


  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Post"); 
  };





  return (
    <div className="container">

              {/*____________________________________________________*/}

      {/*______________H E A D E R________________________*/}


      <div className="header">
        <div className="logo">
          <img src={logo} alt="" className="logo" />
        </div>


        <div className="left">
          <div className="search-container">
            <input type="text" className="search" placeholder="Search here....." />
            <span className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </span>{/* Unicode for magnifying glass */}
          </div>
          <div className="menu-button">
            <i className="fas fa-home"></i>
            <span>Feed</span>
          </div>
          <div className="menu-button">
            <i className="si-address-book"></i>
            <span>Demand</span>
          </div>
          <div className="menu-button">
            <i className="si-heart"></i>
            <span>Saved</span>
          </div>
          <div className="menu-button">
            <i className="si-notepad"></i>
            <span>My Listings</span>
          </div>


        </div>



        <div className="right">
          <div className="menu-button" onClick={handleClick}>
            <i class="si-plus"></i>
            <span>Post Listing</span>
          </div>
          <div className="menu-button" onClick={toggleSidebar}>
            <i class="si-bars"></i>
            <span>Settings</span>
          </div>
        </div>

      </div>


      {/*________________E N D________________________*/}



      {/*_____________________S I D E - B A R_________________________*/}

      <div className={`sidebar-right ${isSidebarOpen ? 'open' : ''}`} id="sidebar">

        {/* <div className="pic-section">
          <img src={profile_pic} alt="" className="profile-pic" />
          <div className="profile-name">Mahipal Chaudhary</div>
        </div>
        <div className="settings-options">
          <button className="notification">Notification</button>
          <button className="security">Security</button>
          <button className="help">Help</button>
          <button className="terms">Terms And Conditions</button>
          <button className="about-us">About Us</button>
          <button className="logout">Logout</button>
        </div> */}


        <div className="sidebar-container">
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-image-container">
                <img 
                  src={profileDetails.image} 
                  alt="Profile" 
                  className="profile-image" 
                />
                <div className="profile-status">{profileDetails.status}</div>
              </div>
              <h2 className="profile-name">{profileDetails.name}</h2>
              <p className="profile-subtitle">{profileDetails.subtitle}</p>
              
              <div className="profile-stats">
                {profileDetails.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <nav className="menu-section">
            {menuItems.map((item, index) => (
              <button key={index} className="menu-item">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                <span className="menu-arrow">→</span>
              </button>
            ))}
          </nav>
        </div>






      </div>






      {/*____________________E N D_____________________________*/}





      {/*____________________L E F T___________________________*/}


      <div className="left-section">
        <div className="user-profile-card">
          <div className="user-profile-header">
            <div className="user-avatar-container">
              <img src={profile_pic} alt="Profile" className="user-avatar" />
            </div>
            <div className="user-profile-info">
              <h2 className="user-name">Mahipal Chaudhary</h2>
              <a href="https://bhumibazar.in" className="user-website">bhumibazar.in</a>
              <p className="user-location">Noida, India</p>
            </div>
          </div>
          {/* <div className="user-profile-stats">
            <div className="user-stat-item">
              <span className="user-stat-value">26</span>
              <span className="user-stat-label">Listings</span>
            </div>
            <div className="user-stat-item">
              <span className="user-stat-value">10</span>
              <span className="user-stat-label">Followers</span>
            </div>
            <div className="user-stat-item">
              <span className="user-stat-value">5</span>
              <span className="user-stat-label">Following</span>
            </div>
          </div>
          <div className="user-view-more">
            <span>View More</span>
          </div> */}
        </div>


{/* Add PropertyFilter component here */}
  <div className="property-filter-container">
    <PropertyFilters />
  </div>

            




      </div>


      {/*_______________________E N D_________________________________________*/}





{/*___________________F E E D___________________________*/}


<div className="feed-section">
  <div className="feed-container">
    {mockListings.map((listing) => (
      <FeedTile key={listing.id} listing={listing} />
    ))}
  </div>
</div>



{/*___________________E N D____________________________*/}




      <div className="right-section">


          {/* Top Cities Section */}
          <section className="top-cities">
            <h5 className="top-cities-title">TOP CITIES</h5>
            <h2 className="top-cities-heading">
              Explore Real Estate in Popular Indian Cities
            </h2>
            <div className="city-cards">
              {cities.slice(currentIndex, currentIndex + 2).map((city) => (
                <div key={city.id} className="city-card">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="city-image"
                  />
                  <div className="city-info">
                    <h3 className="city-name">{city.name}</h3>
                    <p className="city-properties">{city.properties} Properties</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="arrow-buttons">
              <button
                onClick={prevCards}
                className="arrow-btn left-btn"
                disabled={currentIndex === 0}
              >
                &#8249;
              </button>
              <button
                onClick={nextCards}
                className="arrow-btn right-btn"
                disabled={currentIndex + 2 >= cities.length}
              >
                &#8250;
              </button>
            </div>
          </section>

          
          <div className="upcoming-projects">
            <h2>Upcoming Projects</h2>
            <p >Visit these projects and get early bird benefits</p>
            <div className="projects-container">
              {upcomingProjects.map((project) => (
                <div className="project-card" key={project.id}>
                  <div className="project-image">
                    <img src={project.image} alt={project.name} />
                    <div className="project-info">
                      <h3>{project.name}</h3>
                      <p>{project.location}</p>
                    </div>
                    <div className="project-details">
                      <span className="project-type">{project.type}</span>
                      <span className="project-price">{project.price}</span>
                    </div>
                  </div>
                  <div className="project-footer">
                    <p>
                      Interested in this project by <strong>{project.builder}</strong>?
                    </p>
                    <button className="view-number-btn">
                      📞 View Number
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>



          <button className="chat-button">

            <i className="si-chat"></i>
          </button>



      </div>


    

      

    </div>
  );
};

export default FeedPage;

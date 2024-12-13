import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPage.css'; // Custom CSS for admin page

const AdminPage = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <Row className="justify-content-center text-center mb-5 hero-section">
        <Col md={8}>
          <h2 className="display-4 text-primary">Welcome to Bhoomi Admin Panel</h2>
          <p className="lead text-muted">
            Manage your properties, builders, and more from here. Your trusted partner for real estate management.
          </p>
          
        </Col>
      </Row>

      {/* About Us Section */}
      <Row className="justify-content-center mb-5 about-section">
        <Col md={10}>
          <h3 className="text-center text-danger mb-4">About Bhoomi</h3>
          <p className="text-center text-muted">
            Bhoomi is a leading real estate platform that connects buyers, sellers, and renters to their ideal properties. Our admin panel allows you to efficiently manage projects, builders, roles, and more. We are committed to making real estate management seamless and efficient.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;

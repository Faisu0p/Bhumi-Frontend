import React from 'react';
import { useParams } from 'react-router-dom';
import './BuilderEditPage.css';

const BuilderEditPage = () => {
  const { id } = useParams(); // Access the builder ID from the URL

  return (
    <div className="builder-edit-page">
      <h1>Hello Builder, Your ID is {id}</h1>
      <p>This page is under construction. We are working hard to provide you with a seamless editing experience. Please check back later.</p>
      <p>Thank you for your patience!</p>
    </div>
  );
};

export default BuilderEditPage;

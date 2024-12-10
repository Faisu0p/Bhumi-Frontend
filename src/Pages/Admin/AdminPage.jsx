import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Admin Page</h1>
      <div className="admin-page-button-container">
        <button
          className="admin-page-button"
          onClick={() => navigate('/add-project')}
        >
          Add Project
        </button>
        <button
          className="admin-page-button"
          onClick={() => navigate('/add-builder')}
        >
          Add Builder
        </button>
        <button
          className="admin-page-button"
          onClick={() => navigate('/manage')}
        >
          Manage
        </button>
      </div>
    </div>
  );
}

export default AdminPage;

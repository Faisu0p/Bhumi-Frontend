import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing/LandingPage';
import LoginPage from './Pages/Login/LoginPage';
import SignupPage from './Pages/Signup/SignupPage';
import FeedPage from './Pages/Feed/FeedPage';
import PostPage from './Pages/Post/PostPage';
import ProjectPage from './Pages/Project/ProjectPage';
import ProjectDetailsPage from './Pages/ProjectDetails/ProjectDetails';
import AdminPage from './Pages/Admin/AdminPage';
import BuilderAddPage from './Pages/Admin/BuilderAddPage';
import ProjectAddPage from './Pages/Admin/ProjectAddPage';
import ManageBuilderPage from './Pages/Admin/ManageBuilderPage';
import Header from './Pages/Admin/components/Header';
import ViewProjectPage from './Pages/Admin/ViewProjectPage';
import ViewBuilderPage from './Pages/Admin/ViewBuilderPage';
import ManageProjectPage from './Pages/Admin/ManageProjectPage';
import LocationForm from './Pages/Admin/LocationForm';

function LayoutWithHeader({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/project-details/:id" element={<ProjectDetailsPage />} />
        
        {/* Routes with Header */}
        <Route path="/admin" element={<LayoutWithHeader><AdminPage /></LayoutWithHeader>} />
        <Route path="/add-builder" element={<LayoutWithHeader><BuilderAddPage /></LayoutWithHeader>} />
        <Route path="/add-project" element={<LayoutWithHeader><ProjectAddPage /></LayoutWithHeader>} />
        <Route path="/manage-builder" element={<LayoutWithHeader><ManageBuilderPage /></LayoutWithHeader>} />
        <Route path="/view-builder" element={<LayoutWithHeader><ViewBuilderPage /></LayoutWithHeader>} />
        <Route path="/view-project" element={<LayoutWithHeader><ViewProjectPage /></LayoutWithHeader>} />
        <Route path="/manage-project" element={<LayoutWithHeader><ManageProjectPage /></LayoutWithHeader>} />
        <Route path="/add-location" element={<LayoutWithHeader><LocationForm /></LayoutWithHeader>} />
        
        
      </Routes>
    </Router>
  </React.StrictMode>
);

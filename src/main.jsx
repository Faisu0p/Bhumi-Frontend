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
import ManagePage from './Pages/Admin/ManagePage';

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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/add-builder" element={<BuilderAddPage />} />
        <Route path="/add-project" element={<ProjectAddPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename="/bhumi_website">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/project" element={<ProjectPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
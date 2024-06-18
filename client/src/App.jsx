import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import JobDetail from './pages/JobDetail';
import AddJob from './pages/AddJob';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </div>
  );
};

export default App;

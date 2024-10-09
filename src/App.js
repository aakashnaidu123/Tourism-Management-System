import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AccommodationPage from './pages/AccommodationPage';
import TransportPage from './pages/TransportPage';
import DiningPage from './pages/DiningPage';
import SightseeingPage from './pages/SightseeingPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SafetyHealthPage from './pages/SafetyHealthPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accommodations" element={<AccommodationPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/sightseeing" element={<SightseeingPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/safety-health" element={<SafetyHealthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>

  );
}

export default App;

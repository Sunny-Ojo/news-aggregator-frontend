// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import ProfilePage from './pages/Profile.tsx';
import PersonalizedNewsFeed from './pages/PersonalizedNewsFeed.tsx';
import Footer from './pages/Footer.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/personalized-feed" element={<PersonalizedNewsFeed />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Optional: if you have a CSS file for Footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Tourist Guide. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </footer>
  );
};

export default Footer;

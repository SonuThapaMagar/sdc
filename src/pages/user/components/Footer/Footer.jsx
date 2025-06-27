import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, FunctionSquare } from 'lucide-react';
import '../../../../styles/landing.css';
import logo from '../../../../images/logo.png';


const Footer=()=> {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section fade-in">
            <div className="logo" style={{ marginBottom: '1.5rem' }}>
              <img src={logo} alt="logo" width="48" height="48" />
              <span className="logo-text" style={{ color: 'white' }}>FurEverHome</span>
            </div>
            <p>Connecting loving families with pets in need of homes. Every adoption saves a life.</p>
          </div>
          <div className="footer-section fade-in">
            <h3>Quick Links</h3>
            <ul className="footer-links">{['About Us', 'Pet Listings', 'Adoption Process', 'Success Stories', 'Contact'].map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul>
          </div>
          <div className="footer-section fade-in">
            <h3>Services</h3>
            <ul className="footer-links">{['Pet Adoption', 'Shelter Partnership', 'Pet Care Tips', 'Veterinary Network', 'Support'].map((service) => <li key={service}><a href="#">{service}</a></li>)}</ul>
          </div>
          <div className="footer-section fade-in">
            <h3>Contact Us</h3>
            <div>
              <div className="footer-contact"><Phone size={20} className="footer-contact-icon" /><span className="footer-contact-text">+977-9785854460</span></div>
              <div className="footer-contact"><Mail size={20} className="footer-contact-icon" /><span className="footer-contact-text">fureverhome@gmail.com</span></div>
              <div className="footer-contact"><MapPin size={20} className="footer-contact-icon" /><span className="footer-contact-text">Kathmandu</span></div>
            </div>
            <div className="footer-social">{[Facebook, Twitter, Instagram].map((Icon, index) => <a key={index} href="#" className="footer-social-link"><Icon size={20} /></a>)}</div>
          </div>
        </div>
        <div className="footer-bottom fade-in">
          <p>© 2024 FurEverHome. All rights reserved. Made with ❤️ for pets and their families.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
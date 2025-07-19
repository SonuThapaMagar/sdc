import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import '../../../../styles/landing.css';
import logo from '../../../../images/logo.png';

const LandingFooter = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const quickLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Pet Listings', path: '/category' },
    { name: 'Adoption Process', path: '/learn-more' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Pet Adoption', path: '/category' },
    { name: 'Pet Care Tips', path: '/learn-more' },
    { name: 'Support', path: '/contact' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section fade-in">
            <div className="logo" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src={logo} alt="logo" width="48" height="48" />
              <span className="logo-text" style={{ color: 'white' }}>FurEverHome</span>
            </div>
            <p>Connecting loving families with pets in need of homes. Every adoption saves a life.</p>
          </div>
          <div className="footer-section fade-in">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavigation(link.path)}
                    className="footer-link-button"
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'inherit', 
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section fade-in">
            <h3>Services</h3>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.name}>
                  <button 
                    onClick={() => handleNavigation(service.path)}
                    className="footer-link-button"
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'inherit', 
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section fade-in">
            <h3>Contact Us</h3>
            <div>
              <div className="footer-contact">
                <Phone size={20} className="footer-contact-icon" />
                <span className="footer-contact-text">+977-9785854460</span>
              </div>
              <div className="footer-contact">
                <Mail size={20} className="footer-contact-icon" />
                <span className="footer-contact-text">fureverhome@gmail.com</span>
              </div>
              <div className="footer-contact">
                <MapPin size={20} className="footer-contact-icon" />
                <span className="footer-contact-text">Kathmandu</span>
              </div>
            </div>
            <div className="footer-social">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="footer-social-link">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom fade-in">
          <p>© 2024 FurEverHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter; 
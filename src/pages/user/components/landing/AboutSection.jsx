import React from 'react';
import group from '../../../../images/group.png';
import { CheckCircle } from 'lucide-react';

const AboutSection = ({ navigate }) => (
  <section className="about">
    <div className="about-container">
      <div className="about-grid">
        <div className="about-image slide-left">
          <img src={group} alt="About us" width="600" height="500" />
        </div>
        <div className="about-content slide-right">
          <h2>Where Forever Homes Begin</h2>
          <p>Our platform connects loving families with pets in need of homes. We work with verified shelters and rescues to ensure every pet finds the perfect match.</p>
          <div className="about-features">
            {['Verified and trusted shelter partners', 'Complete health and background records', 'Ongoing support throughout the adoption process', 'Community of pet lovers and experts'].map((item, index) => (
              <div key={index} className="about-feature">
                <CheckCircle size={24} className="about-feature-icon" />
                <span className="about-feature-text">{item}</span>
              </div>
            ))}
          </div>
          <button className="about-btn" onClick={() => navigate('/about-us')}>Learn More About Us</button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection; 
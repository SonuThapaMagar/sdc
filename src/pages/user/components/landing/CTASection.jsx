import React from 'react';

const CTASection = ({ onNavigateToCategories, navigate }) => (
  <section className="cta">
    <div className="cta-container slide-up">
      <h2>Ready to Find Your New Best Friend?</h2>
      <p>Join thousands of happy families who found their perfect companion through FurEverHome. Start your adoption journey today!</p>
      <div className="cta-buttons">
        <button className="cta-btn-primary" onClick={onNavigateToCategories}>Start Browsing Pets</button>
        <button className="cta-btn-secondary" onClick={() => navigate('/register-shelter')}>Register as Shelter</button>
      </div>
    </div>
  </section>
);

export default CTASection; 
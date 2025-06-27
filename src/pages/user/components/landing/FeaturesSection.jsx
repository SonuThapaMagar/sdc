import React from 'react';

const FeaturesSection = ({ features }) => (
  <section className="features">
    <div className="features-container">
      <div className="section-header slide-up">
        <h2 className="section-title">Why Choose FurEverHome?</h2>
        <p className="section-subtitle">We're committed to making pet adoption safe, easy, and joyful</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="feature-icon"><feature.icon size={32} /></div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection; 
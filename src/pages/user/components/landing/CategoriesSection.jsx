import React from "react";

const CategoriesSection = ({ pets }) => (
  <section className="categories">
    <div className="categories-container">
      <div className="section-header slide-up">
        <h2 className="section-title">Find Your Perfect Match</h2>
        <p className="section-subtitle">Browse pets by category and find your new best friend</p>
      </div>
      <div className="categories-grid">
        {[
          { name: "Dogs", icon: "🐕", count: pets.length }, // Simplified to total pets for now
          { name: "Others", icon: "🐰", count: "0" }, // Placeholder, adjust logic if needed
          { name: "Rescued", icon: "❤️", count: "0" }, // Placeholder, adjust logic if needed
        ].map((category, index) => (
          <div key={category.name} className="category-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-count">{category.count} available</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
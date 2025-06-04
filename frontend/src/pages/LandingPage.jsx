"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Heart,
  Shield,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { petsData } from "../data/petsData"
import "../styles/landing.css"
import logo from "../images/logo.png"
import dc from "../images/dc.png"
import group from "../images/group.png"

export default function LandingPage() {
  const navigate = useNavigate() // React Router navigation hook
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleFavorite = (petId) => {
    setIsFavorite((prev) => {
      const newState = { ...prev }
      if (newState[petId]) {
        delete newState[petId] // Remove from favorites
      } else {
        newState[petId] = true // Add to favorites
      }
      return newState
    })
  }

  // Navigation function using React Router
  const onNavigateToCategories = () => {
    navigate("/category")
  }

  // Get the specific pets we want to display - replaced Milo and Chloe with cats
  const displayPets = [
    petsData.find((pet) => pet.name === "Coco"),
    petsData.find((pet) => pet.name === "Whiskers"), // Cat
    petsData.find((pet) => pet.name === "Shadow"), // Cat
    petsData.find((pet) => pet.name === "Leo"),
  ].filter(Boolean)

  // Search functionality
  const filteredPets = petsData.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const features = [
    {
      icon: Shield,
      title: "Verified Shelters",
      description: "All our partner shelters are verified and trusted organizations committed to animal welfare.",
    },
    {
      icon: Heart,
      title: "Health Guaranteed",
      description: "Every pet comes with complete health records and veterinary checkups.",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Our dedicated team is here to help you throughout your adoption journey.",
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Over 10,000 successful adoptions and countless happy families created.",
    },
  ]

  return (
    <div className="landing-page">
      {/* Sticky Navbar */}
      <nav className="navbarr">
        <div className="navbarr-container">
          <div className="navbarr-content">
            {/* Logo */}
            <div className="logo">
              <img src={logo || "/placeholder.svg"} alt="logo" width="48" height="48" />
              <span className="logo-text">FurEverHome</span>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-menu">
              {["Home", "About", "Pet Listing", "Contact"].map((item) => (
                <a key={item} href="#" className="nav-link">
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="nav-actions">
              <button className="search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={20} />
              </button>
              <button className="signup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div
            style={{
              background: "white",
              borderTop: "1px solid #e5e7eb",
              padding: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <input
                type="text"
                placeholder="Search for pets by name, breed, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 3rem 0.75rem 1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "9999px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8b5cf6"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb"
                }}
              />
              <Search
                size={20}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6b7280",
                }}
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div
                style={{
                  maxWidth: "1280px",
                  margin: "1rem auto 0",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {filteredPets.length > 0 ? (
                  filteredPets.slice(0, 5).map((pet) => (
                    <div
                      key={pet.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem 1rem",
                        borderBottom: "1px solid #f3f4f6",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9fafb"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white"
                      }}
                      onClick={() => {
                        setSearchQuery("")
                        setIsSearchOpen(false)
                        onNavigateToCategories()
                      }}
                    >
                      <img
                        src={pet.imageUrl || "/placeholder.svg"}
                        alt={pet.name}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "1rem",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "600", color: "#111827" }}>
                          {pet.name} {pet.gender === "female" ? "♀️" : "♂️"}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                          {pet.age} • {pet.breed} • {pet.type}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      color: "#6b7280",
                    }}
                  >
                    No pets found matching "{searchQuery}"
                  </div>
                )}
                {filteredPets.length > 5 && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "center",
                      borderTop: "1px solid #f3f4f6",
                      color: "#8b5cf6",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSearchQuery("")
                      setIsSearchOpen(false)
                      onNavigateToCategories()
                    }}
                  >
                    View all {filteredPets.length} results
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {["Home", "About", "Pet Listing", "Contact"].map((item) => (
              <a key={item} href="#" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button className="mobile-signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content slide-left">
              <h1 className="hero-title">
                Find Your
                <span className="hero-gradient-text">Perfect Companion</span>
              </h1>

              <p className="hero-subtitle">
                Connect with loving pets from verified shelters and rescues. Every adoption saves a life and creates a
                forever bond.
              </p>

              <div className="hero-buttons">
                <button className="hero-btn-primary" onClick={onNavigateToCategories}>
                  Browse Pets
                  <ArrowRight size={20} />
                </button>
                <button className="hero-btn-secondary" onClick={() => navigate("/learn-more")}>
                  Learn More
                </button>
              </div>
            </div>

            <div className="hero-image-container slide-right">
              <div className="hero-image">
                <img src={dc || "/placeholder.svg"} alt="Happy pets" width="600" height="500" />
                <div className="hero-overlay" />
              </div>

              {/* Floating Stats */}
              <div className="hero-stats fade-in">
                <div className="hero-stats-content">
                  <div className="hero-stats-icon">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <div className="hero-stats-number">10K+</div>
                    <div className="hero-stats-label">Happy Adoptions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Categories */}
      <section className="categories">
        <div className="categories-container">
          <div className="section-header slide-up">
            <h2 className="section-title">Find Your Perfect Match</h2>
            <p className="section-subtitle">Browse pets by category and find your new best friend</p>
          </div>

          <div className="categories-grid">
            {[
              { name: "Dogs", icon: "🐕", count: `${petsData.filter((pet) => pet.type === "Dogs").length}` },
              { name: "Cats", icon: "🐱", count: `${petsData.filter((pet) => pet.type === "Cats").length}` },
              { name: "Others", icon: "🐰", count: "456" },
              { name: "Rescued", icon: "❤️", count: "890" },
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

      {/* Featured Pets - Updated with 2 dogs and 2 cats */}
      <section className="featured-pets" style={{ background: "white", padding: "4rem 0" }}>
        <div className="featured-pets-container">
          <div className="section-header slide-up">
            <h2 className="section-title">Pets Available for Adoption</h2>
            <p className="section-subtitle">Meet some of our wonderful pets looking for their forever homes</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 1rem",
            }}
          >
            {displayPets.map((pet) => (
              <div
                key={pet.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  transform: "translateY(0)",
                  boxShadow: "none",
                }}
                className="landing-pet-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
                  <img
                    src={pet.imageUrl || "/placeholder.svg"}
                    alt={pet.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(pet.id)
                    }}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "50%",
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      color: isFavorite[pet.id] ? "#8b5cf6" : "#6b7280",
                      backdropFilter: "blur(4px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(243, 244, 246, 0.95)"
                      e.currentTarget.style.transform = "scale(1.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  >
                    <Heart
                      size={20}
                      fill={isFavorite[pet.id] ? "#8b5cf6" : "none"}
                      stroke={isFavorite[pet.id] ? "#8b5cf6" : "#6b7280"}
                    />
                  </button>
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h3
                      style={{ fontSize: "1.25rem", fontWeight: "600", marginRight: "0.5rem", margin: "0 0.5rem 0 0" }}
                    >
                      {pet.name}
                    </h3>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "0.25rem",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {pet.gender === "female" ? "♀️" : "♂️"}
                    </span>
                  </div>
                  <p style={{ color: "#6b7280", margin: "0" }}>
                    {pet.age} | {pet.breed}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onNavigateToCategories}
            style={{
              backgroundColor: "white",
              color: "#8b5cf6",
              border: "2px solid #8b5cf6",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              fontWeight: "600",
              margin: "3rem auto 0",
              display: "block",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6"
              e.currentTarget.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            View All Pets
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-image slide-left">
              <img src={group || "/placeholder.svg"} alt="About us" width="600" height="500" />
            </div>

            <div className="about-content slide-right">
              <h2>Where Forever Homes Begin</h2>

              <p>
                Our platform connects loving families with pets in need of homes. We work with verified shelters and
                rescues to ensure every pet finds the perfect match.
              </p>

              <div className="about-features">
                {[
                  "Verified and trusted shelter partners",
                  "Complete health and background records",
                  "Ongoing support throughout the adoption process",
                  "Community of pet lovers and experts",
                ].map((item, index) => (
                  <div key={index} className="about-feature">
                    <CheckCircle size={24} className="about-feature-icon" />
                    <span className="about-feature-text">{item}</span>
                  </div>
                ))}
              </div>

              <button className="about-btn" onClick={() => navigate("/about-us")}>
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features">
        <div className="features-container">
          <div className="section-header slide-up">
            <h2 className="section-title">Why Choose FurEverHome?</h2>
            <p className="section-subtitle">We're committed to making pet adoption safe, easy, and joyful</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-container slide-up">
          <h2>Ready to Find Your New Best Friend?</h2>
          <p>
            Join thousands of happy families who found their perfect companion through FurEverHome. Start your adoption
            journey today!
          </p>

          <div className="cta-buttons">
            <button className="cta-btn-primary" onClick={onNavigateToCategories}>
              Start Browsing Pets
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate("/register-shelter")}>
              Register as Shelter
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section fade-in">
              <div className="logo" style={{ marginBottom: "1.5rem" }}>
                <img src={logo || "/placeholder.svg"} alt="logo" width="48" height="48" />
                <span className="logo-text" style={{ color: "white" }}>
                  FurEverHome
                </span>
              </div>
              <p>Connecting loving families with pets in need of homes. Every adoption saves a life.</p>
            </div>

            {/* Quick Links */}
            <div className="footer-section fade-in">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                {["About Us", "Pet Listings", "Adoption Process", "Success Stories", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section fade-in">
              <h3>Services</h3>
              <ul className="footer-links">
                {["Pet Adoption", "Shelter Partnership", "Pet Care Tips", "Veterinary Network", "Support"].map(
                  (service) => (
                    <li key={service}>
                      <a href="#">{service}</a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Contact */}
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

              {/* Social Icons */}
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
            <p>&copy; 2024 FurEverHome. All rights reserved. Made with ❤️ for pets and their families.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Heart, Home, CheckCircle, Clock, FileText, Search, Menu, X } from "lucide-react"
import "../../styles/landing.css"
import logo from "../../images/logo.png"

export default function LearnMore() {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const adoptionSteps = [
    {
      step: 1,
      title: "Browse & Search",
      description:
        "Explore our database of pets available for adoption. Use filters to find pets that match your lifestyle and preferences.",
      icon: Search,
      time: "5-15 minutes",
    },
    {
      step: 2,
      title: "Submit Application",
      description:
        "Fill out our comprehensive adoption application. This helps us ensure the best match between you and your future pet.",
      icon: FileText,
      time: "15-30 minutes",
    },
    {
      step: 3,
      title: "Meet & Greet",
      description:
        "Schedule a visit to meet your potential new family member. This is a crucial step to ensure compatibility.",
      icon: Heart,
      time: "1-2 hours",
    },
    {
      step: 4,
      title: "Home Check",
      description:
        "Our team will conduct a brief home visit to ensure your living space is safe and suitable for your new pet.",
      icon: Home,
      time: "30-45 minutes",
    },
    {
      step: 5,
      title: "Finalize Adoption",
      description: "Complete the adoption paperwork, pay adoption fees, and welcome your new family member home!",
      icon: CheckCircle,
      time: "30 minutes",
    },
  ]

  const preparationTips = [
    {
      category: "Before Adoption",
      tips: [
        "Research different pet breeds and their needs",
        "Calculate the long-term costs of pet ownership",
        "Pet-proof your home by removing hazards",
        "Purchase essential supplies (food, bed, toys, etc.)",
        "Find a local veterinarian",
      ],
    },
    {
      category: "First Week Home",
      tips: [
        "Give your pet time to adjust to their new environment",
        "Establish a routine for feeding and exercise",
        "Schedule a vet checkup within the first week",
        "Begin basic training and socialization",
        "Be patient - adjustment can take several weeks",
      ],
    },
    {
      category: "Long-term Care",
      tips: [
        "Maintain regular veterinary checkups",
        "Provide consistent training and mental stimulation",
        "Ensure proper nutrition and exercise",
        "Keep identification tags and microchip info updated",
        "Build a relationship with local pet services",
      ],
    },
  ]

  const faqs = [
    {
      question: "How much does pet adoption cost?",
      answer:
        "Adoption fees typically range from $50-$300 depending on the pet's age, breed, and medical needs. This fee covers vaccinations, spaying/neutering, and microchipping.",
    },
    {
      question: "How long does the adoption process take?",
      answer:
        "The process usually takes 1-2 weeks from application to bringing your pet home. This includes application review, meet and greet, and home check.",
    },
    {
      question: "Can I return a pet if it doesn't work out?",
      answer:
        "Yes, we have a return policy. We want what's best for both you and the pet. We'll work with you to address any issues or help find a better match.",
    },
    {
      question: "Do you offer support after adoption?",
      answer:
        "We provide ongoing support including training resources, behavioral guidance, and access to our network of veterinarians and pet care professionals.",
    },
  ]

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbarr">
        <div className="navbarr-container">
          <div className="navbarr-content">
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo || "/placeholder.svg"} alt="logo" width="48" height="48" />
              <span className="logo-text">FurEverHome</span>
            </div>

            <div className="nav-menu">
              <a href="#" onClick={() => navigate("/")} className="nav-link">
                Home
              </a>
              <a href="#" className="nav-link active">
                Learn
              </a>
              <a href="#" onClick={() => navigate("/category")} className="nav-link">
                Pet Listing
              </a>
              <a href="#" className="nav-link">
                Contact
              </a>
            </div>

            <div className="nav-actions">
              <button className="signup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>

            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a
              href="#"
              onClick={() => {
                navigate("/")
                setIsMobileMenuOpen(false)
              }}
            >
              Home
            </a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Learn
            </a>
            <a
              href="#"
              onClick={() => {
                navigate("/category")
                setIsMobileMenuOpen(false)
              }}
            >
              Pet Listing
            </a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </a>
            <button className="mobile-signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* Header Section */}
      <section className="hero" style={{ padding: "3rem 0" }}>
        <div className="hero-container">
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              color: "#8b5cf6",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "2rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7c3aed")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8b5cf6")}
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="hero-content" style={{ textAlign: "center" }}>
            <h1 className="hero-title" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              Everything You Need to Know About
              <span className="hero-gradient-text"> Pet Adoption</span>
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: "800px", margin: "0 auto" }}>
              Learn about the adoption process, prepare for your new pet, and discover how to provide the best care for
              your furry friend.
            </p>
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="categories" style={{ background: "white" }}>
        <div className="categories-container">
          <div className="section-header">
            <h2 className="section-title">The Adoption Process</h2>
            <p className="section-subtitle">Follow these simple steps to find and adopt your perfect companion</p>
          </div>

          <div style={{ display: "grid", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            {adoptionSteps.map((step, index) => (
              <div
                key={step.step}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "2rem",
                  padding: "2rem",
                  background: index % 2 === 0 ? "#f9fafb" : "white",
                  borderRadius: "1rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {step.step}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "600", margin: 0 }}>{step.title}</h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        color: "#6b7280",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Clock size={16} />
                      {step.time}
                    </div>
                  </div>
                  <p style={{ color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{step.description}</p>
                </div>

                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    background: "#ede9fe",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8b5cf6",
                  }}
                >
                  <step.icon size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Preparing for Your New Pet</h2>
            <p className="section-subtitle">
              Essential tips to ensure a smooth transition for you and your new companion
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
            {preparationTips.map((category, index) => (
              <div
                key={category.category}
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "1rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                    color: "#8b5cf6",
                  }}
                >
                  {category.category}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {category.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        marginBottom: "1rem",
                        color: "#374151",
                      }}
                    >
                      <CheckCircle size={20} style={{ color: "#10b981", marginTop: "0.125rem", flexShrink: 0 }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about" style={{ background: "white" }}>
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Get answers to common questions about pet adoption</p>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "2rem",
                  padding: "2rem",
                  background: "#f9fafb",
                  borderRadius: "1rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "#111827",
                  }}
                >
                  {faq.question}
                </h3>
                <p style={{ color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ready to Start Your Adoption Journey?</h2>
          <p>Browse our available pets and find your perfect companion today!</p>

          <div className="cta-buttons">
            <button className="cta-btn-primary" onClick={() => navigate("/category")}>
              Browse Available Pets
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Menu, X, Heart } from "lucide-react"
import ProfileModal from "./ProfileModal"
import logo from "../../../images/logo.png"
import "../../../styles/Navbar.css"

export default function Navbar({
  showSearch = true,
  searchQuery = "",
  onSearchChange,
  searchResults = [],
  onSearchResultClick,
  className = "",
}) {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Mock user data - you can replace this with actual auth state
  const isAuthenticated = false
  const user = {
    fullName: "User",
    profileImage: "/placeholder.svg?height=40&width=40"
  }

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn-more" },
    { name: "About", href: "/about-us" },
    { name: "Pet Listing", href: "/category" },
    { name: "Contact", href: "#contact" },
  ]

  const handleSearchChange = (value) => {
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleSearchResultClick = () => {
    setIsSearchOpen(false)
    if (onSearchResultClick) {
      onSearchResultClick()
    }
  }

  return (
    <>
      <nav className={`navbar ${className}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <div className="navbar-logo" onClick={() => navigate("/")}>
              <div className="navbar-logo-icon">
              <img
                  src={logo || "/logo.png"}
                  alt="logo"/*  */
                  width="48"
                  height="48"
                />
              </div>
              <span className="navbar-logo-text">FurEverHome</span>
            </div>

            

            {/* Desktop Navigation */}
            <div className="navbar-nav">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/")) {
                      e.preventDefault()
                      navigate(link.href)
                    }
                  }}
                  className="navbar-nav-link"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="navbar-actions">
              {showSearch && (
                <button className="navbar-search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <Search size={20} />
                </button>
              )}

              {isAuthenticated ? (
                <div className="navbar-profile" onClick={() => setIsProfileOpen(true)}>
                  <div className="navbar-profile-image">
                    <img
                      src={user?.profileImage || "/placeholder.svg?height=40&width=40"}
                      alt={user?.fullName || "Profile"}
                    />
                  </div>
                  <div className="navbar-profile-info">
                    <div className="navbar-profile-location">
                      Location
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="navbar-profile-name">{user?.fullName || "User"}</div>
                  </div>
                </div>
              ) : (
                <div className="navbar-auth-buttons">
                  <button onClick={() => navigate("/login")} className="navbar-signin-btn">
                    Sign In
                  </button>
                  <button onClick={() => navigate("/signup")} className="navbar-signup-btn">
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="navbar-mobile-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && isSearchOpen && (
          <div className="navbar-search-bar">
            <div className="navbar-search-container">
              <input
                type="text"
                placeholder="Search for pets by name, breed, or type..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="navbar-search-input"
              />
              <Search size={20} className="navbar-search-icon" />
            </div>

            {/* Search Results */}
            {searchQuery && searchResults.length >= 0 && (
              <div className="navbar-search-results">
                {searchResults.length > 0 ? (
                  searchResults.slice(0, 5).map((pet) => (
                    <div key={pet.id} className="navbar-search-result" onClick={handleSearchResultClick}>
                      <img
                        src={pet.imageUrl || "/placeholder.svg"}
                        alt={pet.name}
                        className="navbar-search-result-image"
                      />
                      <div>
                        <div className="navbar-search-result-name">
                          {pet.name} {pet.gender === "female" ? "♀️" : "♂️"}
                        </div>
                        <div className="navbar-search-result-details">
                          {pet.age} • {pet.breed} • {pet.type}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="navbar-search-no-results">No pets found matching "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMobileMenuOpen ? "" : "hidden"}`}>
          <div className="navbar-mobile-menu-content">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/")) {
                    e.preventDefault()
                    navigate(link.href)
                  }
                  setIsMobileMenuOpen(false)
                }}
                className="navbar-mobile-menu-link"
              >
                {link.name}
              </a>
            ))}

            {isAuthenticated ? (
              <div className="navbar-mobile-profile">
                <div
                  className="navbar-mobile-profile-info"
                  onClick={() => {
                    setIsProfileOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <div className="navbar-mobile-profile-image">
                    <img
                      src={user?.profileImage || "/placeholder.svg?height=32&width=32"}
                      alt={user?.fullName || "Profile"}
                    />
                  </div>
                  <div>
                    <div className="navbar-mobile-profile-location">Location</div>
                    <div className="navbar-mobile-profile-name">{user?.fullName || "User"}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/category")
                    setIsMobileMenuOpen(false)
                  }}
                  className="navbar-mobile-browse-btn"
                >
                  Browse Pets
                </button>
              </div>
            ) : (
              <div className="navbar-mobile-auth">
                <button
                  onClick={() => {
                    navigate("/login")
                    setIsMobileMenuOpen(false)
                  }}
                  className="navbar-mobile-signin-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup")
                    setIsMobileMenuOpen(false)
                  }}
                  className="navbar-mobile-signup-btn"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}

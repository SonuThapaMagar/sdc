import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Menu, X, Heart } from "lucide-react"
import ProfileModal from "./ProfileModal"
import logo from "../../../images/logo.png"
import "../../../styles/Navbar.css"
import { useAuth } from "./auth-provider"

export default function Navbar({
  showSearch = true,
  searchQuery = "",
  onSearchChange,
  searchResults = [],
  onSearchResultClick,
  className = "",
  forceAuthButtons = false,
}) {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  // Check if user is authenticated and has USER role
  const showProfile = isAuthenticated && user?.role === 'USER' && !forceAuthButtons;

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

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
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

              {showProfile ? (
                <div
                  className="navbar-profile"
                  tabIndex={0}
                  style={{ position: "relative" }}
                >
                  <div
                    className="navbar-profile-image"
                    onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={user?.profileImage || "/placeholder.svg?height=40&width=40"}
                      alt={user?.fullName || "Profile"}
                    />
                  </div>
                  <div className="navbar-profile-info" onClick={() => setIsProfileDropdownOpen((prev) => !prev)} style={{ cursor: "pointer" }}>
                    <div className="navbar-profile-name">{user?.fullName || "User"}</div>
                  </div>
                  {isProfileDropdownOpen && (
                    <div className="navbar-profile-dropdown" style={{ position: "absolute", top: "100%", right: 0, background: "white", border: "1px solid #eee", borderRadius: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minWidth: "160px", zIndex: 100, display: "flex", flexDirection: "column" }}>
                      <button onClick={() => { navigate("/user/profile"); setIsProfileDropdownOpen(false); }} style={{ background: "none", border: "none", padding: "10px 16px", textAlign: "left", cursor: "pointer", fontSize: "1rem", color: "#333", transition: "background 0.2s" }}>
                        My Profile
                      </button>
                      <button onClick={() => { navigate("/user/change-password"); setIsProfileDropdownOpen(false); }} style={{ background: "none", border: "none", padding: "10px 16px", textAlign: "left", cursor: "pointer", fontSize: "1rem", color: "#333", transition: "background 0.2s" }}>
                        Change Password
                      </button>
                      <button onClick={handleLogout} style={{ background: "none", border: "none", padding: "10px 16px", textAlign: "left", cursor: "pointer", fontSize: "1rem", color: "#e53e3e", transition: "background 0.2s" }}>
                        Logout
                      </button>
                    </div>
                  )}
                  {/* Click outside to close dropdown */}
                  {isProfileDropdownOpen && (
                    <div
                      style={{ position: "fixed", inset: 0, zIndex: 99 }}
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />
                  )}
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

            {showProfile ? (
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

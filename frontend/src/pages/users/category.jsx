"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Heart, Filter, ChevronLeft, MapPin, ArrowLeft, ArrowRight, Menu } from "lucide-react"
import "../../styles/category.css"
import FilterModal from "./filtermodal"
import "../../styles/filtermodal.css"
import coco from "../../images/coco.png"
import chloe from "../../images/chole.png"
import max from "../../images/max.png"
import rockey from "../../images/rockey.png"
import bella from "../../images/bella.png"
import leo from "../../images/leo.png"
import luna from "../../images/luna.png"
import milo from "../../images/milo.png"
import profile from "../../images/profile.png"
import NotificationsPanel from "./notificationpanel"
import "../../styles/notification.css"
import SearchModal from "./searchmodal"
import "../../styles/petdetails.css"
import MobileNav from "./mobilenav"
import whiskers from "../../images/whiskers.png"
import shadow from "../../images/shadow.png"
import tiger from "../../images/tiger.png"
import smokey from "../../images/smokey.png"
import princess from "../../images/princess.png"
import patches from "../../images/patches.png"
import mittens from "../../images/mittens.png"
import felix from "../../images/felix.png"

export default function PetCategories() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})
  const [activeCategory, setActiveCategory] = useState("Dogs")
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const [selectedPetId, setSelectedPetId] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  // Mock pets data with both dogs and cats
  const petsData = [
    // Dogs
    {
      id: 1,
      name: "Coco",
      type: "Dogs",
      gender: "female",
      breed: "Border collie",
      color: "Brown & White",
      weight: "18 Kg",
      age: "Young",
      location: "Frankfurt (5 km away)",
      health: ["Fully vaccinated", "Spayed"],
      characteristics: ["Good with kids", "Playful and energetic", "Requires mental stimulation", "Well-trained"],
      imageUrl: coco,
      isFavorite: false,
    },
    {
      id: 2,
      name: "Milo",
      type: "Dogs",
      gender: "male",
      breed: "Samoyed",
      color: "White",
      weight: "20 Kg",
      age: "Adult",
      location: "Berlin (25 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Good with kids", "Playful and athletic", "Requires daily outdoor activity", "Well-mannered"],
      imageUrl: milo,
      isFavorite: true,
    },
    {
      id: 3,
      name: "Chloe",
      type: "Dogs",
      gender: "female",
      breed: "Mix breed",
      color: "Golden",
      weight: "15 Kg",
      age: "Adult",
      location: "Munich (15 km away)",
      health: ["Fully vaccinated", "Spayed"],
      characteristics: ["Good with other pets", "Calm and gentle", "Enjoys short walks", "House trained"],
      imageUrl: chloe,
      isFavorite: false,
    },
    {
      id: 4,
      name: "Leo",
      type: "Dogs",
      gender: "male",
      breed: "Pomeranian",
      color: "Orange",
      weight: "4 Kg",
      age: "Puppy",
      location: "Hamburg (10 km away)",
      health: ["Partially vaccinated", "Not neutered"],
      characteristics: ["Energetic", "Needs training", "Good with adults", "Apartment friendly"],
      imageUrl: leo,
      isFavorite: false,
    },
    {
      id: 5,
      name: "Max",
      type: "Dogs",
      gender: "male",
      breed: "Golden Retriever",
      color: "Golden",
      weight: "25 Kg",
      age: "Adult",
      location: "Cologne (20 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Great with kids", "Friendly and social", "Loves water activities", "Well-trained"],
      imageUrl: max,
      isFavorite: false,
    },
    {
      id: 6,
      name: "Luna",
      type: "Dogs",
      gender: "female",
      breed: "Husky",
      color: "Grey & White",
      weight: "22 Kg",
      age: "Young",
      location: "Dresden (30 km away)",
      health: ["Fully vaccinated", "Spayed"],
      characteristics: ["High energy", "Needs experienced owner", "Requires large space", "Pack-oriented"],
      imageUrl: luna,
      isFavorite: true,
    },
    {
      id: 7,
      name: "Rocky",
      type: "Dogs",
      gender: "male",
      breed: "German Shepherd",
      color: "Black & Tan",
      weight: "30 Kg",
      age: "Adult",
      location: "Stuttgart (15 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Protective", "Intelligent", "Easily trainable", "Loyal companion"],
      imageUrl: rockey,
      isFavorite: false,
    },
    {
      id: 8,
      name: "Bella",
      type: "Dogs",
      gender: "female",
      breed: "Labrador",
      color: "Yellow",
      weight: "24 Kg",
      age: "Puppy",
      location: "Düsseldorf (8 km away)",
      health: ["Partially vaccinated", "Not spayed"],
      characteristics: ["Friendly with everyone", "Food motivated", "Easy to train", "Loves to play fetch"],
      imageUrl: bella,
      isFavorite: false,
    },
    // Cats
    {
      id: 9,
      name: "Whiskers",
      type: "Cats",
      gender: "male",
      breed: "Persian",
      color: "White",
      weight: "5 Kg",
      age: "Adult",
      location: "Frankfurt (3 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Calm and gentle", "Loves to be petted", "Indoor cat", "Good with quiet households"],
      imageUrl: whiskers,
      isFavorite: false,
    },
    {
      id: 10,
      name: "Shadow",
      type: "Cats",
      gender: "female",
      breed: "Maine Coon",
      color: "Black",
      weight: "6 Kg",
      age: "Young",
      location: "Berlin (12 km away)",
      health: ["Fully vaccinated", "Spayed"],
      characteristics: ["Playful and active", "Good with other cats", "Loves climbing", "Very social"],
      imageUrl: shadow,
      isFavorite: true,
    },
    {
      id: 11,
      name: "Mittens",
      type: "Cats",
      gender: "female",
      breed: "British Shorthair",
      color: "Grey",
      weight: "4 Kg",
      age: "Kitten",
      location: "Munich (8 km away)",
      health: ["Partially vaccinated", "Not spayed"],
      characteristics: ["Curious and playful", "Needs socialization", "Loves toys", "Very affectionate"],
      imageUrl: mittens,
      isFavorite: false,
    },
    {
      id: 12,
      name: "Tiger",
      type: "Cats",
      gender: "male",
      breed: "Tabby",
      color: "Orange & White",
      weight: "5.5 Kg",
      age: "Adult",
      location: "Hamburg (15 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Independent", "Good hunter", "Outdoor access preferred", "Friendly with humans"],
      imageUrl: tiger,
      isFavorite: false,
    },
    {
      id: 13,
      name: "Princess",
      type: "Cats",
      gender: "female",
      breed: "Siamese",
      color: "Cream & Brown",
      weight: "4.5 Kg",
      age: "Young",
      location: "Cologne (18 km away)",
      health: ["Fully vaccinated", "Spayed"],
      characteristics: ["Very vocal", "Intelligent", "Needs attention", "Loyal to owner"],
      imageUrl: princess,
      isFavorite: true,
    },
    {
      id: 14,
      name: "Smokey",
      type: "Cats",
      gender: "male",
      breed: "Russian Blue",
      color: "Blue-Grey",
      weight: "5 Kg",
      age: "Adult",
      location: "Dresden (22 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Quiet and reserved", "Very clean", "Good with single owners", "Low maintenance"],
      imageUrl: smokey,
      isFavorite: false,
    },
    {
      id: 15,
      name: "Patches",
      type: "Cats",
      gender: "female",
      breed: "Calico",
      color: "Multi-colored",
      weight: "4.8 Kg",
      age: "Senior",
      location: "Stuttgart (10 km away)",
      health: ["Fully vaccinated", "Spayed"],
      characteristics: ["Gentle and calm", "Good with children", "Prefers quiet environments", "Very loving"],
      imageUrl: patches,
      isFavorite: false,
    },
    {
      id: 16,
      name: "Felix",
      type: "Cats",
      gender: "male",
      breed: "Ragdoll",
      color: "Cream & Grey",
      weight: "7 Kg",
      age: "Adult",
      location: "Düsseldorf (6 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Very relaxed", "Loves being held", "Good with families", "Docile temperament"],
      imageUrl: felix,
      isFavorite: false,
    },
  ]
  // Apply filters and search to pets
  const getFilteredPets = () => {
    let filtered = petsData.filter((pet) => pet.type === activeCategory)

    // Apply search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.age.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply filters
    if (Object.keys(activeFilters).length > 0) {
      filtered = filtered.filter((pet) => {
        // Pet Type filter
        if (activeFilters.petType && activeFilters.petType !== "Both") {
          if (activeFilters.petType === "Dog" && pet.type !== "Dogs") return false
          if (activeFilters.petType === "Cat" && pet.type !== "Cats") return false
        }

        // Breed filter
        if (activeFilters.breed && activeFilters.breed !== "") {
          if (!pet.breed.toLowerCase().includes(activeFilters.breed.toLowerCase())) return false
        }

        // Gender filter
        if (activeFilters.gender && activeFilters.gender !== "Both") {
          if (activeFilters.gender.toLowerCase() !== pet.gender.toLowerCase()) return false
        }

        // Age filter
        if (activeFilters.age && activeFilters.age.length > 0) {
          const petAge = pet.age.toLowerCase()
          const matchesAge = activeFilters.age.some((ageFilter) => {
            const filterAge = ageFilter.toLowerCase()
            if (filterAge === "puppy" || filterAge === "kitten") {
              return petAge.includes("puppy") || petAge.includes("kitten")
            }
            return petAge.includes(filterAge)
          })
          if (!matchesAge) return false
        }

        // Good with filter
        if (activeFilters.goodWith && activeFilters.goodWith.length > 0) {
          const matchesGoodWith = activeFilters.goodWith.some((goodWithFilter) => {
            return pet.characteristics.some((char) => char.toLowerCase().includes(goodWithFilter.toLowerCase()))
          })
          if (!matchesGoodWith) return false
        }

        // Location filter
        if (activeFilters.location && activeFilters.location !== "") {
          if (!pet.location.toLowerCase().includes(activeFilters.location.toLowerCase())) return false
        }

        return true
      })
    }

    return filtered
  }

  const filteredPets = getFilteredPets()

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters)
    console.log("Applied filters:", filters)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const handlePetClick = (petId) => {
    setSelectedPetId(petId)
  }

  const handleClosePetDetail = () => {
    setSelectedPetId(null)
  }

  const toggleFavorite = (petId, event) => {
    event.stopPropagation() // Prevent opening pet detail when clicking heart
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(petId)) {
        newFavorites.delete(petId)
      } else {
        newFavorites.add(petId)
      }
      return newFavorites
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    setSearchQuery("")
  }

  const handleResultClick = (pet) => {
    // Close search modal first
    setIsSearchOpen(false)
    // Small delay to ensure search modal closes before opening pet detail
    setTimeout(() => {
      setSelectedPetId(pet.id)
    }, 100)
  }

  return (
    <motion.div
      className="pet-categories"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation Bar */}
      <motion.nav
        className="main-navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container navbar-container">
          <div className="navbar-left">
            {/* Mobile Menu Button */}
            <motion.button
              className="mobile-menu-button"
              onClick={() => setIsMobileNavOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={24} />
            </motion.button>

            <motion.div
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
            <img src="../images/logo.png" width="40" height="40" alt="Logo" />

            </motion.div>

            <div className="nav-menu">
              {["Home", "About Us", "Services", "Contact Us", "Gallery"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className={`nav-link ${index === 0 ? "active" : ""}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="navbar-right">
            <div className="header-actions">
              <motion.button
                className="icon-button"
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search size={20} />
              </motion.button>
              <motion.button
                className="icon-button notification-button"
                onClick={() => setIsNotificationsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={20} />
                {hasUnreadNotifications && (
                  <motion.span
                    className="notification-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  />
                )}
              </motion.button>
            </div>

            <motion.div className="profile-section" whileHover={{ scale: 1.02 }}>
              <div className="profile-image">
                <img src={profile || "/placeholder.svg"} alt="Profile" />
              </div>
              <div className="profile-info">
                <div className="location-text">
                  Location
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="location-value">Stylish Boi</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <motion.main
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.h2
          className="page-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Categories
        </motion.h2>

        <motion.div
          className="filter-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            className="filter-button"
            onClick={() => setIsFilterOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={20} />
            Filter
            {Object.keys(activeFilters).length > 0 && (
              <motion.span
                className="filter-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {Object.keys(activeFilters).length}
              </motion.span>
            )}
          </motion.button>

          {/* Clear filters button */}
          {(Object.keys(activeFilters).length > 0 || searchQuery) && (
            <motion.button
              className="clear-filters-button"
              onClick={clearAllFilters}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: "1px solid #ef4444",
                backgroundColor: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Clear All
            </motion.button>
          )}

          <div className="category-tabs">
            <motion.button
              className={`category-tab ${activeCategory === "Dogs" ? "active" : ""}`}
              onClick={() => setActiveCategory("Dogs")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <span className="category-icon dogs-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10l8-7 8 7v10H4V10z" fill="currentColor" />
                </svg>
              </span>
              Dogs
            </motion.button>
            <motion.button
              className={`category-tab ${activeCategory === "Cats" ? "active" : ""}`}
              onClick={() => setActiveCategory("Cats")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <span className="category-icon cats-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Cats
            </motion.button>
          </div>
        </motion.div>

        {/* Results info */}
        <motion.div
          className="results-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginBottom: "1rem",
            color: "#6b7280",
            fontSize: "0.875rem",
          }}
        >
          {searchQuery && (
            <span>
              Search results for "{searchQuery}" • {filteredPets.length} pets found
            </span>
          )}
          {!searchQuery && Object.keys(activeFilters).length > 0 && (
            <span>Filtered results • {filteredPets.length} pets found</span>
          )}
          {!searchQuery && Object.keys(activeFilters).length === 0 && (
            <span>
              Showing all {activeCategory.toLowerCase()} • {filteredPets.length} pets
            </span>
          )}
        </motion.div>

        <motion.div className="pet-grid" layout>
          <AnimatePresence mode="wait">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, index) => (
                <motion.div
                  key={pet.id}
                  onClick={() => handlePetClick(pet.id)}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  layout
                >
                  <PetCard
                    name={pet.name}
                    gender={pet.gender}
                    info={`${pet.age} | ${pet.breed}`}
                    imageUrl={pet.imageUrl}
                    isFavorite={favorites.has(pet.id)}
                    onToggleFavorite={(event) => toggleFavorite(pet.id, event)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐾</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>No pets found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <motion.button
                  onClick={clearAllFilters}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    border: "none",
                    borderRadius: "9999px",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} profileImage={profile} />
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {isFilterOpen && (
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
            currentFilters={activeFilters}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            currentQuery={searchQuery}
            pets={petsData}
            onPetClick={handleResultClick} // Add this prop
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationsPanel
            isOpen={isNotificationsOpen}
            onClose={() => {
              setIsNotificationsOpen(false)
              setHasUnreadNotifications(false)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPetId && (
          <PetDetail
            petId={selectedPetId}
            onClose={handleClosePetDetail}
            pets={petsData}
            favorites={favorites}
            onToggleFavorite={(event) => toggleFavorite(selectedPetId, event)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function PetCard({ name, gender, info, imageUrl, isFavorite, onToggleFavorite }) {
  return (
    <motion.div
      className="pet-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="pet-image-container">
        <motion.img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="pet-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="pet-info">
        <div className="pet-name-section">
          <div className="pet-name-gender">
            <motion.h3
              className="pet-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {name}
            </motion.h3>
            <motion.span
              className={gender === "female" ? "gender-female" : "gender-male"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            >
              {gender === "female" ? "♀️" : "♂️"}
            </motion.span>
          </div>
          <motion.p
            className="pet-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {info}
          </motion.p>
        </div>
        <motion.button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={onToggleFavorite}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          animate={
            isFavorite
              ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }
              : {}
          }
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={
              isFavorite
                ? {
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Heart className={isFavorite ? "fill-current" : ""} size={20} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
}

// Pet Detail Component
function PetDetail({ petId, onClose, pets = [], favorites, onToggleFavorite }) {
  const [currentPet, setCurrentPet] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // We'll use the actual pet images for the gallery
  const [petImages, setPetImages] = useState([])

  useState(() => {
    // Find the pet in our data
    const foundPet = pets.find((pet) => pet.id === petId)
    if (foundPet) {
      setCurrentPet(foundPet)

      // For demo purposes, we'll use the same image multiple times
      // In a real app, you would have multiple images per pet
      setPetImages([foundPet.imageUrl, foundPet.imageUrl, foundPet.imageUrl])
    }
  }, [petId, pets])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? petImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === petImages.length - 1 ? 0 : prev + 1))
  }

  if (!currentPet) return null

  return (
    <motion.div
      className="pet-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="pet-detail-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="pet-detail-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="back-button"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            className={`favorite-button ${favorites.has(petId) ? "active" : ""}`}
            onClick={(e) => onToggleFavorite(e)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={
              favorites.has(petId)
                ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
          >
            <Heart size={24} fill={favorites.has(petId) ? "currentColor" : "none"} />
          </motion.button>
        </motion.div>

        <motion.div
          className="pet-detail-main"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="pet-image-gallery"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="image-container">
              <motion.img
                key={currentImageIndex}
                src={petImages[currentImageIndex] || currentPet.imageUrl}
                alt={currentPet.name}
                className="pet-detail-image"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                className="gallery-nav prev"
                onClick={handlePrevImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
              <motion.button
                className="gallery-nav next"
                onClick={handleNextImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
            <div className="image-pagination">
              {petImages.map((_, index) => (
                <motion.button
                  key={index}
                  className={`pagination-dot ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  animate={index === currentImageIndex ? { scale: 1.2 } : { scale: 1 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pet-info-container"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="pet-name-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="pet-name">
                {currentPet.name}
                <span className={currentPet.gender === "female" ? "gender-female" : "gender-male"}>
                  {currentPet.gender === "female" ? "♀️" : "♂️"}
                </span>
              </h1>
              <div className="pet-location">
                <MapPin size={16} />
                <span>{currentPet.location}</span>
              </div>
            </motion.div>

            <motion.div
              className="pet-attributes"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { label: "Breed", value: currentPet.breed },
                { label: "Color", value: currentPet.color },
                { label: "Weight", value: currentPet.weight },
                { label: "Age", value: currentPet.age },
              ].map((attr, index) => (
                <motion.div
                  key={attr.label}
                  className="attribute-card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="attribute-value">{attr.value}</div>
                  <div className="attribute-label">{attr.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="pet-details-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="detail-group">
                <h2 className="detail-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 12h-4l-3 9L9 3l-3 9H2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Health
                </h2>
                <ul className="detail-list">
                  {currentPet.health.map((item, index) => (
                    <motion.li
                      key={index}
                      className="detail-item"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="detail-group">
                <h2 className="detail-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Characteristics
                </h2>
                <ul className="detail-list">
                  {currentPet.characteristics.map((item, index) => (
                    <motion.li
                      key={index}
                      className="detail-item"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.button
              className="adopt-button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Adopt Me
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

import { useState, useEffect } from "react"
import { ChevronLeft, Heart, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import "../../styles/petdetails.css"

const PetDetail = ({ petId, onClose, pets = [] }) => {
  const [currentPet, setCurrentPet] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate();

  // Mock pet images for gallery
  const petImages = ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"]

  useEffect(() => {
    // In a real app, you would fetch the pet details from an API
    // For now, we'll find the pet in our mock data
    const foundPet = pets.find((pet) => pet.id === petId)
    if (foundPet) {
      setCurrentPet(foundPet)
      setIsFavorite(foundPet.isFavorite || false)
    }
  }, [petId, pets])

  if (!currentPet) {
    // Fallback to mock data if pet not found in props
    const mockPet = {
      id: petId || 1,
      name: "Milo",
      gender: "male",
      breed: "Samoyed",
      color: "White",
      weight: "20 Kg",
      age: "Adult",
      location: "Berlin (25 km away)",
      health: ["Fully vaccinated", "Neutered"],
      characteristics: ["Good with kids", "Playful and athletic", "Requires daily outdoor activity", "Well-mannered"],
      imageUrl: "/placeholder.jpg",
      isFavorite: false,
    }
    setCurrentPet(mockPet)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? petImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === petImages.length - 1 ? 0 : prev + 1))
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  if (!currentPet) return null

  return (
    <div className="pet-detail-container">
      <div className="pet-detail-content">
        <div className="pet-detail-header">
          <button className="back-button" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
          <button className={`favorite-button ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
            <Heart size={24} fill={isFavorite ? "#8b5cf6" : "none"} />
          </button>
        </div>

        <div className="pet-detail-main">
          <div className="pet-image-gallery">
            <div className="image-container">
              <img
                src={petImages[currentImageIndex] || currentPet.imageUrl}
                alt={currentPet.name}
                className="pet-detail-image"
              />
              <button className="gallery-nav prev" onClick={handlePrevImage}>
                <ArrowLeft size={20} />
              </button>
              <button className="gallery-nav next" onClick={handleNextImage}>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="image-pagination">
              {petImages.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="pet-info-container">
            <div className="pet-name-section">
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
            </div>

            <div className="pet-attributes">
              <div className="attribute-card">
                <div className="attribute-value">{currentPet.breed}</div>
                <div className="attribute-label">Breed</div>
              </div>
              <div className="attribute-card">
                <div className="attribute-value">{currentPet.color}</div>
                <div className="attribute-label">Color</div>
              </div>
              <div className="attribute-card">
                <div className="attribute-value">{currentPet.weight}</div>
                <div className="attribute-label">Weight</div>
              </div>
              <div className="attribute-card">
                <div className="attribute-value">{currentPet.age}</div>
                <div className="attribute-label">Age</div>
              </div>
            </div>

            <div className="pet-details-section">
              <div className="detail-group">
                <h2 className="detail-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" >
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
                    <li key={index} className="detail-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-group">
                <h2 className="detail-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                    <li key={index} className="detail-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="adopt-button"
              onClick={() => navigate(`/adoptme/${currentPet?.id || petId || 1}`)}
            >
              Adopt Me
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetDetail

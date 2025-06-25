"use client"

import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import "../../../styles/AdoptionSucess.css"

export default function AdoptionSuccess({ pet, applicationId, onClose, onBrowseMore }) {
  const navigate = useNavigate()

  const handleBrowseMore = () => {
    if (onBrowseMore) {
      onBrowseMore()
    } else {
      navigate("/category")
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      navigate("/")
    }
  }

  return (
    <div className="adoption-success-container">
      <div className="success-icon">
        <Check />
      </div>

      <h1 className="success-title">Application Submitted!</h1>

      <p className="success-message">
        Thank you for your interest in adopting {pet?.name || "this pet"}! Your application has been successfully
        submitted and is now being reviewed by our adoption team.
      </p>

      <div className="success-pet-info">
        <div className="success-pet-card">
          <div className="success-pet-image">
            <img src={pet?.imageUrl || "/height=80&width=80"} alt={pet?.name || "Pet"} />
          </div>
          <div className="success-pet-content">
            <div className="success-pet-name">{pet?.name || "Pet"}</div>
            <div className="success-pet-details">
              {pet?.breed || "Mixed Breed"} • {pet?.age || "Adult"} • {pet?.location || "Local Shelter"}
            </div>
            {pet?.gender && (
              <div className="success-pet-gender">
                <span className={pet.gender === "female" ? "gender-female" : "gender-male"}>
                  {pet.gender === "female" ? "♀️" : "♂️"} {pet.gender}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="success-next-steps">
        <h3>What happens next?</h3>
        <p>
          Our team will review your application within 2-3 business days. We'll contact you via email or phone to
          discuss the next steps in the adoption process.
        </p>
      </div>

      <div className="success-actions">
        <button className="success-button primary" onClick={handleBrowseMore}>
          Browse More Pets
        </button>
        <button className="success-button secondary" onClick={handleClose}>
          Close
        </button>
      </div>

      <div className="success-reference">
        <div className="success-reference-label">Application Reference:</div>
        <div>#{applicationId || "APP001"}</div>
      </div>
    </div>
  )
}

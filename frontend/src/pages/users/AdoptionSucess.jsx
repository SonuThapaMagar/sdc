"use client"

import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Check } from "lucide-react"
import { petsData } from "../../data/petsData"
import "../../styles/AdoptionSucess.css"

export default function AdoptionSuccess() {
  const { petId, applicationId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  // Get pet data from location state or find by ID
  const pet = location.state?.pet || petsData.find(p => p.id === parseInt(petId))
  const appId = location.state?.applicationId || applicationId

  const handleBrowseMore = () => {
    navigate('/category')
  }

  const handleClose = () => {
    navigate('/category')
  }

  return (
    <div className="adoption-success-container">
      <div className="success-icon">
        <Check />
      </div>

      <h1 className="success-title">Application Submitted!</h1>

      <p className="success-message">
        Thank you for your interest in adopting {pet?.name}! Your application has been successfully submitted and is now
        being reviewed by our adoption team.
      </p>

      <div className="success-pet-info">
        <div className="success-pet-name">{pet?.name}</div>
        <div className="success-pet-details">
          {pet?.breed} • {pet?.age} • {pet?.location}
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
        <div>#{appId}</div>
      </div>
    </div>
  )
}

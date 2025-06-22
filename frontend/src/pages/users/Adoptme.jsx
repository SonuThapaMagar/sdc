"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "./auth-provider"
import { petsData } from "../../data/petsData"
import "../../styles/Adoptme.css"
import AdoptionSuccess from "./AdoptionSucess"

export default function AdoptMe() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [pet, setPet] = useState(null)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    housingType: "",
    ownRent: "",
    hasYard: false,
    hasPets: false,
    petExperience: "",
    whyAdopt: "",
    agreement: false,
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  useEffect(() => {
    if (petId) {
      const foundPet = petsData.find(p => p.id === parseInt(petId))
      if (foundPet) {
        setPet(foundPet)
      } else {
        // If pet not found, redirect to category page
        navigate('/category')
      }
    }
  }, [petId, navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Generate a random application ID
    const appId = `APP${Date.now().toString().slice(-6)}`
    setApplicationId(appId)

    console.log("Adoption form submitted:", { pet, formData })

    // Navigate to success page with data
    navigate(`/adoption-success/${petId}/${appId}`, {
      state: { pet, formData, applicationId: appId }
    })
  }

  if (!pet) return null

  return (
    <div className="adopt-form-container">
      <div className="adopt-form-header">
        <h1 className="adopt-form-title">Adopt {pet.name}</h1>
        <p className="adopt-form-subtitle">Please fill out this form to start the adoption process</p>
      </div>

      <div className="pet-details-card">
        <div className="pet-details-header">
          <img src={pet.imageUrl || "/placeholder.svg?height=80&width=80"} alt={pet.name} className="pet-image" />
          <div className="pet-basic-info">
            <div className="pet-name-large">
              {pet.name}
              <span className={pet.gender === "female" ? "gender-female" : "gender-male"}>
                {pet.gender === "female" ? "♀️" : "♂️"}
              </span>
            </div>
            <div className="pet-breed">{pet.breed}</div>
            <div className="pet-location-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
              {pet.location}
            </div>
          </div>
        </div>

        <div className="pet-attributes-grid">
          <div className="pet-attribute">
            <div className="pet-attribute-value">{pet.age}</div>
            <div className="pet-attribute-label">Age</div>
          </div>
          <div className="pet-attribute">
            <div className="pet-attribute-value">{pet.color}</div>
            <div className="pet-attribute-label">Color</div>
          </div>
          <div className="pet-attribute">
            <div className="pet-attribute-value">{pet.weight}</div>
            <div className="pet-attribute-label">Weight</div>
          </div>
          <div className="pet-attribute">
            <div className="pet-attribute-value">{pet.breed}</div>
            <div className="pet-attribute-label">Breed</div>
          </div>
        </div>
      </div>

      <form className="adopt-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Housing Type *</label>
          <select
            name="housingType"
            value={formData.housingType}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select housing type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Do you own or rent? *</label>
          <select name="ownRent" value={formData.ownRent} onChange={handleInputChange} className="form-select" required>
            <option value="">Select option</option>
            <option value="own">Own</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="hasYard"
            checked={formData.hasYard}
            onChange={handleInputChange}
            className="form-checkbox"
          />
          <label className="form-label">I have a yard or outdoor space</label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="hasPets"
            checked={formData.hasPets}
            onChange={handleInputChange}
            className="form-checkbox"
          />
          <label className="form-label">I currently have other pets</label>
        </div>

        <div className="form-group">
          <label className="form-label">Pet Experience</label>
          <textarea
            name="petExperience"
            value={formData.petExperience}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Tell us about your experience with pets..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Why do you want to adopt {pet.name}? *</label>
          <textarea
            name="whyAdopt"
            value={formData.whyAdopt}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Tell us why you'd like to adopt this pet..."
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleInputChange}
            className="form-checkbox"
            required
          />
          <label className="form-label">
            I agree to the terms and conditions and understand that this is an application, not a guarantee of adoption
            *
          </label>
        </div>

        <button type="submit" className="submit-button" disabled={!formData.agreement}>
          Submit Adoption Application
        </button>
      </form>
    </div>
  )
}

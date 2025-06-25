"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "./auth-provider"
import { petsData } from "../../../data/petsData"
import "../../../styles/Adoptme.css"

export default function AdoptMe() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const [applicationId, setApplicationId] = useState("")

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const foundPet = petsData.find((p) => p.id === Number.parseInt(petId))
        if (foundPet) {
          setPet(foundPet)
        } else {
          console.error("Pet not found")
          navigate("/category")
        }
      } catch (error) {
        console.error("Error fetching pet data:", error)
        navigate("/category")
      } finally {
        setLoading(false)
      }
    }

    if (petId) {
      fetchPetData()
    } else {
      setLoading(false)
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
    const appId = `APP${Date.now().toString().slice(-6)}`
    setApplicationId(appId)
    console.log("Adoption form submitted:", { pet, formData })
    
    // Navigate to success page with pet data and application ID
    navigate(`/adoption-success/${petId}/${appId}`, {
      state: { pet, formData, applicationId: appId }
    })
  }

  const handleClose = () => {
    navigate("/category")
  }

  if (loading) {
    return <div className="adoption-loading">Loading...</div>
  }

  if (!pet) {
    return <div className="error">Pet not found</div>
  }

  return (
    <div className="adoption-form-container">
      <div className="adoption-form-header">
        <h1 className="adoption-form-title">Adopt {pet.name}</h1>
        <p className="adoption-form-subtitle">Please fill out this form to start the adoption process</p>
      </div>

      <div className="adoption-pet-details-card">
        <div className="adoption-pet-details-header">
          <img
            src={pet.imageUrl || "/placeholder.svg?height=80&width=80"}
            alt={pet.name}
            className="adoption-pet-image"
          />
          <div className="adoption-pet-basic-info">
            <div className="adoption-pet-name-large">
              {pet.name}
              <span className={pet.gender === "female" ? "adoption-gender-female" : "adoption-gender-male"}>
                {pet.gender === "female" ? "♀️" : "♂️"}
              </span>
            </div>
            <div className="adoption-pet-breed">{pet.breed}</div>
            <div className="adoption-pet-location-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
              {pet.location}
            </div>
          </div>
        </div>

        <div className="adoption-pet-attributes-grid">
          <div className="adoption-pet-attribute">
            <div className="adoption-pet-attribute-value">{pet.age}</div>
            <div className="adoption-pet-attribute-label">Age</div>
          </div>
          <div className="adoption-pet-attribute">
            <div className="adoption-pet-attribute-value">{pet.color}</div>
            <div className="adoption-pet-attribute-label">Color</div>
          </div>
          <div className="adoption-pet-attribute">
            <div className="adoption-pet-attribute-value">{pet.weight}</div>
            <div className="adoption-pet-attribute-label">Weight</div>
          </div>
          <div className="adoption-pet-attribute">
            <div className="adoption-pet-attribute-value">{pet.breed}</div>
            <div className="adoption-pet-attribute-label">Breed</div>
          </div>
        </div>
      </div>

      <form className="adoption-form" onSubmit={handleSubmit}>
        <div className="adoption-form-row">
          <div className="adoption-form-group">
            <label className="adoption-form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="adoption-form-input"
              required
            />
          </div>
          <div className="adoption-form-group">
            <label className="adoption-form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="adoption-form-input"
              required
            />
          </div>
        </div>

        <div className="adoption-form-group">
          <label className="adoption-form-label">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="adoption-form-input"
            required
          />
        </div>

        <div className="adoption-form-group">
          <label className="adoption-form-label">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="adoption-form-input"
            required
          />
        </div>

        <div className="adoption-form-row">
          <div className="adoption-form-group">
            <label className="adoption-form-label">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="adoption-form-input"
              required
            />
          </div>
          <div className="adoption-form-group">
            <label className="adoption-form-label">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="adoption-form-input"
              required
            />
          </div>
        </div>

        <div className="adoption-form-group">
          <label className="adoption-form-label">Housing Type *</label>
          <select
            name="housingType"
            value={formData.housingType}
            onChange={handleInputChange}
            className="adoption-form-select"
            required
          >
            <option value="">Select housing type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="adoption-form-group">
          <label className="adoption-form-label">Do you own or rent? *</label>
          <select
            name="ownRent"
            value={formData.ownRent}
            onChange={handleInputChange}
            className="adoption-form-select"
            required
          >
            <option value="">Select option</option>
            <option value="own">Own</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="adoption-checkbox-group">
          <input
            type="checkbox"
            name="hasYard"
            checked={formData.hasYard}
            onChange={handleInputChange}
            className="adoption-form-checkbox"
          />
          <label className="adoption-form-label">I have a yard or outdoor space</label>
        </div>

        <div className="adoption-checkbox-group">
          <input
            type="checkbox"
            name="hasPets"
            checked={formData.hasPets}
            onChange={handleInputChange}
            className="adoption-form-checkbox"
          />
          <label className="adoption-form-label">I currently have other pets</label>
        </div>

        <div className="adoption-form-group">
          <label className="adoption-form-label">Pet Experience</label>
          <textarea
            name="petExperience"
            value={formData.petExperience}
            onChange={handleInputChange}
            className="adoption-form-textarea"
            placeholder="Tell us about your experience with pets..."
          />
        </div>

        <div className="adoption-form-group">
          <label className="adoption-form-label">Why do you want to adopt {pet.name}? *</label>
          <textarea
            name="whyAdopt"
            value={formData.whyAdopt}
            onChange={handleInputChange}
            className="adoption-form-textarea"
            placeholder="Tell us why you'd like to adopt this pet..."
            required
          />
        </div>

        <div className="adoption-checkbox-group">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleInputChange}
            className="adoption-form-checkbox"
            required
          />
          <label className="adoption-form-label">
            I agree to the terms and conditions and understand that this is an application, not a guarantee of adoption
            *
          </label>
        </div>

        <button type="submit" className="adoption-submit-button" disabled={!formData.agreement}>
          Submit Adoption Application
        </button>
      </form>
    </div>
  )
}

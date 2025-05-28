"use client"

import { useState } from "react"
import { ChevronLeft, ChevronDown } from "lucide-react"
import "../../styles/filtermodal.css"

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [petType, setPetType] = useState("Dog")
  const [breed, setBreed] = useState("")
  const [gender, setGender] = useState("Both")
  const [age, setAge] = useState([])
  const [goodWith, setGoodWith] = useState([])
  const [location, setLocation] = useState("")
  const [maxDistance, setMaxDistance] = useState(250)

  const handleAgeToggle = (ageValue) => {
    if (age.includes(ageValue)) {
      setAge(age.filter((item) => item !== ageValue))
    } else {
      setAge([...age, ageValue])
    }
  }

  const handleGoodWithToggle = (value) => {
    if (goodWith.includes(value)) {
      setGoodWith(goodWith.filter((item) => item !== value))
    } else {
      setGoodWith([...goodWith, value])
    }
  }

  const handleReset = () => {
    setPetType("Dog")
    setBreed("")
    setGender("Both")
    setAge([])
    setGoodWith([])
    setLocation("")
    setMaxDistance(250)
  }

  const handleApply = () => {
    const filters = {
      petType,
      breed,
      gender,
      age,
      goodWith,
      location,
      maxDistance,
    }
    onApplyFilters(filters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <div className="filter-modal-header">
          <button className="back-button" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
          <h2>Filter</h2>
          <div></div> {/* Empty div for flex spacing */}
        </div>

        <div className="filter-modal-content">
          <div className="filter-section">
            <h3>Pet Type</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${petType === "Dog" ? "active" : ""}`}
                onClick={() => setPetType("Dog")}
              >
                Dog
              </button>
              <button
                className={`filter-option ${petType === "Cat" ? "active" : ""}`}
                onClick={() => setPetType("Cat")}
              >
                Cat
              </button>
              <button
                className={`filter-option ${petType === "Both" ? "active" : ""}`}
                onClick={() => setPetType("Both")}
              >
                Both
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Breed</h3>
            <div className="select-container">
              <select value={breed} onChange={(e) => setBreed(e.target.value)} className="filter-select">
                <option value="">Select Breed</option>
                <option value="Border Collie">Border Collie</option>
                <option value="Samoyed">Samoyed</option>
                <option value="Pomeranian">Pomeranian</option>
                <option value="Golden Retriever">Golden Retriever</option>
                <option value="Husky">Husky</option>
                <option value="German Shepherd">German Shepherd</option>
                <option value="Labrador">Labrador</option>
                <option value="Persian">Persian</option>
                <option value="Maine Coon">Maine Coon</option>
                <option value="British Shorthair">British Shorthair</option>
                <option value="Tabby">Tabby</option>
                <option value="Siamese">Siamese</option>
                <option value="Calico">Calico</option>
                <option value="Ragdoll">Ragdoll</option>
                <option value="Russian Blue">Russian Blue</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          <div className="filter-section">
            <h3>Gender</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${gender === "Female" ? "active" : ""}`}
                onClick={() => setGender("Female")}
              >
                Female
              </button>
              <button
                className={`filter-option ${gender === "Male" ? "active" : ""}`}
                onClick={() => setGender("Male")}
              >
                Male
              </button>
              <button
                className={`filter-option ${gender === "Both" ? "active" : ""}`}
                onClick={() => setGender("Both")}
              >
                Both
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Age</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${age.includes("Puppy") ? "active" : ""}`}
                onClick={() => handleAgeToggle("Puppy")}
              >
                Puppy
              </button>
              <button
                className={`filter-option ${age.includes("Young") ? "active" : ""}`}
                onClick={() => handleAgeToggle("Young")}
              >
                Young
              </button>
              <button
                className={`filter-option ${age.includes("Adult") ? "active" : ""}`}
                onClick={() => handleAgeToggle("Adult")}
              >
                Adult
              </button>
              <button
                className={`filter-option ${age.includes("Senior") ? "active" : ""}`}
                onClick={() => handleAgeToggle("Senior")}
              >
                Senior
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Good with</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${goodWith.includes("Kids") ? "active" : ""}`}
                onClick={() => handleGoodWithToggle("Kids")}
              >
                Kids
              </button>
              <button
                className={`filter-option ${goodWith.includes("Other pets") ? "active" : ""}`}
                onClick={() => handleGoodWithToggle("Other pets")}
              >
                Other pets
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Location</h3>
            <div className="select-container">
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="filter-select">
                <option value="">Select Location</option>
                <option value="Frankfurt">Frankfurt</option>
                <option value="Berlin">Berlin</option>
                <option value="Munich">Munich</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Cologne">Cologne</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          <div className="filter-section">
            <div className="distance-header">
              <h3>Maximum Distance</h3>
              <span className="distance-value">{maxDistance} Km.</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number.parseInt(e.target.value))}
              className="distance-slider"
            />
          </div>
        </div>

        <div className="filter-modal-footer">
          <button className="reset-button" onClick={handleReset}>
            Reset All
          </button>
          <button className="search-button" onClick={handleApply}>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import "../../styles/search.css"

const SearchModal = ({ isOpen, onClose, onSearch, onClearSearch, currentQuery, pets = [], onPetClick }) => {
  const [searchQuery, setSearchQuery] = useState(currentQuery || "")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setSearchQuery(currentQuery || "")
  }, [currentQuery])

  // Real search function that filters pets
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const results = pets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(query.toLowerCase()) ||
          pet.breed.toLowerCase().includes(query.toLowerCase()) ||
          pet.color.toLowerCase().includes(query.toLowerCase()) ||
          pet.age.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
      setIsSearching(false)
    }, 300)
  }

  const handleInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    handleSearch(query)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      onClose()
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
    onClearSearch()
  }

  const handleResultClick = (pet) => {
    if (onPetClick) {
      onPetClick(pet)
    } else {
      onSearch(pet.name)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="search-modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="search-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="search-form">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search pets by name, breed, color, or age..."
              value={searchQuery}
              onChange={handleInputChange}
              className="search-input"
              autoFocus
            />
            {searchQuery && (
              <motion.button
                type="button"
                className="clear-button"
                onClick={handleClear}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            )}
          </form>
          <motion.button
            className="close-button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.div>

        <motion.div
          className="search-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isSearching ? (
            <motion.div className="search-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="loading-spinner"></div>
              Searching...
            </motion.div>
          ) : searchQuery && searchResults.length === 0 ? (
            <motion.div className="no-results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
              <div>No pets found matching "{searchQuery}"</div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                Try searching for different breeds, colors, or names
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {searchResults.map((pet, index) => (
                <motion.div
                  key={pet.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(pet)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f9fafb", scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="result-image">
                    <img src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} />
                  </div>
                  <div className="result-info">
                    <div className="result-name">
                      {pet.name}
                      <span className={pet.gender === "female" ? "gender-female" : "gender-male"}>
                        {pet.gender === "female" ? "♀️" : "♂️"}
                      </span>
                    </div>
                    <div className="result-details">
                      {pet.age} | {pet.breed} | {pet.color}
                    </div>
                    <div className="result-location">{pet.location}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!searchQuery && (
            <motion.div className="search-prompt" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Search size={40} className="prompt-icon" />
              <p>Search for pets by name, breed, color, or age</p>
              <div style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                Try: "Golden Retriever", "Puppy", "White", "Milo"
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SearchModal

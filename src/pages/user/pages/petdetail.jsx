import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Heart, MapPin } from "lucide-react";

function PetDetail({ petId, onClose, favorites, onToggleFavorite }) {
  const [currentPet, setCurrentPet] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }

        const response = await fetch(`http://localhost:8080/api/user/pets/${petId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError("Access denied: User role required.");
          } else if (response.status === 404) {
            setError("Pet not found or not available.");
          } else {
            setError(`Failed to fetch pet details: ${response.statusText}`);
          }
          return;
        }

        const pet = await response.json();
        console.log("Pet details response:", pet); // Add this
        setCurrentPet({
          id: pet.id,
          name: pet.name,
          breed: pet.breed,
          age: pet.age.toString(),
          gender: pet.gender,
          location: pet.location || "Unknown",
          imageUrl: pet.imageUrl || "/placeholder.svg",
          description: pet.description || "No description available",
          status: pet.status || "Unknown",
        });
        setError(null);
      } catch (err) {
        setError("Error fetching pet details: " + err.message);
      }
    };

    fetchPetDetails();
  }, [petId]);
  const handleAdoptClick = () => {
    if (currentPet) {
      navigate(`/adoptme/${currentPet.id}`);
    }
  };

  if (error) {
    return (
      <motion.div
        className="category-pet-detail-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="category-pet-detail-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="category-error-message">{error}</div>
          <motion.button
            className="category-back-button"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentPet) return null;

  return (
    <motion.div
      className="category-pet-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="category-pet-detail-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="category-pet-detail-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="category-back-button"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            className={`category-favorite-button ${favorites.has(petId) ? "active" : ""}`}
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
          className="category-pet-detail-main"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="category-pet-image-gallery"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="category-image-container">
              <motion.img
                src={currentPet.imageUrl}
                alt={currentPet.name}
                className="category-pet-detail-image"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="category-pet-info-container"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="category-pet-name-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="category-pet-name">
                {currentPet.name}
                <span className={currentPet.gender === "female" ? "category-gender-female" : "category-gender-male"}>
                  {currentPet.gender === "female" ? "♀️" : "♂️"}
                </span>
              </h1>
              <div className="category-pet-location">
                <MapPin size={16} />
                <span>{currentPet.location}</span>
              </div>
            </motion.div>

            <motion.div
              className="category-pet-attributes"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { label: "Breed", value: currentPet.breed },
                { label: "Color", value: currentPet.color },
                { label: "Weight", value: currentPet.weight },
                { label: "Age", value: currentPet.age },
                { label: "Status", value: currentPet.status },
              ].map((attr, index) => (
                <motion.div
                  key={attr.label}
                  className="category-attribute-card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="category-attribute-value">{attr.value}</div>
                  <div className="category-attribute-label">{attr.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="category-pet-details-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="category-detail-group">
                <h2 className="category-detail-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Description
                </h2>
                <p className="category-detail-item">{currentPet.description}</p>
              </div>
            </motion.div>

            <motion.button
              className="category-adopt-button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdoptClick}
            >
              Adopt Me
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default PetDetail;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PetCard.css';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  if (!pet) {
    return null;
  }

  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`);
  };

  return (
    <div className="pet-card" onClick={handleCardClick}>
      <img src={pet.imageUrl} alt={pet.name} className="pet-card-image" />
      <div className="pet-card-info">
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-breed">{pet.breed}</p>
        <p className="pet-card-location">{pet.location}</p>
      </div>
    </div>
  );
};

export default PetCard; 
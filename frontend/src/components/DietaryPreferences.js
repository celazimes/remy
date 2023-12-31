// src/components/DietaryPreferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

const dietaryOptions = [
  { id: 'Vegetarian', label: 'Vegetarian', imageUrl: '/images/vegetarian.png' },
  { id: 'Vegan', label: 'Vegan', imageUrl: '/images/vegan.jpeg' },
  { id: 'Halal', label: 'Halal', imageUrl: '/images/halal.jpeg' },
  { id: 'Kosher', label: 'Kosher', imageUrl: '/images/kosher.webp' },
  // ...add more options
];

function DietaryPreferences() {
  const [selectedDiet, setSelectedDiet] = useState([]);
  const navigate = useNavigate();

  const handleSelectDiet = (diet) => {
    setSelectedDiet((prevSelected) => {
      if (prevSelected.includes(diet)) {
        return prevSelected.filter((selected) => selected !== diet);
      } else {
        return [...prevSelected, diet];
      }
    });
  };

  const handleNext = () => {
    // Here you can save the selected diet preferences
    console.log('Selected Diet:', selectedDiet); // For debugging
    navigate('/allergies'); // Navigate to the allergies selection page
  };

  const dietStyles = `
    .page-container {
      text-align: center;
    }

    .diet-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* Adjust based on your design preference */
      gap: 20px;
      margin: 20px 0;
    }

    .diet-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.3s ease;
      height: 100%; /* Set the height to 100% to fill the container */
      display: flex;
      flex-direction: column;
      width: auto; /* Adjust the width as needed */
      height: 200px; /* Height adjusts to content */
    }

    .diet-card.selected {
      border: 3px solid #54db54;
    }

    .diet-card.selected h3 {
      color: black;
    }

    .diet-card:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .diet-image {
      width: 100%;
      height: 80%; /* Adjust based on your design preference */
      object-fit: cover;
    }

    .diet-label {
      padding: 10px;
      text-align: center;
      height: 30%; /* Adjust based on your design preference */
      overflow: hidden;
    }
  `;

  return (
    <div>
      <style>{dietStyles}</style>
      <div className="page-container">
        <h2>Do you have dietary restrictions?</h2>
        <div className="diet-grid">
          {dietaryOptions.map((option) => (
            <div
              key={option.id}
              className={`diet-card ${selectedDiet.includes(option.id) ? 'selected' : ''}`}
              onClick={() => handleSelectDiet(option.id)}
            >
              <img src={option.imageUrl} alt={option.label} className="diet-image" />
              <div className="diet-label">
                <h3>{option.label}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className="next-button" onClick={handleNext}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default DietaryPreferences;

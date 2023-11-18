// src/components/AllergiesSelection.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

const allergies = [
  { id: 1, name: 'Peanuts', imageUrl: '/images/carbonara.jpeg' },
  { id: 2, name: 'DEEZ NUTS', imageUrl: '/images/carbonara.jpeg' },
  { id: 3, name: 'jeff', imageUrl: '/images/carbonara.jpeg' },
  // ...add more allergies
];

function AllergiesSelection() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const navigate = useNavigate();

  const handleSelectAllergy = (allergy) => {
    setSelectedAllergies((prevSelected) => {
      if (prevSelected.includes(allergy)) {
        return prevSelected.filter((selected) => selected !== allergy);
      } else {
        return [...prevSelected, allergy];
      }
    });
  };

  const handleNext = () => {
    // Here you can save the selected allergies
    console.log("Selected Allergies:", selectedAllergies); // For debugging
    navigate('/select-recipes'); // Navigate to the recipe selection page
  };

  const allergyStyles = `
    .page-container {
      text-align: center;
    }

    .allergy-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* Adjust based on your design preference */
      gap: 20px;
      margin: 20px 0;
    }

    .allergy-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.3s ease;
    }

    .allergy-card.selected {
      border: 3px solid #54db54; /* Thicker green border for selected cards */
    }

    .allergy-card:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .allergy-image {
      width: 100%;
      height: 150px; /* Adjust based on your design preference */
      object-fit: cover;
    }

    .allergy-info {
      padding: 10px;
      text-align: center;
    }

    .info-button {
      padding: 5px 10px;
      background-color: #54db54;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease;
    }

    .info-button:hover {
      background-color: #379a3f;
    }
  `;

  return (
    <div>
      <style>{allergyStyles}</style>
      <div className="page-container">
        <h2>Select your allergies</h2>
        <div className="allergy-grid">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className={`allergy-card ${
                selectedAllergies.includes(allergy.id) ? 'selected' : ''
              }`}
              onClick={() => handleSelectAllergy(allergy.id)}
            >
              <img src={allergy.imageUrl} alt={allergy.name} className="allergy-image" />
              <div className="allergy-info">
                <h3>{allergy.name}</h3>
                <button className="info-button">More Info</button>
              </div>
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleNext}>
          Submit Selection
        </button>
      </div>
    </div>
  );
}

export default AllergiesSelection;

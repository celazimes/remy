// src/components/AllergiesSelection.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

const allergies = [
  { id: 1, name: 'Milk & Dairy', imageUrl: '/images/milkd.jpeg' },
  { id: 2, name: 'Eggs', imageUrl: '/images/eggs.webp' },
  { id: 3, name: 'Peanuts', imageUrl: '/images/peanuts.jpeg' },
  { id: 4, name: 'Tree nuts', imageUrl: '/images/tnut.webp' },
  { id: 5, name: 'Soy', imageUrl: '/images/soy.jpeg' },
  { id: 6, name: 'Wheat & Gluten', imageUrl: '/images/wheat.webp' },
  { id: 7, name: 'Fish', imageUrl: '/images/fish.webp' },
  { id: 8, name: 'Shellfish', imageUrl: '/images/shellfish.jpeg' },
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
      grid-template-columns: repeat(8,1fr); /* Adjust based on your design preference */
      gap: 20px; 
      margin: 20px 0;
    }

    .allergy-card {
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

    .allergy-card.selected {
      border: 3px solid #54db54; /* Thicker green border for selected cards */
    }

    .allergy-card.selected h3 {
      color: black;
    }

    .allergy-card:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .allergy-image {
      width: 100%;
      height: 100%; /* Adjust based on your design preference */
      object-fit: cover;
    }

    .allergy-info {
      padding: 10px;
      text-align: center;
      height: 30%; /* Adjust based on your design preference */
      overflow: hidden;
    }
  `;

  return (
    <div>
      <style>{allergyStyles}</style>
      <div className="page-container">
        <h2>Do you have any allergies?</h2>
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
              </div>
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleNext}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AllergiesSelection;

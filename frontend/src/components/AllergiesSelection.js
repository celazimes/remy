// src/components/AllergiesSelection.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

function AllergiesSelection() {
  const { diet } = useParams();
  const [allergies, setAllergies] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (value) => {
    setAllergies((prev) => {
      // Toggle the value in the array
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleNext = () => {
    // Here you can save the selected allergies
    navigate('/select-recipes'); // Navigate to the recipe selection page
  };

  return (
    <div className="page-container">
      <h2>Select your allergies for {diet}</h2>
      {/* Replace the checkbox options with your specific allergy choices */}
      <div>
        <label>
          <input
            type="checkbox"
            value="peanuts"
            onChange={() => handleCheckboxChange('peanuts')}
          />
          Peanuts
        </label>
        <label>
          <input
            type="checkbox"
            value="deez nuts"
            onChange={() => handleCheckboxChange('deez nuts')}
          />
          Deez Nuts
        </label>
        <label>
          <input
            type="checkbox"
            value="milk"
            onChange={() => handleCheckboxChange('milk')}
          />
          Milk
        </label>
        {/* Add more checkboxes for other allergies */}
      </div>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default AllergiesSelection;

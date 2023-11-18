// src/components/DietaryPreferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

function DietaryPreferences() {
    const [diet, setDiet] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        // Here you can also save the selected diet preference
        navigate('/select-recipes'); // Navigate to the recipe selection page
    };

    return (
        <div className="page-container">
            <h2>Select your dietary preferences</h2>
            <select className="select-input" value={diet} onChange={e => setDiet(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="vegan">Vegan</option>
                <option value="halal">Halal</option>
                {/* Add more options as needed */}
            </select>
            <button className="next-button" onClick={handleNext}>Next</button>
        </div>
    );
}

export default DietaryPreferences;

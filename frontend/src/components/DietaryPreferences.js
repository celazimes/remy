// src/components/DietaryPreferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DietaryPreferences() {
    const [diet, setDiet] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        // Here you can also save the selected diet preference
        navigate('/select-recipes'); // Navigate to the recipe selection page
    };

    return (
        <div>
            <h2>Select your dietary preferences</h2>
            <select value={diet} onChange={e => setDiet(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="vegan">Vegan</option>
                <option value="halal">Halal</option>
                {/* Add more options as needed */}
            </select>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default DietaryPreferences;

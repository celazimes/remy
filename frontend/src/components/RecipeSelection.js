// src/components/RecipeSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

function RecipeSelection() {
    const navigate = useNavigate();

    const handleSubmitSelection = () => {
        // Logic to handle the recipe selection
        navigate('/review-recipes'); // Navigate to the review recipes page
    };

    return (
        <div className="page-container">
            <h2>Select Recipes</h2>
            {/* Implementation for recipe selection */}
            <button className="submit-button" onClick={handleSubmitSelection}>Submit Selection</button>
        </div>
    );
}

export default RecipeSelection;

// src/components/ReviewRecipes.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

function ReviewRecipes() {
    const navigate = useNavigate();

    const handleSubmitReview = () => {
        // Logic to handle submitting the recipe reviews
        navigate('/select-recipes'); // Navigate back to recipe selection for new suggestions
    };

    return (
        <div className="page-container">
            <h2>Review Recipes</h2>
            {/* Implementation for reviewing and rating recipes */}
            <button className="submit-button" onClick={handleSubmitReview}>Submit Review</button>
        </div>
    );
}

export default ReviewRecipes;

// src/components/RecipeSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

// Mock data - replace with real data fetching logic
const mockRecipes = [
    { id: 1, name: 'Spaghetti Carbonara', imageUrl: '/images/carbonara.jpeg' },
    { id: 2, name: 'Margherita Pizza', imageUrl: '/images/margherita.jpeg' },
    { id: 3, name: 'Caesar Salad', imageUrl: '/images/caesar.jpeg' },
    // ...add more recipes
];

function RecipeSelection() {
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const navigate = useNavigate();

    const handleSelectRecipe = (recipeId) => {
        setSelectedRecipes(prevSelected => {
            if (prevSelected.includes(recipeId)) {
                return prevSelected.filter(id => id !== recipeId);
            } else {
                return [...prevSelected, recipeId];
            }
        });
    };

    const handleSubmitSelection = () => {
        // Logic to handle the recipe selection
        console.log("Selected Recipes:", selectedRecipes); // For debugging
        navigate('/review-recipes'); // Navigate to the review recipes page
    };

    return (
        <div className="page-container">
            <h2>Select Recipes</h2>
            <div className="recipe-grid">
                {mockRecipes.map(recipe => (
                    <div
                        key={recipe.id}
                        className={`recipe-card ${selectedRecipes.includes(recipe.id) ? 'selected' : ''}`}
                        onClick={() => handleSelectRecipe(recipe.id)}
                    >
                        <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image"/>
                        <div className="recipe-info">
                            <h3>{recipe.name}</h3>
                            <button className="info-button">More Info</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmitSelection}>Submit Selection</button>
        </div>
    );
}

export default RecipeSelection;

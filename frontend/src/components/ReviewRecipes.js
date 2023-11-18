import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

//remove one s from selectedRecipess and delete dummy data for prod
function ReviewRecipes({ selectedRecipess }) {
    const navigate = useNavigate();

    const [ratings, setRatings] = useState({}); // State to store ratings for each recipe

    //usinng dummy recipes fr testing - remove this and change input name row 6
    const selectedRecipes = [
        { id: 100, name: 'Dummy Recipe 1', type: 'dummy', imageUrl: '/dummy.jpeg' },
        { id: 101, name: 'Dummy Recipe 2', type: 'dummy', imageUrl: '/dummy1.jpeg' },
        { id: 102, name: 'Dummy Recipe 3', type: 'dummy', imageUrl: '/dummy2.jpeg' }
    ];

    const handleRatingChange = (recipeId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [recipeId]: rating,
        }));
    };

    const handleSubmitReview = () => {
        // Logic to handle submitting the recipe reviews
        console.log("Recipe Ratings:", ratings); // Log the ratings for debugging
        navigate('/select-recipes'); // Navigate back to recipe selection for new suggestions
    };

    return (
        <div className="page-container">
            {/* Display selected recipes with rating sliders */}
            {selectedRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-review" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
                    <div className="recipe-card" style={{marginRight: '20px'}}>
                        <img src={recipe.imageUrl} alt={recipe.name} style={{ width: '300px', height: 'auto', maxHeight:'150px'}} />
                        <h3>{recipe.name}</h3>
                    </div>
                    <div style={{ flex: '1', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <p>Rate this recipe:</p>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={ratings[recipe.id] || 5} // Default value is 1
                            onChange={(e) => handleRatingChange(recipe.id, parseInt(e.target.value, 10))}
                        />
                        <span>{ratings[recipe.id] || 5}</span>
                    </div>
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmitReview}>
                Submit Review
            </button>
        </div>
    );
}

export default ReviewRecipes;

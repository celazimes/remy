import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

//remove one s from selectedRecipess and delete dummy data for prod
function ReviewRecipes({ selectedRecipess }) {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedRecipes = location.state?.selectedRecipes || [];

    const [ratings, setRatings] = useState({}); // State to store ratings for each recipe

    const handleRatingChange = (recipeName, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [recipeName]: rating, // Use recipe name as the key
        }));
    };

    const handleSubmitReview = async () => {
        console.log('Submitting ratings:', ratings);
        try {
            const response = await fetch('http://localhost:8000/submit-ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ratings),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result.message);
            navigate('/select-recipes');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleMoreInfo = (e, recipeName) => {
        e.stopPropagation();
        // Additional logic if needed
    };

    return (
        <div className="page-container review-recipes-page">
            {selectedRecipes.map(recipe => (
                <div key={recipe.id} className="card-slider-container">
                    <div className="recipe-card">
                        <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
                        <div className="recipe-info">
                            <h3 className="recipe-title">{recipe.name}</h3>
                            <span
                                className="info-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoreInfo(recipe.name);
                                }}
                            >ⓘ</span>
                        </div>
                    </div>
                    <div className="slider-container">
                        <p>Rate {recipe.name}:</p>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={ratings[recipe.name] || 5}
                            onChange={(e) => handleRatingChange(recipe.name, parseInt(e.target.value, 10))}
                        />
                        <span>{ratings[recipe.name] || 5}</span>
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

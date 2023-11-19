import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles.css'; // Import the shared CSS file

//remove one s from selectedRecipess and delete dummy data for prod
function ReviewRecipes({ selectedRecipess }) {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedRecipes = location.state?.selectedRecipes || [];

    const [ratings, setRatings] = useState({}); // State to store ratings for each recipe

    const handleRatingChange = (recipeId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [recipeId]: rating,
        }));
    };

    const handleSubmitReview = async () => {
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


    return (
        <div className="page-container">
            {selectedRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="recipe-image"
                    />
                    <div className="recipe-info">
                        <h3 className="recipe-title">{recipe.name}</h3>
                        <div className="rating-container">
                            <p>Rate this recipe:</p>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={ratings[recipe.id] || 5}
                                onChange={(e) => handleRatingChange(recipe.id, parseInt(e.target.value, 10))}
                            />
                            <span>{ratings[recipe.id] || 5}</span>
                        </div>
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

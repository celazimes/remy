// src/components/RecipeSelection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles.css'; // Import the shared CSS file

Modal.setAppElement('#root'); // Assuming your root div has the id 'root'

function RecipeSelection() {
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentRecipeInfo, setCurrentRecipeInfo] = useState(null);
    const navigate = useNavigate();
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3; // Set a limit for retries to avoid infinite loops
    const [isLoading, setIsLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);



    // console.log("API Response:", data); // Log the response data


    useEffect(() => {
        setIsLoading(true); // Start loading
        const fetchRecipes = () => {
            const userId = 1234; // Replace with a valid user ID
            fetch(`http://localhost:8000/recommendations/${userId}`)
                .then(response => response.json())
                .then(async data => {
                    setImagesLoaded(0); // Reset for new images
                    if (data.length === 0 && retryCount < maxRetries) {
                        console.log("API Response: [], retrying..."); // Log the response data
                        setRetryCount(prevCount => prevCount + 1);
                        fetchRecipes(); // Retry fetching
                    } else {
                        console.log("API Response:", data);
                        const formattedData = await Promise.all(data.map(async (item, index) => {
                            const imageUrl = await fetchImageUrl(item);
                            return {
                                id: index,
                                name: item,
                                imageUrl: imageUrl || '/path/to/default.jpg' // Fallback to a default image
                            };
                        }));
                        setRecipes(formattedData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching recipes:', error);
                    if (retryCount >= maxRetries) {
                        setRetryCount(0); // Reset retry count after reaching max retries
                    }
                });
        };

        if (retryCount === 0) {
            fetchRecipes();
        }
    }, [retryCount]);


    useEffect(() => {
        if (recipes.length > 0 && imagesLoaded === recipes.length) {
            setIsLoading(false); // Hide spinner only after all images have loaded
        }
    }, [imagesLoaded, recipes.length]);



    const handleImageLoad = () => {
        setImagesLoaded(prev => prev + 1);
    };

    const fetchImageUrl = (recipeName) => {
        return fetch(`http://localhost:8000/image-search/${encodeURIComponent(recipeName)}`)
            .then(response => response.json())
            .then(data => data.image_url);  // Get the image URL from the response
    };

    const LoadingOverlay = () => (
        <div className="loading-overlay">
            <div className="spinner"></div> {/* Replace with your spinner or loading animation */}
        </div>
    );


    const getRandomImageUrlForType = (type) => {
        const imageNumber = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
        return `/img_db/${type}_${imageNumber}.jpg`; // Construct the image URL
    };

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
        const selectedRecipeDetails = recipes.filter(recipe => selectedRecipes.includes(recipe.id));

        console.log("Selected Recipes:", selectedRecipes); // For debugging
        navigate('/review-recipes', { state: { selectedRecipes: selectedRecipeDetails } });
    };

    const handleMoreInfo = (e, recipeId) => {
        e.stopPropagation();
        const recipe = recipes.find(r => r.id === recipeId); // Use the real recipes
        setCurrentRecipeInfo(recipe);
        setModalIsOpen(true);
    };



    // Handler to close the modal
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setCurrentRecipeInfo(null);
    };

    const rows = Array.from({ length: Math.ceil(recipes.length / 5) }, (_, i) =>
        recipes.slice(i * 5, i * 5 + 5)
    );

    return (
        <div className="page-container">
            {isLoading && <LoadingOverlay />}
            {rows.map((rowRecipes, rowIndex) => (
                <div key={rowIndex} className="recipe-row">
                    {rowRecipes.map(recipe => (
                        <div
                            key={recipe.id}
                            className={`recipe-card ${selectedRecipes.includes(recipe.id) ? 'selected' : ''}`}
                            onClick={() => handleSelectRecipe(recipe.id)}
                        >
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.name}
                                className="recipe-image"
                                onLoad={handleImageLoad}
                                onError={handleImageLoad} // Handle image load errors
                            />
                            <div className="recipe-info">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <span
                                    className="info-icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoreInfo(recipe.id);
                                    }}
                                >ⓘ</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmitSelection}>Submit Selection</button>

            {/* Modal for displaying more information about a recipe */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Recipe Information"
                className="your-custom-modal-class" // Custom class for the modal
                overlayClassName="your-custom-overlay-class" // Custom class for the overlay
            >
                <h2>{currentRecipeInfo?.name}</h2>
                <p>This is some dummy text for the recipe {currentRecipeInfo?.name}.</p>
                <button onClick={handleCloseModal}>Close</button>
            </Modal>
        </div>
    );

}

export default RecipeSelection;
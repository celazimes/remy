// src/components/RecipeSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles.css'; // Import the shared CSS file

// Mock data - replace with real data fetching logic
const mockRecipes = [
    { id: 1, name: 'Spaghetti Carbonara', imageUrl: '/images/1.jpeg' },
    { id: 2, name: 'Margherita Pizza', imageUrl: '/images/2.jpeg' },
    { id: 3, name: 'Caesar Salad', imageUrl: '/images/3.jpeg' },
    { id: 4, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 5, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 6, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 7, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 8, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 9, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 10, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 11, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 12, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 13, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 14, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 15, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 16, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 17, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 18, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 19, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 20, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 21, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 22, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 23, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 24, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

    { id: 25, name: 'Spaghetti Carbonara', imageUrl: '/images/2.jpeg' },

];

Modal.setAppElement('#root'); // Assuming your root div has the id 'root'



function RecipeSelection() {
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentRecipeInfo, setCurrentRecipeInfo] = useState(null);
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

    const handleMoreInfo = (e, recipeId) => {
        e.stopPropagation();
        const recipe = mockRecipes.find(r => r.id === recipeId);
        setCurrentRecipeInfo(recipe);
        setModalIsOpen(true);
    };



    // Handler to close the modal
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setCurrentRecipeInfo(null);
    };

    const rows = Array.from({ length: Math.ceil(mockRecipes.length / 5) }, (_, i) =>
        mockRecipes.slice(i * 5, i * 5 + 5)
    );

    return (
        <div className="page-container">
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
            <h2>Select Recipes</h2>
            {rows.map((rowRecipes, rowIndex) => (
                <div key={rowIndex} className="recipe-row">
                    {rowRecipes.map(recipe => (
                        <div
                            key={recipe.id}
                            className={`recipe-card ${selectedRecipes.includes(recipe.id) ? 'selected' : ''}`}
                            onClick={() => handleSelectRecipe(recipe.id)}
                        >
                            <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image"/>
                            <div className="recipe-info">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <span
                                    className="info-icon"
                                    onClick={(e) => handleMoreInfo(e, recipe.id)}>
                                    ⓘ
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmitSelection}>Submit Selection</button>
        </div>
    );
}

export default RecipeSelection;
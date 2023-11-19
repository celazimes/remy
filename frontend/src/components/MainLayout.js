// src/components/MainLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import '../styles.css'; // Import your CSS

const MainLayout = ({ children }) => {
    const location = useLocation();

    // Check if the current location is ReviewRecipes.js
    const isReviewRecipesPage = location.pathname === '/review-recipes';

    return (
        <div>
            <header className="header">
                <img src="remy.png" alt="Mascot" />
                <div className="header-text">
                    <h1>REMY</h1> {/* Add the text element */}
                </div>
                {/* Other header content */}
            </header>
            <div className={`page-container ${isReviewRecipesPage ? 'review-recipes-page' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;

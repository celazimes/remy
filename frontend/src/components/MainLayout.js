// src/components/MainLayout.js
import React from 'react';
import '../styles.css'; // Import your CSS

const MainLayout = ({ children }) => {
    return (
        <div>
            <header className="header">
                <img src="remy.png" alt="Mascot" />
                {/* Other header content */}
            </header>
            <div className="page-container">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import DietaryPreferences from './components/DietaryPreferences';
import RecipeSelection from './components/RecipeSelection';
import ReviewRecipes from './components/ReviewRecipes';
import AllergiesSelection from './components/AllergiesSelection'; // Create this component
import './styles.css';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/onboarding" element={<DietaryPreferences />} />
                    <Route path="/select-recipes" element={<RecipeSelection />} />
                    <Route path="/review-recipes" element={<ReviewRecipes />} />
                    <Route path="/allergies" element={<AllergiesSelection />} />
                    {/* Redirect from home ("/") to "/onboarding" */}
                    <Route path="/" element={<Navigate replace to="/onboarding" />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;

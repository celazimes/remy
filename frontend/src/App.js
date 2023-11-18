// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DietaryPreferences from './components/DietaryPreferences';
import RecipeSelection from './components/RecipeSelection';
import ReviewRecipes from './components/ReviewRecipes';
import AllergiesSelection from './components/AllergiesSelection'; // Create this component
import './styles.css';

const Header = () => (
  <div className="header">
    {/* Replace 'path/to/remy.png' with the correct path to your remy.png file */}
    <img src="remy.png" alt="Mascot" />
  </div>
);

function App() {
  return (
    <Router>
      <Header /> {/* Header is outside the route configuration */}
      <Routes>
        <Route path="/onboarding" element={<DietaryPreferences />} />
        <Route path="/select-recipes" element={<RecipeSelection />} />
        <Route path="/review-recipes" element={<ReviewRecipes />} />
        <Route path="/allergies" element={<AllergiesSelection />} />
        <Route path="/" element={
          <div className="page-container">
            <h1>Welcome to the Recipe App</h1>
            <Link to="/onboarding" className="start-button">Start Onboarding</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

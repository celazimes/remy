// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DietaryPreferences from './components/DietaryPreferences';
import RecipeSelection from './components/RecipeSelection';
import ReviewRecipes from './components/ReviewRecipes';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/onboarding" element={<DietaryPreferences />} />
          <Route path="/select-recipes" element={<RecipeSelection />} />
          <Route path="/review-recipes" element={<ReviewRecipes />} />
          <Route path="/" element={
            <div>
              <h1>Welcome to the Recipe App</h1>
              <Link to="/onboarding">Start Onboarding</Link>
            </div>
          } />
        </Routes>
      </Router>
  );
}

export default App;

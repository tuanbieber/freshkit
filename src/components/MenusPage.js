import React, { useState } from 'react';
import './MenusPage.css';

const MenusPage = () => {
  const [selectedWeek, setSelectedWeek] = useState('Oct 04-10');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const weeks = [
    'Oct 04-10',
    'Oct 11-17', 
    'Oct 18-24',
    'Oct 25-31'
  ];

  const filters = [
    'All',
    'New & Improved',
    'Nutritious Picks',
    'Feel-Good Made Easy',
    'Fall Flavors',
    'Premium Picks',
    '20-MIN MEAL',
    'PREP & BAKE',
    'BIG BATCH DINNER',
    'BUILD-A-PLATE',
    'TEST KITCHEN',
    '15-MIN PREMIUM',
    'GLOBAL FEAST',
    'Gut-Friendly',
    'VEGGIE SPOTLIGHT'
  ];

  const recipes = [
    {
      id: 1,
      name: 'Sweet Thai Chili Burgers',
      category: 'New & Improved',
      description: 'with Ginger Scallion Aioli, Crispy Onions & Sweet Potato Wedges',
      time: '35 min',
      tags: [],
      image: '🍔'
    },
    {
      id: 2,
      name: 'Pan-Seared Sweet Soy Glazed Pork',
      category: 'Regular',
      description: 'with Roasted Carrots & Broccoli',
      time: '30 min',
      tags: ['Carb Conscious', 'High Protein', 'Fiber Powered', 'Easy Prep', 'Veggie Packed'],
      image: '🥩'
    },
    {
      id: 3,
      name: 'Sweet Chili Beef & Green Bean Bowls',
      category: 'New & Improved',
      description: 'with Jasmine Rice, Crispy Onions & Cilantro',
      time: '20 min',
      tags: ['High Protein', 'Quick', 'Easy Prep', 'Kid Friendly'],
      image: '🍲'
    },
    {
      id: 4,
      name: 'One-Pan Cheesy Chicken & Pepper Fajitas',
      category: 'Regular',
      description: 'with Pico de Gallo & Lime Crema',
      time: '30 min',
      tags: ['High Protein', 'Easy Cleanup', 'Spicy'],
      image: '🌮'
    },
    {
      id: 5,
      name: 'Saucy Pork Burrito Bowls',
      category: 'Regular',
      description: 'with Cilantro Lime Rice, Salsa Fresca & Smoky Crema',
      time: '20 min',
      tags: ['Quick', 'Spicy'],
      image: '🌯'
    },
    {
      id: 6,
      name: 'Tuscan Pork Filet',
      category: 'Nutritious Picks',
      description: 'over Garlicky Tomato Spaghetti & Roasted Zucchini',
      time: '35 min',
      tags: ['High Protein', 'Mediterranean', 'Easy Prep'],
      image: '🍝'
    },
    {
      id: 7,
      name: 'Spicy Thai-Style Vegan Grain Salad',
      category: 'Feel-Good Made Easy',
      description: 'with Tomato, Cucumber, Scallions & Peanuts',
      time: '20 min',
      tags: ['Vegan', 'Fiber Powered', 'Quick', 'Kid Friendly', 'Veggie Packed', 'Nutritious Picks'],
      image: '🥗'
    },
    {
      id: 8,
      name: 'Creamy Dreamy Potato Mushroom Soup',
      category: 'Fall Flavors',
      description: 'with Peas, Thyme & Ciabatta Croutons',
      time: '40 min',
      tags: ['Veggie', 'Fiber Powered', 'Veggie Packed'],
      image: '🍲'
    },
    {
      id: 9,
      name: 'Garlic Herb Butter–Basted Scallops',
      category: 'Premium Picks',
      description: 'with Spaghetti & Burst Grape Tomatoes',
      time: '35 min',
      tags: ['Easy Prep'],
      image: '🦐'
    },
    {
      id: 10,
      name: 'Sizzlin\' Shrimp Bowls with Spicy Mayo',
      category: 'New & Improved',
      description: 'plus Garlicky Roasted Broccoli & Sesame Seeds',
      time: '20 min',
      tags: ['Quick', 'Easy Prep', 'Kid Friendly'],
      image: '🍤'
    },
    {
      id: 11,
      name: 'Warm Steak, Kale & Sweet Potato Salad',
      category: '15-MIN PREMIUM',
      description: 'with Pecans, Cranberries & Balsamic Vinaigrette',
      time: '15 min',
      tags: ['Carb Conscious', 'High Protein', 'Fiber Powered', 'Quick', 'Easy Prep', 'Kid Friendly', 'Seasonal'],
      image: '🥩'
    },
    {
      id: 12,
      name: 'Pecan-Crusted Salmon',
      category: 'Premium Picks',
      description: 'with a Lemony Apple Salad & Thyme-Roasted Potatoes',
      time: '35 min',
      tags: ['High Protein'],
      image: '🐟'
    },
    {
      id: 13,
      name: 'Creamy Tomato Soup with Pork Sausage',
      category: '20-MIN MEAL',
      description: 'plus Peas & Cheesy Toasts',
      time: '20 min',
      tags: ['Quick', 'Easy Prep', 'Kid Friendly'],
      image: '🍲'
    },
    {
      id: 14,
      name: 'Prep & Bake Cheesy Tomato Ravioli',
      category: 'PREP & BAKE',
      description: 'with Creamy Pesto Sauce & Ciabatta Toast',
      time: '35 min',
      tags: ['Veggie', 'Easy Prep'],
      image: '🍝'
    },
    {
      id: 15,
      name: 'Honey Thyme Pork Filet',
      category: 'Nutritious Picks',
      description: 'with Roasted Potatoes & Broccoli',
      time: '30 min',
      tags: ['High Protein'],
      image: '🥩'
    },
    {
      id: 16,
      name: 'Vegan Southwest Black Bean Stuffed Peppers',
      category: 'Regular',
      description: 'with Toasted Panko, Couscous, Lemon Drizzle & Cilantro',
      time: '30 min',
      tags: ['Vegan'],
      image: '🌶️'
    },
    {
      id: 17,
      name: 'Banh Mi–Style Turkey Meatball Bowls',
      category: 'Regular',
      description: 'with Pickled Veggie Salad, Chili Lime Mayo & Ginger Edamame Rice',
      time: '30 min',
      tags: ['High Protein', 'Veggie Packed'],
      image: '🍚'
    },
    {
      id: 18,
      name: 'Chicken Sausage & Spinach Ricotta Ravioli',
      category: '20-MIN MEAL',
      description: 'with Tomatoes & Lemon',
      time: '20 min',
      tags: ['High Protein', 'Quick', 'Easy Prep', 'Kid Friendly'],
      image: '🍝'
    },
    {
      id: 19,
      name: 'Seared Salmon with Lemon-Dijon Sauce',
      category: 'Regular',
      description: 'plus Garlic Couscous & Roasted Brussels Sprouts',
      time: '30 min',
      tags: ['High Protein', 'Easy Prep'],
      image: '🐟'
    },
    {
      id: 20,
      name: 'Sizzling Garlic Herb Butter Steak',
      category: 'Regular',
      description: 'with Potato Wedges plus Honey-Glazed Peas & Carrots',
      time: '35 min',
      tags: ['Fiber Powered'],
      image: '🥩'
    }
  ];

  const filteredRecipes = selectedFilter === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedFilter);

  return (
    <div className="menus-page">
      <div className="container">
        {/* Header Section */}
        <div className="menus-header">
          <h1>Menu for {selectedWeek}</h1>
          <div className="week-selector">
            {weeks.map((week, index) => (
              <button
                key={index}
                className={`week-btn ${selectedWeek === week ? 'active' : ''}`}
                onClick={() => setSelectedWeek(week)}
              >
                {week}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-buttons">
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image">
                <span className="recipe-emoji">{recipe.image}</span>
                {recipe.category !== 'Regular' && (
                  <div className="recipe-category">{recipe.category}</div>
                )}
              </div>
              
              <div className="recipe-content">
                <h3 className="recipe-name">{recipe.name}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta">
                  <span className="cooking-time">{recipe.time}</span>
                </div>
                
                {recipe.tags.length > 0 && (
                  <div className="recipe-tags">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="menus-cta">
          <h2>Get cooking</h2>
          <p>Recipe archive - Check out our cookbook!</p>
          <button className="cta-button">View All Recipes</button>
        </div>
      </div>
    </div>
  );
};

export default MenusPage;

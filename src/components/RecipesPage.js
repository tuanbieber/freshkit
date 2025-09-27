import React, { useState } from 'react';
import './RecipesPage.css';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const worldCuisines = [
    'American Recipes', 'Italian Recipes', 'Asian Recipes', 'Mediterranean Recipes',
    'Mexican Recipes', 'Korean Recipes', 'Indian Recipes', 'Latin American Recipes',
    'Chinese Recipes', 'Spanish Recipes', 'Japanese Recipes', 'Thai Recipes',
    'French Recipes', 'Cuban Recipes', 'African Recipes', 'Cajun Recipes',
    'Middle Eastern Recipes', 'Vietnamese Recipes', 'Hawaiian Recipes'
  ];

  const dishTypes = [
    'Taco Recipes', 'Burger Recipes', 'Pasta Recipes', 'Bowl Recipes',
    'Flatbread Recipes', 'Stir-Fry Recipes', 'Meatball Recipes', 'Noodle Recipes',
    'Risotto Recipes', 'Skillet Recipes', 'Soup Recipes', 'Skewer Recipes',
    'Quesadilla Recipes', 'Meatloaf Recipes', 'Fajita Recipes', 'Enchilada Recipes',
    'Bibimbap Recipes', 'Burrito Recipes', 'Sandwich Recipes', 'Tostada Recipes',
    'Casserole Recipes'
  ];

  const mostPopularRecipes = [
    {
      id: 1,
      name: 'When Steak Met Potatoes',
      description: 'and Creamed Kale with Peppercorn Sauce',
      image: '🥩',
      time: '35 min',
      tags: ['High Protein', 'Premium']
    },
    {
      id: 2,
      name: 'Hearty Steak and Potatoes',
      description: 'with Balsamic-Cranberry Pan Sauce',
      image: '🥩',
      time: '40 min',
      tags: ['High Protein', 'Premium']
    },
    {
      id: 3,
      name: 'Mozzarella-Crusted Chicken',
      description: 'with Blistered Tomatoes and Potato Wedges',
      image: '🍗',
      time: '30 min',
      tags: ['High Protein', 'Kid Friendly']
    },
    {
      id: 4,
      name: 'Winner Winner Chicken Orzo Dinner',
      description: 'with Cheesy Roasted Zucchini and Tomato',
      image: '🍝',
      time: '25 min',
      tags: ['High Protein', 'Quick']
    },
    {
      id: 5,
      name: 'Rapid Stir-Fried Beef',
      description: 'and Broccoli',
      image: '🥩',
      time: '20 min',
      tags: ['High Protein', 'Quick', 'Asian']
    },
    {
      id: 6,
      name: 'Ginger Beef Stir-Fry',
      description: 'with Snappy Asparagus',
      image: '🥩',
      time: '25 min',
      tags: ['High Protein', 'Asian']
    },
    {
      id: 7,
      name: 'Butter-Basted Sirloin Steak',
      description: 'with Parsnip Wedges and Creamed Spinach',
      image: '🥩',
      time: '35 min',
      tags: ['High Protein', 'Premium']
    },
    {
      id: 8,
      name: 'New York Strip Steak',
      description: 'with Truffled Mashed Potatoes and Green Beans Almandine',
      image: '🥩',
      time: '40 min',
      tags: ['High Protein', 'Premium']
    },
    {
      id: 9,
      name: 'Creamy Shrimp Tagliatelle',
      description: 'with Heirloom Tomatoes, Garlic, and Chili',
      image: '🍝',
      time: '30 min',
      tags: ['Seafood', 'Italian']
    },
    {
      id: 10,
      name: 'Balsamic Chicken Rustico',
      description: 'with Provencal Roasted Roots Veggies',
      image: '🍗',
      time: '35 min',
      tags: ['High Protein', 'Mediterranean']
    },
    {
      id: 11,
      name: 'Korean Beef Bibimbap',
      description: 'with Zucchini, Mushrooms, and Carrot',
      image: '🍚',
      time: '30 min',
      tags: ['High Protein', 'Korean', 'Bowl']
    },
    {
      id: 12,
      name: 'Spanish One-Pan Chicken',
      description: 'with Chorizo and Bell Peppers',
      image: '🍗',
      time: '35 min',
      tags: ['High Protein', 'Spanish', 'One-Pan']
    }
  ];

  const mostRecentRecipes = [
    {
      id: 13,
      name: 'Chicken & Apple Rosemary Pan Sauce',
      description: 'with Mashed Potatoes & Roasted Brussels Sprouts',
      image: '🍗',
      time: '35 min',
      tags: ['High Protein', 'New']
    },
    {
      id: 14,
      name: 'Chicken & Pepper Enchiladas',
      description: 'with Pico de Gallo & Lime Crema',
      image: '🌶️',
      time: '30 min',
      tags: ['High Protein', 'Mexican', 'New']
    },
    {
      id: 15,
      name: 'One-Pot Hoisin Beef Meatball Ramen',
      description: 'with Bok Choy, Napa Cabbage & Sriracha',
      image: '🍜',
      time: '25 min',
      tags: ['High Protein', 'Asian', 'One-Pot', 'New']
    },
    {
      id: 16,
      name: 'Honey Mandarin Chicken & Pepper Stir-Fry',
      description: 'with Dark Meat Chicken & Rice',
      image: '🍗',
      time: '20 min',
      tags: ['High Protein', 'Asian', 'Quick', 'New']
    },
    {
      id: 17,
      name: 'Turkish-Spiced Steak & Chickpea Bowls',
      description: 'with Pistachio Basmati Rice & Lemon-Herb Hummus Sauce',
      image: '🥩',
      time: '30 min',
      tags: ['High Protein', 'Mediterranean', 'Bowl', 'New']
    },
    {
      id: 18,
      name: 'Honey-Harissa BBQ Chicken',
      description: 'plus Garlicky Rice with Zucchini & Black Beans',
      image: '🍗',
      time: '35 min',
      tags: ['High Protein', 'BBQ', 'New']
    },
    {
      id: 19,
      name: 'Honey Mustard Chicken Salad Wraps',
      description: 'with Almonds & Dried Cranberries | 2 servings',
      image: '🥗',
      time: '15 min',
      tags: ['High Protein', 'Quick', 'Healthy', 'New']
    },
    {
      id: 20,
      name: 'Tex-Mex-Style Chicken',
      description: 'with Spiced Tomato-Chickpea Rice & Scallion Crema',
      image: '🍗',
      time: '30 min',
      tags: ['High Protein', 'Mexican', 'New']
    }
  ];

  const hallOfFameRecipes = [
    {
      id: 21,
      name: 'Winner Winner Chicken Orzo Dinner',
      description: 'with Cheesy Roasted Zucchini and Tomato',
      image: '🍝',
      time: '25 min',
      tags: ['High Protein', 'Hall of Fame']
    },
    {
      id: 22,
      name: 'Korean Beef Bibimbap',
      description: 'with Zucchini, Mushrooms, and Carrot',
      image: '🍚',
      time: '30 min',
      tags: ['High Protein', 'Korean', 'Hall of Fame']
    },
    {
      id: 23,
      name: 'Teriyaki Chicken Tenders',
      description: 'with Jasmine Rice and Green Beans',
      image: '🍗',
      time: '25 min',
      tags: ['High Protein', 'Asian', 'Kid Friendly', 'Hall of Fame']
    },
    {
      id: 24,
      name: 'Zesty Breaded Chicken Breasts',
      description: 'with Roasted Potatoes and Creamy Mixed Greens',
      image: '🍗',
      time: '30 min',
      tags: ['High Protein', 'Hall of Fame']
    },
    {
      id: 25,
      name: 'Parmesan Chicken Strips',
      description: 'with Rosemary Fries, Green Beans, and Honey Mustard Sauce',
      image: '🍗',
      time: '30 min',
      tags: ['High Protein', 'Kid Friendly', 'Hall of Fame']
    },
    {
      id: 26,
      name: 'Classic Beef Chili',
      description: 'with Borlotti Beans, Poblano Pepper, and Cheddar Cheese',
      image: '🌶️',
      time: '40 min',
      tags: ['High Protein', 'Comfort Food', 'Hall of Fame']
    }
  ];

  const quickMeals = [
    {
      id: 27,
      name: 'Mediterranean Couscous Bowls',
      description: 'with Hummus, Cucumber Salad, & Lemon Cream',
      image: '🥗',
      time: '20 min',
      tags: ['Mediterranean', 'Quick', 'Healthy']
    },
    {
      id: 28,
      name: 'Sizzlin\' Saigon Steak Bowls',
      description: 'with Sriracha-Lime Mayo and Jasmine Rice',
      image: '🥩',
      time: '25 min',
      tags: ['High Protein', 'Asian', 'Quick']
    },
    {
      id: 29,
      name: 'Creamy Chive Chicken',
      description: 'with Lemony Rice and a Dijon-Apple Salad',
      image: '🍗',
      time: '30 min',
      tags: ['High Protein', 'Quick']
    },
    {
      id: 30,
      name: 'Creamiest Mushroom Ravioli',
      description: 'with Parmesan and Heirloom Grape Tomatoes',
      image: '🍝',
      time: '25 min',
      tags: ['Vegetarian', 'Quick', 'Italian']
    },
    {
      id: 31,
      name: 'Veggie Chiles Rellenos',
      description: 'with Avocado Salsa and Zesty Crema',
      image: '🌶️',
      time: '30 min',
      tags: ['Vegetarian', 'Mexican', 'Quick']
    },
    {
      id: 32,
      name: 'Crispy Southwestern Chicken Cutlets',
      description: 'with Monterey Jack, Mashed Potatoes, and Roasted Poblano and Onion',
      image: '🍗',
      time: '30 min',
      tags: ['High Protein', 'Mexican', 'Quick']
    }
  ];

  const recipeCategories = [
    { name: 'Recipes by Ingredient', description: 'Find recipes based on what you have in your fridge' },
    { name: 'Recipes by Meal', description: 'Breakfast and brunch & Dinner to lunch' },
    { name: 'One Pot / One Pan Meals', description: 'Easy setup with less cleanup!' },
    { name: 'Recipes by Difficulty', description: 'Recipes based on your cooking experience' },
    { name: 'Recipes by Dietary Lifestyle', description: 'Recipes that fit your particular diet' }
  ];

  const renderRecipeCard = (recipe) => (
    <div key={recipe.id} className="recipe-card">
      <div className="recipe-image">
        <span className="recipe-emoji">{recipe.image}</span>
        {recipe.tags.includes('New') && <div className="new-badge">NEW</div>}
        {recipe.tags.includes('Hall of Fame') && <div className="fame-badge">HALL OF FAME</div>}
      </div>
      <div className="recipe-content">
        <h3 className="recipe-name">{recipe.name}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          <span className="cooking-time">{recipe.time}</span>
        </div>
        <div className="recipe-tags">
          {recipe.tags.filter(tag => !['New', 'Hall of Fame'].includes(tag)).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="recipes-page">
      <div className="container">
        {/* Hero Section */}
        <div className="recipes-hero">
          <h1>A World of Tasty Recipes for Dinner</h1>
          <p className="hero-description">
            Not sure what to make for dinner? Don't want a big hassle? It doesn't matter what you're in the mood for, 
            you'll find the perfect easy-to-cook meal that will leave you smiling. Discover more than 2,500 delicious 
            dinner recipes in our recipe collection.
          </p>
          
          {/* Search Bar */}
          <div className="search-section">
            <h3>Need a recipe? Search here:</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-button">Search</button>
            </div>
          </div>
        </div>

        {/* World Cuisines Section */}
        <div className="cuisines-section">
          <h2>World Cuisines</h2>
          <div className="cuisines-grid">
            {worldCuisines.map((cuisine, index) => (
              <button key={index} className="cuisine-btn">
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Dish Types Section */}
        <div className="dishes-section">
          <h2>Dishes</h2>
          <div className="dishes-grid">
            {dishTypes.map((dish, index) => (
              <button key={index} className="dish-btn">
                {dish}
              </button>
            ))}
          </div>
        </div>

        {/* Most Popular Recipes */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Most Popular Meals and Recipes</h2>
            <button className="see-all-btn">See all</button>
          </div>
          <p className="section-subtitle">Check out our most favorited recipes!</p>
          <div className="recipes-grid">
            {mostPopularRecipes.map(renderRecipeCard)}
          </div>
        </div>

        {/* Most Recent Recipes */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Most Recent Recipes</h2>
            <button className="see-all-btn">See all</button>
          </div>
          <p className="section-subtitle">Fresh off the chopping block!</p>
          <div className="recipes-grid">
            {mostRecentRecipes.map(renderRecipeCard)}
          </div>
        </div>

        {/* Hall of Fame */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Hall of Fame</h2>
            <button className="see-all-btn">See all</button>
          </div>
          <p className="section-subtitle">The best of the best</p>
          <div className="recipes-grid">
            {hallOfFameRecipes.map(renderRecipeCard)}
          </div>
        </div>

        {/* Quick Meals */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Quick Meals for Busy Nights</h2>
            <button className="see-all-btn">See all</button>
          </div>
          <p className="section-subtitle">Ready in 30 minutes or less!</p>
          <div className="recipes-grid">
            {quickMeals.map(renderRecipeCard)}
          </div>
        </div>

        {/* Recipe Categories */}
        <div className="categories-section">
          <h2>Need a recipe? We've got plenty!</h2>
          <div className="categories-grid">
            {recipeCategories.map((category, index) => (
              <div key={index} className="category-card">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Get Free Steak + 10 Free Meals</h2>
          <button className="cta-button">Get Offer</button>
          <p className="cta-disclaimer">
            *One free item per box for your first two months with active subscription while supplies last until 12/14/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;

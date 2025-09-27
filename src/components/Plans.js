import React from 'react';
import './Plans.css';

const Plans = () => {
  const plans = [
    {
      title: 'MEAT & VEGGIES',
      subtitle: 'OUR MOST POPULAR PLAN',
      description: 'Perfectly balanced meals featuring lean proteins and fresh vegetables.',
      icon: '🥩',
      features: ['3-5 recipes per week', 'Perfect for meat lovers', 'Balanced nutrition', 'Family-friendly portions']
    },
    {
      title: 'VEGGIE',
      subtitle: '& PLANT-BASED MEALS',
      description: 'Delicious vegetarian and vegan meals packed with nutrients and bold flavors.',
      icon: '🥬',
      features: ['100% plant-based', 'Rich in protein', 'Eco-friendly', 'Creative recipes']
    },
    {
      title: 'FAMILY MENU',
      subtitle: 'KID-TESTED RECIPES',
      description: 'Kid-tested recipes that the whole family will love, with options for picky eaters.',
      icon: '👨‍👩‍👧‍👦',
      features: ['Kid-approved recipes', 'Family portions', 'Hidden vegetables', 'Fun cooking activities']
    },
    {
      title: 'FIT & WHOLESOME',
      subtitle: 'FOR A BALANCED LIFESTYLE',
      description: 'Nutritious meals under 650 calories designed for a balanced, healthy lifestyle.',
      icon: '💪',
      features: ['Under 650 calories', 'High protein', 'Low carb options', 'Fitness-focused']
    },
    {
      title: 'QUICK & EASY',
      subtitle: 'FOR BUSY WEEKNIGHTS',
      description: 'Fast, simple recipes perfect for busy weeknights when time is precious.',
      icon: '⚡',
      features: ['30 minutes or less', 'Minimal prep', 'One-pan meals', 'Weeknight friendly']
    },
    {
      title: 'PESCATARIAN',
      subtitle: 'SEAFOOD & VEGGIE MEALS',
      description: 'Fresh seafood and vegetable-focused meals for a lighter, ocean-inspired diet.',
      icon: '🐟',
      features: ['Fresh seafood', 'Omega-3 rich', 'Light & fresh', 'Mediterranean inspired']
    }
  ];

  return (
    <section className="plans" id="menus">
      <div className="container">
        <div className="plans-hero">
          <h1>Our Menus</h1>
          <p className="plans-subtitle">
            Choose from 100+ chef-curated recipes and meal plans designed for every taste and lifestyle.
          </p>
        </div>
        
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <div className="plan-icon">{plan.icon}</div>
              <h3>{plan.title}</h3>
              <p className="plan-subtitle">{plan.subtitle}</p>
              <p className="plan-description">{plan.description}</p>
              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className="plan-button">Choose This Plan</button>
            </div>
          ))}
        </div>
        
        <div className="plans-cta">
          <button className="cta-button">See what's on the menu</button>
        </div>
      </div>
    </section>
  );
};

export default Plans;

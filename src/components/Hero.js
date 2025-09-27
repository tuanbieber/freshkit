import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>THE BEST WAY<br />TO COOK DINNER<br />JUST GOT BETTER</h1>
        <p className="subtitle">
          <strong>NEW:</strong> ✓ 2x Healthier Recipes
        </p>
        <button className="cta-button">See Pricing & Plans</button>
        <p className="hero-description">
          Flexible plans. No commitment. Skip or cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default Hero;

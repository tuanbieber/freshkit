import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Nguyen Tan Dung',
      role: 'CEO',
      description: 'Award-winning chef with 15 years of experience in fine dining and meal planning.',
      image: '👩‍🍳'
    },
    {
      name: 'Nguyen Thanh Ri',
      role: 'CTO',
      description: 'Registered dietitian specializing in balanced nutrition and healthy meal planning.',
      image: '👨‍⚕️'
    },
    {
      name: 'Nguyen Thanh To',
      role: 'CPO',
      description: 'Ensures fresh ingredients and timely delivery to your doorstep every week.',
      image: '👩‍💼'
    }
  ];

  const values = [
    {
      title: 'Fresh Ingredients',
      description: 'We source the freshest, highest-quality ingredients from local farms and trusted suppliers.',
      icon: '🥬'
    },
    {
      title: 'Chef-Curated Recipes',
      description: 'Our professional chefs create delicious, balanced recipes that are easy to follow at home.',
      icon: '👨‍🍳'
    },
    {
      title: 'Convenience',
      description: 'Pre-portioned ingredients and step-by-step instructions make cooking stress-free.',
      icon: '📦'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to reducing food waste and using eco-friendly packaging.',
      icon: '🌱'
    }
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-hero">
          <h1>About FreshKit <br/> Made By Dung</h1>
          <p className="about-subtitle">
            We're passionate about making home cooking accessible, enjoyable, and delicious for everyone.
          </p>
        </div>

        <div className="about-story">
          <h2>Our Story</h2>
          <div className="story-content">
            <p>
              FreshKit was born from a simple idea: everyone deserves to enjoy delicious, home-cooked meals 
              without the stress of meal planning, grocery shopping, and ingredient portioning. Founded in 2020, 
              we've been on a mission to make cooking accessible and enjoyable for busy families, cooking 
              enthusiasts, and everyone in between.
            </p>
            <p>
              What started as a small team of passionate chefs and food lovers has grown into a community 
              of over 100,000 satisfied customers who trust us to deliver fresh ingredients and amazing 
              recipes right to their doorsteps.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">{member.image}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-section">
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100K+</div>
              <div className="stat-text">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-text">Recipes Created</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-text">Partner Farms</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8★</div>
              <div className="stat-text">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="mission-section">
          <h2>Our Mission</h2>
          <p className="mission-text">
            To inspire and empower people to cook delicious, healthy meals at home by providing 
            fresh ingredients, chef-curated recipes, and the confidence to create amazing dishes 
            in their own kitchens. We believe that cooking should be enjoyable, accessible, and 
            bring people together around the dinner table.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

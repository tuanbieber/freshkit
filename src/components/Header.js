import React, { useState } from 'react';
import './Header.css';

const Header = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo" onClick={() => handleNavigation('home')}>
          <div className="logo-icon">F</div>
          <span>FreshKit</span>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => handleNavigation('about')}
          >
            About Us
          </button>
          <div className="dropdown">
            <button 
              className={`nav-link ${currentPage === 'menus' || currentPage === 'recipes' ? 'active' : ''}`}
              onClick={() => handleNavigation('menus')}
            >
              Our Menus
            </button>
            <div className="dropdown-menu">
              <button onClick={() => handleNavigation('menus')}>Our Menus</button>
              <button onClick={() => handleNavigation('recipes')}>Cookbook & Recipes</button>
            </div>
          </div>
        </div>
        
        <button className="login-btn">Log in</button>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Header;

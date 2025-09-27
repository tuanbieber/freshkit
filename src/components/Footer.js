import React from 'react';
import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Our Plans',
      links: ['Our Plans', 'About Us', 'Our Menus', 'Cookbook and Recipes', 'Vegetarian Recipes']
    },
    {
      title: 'Help & Support',
      links: ['Help Center', 'Contact', 'Gift Cards', 'FreshKit for Teams']
    },
    {
      title: 'Company',
      links: ['Students', 'Blog', 'Recipes', 'Hero Discounts', 'Recipe Directory']
    },
    {
      title: 'Legal',
      links: ['Terms and Conditions', 'Privacy', 'Accessibility', 'California Supply Chains Act']
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; FreshKit 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

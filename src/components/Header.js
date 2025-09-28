import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo" onClick={handleNavigation}>
          <div className="logo-icon">F</div>
          <span>FreshKit</span>
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <Link 
            to="/gioi-thieu"
            className={`nav-link ${location.pathname === '/gioi-thieu' ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Giới thiệu
          </Link>
          <Link 
            to="/thuc-don"
            className={`nav-link ${location.pathname === '/thuc-don' ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Thực đơn
          </Link>
          <Link 
            to="/goi-dang-ky"
            className={`nav-link ${location.pathname === '/goi-dang-ky' ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Gói đăng ký
          </Link>
          <Link 
            to="/cong-dong"
            className={`nav-link ${location.pathname === '/cong-dong' ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Cộng đồng
          </Link>
          <Link 
            to="/doi-tac"
            className={`nav-link ${location.pathname === '/doi-tac' ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Đối tác
          </Link>
        </div>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Thanh tìm kiếm chung cho toàn web" 
            className="search-input"
          />
        </div>
        
        <button className="login-btn">Đăng nhập</button>
        
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

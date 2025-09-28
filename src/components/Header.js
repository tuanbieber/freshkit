import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import storageService from '../services/storage';
import LoginModal from './LoginModal';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = () => {
      const isLoggedIn = storageService.checkSession();
      const user = storageService.getCurrentUser();
      setCurrentUser(user);
      setIsLoading(false);
    };
    
    checkSession();
  }, []);

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowLoginModal(false);
    // Refresh session to extend expiration
    storageService.refreshSession();
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
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
        
        <div className="header-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Tìm kiếm" 
              className="search-input"
            />
          </div>
          
          {isLoading ? (
            <div className="loading-state">Đang tải...</div>
          ) : currentUser ? (
            <div className="user-menu">
              <span className="user-greeting">Xin chào, {currentUser.name}</span>
              <div className="user-avatar">{currentUser.avatar}</div>
              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => setShowLoginModal(true)}
            >
              Đăng nhập
            </button>
          )}
        </div>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </header>
  );
};

export default Header;

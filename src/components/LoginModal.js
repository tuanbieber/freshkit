import React, { useState } from 'react';
import storageService from '../services/storage';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = storageService.login(formData.username, formData.password);
        if (result.success) {
          onLogin(result.user);
          onClose();
          setFormData({ username: '', email: '', password: '', name: '' });
        } else {
          setError(result.message);
        }
      } else {
        const result = storageService.register(formData);
        if (result.success) {
          setError('Đăng ký thành công! Vui lòng đăng nhập.');
          setIsLogin(true);
          setFormData({ username: '', email: '', password: '', name: '' });
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', email: '', password: '', name: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Nhập họ và tên"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              {isLogin ? 'Tên đăng nhập hoặc Email' : 'Tên đăng nhập'}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder={isLogin ? 'Nhập tên đăng nhập hoặc email' : 'Nhập tên đăng nhập'}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Nhập email"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button type="button" className="toggle-btn" onClick={toggleMode}>
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>PrepJoy</h3>
            <p>Nền tảng đồ ăn sơ chế sẵn lành mạnh hàng đầu Việt Nam</p>
          </div>
          <div className="footer-sections">
            <div className="footer-section">
              <h4>Liên hệ</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">🏢</span>
                  <div className="contact-details">
                    <strong>Trụ sở chính:</strong> 279, Nguyễn Tri Phương, phường Diên Hồng, TP Hồ Chí Minh
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🏭</span>
                  <div className="contact-details">
                    <strong>Nhà máy sản xuất:</strong> 279, Nguyễn Tri Phương, phường Diên Hồng, TP Hồ Chí Minh
                  </div>
                </div>  
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div className="contact-details">
                    <strong>Số điện thoại:</strong> <a href="tel:+84123456789">(+84) 123 456 789</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div className="contact-details">
                    <strong>Email:</strong> <a href="mailto:info@prepjoy.com.vn">info@prepjoy.com.vn</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h4>Phương thức thanh toán</h4>
              <div className="payment-methods">
                <img src="/payment-visa.webp" alt="Visa" className="payment-icon" />
                <img src="/payment-mastercard.jpg" alt="Mastercard" className="payment-icon" />
                <img src="/payment-paypal.png" alt="PayPal" className="payment-icon" />
                <img src="/payment-momo.webp" alt="MoMo" className="payment-icon" />
              </div>
            </div>
            <div className="footer-section">
              <h4>Tải ứng dụng</h4>
              <div className="app-stores">
                <a href="#" className="app-store-link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play Store" className="app-store-icon" />
                </a>
                <a href="#" className="app-store-link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="app-store-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FreshKit. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

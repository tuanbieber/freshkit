import React from 'react';
import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Liên hệ',
      links: ['Trụ sở chính', 'Nhà máy sản xuất', 'Số điện thoại', 'Email']
    },
    {
      title: 'Dịch vụ',
      links: ['Gói đăng ký', 'Thực đơn', 'Công thức nấu ăn', 'Hỗ trợ khách hàng']
    },
    {
      title: 'Công ty',
      links: ['Giới thiệu', 'Tin tức', 'Tuyển dụng', 'Đối tác']
    },
    {
      title: 'Pháp lý',
      links: ['Điều khoản sử dụng', 'Chính sách bảo mật', 'Quyền riêng tư', 'Liên hệ pháp lý']
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
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">🏢</div>
              <div className="contact-details">
                <h4>Trụ sở chính</h4>
                <p>TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🏭</div>
              <div className="contact-details">
                <h4>Nhà máy sản xuất</h4>
                <p>TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h4>Số điện thoại</h4>
                <p><a href="tel:+84123456789">+84 123 456 789</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p><a href="mailto:info@freshkit.vn">info@freshkit.vn</a></p>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 FreshKit. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

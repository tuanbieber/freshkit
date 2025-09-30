import React from 'react';
import './Partners.css';

const Partners = () => {
  return (
    <div className="partners-page">
      <div className="partners-banner">
        <img src="/doi-tac/doi-tac-banner.png" alt="Partners Banner" />
      </div>
      <div className="container">
        <div className="partners-header">
          <h1>"Hãy gặp các đối tác của chúng tôi!"</h1>
        </div>

        <div className="partners-content">
          <div className="partner-section">
            <div className="partner-logo-section">
              <img src="/doi-tac/doi-tac-KMAREO.jpg" alt="Kamereo" className="partner-logo-large" />
            </div>
            <div className="partner-details">
              <h2>Nhà cung ứng chính</h2>
              <h3>Kamereo</h3>
              <p>
                Kamereo cung cấp hầu như tất cả các nguyên liệu cần có trong một bữa ăn gồm rau, trái cây, thịt, thực phẩm khô, đồ uống, và nhiều sản phẩm khác đáp ứng nhu cầu cho PrepJoy mang đến khách hàng những set nguyên liệu tươi ngon nhất. Kamereo cũng đang là đối tác của rất nhiều nhà hàng, quán ăn và có uy tín về chất lượng trong ngành cung ứng thực phẩm.
              </p>
              <p>
                Được cấp <strong>Giấy Chứng Nhận VietGAP ngày 01/08/2024</strong> về sản phẩm đạt chuẩn sản phẩm phù hợp tiêu chuẩn quốc gia. Kamereo với tiêu chí mang nguyên liệu tươi từ nông trại đến cửa hàng với khâu vận chuyển nghiêm ngặt và an toàn vệ sinh.
              </p>
            </div>
          </div>

          <div className="partner-section">
            <div className="partner-logo-section">
              <img src="/doi-tac/doi-tac-nguyen-ha.jpg" alt="Nguyên Hà" className="partner-logo-large" />
            </div>
            <div className="partner-details">
              <h2>Nhà cung ứng thực phẩm</h2>
              <h3>Công ty TNHH Thực Phẩm Nguyên Hà</h3>
              <p>
                Đây là một nhà nhập khẩu và kinh doanh phân phối thực phẩm với hơn <strong>14 năm kinh nghiệm</strong> trong ngành F&B trên hầu hết các tỉnh thành của Việt Nam. Ngoài thịt tươi ra thì PrepJoy còn có kết hợp thêm đa dạng nguyên liệu trong nhằm tăng khẩu vị người dùng như các loại thực phẩm chế biến từ thịt như xúc xích, pate, jambon, thịt xông khói và nhiều sản phẩm nhập khẩu khác.
              </p>
              <p>
                Nguyên Hà là đối tác hàng đầu cho các loại nguyên liệu này của PrepJoy với quy trình sản xuất tuân thủ các tiêu chuẩn quốc tế về an toàn thực phẩm. Nguyên liệu được chọn lọc kỹ lưỡng, đảm bảo nguồn gốc rõ ràng và chất lượng cao.
              </p>
            </div>
          </div>

          <div className="partner-section">
            <div className="partner-logo-section">
              <img src="/doi-tac/doi-tac-AHAMOVE.png" alt="Ahamove" className="partner-logo-large" />
            </div>
            <div className="partner-details">
              <h2>Đối tác vận chuyển</h2>
              <h3>Ahamove</h3>
              <p>
                Với các ưu điểm như đội tài xế chuyên biệt, đánh giá <strong>5* giao hàng tận tâm</strong>; giao hàng siêu tốc và tiện lợi. PrepJoy còn kết hợp với Ahamove cung cấp tính năng cập nhật thông tin đơn hàng để khách hàng có thể dễ dàng theo dõi đơn hàng của mình.
              </p>
            </div>
          </div>
        </div>

        <div className="partners-cta">
          <h2>Bạn muốn trở thành đối tác của PrepJoy?</h2>
          <p>Hãy liên hệ với chúng tôi để tìm hiểu về cơ hội hợp tác</p>
          <button className="cta-button">Liên hệ ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Partners;

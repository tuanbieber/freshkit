import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Nguyễn Tấn Dũng',
      role: 'Giám đốc điều hành (CEO)',
      description: 'Sinh viên Đại học Kinh tế TP.HCM (UEH) với niềm đam mê ẩm thực sâu sắc. Mong muốn lan tỏa giá trị tích cực và xây dựng cộng đồng thông qua việc chia sẻ tình yêu nấu ăn và kết nối mọi người.',
      image: '👨‍🎓'
    },
      {
        name: 'Nguyễn Thanh Tuấn',
        role: 'Giám đốc công nghệ (CTO)',
        description: 'Tốt nghiệp Đại học Bách Khoa TP.HCM chuyên ngành Khoa học Máy tính. Kiến trúc sư công nghệ xuất sắc với 5 năm kinh nghiệm xây dựng hệ thống phân tán quy mô lớn, phục vụ hàng triệu người dùng. Chuyên gia về Kubernetes, Golang, MySQL, Redis, Kafka, Distributed Systems. Đã giải quyết 1300+ bài LeetCode, chứng minh khả năng tư duy thuật toán và giải quyết vấn đề phức tạp.',
        image: '👨‍💻'
      },
      {
        name: 'Nhi',
        role: 'Trưởng nhóm',
        description: 'Sinh viên Đại học Kinh tế TP.HCM (UEH)',
        image: '👨‍💻'
      },
      {
        name: 'Bạn 2 của Dũng',
        role: 'Thành viên',
        description: 'Sinh viên Đại học Kinh tế TP.HCM (UEH)',
        image: '👨‍💻'
      },
  ];

  const values = [
    {
      title: 'Nguyên liệu tươi ngon',
      description: 'Chúng tôi lựa chọn những nguyên liệu tươi ngon, chất lượng cao từ các trang trại địa phương và nhà cung cấp uy tín.',
      icon: '🥬'
    },
    {
      title: 'Công thức từ đầu bếp chuyên nghiệp',
      description: 'Các đầu bếp chuyên nghiệp của chúng tôi tạo ra những công thức ngon miệng, cân bằng dinh dưỡng và dễ thực hiện tại nhà.',
      icon: '👨‍🍳'
    },
    {
      title: 'Tiện lợi',
      description: 'Nguyên liệu đã được chia phần sẵn và hướng dẫn từng bước giúp việc nấu ăn trở nên dễ dàng.',
      icon: '📦'
    },
    {
      title: 'Bền vững',
      description: 'Chúng tôi cam kết giảm thiểu lãng phí thực phẩm và sử dụng bao bì thân thiện với môi trường.',
      icon: '🌱'
    }
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-hero">
          <h1>Về FreshKit <br/> Được tạo bởi Dũng</h1>
          <p className="about-subtitle">
            Chúng tôi đam mê việc làm cho nấu ăn tại nhà trở nên dễ tiếp cận, thú vị và ngon miệng cho mọi người.
          </p>
        </div>

        <div className="about-story">
          <h2>Câu chuyện của chúng tôi</h2>
          <div className="story-content">
            <p>
              FreshKit được sinh ra từ một ý tưởng đơn giản: mọi người đều xứng đáng được thưởng thức những bữa ăn 
              ngon miệng, nấu tại nhà mà không cần lo lắng về việc lập kế hoạch bữa ăn, mua sắm thực phẩm và chia phần 
              nguyên liệu. Được thành lập vào năm 2025, chúng tôi đã và đang thực hiện sứ mệnh làm cho việc nấu ăn 
              trở nên dễ tiếp cận và thú vị cho các gia đình bận rộn, những người đam mê nấu ăn và tất cả mọi người.
            </p>
            <p>
              Từ một nhóm nhỏ những đầu bếp và người yêu ẩm thực đầy đam mê, chúng tôi đã phát triển thành một cộng đồng 
              hơn 100.000 khách hàng hài lòng tin tưởng chúng tôi giao nguyên liệu tươi ngon và những công thức tuyệt vời 
              tận nhà.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Giá trị của chúng tôi</h2>
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
          <h2>Gặp gỡ đội ngũ của chúng tôi</h2>
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
          <h2>Con số ấn tượng</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100K+</div>
              <div className="stat-text">Khách hàng hài lòng</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-text">Công thức đã tạo</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-text">Trang trại đối tác</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8★</div>
              <div className="stat-text">Đánh giá trung bình</div>
            </div>
          </div>
        </div>

        <div className="mission-section">
          <h2>Sứ mệnh của chúng tôi</h2>
          <p className="mission-text">
            Truyền cảm hứng và trao quyền cho mọi người nấu những bữa ăn ngon miệng, lành mạnh tại nhà 
            bằng cách cung cấp nguyên liệu tươi ngon, công thức từ đầu bếp chuyên nghiệp và sự tự tin để 
            tạo ra những món ăn tuyệt vời trong chính căn bếp của họ. Chúng tôi tin rằng nấu ăn nên là 
            niềm vui, dễ tiếp cận và kết nối mọi người xung quanh bàn ăn.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

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
      title: 'Đặt hàng tiện lợi',
      description: 'Giao diện trực quan với bộ lọc chi tiết, mức đánh giá chất lượng từng sản phẩm, và cho phép tùy chỉnh khung giờ giao hàng linh hoạt',
      icon: '📱'
    },
    {
      title: 'Tiết kiệm thời gian',
      description: 'Hoàn thiện bữa ăn nhanh gọn, hỗ trợ đặt hàng trước cho cả tuần/tháng và giao hàng nhanh sau khi đặt',
      icon: '⏰'
    },
    {
      title: 'Tối ưu hóa chi phí',
      description: 'Mức giá tiết kiệm hơn so với món chế biến sẵn, tối ưu hóa chi phí vận chuyển nhờ liên kết đối tác cố định',
      icon: '💰'
    },
    {
      title: 'Đảm bảo dinh dưỡng cá nhân hóa và chính xác',
      description: 'Đa dạng chế độ ăn chuyên biệt với chỉ số dinh dưỡng rõ ràng',
      icon: '🥗'
    }
  ];

  return (
    <section className="about" id="about">
      {/* Banner Image */}
      <div className="about-banner">
        <img 
          src="/gioi-thieu-banner.png" 
          alt="Giới thiệu PrepJoy" 
          className="banner-image"
        />
      </div>

      <div>
        <br/>
        <br/>
      </div>
      
      <div className="container">
        <div className="about-hero">
          <h1>Tầm nhìn </h1>
          <p className="about-subtitle">
          Chúng tôi mong muốn trở thành nền tảng hàng đầu tại Việt Nam về các sản phẩm đồ ăn sơ chế sẵn lành mạnh, mang đến giá trị vượt trội cho người tiêu dùng.
          </p>
        </div>

        <div className="about-story">
          <h2>Sứ mệnh</h2>
          <div className="story-content">
            <p>
            PrepJoy cam kết giúp khách hàng nấu ăn dễ dàng, nhanh chóng nhưng vẫn đáp ứng nhu cầu dinh dưỡng chuyên biệt phù hợp với từng mục tiêu sức khỏe.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Giá trị cốt lõi</h2>
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

        <div className="mission-section">
          <h2>Câu chuyện thành lập</h2>
          <p className="mission-text">
            PrepJoy bắt đầu từ một câu hỏi rất đời thường<br />
            <strong>"Tại sao nấu ăn lại phải mất quá nhiều thời gian, trong khi ai cũng đang bận rộn với cuộc sống của họ?"</strong>
          </p>

          <p>
            Người sáng lập PrepJoy từng là một nhân viên văn phòng bận rộn, ngày nào cũng quay cuồng giữa công việc, cuộc sống và những bữa ăn vội vàng. Việc gọi đồ ăn ngoài vừa tốn kém, vừa thiếu kiểm soát về dinh dưỡng. Còn nấu ăn ở nhà thì lại mất công đi chợ, sơ chế, dọn dẹp. Quá nhiều bước khiến việc nấu nướng trở thành gánh nặng thay vì niềm vui.
          </p>

          <p>
            Từ chính nhu cầu thực tế đó, ý tưởng về một dịch vụ đặt đồ ăn thông minh với nguyên liệu tươi ngon đã được chuẩn bị sẵn cùng hướng dẫn nấu ăn dễ hiểu ra đời. Mục tiêu không chỉ là giúp mọi người tiết kiệm thời gian, công sức và đảm bảo chế độ ăn uống mà còn giữ lại niềm vui tự tay nấu ăn và nâng cao sức khỏe của bản thân.
          </p>

          <p>
            Sau hàng trăm giờ thử nghiệm công thức, làm việc với các đầu bếp, chuyên gia dinh dưỡng và chọn lọc các đơn vị cung cấp nguyên liệu uy tín trên thị trường, PrepJoy chính thức ra đời.
          </p>

          <p className="mission-text">
            <strong>Chúng tôi tin rằng: Mỗi người đều xứng đáng có những bữa ăn ngon – dù bận rộn đến đâu. Và hành trình đó bắt đầu từ chính căn bếp của bạn, với sự đồng hành của PrepJoy.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

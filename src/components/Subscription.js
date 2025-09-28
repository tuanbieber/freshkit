import React, { useState } from 'react';
import './Subscription.css';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanClick = (planId) => {
    setSelectedPlan(planId);
    // You can add additional logic here, like opening a modal or redirecting
    console.log(`Selected plan: ${planId}`);
    
    // Add a small haptic feedback effect (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  const plans = [
    {
      id: 'free',
      name: 'Free',
      subtitle: 'For one person',
      description: 'Bắt đầu hành trình ăn uống lành mạnh với các công cụ cơ bản. Không phí, chỉ cần sáng tạo.',
      price: '0',
      currency: '₫',
      period: '/year for one person',
      buttonText: 'Bắt đầu',
      buttonClass: 'btn-free',
      headerClass: 'header-free',
      features: [
        'Công cụ lập kế hoạch bữa ăn cơ bản',
        '50+ công thức nấu ăn miễn phí',
        'Gợi ý thực đơn hàng tuần',
        'Theo dõi dinh dưỡng cơ bản',
        'Tạo danh sách mua sắm',
        'Hỗ trợ cộng đồng',
        'Truy cập ứng dụng di động',
        '2GB lưu trữ'
      ]
    },
    {
      id: 'pro',
      name: 'Premium',
      subtitle: 'For one person',
      description: 'Mở khóa các tính năng cao cấp, cá nhân hóa trải nghiệm và hướng dẫn dinh dưỡng chuyên nghiệp.',
      price: '1,200,000',
      currency: '₫',
      period: '/year for one person',
      buttonText: 'Dùng thử miễn phí',
      buttonClass: 'btn-pro',
      headerClass: 'header-pro',
      isPopular: false,
      features: [
        'Tất cả tính năng Free, cộng thêm:',
        'Cung cấp voucher giảm giá trực tiếp trên giá box, phí vận chuyển',
        'Cá nhân hóa trải nghiệm người dùng: gợi ý thực đơn các bữa ăn trong tuần',
        'Tải các video hướng dẫn nấu ăn ngoại tuyến trên app',
        '500+ công thức cao cấp',
        'Kế hoạch bữa ăn cá nhân hóa',
        'Theo dõi dinh dưỡng nâng cao',
        'Gợi ý thông minh bằng AI',
        'Hỗ trợ khách hàng ưu tiên',
        'Lưu trữ không giới hạn',
        'Xuất kế hoạch bữa ăn',
        'Chia sẻ gia đình (tối đa 4 người)',
        'Lớp học nấu ăn độc quyền',
        'Tùy chỉnh chế độ ăn uống',
        'Phân tích nâng cao'
      ]
    }
  ];

  return (
    <div className="subscription-page">
      <div className="container">
        <div className="subscription-header">
          <h1>Chọn Gói Của Bạn</h1>
          <p>Bắt đầu hành trình ăn uống lành mạnh với FreshKit. Hủy bất cứ lúc nào.</p>
          <p className="selection-hint">💡 Nhấp vào bất kỳ gói nào để chọn</p>
        </div>
        
        <div className="subscription-plans">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`subscription-card ${plan.isPopular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => handlePlanClick(plan.id)}
            >
              <div className={`card-header ${plan.headerClass}`}>
                <div className="plan-badge">
                  <span className="badge-text">{plan.subtitle}</span>
                  {plan.isPopular && <span className="crown">👑</span>}
                </div>
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <span className="currency">{plan.currency}</span>
                  <span className="price">{plan.price}</span>
                </div>
                <p className="plan-period">{plan.period}</p>
                <button 
                  className={`plan-button ${plan.buttonClass}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanClick(plan.id);
                  }}
                >
                  {plan.buttonText}
                </button>
                {plan.id === 'pro' && (
                  <p className="payment-note">Thanh toán một lần</p>
                )}
              </div>
              
              <div className="card-features">
                <h3 className="features-title">Tính năng bạn sẽ yêu thích:</h3>
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="subscription-footer">
          <p>Tất cả gói đều bao gồm bảo đảm hoàn tiền trong 30 ngày</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

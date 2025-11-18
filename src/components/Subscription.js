import React, { useState, useEffect } from 'react';
import './Subscription.css';
import storageService from '../services/storage';
import LoginModal from './LoginModal';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userSubscription, setUserSubscription] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to refresh subscription status
  const refreshSubscriptionStatus = () => {
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      // Get all subscriptions and find the user's active subscription
      const allSubscriptions = storageService.getSubscriptions();
      const activeSubscription = allSubscriptions.find(
        sub => sub.userId === user.id && sub.status === 'active'
      );
      setUserSubscription(activeSubscription);
    } else {
      setUserSubscription(null);
    }
  };

  // Check for existing subscription on component mount and when user changes
  useEffect(() => {
    refreshSubscriptionStatus();

    // Listen for storage changes (e.g., login/logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'freshkit_session' || e.key === 'freshkit_subscriptions') {
        refreshSubscriptionStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handlePlanClick = (planId) => {
    const plan = plans.find(p => p.id === planId);
    setSelectedPlan(planId);
    setSelectedPlanData(plan);
    setShowPopup(true);
    
    // Add a small haptic feedback effect (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleConfirmSubscription = () => {
    // Check if user is logged in
    const currentUser = storageService.getCurrentUser();
    
    if (!currentUser) {
      // User not logged in, show login modal
      setShowPopup(false);
      setShowLoginModal(true);
      return;
    }

    if (selectedPlanData) {
      // Save subscription to storage
      const subscriptionData = {
        planId: selectedPlanData.id,
        planName: selectedPlanData.name,
        price: selectedPlanData.price,
        currency: selectedPlanData.currency,
        period: selectedPlanData.period,
        features: selectedPlanData.features,
        userId: currentUser.id,
        subscribedAt: new Date().toISOString()
      };

      const savedSubscription = storageService.addSubscription(subscriptionData);
      console.log('Subscription saved:', savedSubscription);
      
      // Close popup and show success
      setShowPopup(false);
      setSuccessMessage(`Đã đăng ký gói ${selectedPlanData.name} thành công!`);
      setShowSuccess(true);
      
      // Auto hide success message after 4 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      
      // Update user subscription state
      setUserSubscription(savedSubscription);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPlanData(null);
  };

  const handleLoginSuccess = () => {
    // Close login modal
    setShowLoginModal(false);
    
    // Refresh subscription status after login
    refreshSubscriptionStatus();
    
    // After successful login, automatically proceed with subscription if we have selected plan data
    if (selectedPlanData) {
      const currentUser = storageService.getCurrentUser();
      
      if (currentUser) {
        const subscriptionData = {
          planId: selectedPlanData.id,
          planName: selectedPlanData.name,
          price: selectedPlanData.price,
          currency: selectedPlanData.currency,
          period: selectedPlanData.period,
          features: selectedPlanData.features,
          userId: currentUser.id,
          subscribedAt: new Date().toISOString()
        };

        const savedSubscription = storageService.addSubscription(subscriptionData);
        console.log('Subscription saved after login:', savedSubscription);
        
        // Show success message
        setSuccessMessage(`Đã đăng ký gói ${selectedPlanData.name} thành công!`);
        setShowSuccess(true);
        
        // Auto hide success message after 4 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
        
        // Clear selected plan data
        setSelectedPlanData(null);
        setSelectedPlan(null);
        
        // Refresh subscription status
        refreshSubscriptionStatus();
      }
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  const plans = [
    {
      id: 'free',
      name: 'Free',
      subtitle: 'For one person',
      description: 'Bắt đầu hành trình ăn uống lành mạnh với các công cụ cơ bản. Không phí, chỉ cần sáng tạo.',
      price: '0',
      currency: 'đ',
      period: '/năm',
      buttonText: 'Bắt đầu',
      buttonClass: 'btn-free',
      headerClass: 'header-free',
      features: [
        'Bộ lọc thông tin tiện lợi trong quá trình tìm kiếm món ăn',
        'Tính năng theo dõi dinh dưỡng cơ bản từ chế độ ăn',
        'Công thức nấu ăn tích hợp trực tuyến thông qua mã QR trên bao bì',
        'Chính sách giao hàng tiêu chuẩn với chi phí tiết kiệm thông qua đơn vị vận chuyển đối tác',
        'Theo dõi trạng thái đơn hàng tích hợp trong cùng ứng dụng',
        'Chia sẻ, tương tác với cộng đồng người dùng có cùng sở thích'
      ]
    },
    {
      id: 'pro',
      name: 'PrepJoy Member',
      subtitle: 'For one person',
      description: 'Mở khóa các tính năng cao cấp, cá nhân hóa trải nghiệm và hướng dẫn dinh dưỡng chuyên nghiệp.',
      price: '39,000',
      currency: 'đ',
      period: '/tháng',
      buttonText: 'Dùng thử miễn phí',
      buttonClass: 'btn-pro',
      headerClass: 'header-pro',
      isPopular: false,
      features: [
        'Tất cả tính năng Free, cộng thêm:',
        'Chiết khấu sâu & Quà tặng đặc biệt cho Đơn hàng Lớn',
        'Nhận ngay voucher giảm giá trực tiếp lên đến 20% khi bạn đặt các đơn hàng có giá trị từ 290.000 VNĐ trở lên',
        'PrepJoy Member còn được tặng kèm các món quà nhỏ theo mùa với đơn hàng số lượng lớn',
        'Ưu đãi Sinh nhật Tri ân Đặc biệt - mã giảm giá cộng dồn 5%',
        'Miễn phí Giao hàng Tận nơi trong bán kính 5km',
        'Miễn phí vận chuyển hoàn toàn đối với các đơn hàng từ 149.000 VNĐ trong bán kính 15km',
        'Shipping Voucher giảm 30% (tối đa 25.000 VNĐ) cho phạm vi vượt quá 15km',
        'Gợi Ý Thực Đơn Tối Ưu dựa trên lịch sử mua hàng và thông tin cá nhân',
        'Video Hướng Dẫn Nấu Ăn Ngoại Tuyến có thể tải về và xem không cần internet'
      ]
    }
  ];

  return (
    <div className="subscription-page">
      <div className="subscription-banner">
        <img src="/member-banner.png" alt="Member Banner" />
      </div>
      <div className="container">
        <div> <br/> </div>

        <div className="subscription-header">
          <h1>Chọn Gói Của Bạn</h1>
          <p>Bắt đầu hành trình ăn uống lành mạnh với FreshKit. Hủy bất cứ lúc nào.</p>
          <p className="selection-hint">💡 Nhấp vào bất kỳ gói nào để chọn</p>
        </div>
        
        <div className="subscription-plans">
          {plans.map((plan) => {
            const isCurrentPlan = userSubscription && userSubscription.planId === plan.id;
            const isDisabled = userSubscription && userSubscription.planId !== plan.id;
            
            return (
              <div 
                key={plan.id} 
                className={`subscription-card ${plan.isPopular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''} ${isCurrentPlan ? 'current-plan' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isCurrentPlan && handlePlanClick(plan.id)}
              >
              <div className={`card-header ${plan.headerClass}`}>
                <div className="plan-badge">
                  <span className="badge-text">{plan.subtitle}</span>
                  {plan.isPopular && <span className="crown">👑</span>}
                  {isCurrentPlan && <span className="current-badge">✓ Đang sử dụng</span>}
                </div>
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="currency">{plan.currency}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <button 
                  className={`plan-button ${plan.buttonClass} ${isCurrentPlan ? 'current-plan-btn' : ''} ${isDisabled ? 'disabled-btn' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCurrentPlan) {
                      handlePlanClick(plan.id);
                    }
                  }}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Đang sử dụng' : isDisabled ? 'Nâng cấp' : plan.buttonText}
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
            );
          })}
        </div>
      </div>

      {/* Subscription Confirmation Popup */}
      {showPopup && selectedPlanData && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Xác nhận đăng ký</h2>
              <button className="popup-close" onClick={handleClosePopup}>×</button>
            </div>
            
            <div className="popup-content">
              <div className="selected-plan-info">
                <h3>{selectedPlanData.name}</h3>
                <p className="plan-price-popup">
                  <span className="price">{selectedPlanData.price}</span>
                  <span className="currency">{selectedPlanData.currency}</span>
                  <span className="period">{selectedPlanData.period}</span>
                </p>
                <p className="plan-description">{selectedPlanData.description}</p>
              </div>
              
              <div className="popup-features">
                <h4>Tính năng bao gồm:</h4>
                <ul>
                  {selectedPlanData.features.slice(0, 5).map((feature, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                  {selectedPlanData.features.length > 5 && (
                    <li className="more-features">
                      Và {selectedPlanData.features.length - 5} tính năng khác...
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="popup-actions">
              <button className="btn-cancel" onClick={handleClosePopup}>
                Hủy
              </button>
              <button className="btn-confirm" onClick={handleConfirmSubscription}>
                Xác nhận đăng ký
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
            </div>
            <h3 className="success-title">Thành công! 🎉</h3>
            <p className="success-message">{successMessage}</p>
            <div className="success-details">
              <div className="success-badge">
                <span className="badge-icon">✓</span>
                <span>Gói đã được kích hoạt</span>
              </div>
              <div className="success-badge">
                <span className="badge-icon">📧</span>
                <span>Email xác nhận đã được gửi</span>
              </div>
            </div>
            <button 
              className="success-close-btn"
              onClick={() => setShowSuccess(false)}
            >
              Tuyệt vời!
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseLoginModal}
          onLogin={handleLoginSuccess}
        />
      )}

    </div>
  );
};

export default Subscription;

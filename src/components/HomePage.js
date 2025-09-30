import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(null);
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setIsFaqOpen(isFaqOpen === index ? null : index);
  };

  const handleSignUpClick = () => {
    navigate('/goi-dang-ky');
  };

  const stats = [
    // {
    //   number: '92221%',
    //   text: 'of our customers feel healthier with a FreshKit subscription'
    // },
    // {
    //   number: '93%',
    //   text: 'of our customers feel less stressed at dinner time'
    // },
    // {
    //   number: '98%',
    //   text: 'of our customers save time on meals'
    // }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Bước 1: Chọn bữa ăn của bạn',
      description: 'Duyệt và lựa chọn từ hơn 100 công thức nấu ăn do đầu bếp',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      video: null
    },
    {
      number: 2,
      title: 'Tiến hành đặt hàng',
      description: 'Nguyên liệu tươi ngon, được chia theo khẩu phần và công thức nấu ăn từng bước sẽ được PrepJoy chuẩn bị và giao đến bạn.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
      video: null
    },
    {
      number: 3,
      title: 'Trổ tài cùng PrepJoy',
      description: 'Làm theo hướng dẫn từ bộ công thức, đăng tải hình ảnh thành quả tại <strong>PrepJoy Home Chef</strong> và thưởng thức những bữa ăn ngon do chính tay mình làm ra.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      video: null
    }
  ];

  const mealPlans = [
    {
      title: 'Eat Clean',
      subtitle: 'Ghi gì vào đây',
      icon: '🥩',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Flexitarian',
      subtitle: 'Ghi gì vào đây',
      icon: '🥬',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Low Fat, Low Carb',
      subtitle: 'Ghi gì vào đây',
      icon: '👨‍👩‍👧‍👦',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Keto',
      subtitle: 'Ghi gì vào đây',
      icon: '💪',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&crop=center'
    },
  ];

  const benefits = [
    {
      title: 'Quỳnh Nhi',
      description: 'PrepJoy đã giúp mình tiết kiệm được rất nhiều thời gian khi nấu ăn.'
    },
    {
      title: 'Đan Trâm',
      description: 'Siêu dễ nấu luôn! Bé nhà mình rất thích!'
    },
    {
      title: 'Tường Vi',
      description: 'Từ ngày có PrepJoy, mình siêng nấu ăn hẳn!'
    },
    {
      title: 'Dũng Nguyễn',
      description: 'Hướng dẫn nấu ăn rất chi tiết. Nhờ có PrepJoy mà mình đã ghi điểm với cô ấy.'
    },
    {
      title: 'Diệp Huỳnh',
      description: 'Mình rất thích!'
    }
  ];

  const faqItems = [
    {
      question: 'How does FreshKit\'s meal kit delivery service work?',
      answer: 'FreshKit\'s meal delivery service simplifies meal planning by bringing pre-portioned ingredients and step-by-step recipes to your door. You can set preferences for different diets—from carnivores to calorie-conscious—and choose from 60+ weekly chef-designed recipes. With meal kits delivered on your chosen day, enjoying home-cooked meals is easier than ever. Plus, you have flexibility to skip weeks or cancel anytime as your needs change.'
    },
    {
      question: 'Does FreshKit offer meal delivery options for special diets?',
      answer: 'FreshKit\'s meal delivery service provides a variety of plans designed to meet different dietary preferences and lifestyles. Whether you\'re looking for vegetarian or vegan options with the Veggie plan, calorie-conscious meals under 650 calories with the Fit & Wholesome plan, or seafood-focused recipes with the Pescatarian plan, FreshKit has you covered. In addition, you can find gluten-free and keto options within these plans and across our rotating menu. With FreshKit, you can enjoy a convenient meal delivery service tailored to your specific dietary needs.'
    },
    {
      question: 'How many times a week does FreshKit deliver meal kits?',
      answer: 'Once a week. You can expect your meal kit delivery to arrive between 8 am to 8 pm. We deliver anywhere in the United States, except Alaska and Hawaii.'
    },
    {
      question: 'Does FreshKit give nutrition & calorie information?',
      answer: 'Absolutely! We guarantee that every single one of our meal kits is appropriately labeled. They have all the nutritional facts you\'re looking for like calorie content and the amount of carbohydrates, protein, dietary fiber, sugar, sodium, unsaturated and saturated fat, and cholesterol.'
    },
    {
      question: 'How do I recycle my FreshKit meal boxes?',
      answer: 'You can fold your box and place it with your curbside recyclables, take it to your local recycling center, or even compost it. Explore the recycling and packaging page for more details on how to recycle the FreshKit meal kit box and its contents.'
    },
    {
      question: 'Why should I choose FreshKit as my meal kit delivery service?',
      answer: 'FreshKit is America\'s #1 meal kit, offering the widest variety of recipes to over a million customers around the country. We have the most five-star recipes and the most five-star reviews among meal kit delivery services according to Trustpilot. FreshKit was also recognized as having America\'s Best Customer Service among meal kit companies by Newsweek in its "America\'s Best Customer Service 2020 and 2022" articles. It has also been named the #1 meal kit by USA Today in its "Readers\' Choice Awards" six years running. Beyond the awards and accolades, FreshKit\'s meal service supports healthier and more sustainable lifestyles.'
    },
    {
      question: 'Do FreshKit meal kits support a healthy lifestyle?',
      answer: 'Yes. FreshKit offers a wide array of flavorful and nutritious meal kit menu options that cater to a range of dietary needs, including vegetarian, pescatarian, Calorie Smart, Carb Smart and more! By featuring crisp, seasonal vegetables and other fresh produce, we make sure your meal kits are packed with the freshest local ingredients.'
    },
    {
      question: 'Can I skip a week of meal kit delivery?',
      answer: 'Yes. With our meal kit subscription service, you are always in control. If you don\'t want to receive a meal kit on a particular week, you don\'t have to. To avoid charges when skipping a week, you simply need to "pause" your meal kit order or cancel your meal delivery subscription after logging into your account. Pausing or canceling your meal delivery service should be done by 11:59 pm PST, five days before your next delivery schedule. Note that you will be charged on all orders that you failed to cancel before the cut-off date.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="/banner.jpg" 
            alt="Fresh ingredients and cooking" 
            className="hero-image"
            onLoad={() => console.log('Hero image loaded successfully')}
            onError={(e) => {
              console.log('Hero image failed to load, using fallback');
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            }}
          />
          <div className="hero-overlay"></div>
          <div className="hero-clickable-zone" onClick={handleSignUpClick}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2>“PrepJoy – Giải pháp bữa ăn thông minh cho cuộc sống bận rộn”</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-text">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="container">
          <h2>“Bữa ăn dinh dưỡng với 3 bước đơn giản cùng PrepJoy”</h2>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="step">
                <div className="step-image-container">
                  {step.video ? (
                    <iframe
                      src={step.video}
                      className="step-video"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Step ${step.number} video`}
                    ></iframe>
                  ) : (
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="step-image"
                      onLoad={() => console.log(`Step ${step.number} image loaded`)}
                      onError={(e) => {
                        console.log(`Step ${step.number} image failed to load`);
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                      }}
                    />
                  )}
                  <div className="step-number-overlay">{step.number}</div>
                </div>
                <h3>{step.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: step.description }}></p>
              </div>
            ))}
          </div>
          <div className="process-cta">
            <button className="cta-button" onClick={() => navigate('/goi-dang-ky')}>Đăng ký ngay!</button>
          </div>
        </div>
      </section>

      {/* Meal Plans Section */}
      <section className="meal-plans">
        <div className="container">
          <h2>Một số món ăn nổi bật của các chế độ ăn</h2>
          <p className="meal-plans-subtitle">Hơn 100 công thức dinh dưỡng</p>
          <div className="plans-grid">
            {mealPlans.map((plan, index) => (
              <div key={index} className="plan-card">
                <div className="plan-image-container">
                  <img 
                    src={plan.image} 
                    alt={plan.title}
                    className="plan-image"
                  />
                  <div className="plan-icon-overlay">{plan.icon}</div>
                </div>
                <h3>{plan.title}</h3>
                <p>{plan.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="plans-cta">
            <button className="cta-button" onClick={() => navigate('/thuc-don')}>Xem công thức ngay!</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2>Hơn 10.000 khách hàng đã lựa chọn PrepJoy</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="benefits-cta">
            <button className="cta-button" onClick={() => navigate('/cong-dong')}>Tham gia cộng đồng PrepJoy Home Chef ngay!</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="cta-section">
        <div className="container">
          <h2>Why millions love FreshKit</h2>
          <h2 className="cta-main">COOK BETTER.<br />EAT WELL.<br />FEEL GREAT.</h2>
          <p>Enjoy up to 10 Free Meals + a Free Cut of the Week* with food delivery from FreshKit!</p>
          <button className="cta-button">See Pricing & Plans</button>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="faq-section">
        <div className="container">
          <h2>More questions about our meal delivery services?</h2>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {item.question}
                  <span className="faq-icon">{isFaqOpen === index ? '−' : '+'}</span>
                </button>
                {isFaqOpen === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      {/* <section className="newsletter">
        <div className="container">
          <h2>Not hungry yet?</h2>
          <p>Get special offers, meals, and news when you subscribe to our newsletter.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email" />
            <button className="newsletter-btn">Sign up</button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;

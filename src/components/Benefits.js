import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      title: 'Eat fresh, feel good',
      description: 'Meal kits with portioned, seasonal ingredients mean less waste and more flavor.'
    },
    {
      title: 'Cook with confidence',
      description: 'Step-by-step recipes make dinner feel doable, no matter your skill level.'
    },
    {
      title: 'Healthier made easier',
      description: 'Choose from Calorie Smart, Protein Smart, and veggie-packed meals that support your goals.'
    }
  ];

  return (
    <section className="benefits">
      <div className="container">
        <h2>Dinner should always be this easy and delicious.</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="benefits-cta">
          <button className="cta-button">See Pricing & Plans</button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

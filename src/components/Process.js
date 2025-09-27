import React from 'react';
import './Process.css';

const Process = () => {
  const steps = [
    {
      number: 1,
      title: 'Pick your meals',
      description: 'Browse and choose from 100+ chef-curated recipes and market add-ons from our food subscription each week.'
    },
    {
      number: 2,
      title: 'Ingredients arrive fresh',
      description: 'Fresh, portioned ingredients and step-by-step recipes are delivered right to your door in a convenient meal box.'
    },
    {
      number: 3,
      title: 'Cook with confidence',
      description: 'Follow simple instructions and enjoy delicious, home-cooked meals, without the stress.'
    }
  ];

  return (
    <section className="process">
      <div className="container">
        <h2>Dinner's easy as 1, 2, 3</h2>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <div className="process-cta">
          <button className="cta-button">See Pricing & Plans</button>
        </div>
      </div>
    </section>
  );
};

export default Process;

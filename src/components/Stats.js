import React from 'react';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      number: '91%',
      text: 'of our customers feel healthier with a FreshKit subscription'
    },
    {
      number: '93%',
      text: 'of our customers feel less stressed at dinner time'
    },
    {
      number: '98%',
      text: 'of our customers save time on meals'
    }
  ];

  return (
    <section className="stats">
      <div className="container">
        <h2>Whatever your week looks like,<br />dinner's covered.</h2>
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
  );
};

export default Stats;

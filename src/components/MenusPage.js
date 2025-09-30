import React, { useState } from 'react';
import './MenusPage.css';

const MenusPage = () => {
  const [selectedBadge, setSelectedBadge] = useState('Tất cả');
  const [selectedDiet, setSelectedDiet] = useState('Tất cả chế độ ăn');
  const [selectedCalories, setSelectedCalories] = useState('Tất cả calo');
  const [selectedPrice, setSelectedPrice] = useState('Tất cả giá');
  const [selectedTime, setSelectedTime] = useState('Tất cả thời gian');

  const badgeFilters = [
    'Tất cả',
    'Được yêu thích',
    'Giá tốt',
    'Bán chạy',
    'Nhanh gọn'
  ];

  const dietFilters = [
    'Tất cả chế độ ăn',
    'Ăn chay',
    'Keto',
    'Eat Clean',
    'Flexitarian',
    'Low Fat',
    'Low Carb'
  ];

  const calorieRanges = [
    'Tất cả calo',
    'Dưới 400 calo',
    '400 - 500 calo',
    '500 - 600 calo',
    '600 - 700 calo'
  ];

  const priceRanges = [
    'Tất cả giá',
    '30.000 - 50.000',
    '50.000 - 100.000',
    '100.000 - 200.000',
    'Trên 200.000'
  ];

  const timeRanges = [
    'Tất cả thời gian',
    '15-20p',
    '20-30p'
  ];

  const recipes = [
    {
      id: 1,
      name: 'Salad cá hồi sốt chanh dây',
      category: 'GLOBAL FEAST',
      description: 'Fresh salmon salad with passion fruit dressing',
      time: '15 min',
      timeMinutes: 15,
      calories: 420,
      price: 120000,
      diet: ['Eat Clean', 'Flexitarian'],
      tags: ['Salad', 'Seafood', 'Fresh', 'Healthy'],
      image: '🥗',
      badges: ['Được yêu thích']
    },
    {
      id: 2,
      name: 'Mì gà xá xíu',
      category: 'GLOBAL FEAST',
      description: 'Noodles with char siu chicken',
      time: '30 min',
      timeMinutes: 30,
      calories: 560,
      price: 55000,
      diet: ['Flexitarian'],
      tags: ['Noodles', 'Chicken', 'Comfort Food'],
      image: '🍜',
      badges: ['Bán chạy']
    },
    {
      id: 3,
      name: 'Cải thảo cuộn gà chay',
      category: 'GLOBAL FEAST',
      description: 'Cabbage rolls with vegetarian chicken',
      time: '20 min',
      timeMinutes: 20,
      calories: 280,
      price: 30000,
      diet: ['Ăn chay', 'Low Fat', 'Low Carb'],
      tags: ['Vegetarian', 'Healthy', 'Low Calorie'],
      image: '🥬',
      badges: ['Giá tốt', 'Nhanh gọn']
    },
    {
      id: 4,
      name: 'Cá nướng sả, bún rau củ',
      category: 'GLOBAL FEAST',
      description: 'Grilled fish with lemongrass, served with vegetable noodles',
      time: '25 min',
      timeMinutes: 25,
      calories: 350,
      price: 60000,
      diet: ['Eat Clean', 'Low Fat'],
      tags: ['Grilled', 'Seafood', 'Healthy'],
      image: '🐟',
      badges: ['Bán chạy']
    },
    {
      id: 5,
      name: 'Hủ tiếu cá lóc',
      category: 'GLOBAL FEAST',
      description: 'Noodle soup with snakehead fish',
      time: '30 min',
      timeMinutes: 30,
      calories: 550,
      price: 60000,
      diet: ['Flexitarian'],
      tags: ['Soup', 'Seafood', 'Noodles'],
      image: '🍲'
    },
    {
      id: 6,
      name: 'Ức gà xào rau củ',
      category: 'GLOBAL FEAST',
      description: 'Stir-fried chicken breast with vegetables',
      time: '15 min',
      timeMinutes: 15,
      calories: 300,
      price: 40000,
      diet: ['Low Fat', 'Eat Clean'],
      tags: ['Chicken', 'Stir-fry', 'Healthy'],
      image: '🍗',
      badges: ['Nhanh gọn']
    },
    {
      id: 7,
      name: 'Salad bò sốt tiêu',
      category: 'GLOBAL FEAST',
      description: 'Beef salad with pepper sauce',
      time: '20 min',
      timeMinutes: 20,
      calories: 350,
      price: 90000,
      diet: ['Keto', 'Low Carb', 'Flexitarian'],
      tags: ['Salad', 'Beef', 'Low Carb'],
      image: '🥩'
    },
    {
      id: 8,
      name: 'Đùi gà nướng sốt mù tạt',
      category: 'GLOBAL FEAST',
      description: 'Grilled chicken thigh with mustard sauce',
      time: '25 min',
      timeMinutes: 25,
      calories: 330,
      price: 40000,
      diet: ['Flexitarian', 'Low Carb'],
      tags: ['Grilled', 'Chicken', 'Low Carb'],
      image: '🍗'
    },
    {
      id: 9,
      name: 'Cá đối nướng muối hồng',
      category: 'GLOBAL FEAST',
      description: 'Grilled mullet with pink salt',
      time: '30 min',
      timeMinutes: 30,
      calories: 230,
      price: 70000,
      diet: ['Keto', 'Low Fat', 'Eat Clean'],
      tags: ['Grilled', 'Seafood', 'Low Calorie'],
      image: '🐟'
    },
    {
      id: 10,
      name: 'Đậu hũ bò băm sốt nấm',
      category: 'GLOBAL FEAST',
      description: 'Tofu with minced beef and mushroom sauce',
      time: '20 min',
      timeMinutes: 20,
      calories: 300,
      price: 85000,
      diet: ['Low Carb'],
      tags: ['Tofu', 'Beef', 'Mushroom'],
      image: '🍄'
    },
    {
      id: 11,
      name: 'Cơm cà ri chay',
      category: 'GLOBAL FEAST',
      description: 'Vegetarian curry rice',
      time: '15 min',
      timeMinutes: 15,
      calories: 400,
      price: 30000,
      diet: ['Ăn chay', 'Flexitarian'],
      tags: ['Vegetarian', 'Curry', 'Rice'],
      image: '🍛'
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    // Badge filter
    if (selectedBadge !== 'Tất cả' && !recipe.badges?.includes(selectedBadge)) {
      return false;
    }

    // Diet filter
    if (selectedDiet !== 'Tất cả chế độ ăn') {
      const dietKey = selectedDiet.toLowerCase().replace('-', '');
      if (!recipe.diet?.some(d => d.toLowerCase().replace('-', '') === dietKey)) {
        return false;
      }
    }

    // Calorie filter
    if (selectedCalories !== 'Tất cả calo') {
      const calories = recipe.calories || 0;
      if (selectedCalories === 'Dưới 400 calo' && calories >= 400) return false;
      if (selectedCalories === '400 - 500 calo' && (calories < 400 || calories > 500)) return false;
      if (selectedCalories === '500 - 600 calo' && (calories < 500 || calories > 600)) return false;
      if (selectedCalories === '600 - 700 calo' && (calories < 600 || calories > 700)) return false;
    }

    // Price filter
    if (selectedPrice !== 'Tất cả giá') {
      const price = recipe.price || 0;
      if (selectedPrice === '30.000 - 50.000' && (price < 30000 || price > 50000)) return false;
      if (selectedPrice === '50.000 - 100.000' && (price < 50000 || price > 100000)) return false;
      if (selectedPrice === '100.000 - 200.000' && (price < 100000 || price > 200000)) return false;
      if (selectedPrice === 'Trên 200.000' && price <= 200000) return false;
    }

    // Time filter
    if (selectedTime !== 'Tất cả thời gian') {
      const timeMinutes = recipe.timeMinutes || 0;
      if (selectedTime === '15-20p' && (timeMinutes < 15 || timeMinutes > 20)) return false;
      if (selectedTime === '20-30p' && (timeMinutes < 20 || timeMinutes > 30)) return false;
    }

    return true;
  });

  return (
    <div className="menus-page">
      <div className="container">

        {/* Advanced Filters */}
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Danh hiệu</label>
              <select 
                value={selectedBadge} 
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="filter-select"
              >
                {badgeFilters.map((badge, index) => (
                  <option key={index} value={badge}>{badge}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Nhu cầu dinh dưỡng</label>
              <select 
                value={selectedDiet} 
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="filter-select"
              >
                {dietFilters.map((diet, index) => (
                  <option key={index} value={diet}>{diet}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Lượng calo</label>
              <select 
                value={selectedCalories} 
                onChange={(e) => setSelectedCalories(e.target.value)}
                className="filter-select"
              >
                {calorieRanges.map((calorie, index) => (
                  <option key={index} value={calorie}>{calorie}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Mức giá</label>
              <select 
                value={selectedPrice} 
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="filter-select"
              >
                {priceRanges.map((price, index) => (
                  <option key={index} value={price}>{price}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Thời gian nấu</label>
              <select 
                value={selectedTime} 
                onChange={(e) => setSelectedTime(e.target.value)}
                className="filter-select"
              >
                {timeRanges.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image">
                <span className="recipe-emoji">{recipe.image}</span>
                {recipe.badges && recipe.badges.length > 0 && (
                  <div className="recipe-badges">
                    {recipe.badges.map((badge, index) => (
                      <span key={index} className="badge">{badge}</span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="recipe-content">
                <h3 className="recipe-name">{recipe.name}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta">
                  <div className="meta-row">
                    <span className="cooking-time">⏱️ {recipe.time}</span>
                    <span className="calories">🔥 {recipe.calories} calo</span>
                  </div>
                  <div className="meta-row">
                    <span className="price">💰 {recipe.price?.toLocaleString('vi-VN')}đ</span>
                    {recipe.diet && recipe.diet.length > 0 && (
                      <span className="diet-tags">
                        {recipe.diet.map((diet, index) => (
                          <span key={index} className="diet-tag">{diet}</span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
                
                {recipe.tags.length > 0 && (
                  <div className="recipe-tags">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenusPage;

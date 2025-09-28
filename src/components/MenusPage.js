import React, { useState } from 'react';
import './MenusPage.css';

const MenusPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [selectedDiet, setSelectedDiet] = useState('Tất cả chế độ ăn');
  const [selectedCalories, setSelectedCalories] = useState('Tất cả calo');
  const [selectedPrice, setSelectedPrice] = useState('Tất cả giá');
  const [selectedTime, setSelectedTime] = useState('Tất cả thời gian');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const filters = [
    'Tất cả',
    'Món phổ biến',
    'Món bán chạy',
    'Món mới',
    'Món truyền thống',
    'Món nhanh',
    'Món đặc sản'
  ];

  const dietFilters = [
    'Tất cả chế độ ăn',
    'Ăn chay',
    'Keto',
    'Low-carb',
    'High-protein',
    'Gluten-free',
    'Dairy-free'
  ];

  const calorieRanges = [
    'Tất cả calo',
    'Dưới 300 calo',
    '300-500 calo',
    '500-700 calo',
    'Trên 700 calo'
  ];

  const priceRanges = [
    'Tất cả giá',
    'Dưới 50k',
    '50k-100k',
    '100k-200k',
    'Trên 200k'
  ];

  const timeRanges = [
    'Tất cả thời gian',
    'Dưới 15 phút',
    '15-30 phút',
    '30-45 phút',
    'Trên 45 phút'
  ];

  const recipes = [
    // Vietnamese Dishes
    {
      id: 1,
      name: 'Phở Bò',
      category: 'GLOBAL FEAST',
      description: 'Traditional Vietnamese beef noodle soup with aromatic broth',
      time: '45 min',
      timeMinutes: 45,
      calories: 450,
      price: 85000,
      diet: ['High-protein'],
      tags: ['High Protein', 'Comfort Food', 'Vietnamese', 'Soup'],
      image: '🍜',
      badges: ['Món phổ biến', 'Món bán chạy']
    },
    {
      id: 2,
      name: 'Bánh Mì Thịt Nướng',
      category: 'GLOBAL FEAST',
      description: 'Vietnamese sandwich with grilled pork, pickled vegetables & herbs',
      time: '25 min',
      timeMinutes: 25,
      calories: 380,
      price: 45000,
      diet: ['High-protein'],
      tags: ['Quick', 'Vietnamese', 'Sandwich', 'High Protein'],
      image: '🥖',
      badges: ['Món phổ biến']
    },
    {
      id: 3,
      name: 'Hủ Tiếu Nam Vang',
      category: 'GLOBAL FEAST',
      description: 'Cambodian-Vietnamese noodle soup with pork, shrimp & clear broth',
      time: '40 min',
      timeMinutes: 40,
      calories: 520,
      price: 75000,
      diet: ['High-protein'],
      tags: ['Vietnamese', 'Soup', 'Seafood', 'Comfort Food'],
      image: '🍲',
      badges: ['Món đặc sản']
    },
    {
      id: 4,
      name: 'Chả Cá Lã Vọng',
      category: 'GLOBAL FEAST',
      description: 'Hanoi-style turmeric fish with dill, served with rice noodles',
      time: '35 min',
      timeMinutes: 35,
      calories: 420,
      price: 120000,
      diet: ['High-protein', 'Gluten-free'],
      tags: ['Vietnamese', 'Seafood', 'High Protein', 'Traditional'],
      image: '🐟',
      badges: ['Món truyền thống', 'Món đặc sản']
    },
    {
      id: 5,
      name: 'Bún Chả',
      category: 'GLOBAL FEAST',
      description: 'Grilled pork with vermicelli noodles & fresh herbs',
      time: '30 min',
      timeMinutes: 30,
      calories: 480,
      price: 65000,
      diet: ['High-protein'],
      tags: ['Vietnamese', 'High Protein', 'Grilled', 'Fresh'],
      image: '🍜',
      badges: ['Món phổ biến', 'Món bán chạy']
    },
    {
      id: 6,
      name: 'Phở Khô Gia Lai',
      category: 'GLOBAL FEAST',
      description: 'Dry pho with beef, vegetables & special sauce',
      time: '25 min',
      tags: ['Vietnamese', 'Quick', 'High Protein', 'Dry Noodles'],
      image: '🍝'
    },
    {
      id: 7,
      name: 'Bún Bò Huế',
      category: 'GLOBAL FEAST',
      description: 'Spicy beef noodle soup from Central Vietnam',
      time: '50 min',
      tags: ['Vietnamese', 'Spicy', 'Comfort Food', 'Traditional'],
      image: '🍜'
    },
    {
      id: 8,
      name: 'Cơm Tấm Sườn Nướng',
      category: 'GLOBAL FEAST',
      description: 'Broken rice with grilled pork chop & pickled vegetables',
      time: '30 min',
      tags: ['Vietnamese', 'High Protein', 'Grilled', 'Rice'],
      image: '🍚'
    },
    {
      id: 9,
      name: 'Bánh Xèo',
      category: 'GLOBAL FEAST',
      description: 'Vietnamese crispy crepe with shrimp, pork & bean sprouts',
      time: '35 min',
      tags: ['Vietnamese', 'Crispy', 'Seafood', 'Traditional'],
      image: '🥞'
    },
    {
      id: 10,
      name: 'Gỏi Cuốn',
      category: 'GLOBAL FEAST',
      description: 'Fresh spring rolls with shrimp, pork & herbs',
      time: '20 min',
      tags: ['Vietnamese', 'Fresh', 'Healthy', 'Quick'],
      image: '🌯'
    },
    {
      id: 11,
      name: 'Chả Cá',
      category: 'GLOBAL FEAST',
      description: 'Vietnamese fish cake with vermicelli & herbs',
      time: '25 min',
      tags: ['Vietnamese', 'Seafood', 'High Protein', 'Traditional'],
      image: '🐟'
    },
    {
      id: 12,
      name: 'Bún Riêu Cua',
      category: 'GLOBAL FEAST',
      description: 'Crab noodle soup with tomato & tofu',
      time: '45 min',
      tags: ['Vietnamese', 'Seafood', 'Soup', 'Comfort Food'],
      image: '🍲'
    },
    {
      id: 13,
      name: 'Cao Lầu',
      category: 'GLOBAL FEAST',
      description: 'Hoi An specialty noodles with pork & crispy wontons',
      time: '40 min',
      tags: ['Vietnamese', 'Traditional', 'High Protein', 'Regional'],
      image: '🍜'
    },
    {
      id: 14,
      name: 'Bánh Mì Pate',
      category: 'GLOBAL FEAST',
      description: 'Vietnamese sandwich with liver pate & cold cuts',
      time: '15 min',
      tags: ['Vietnamese', 'Quick', 'Sandwich', 'Traditional'],
      image: '🥖'
    },
    {
      id: 15,
      name: 'Chè Đậu Đỏ',
      category: 'GLOBAL FEAST',
      description: 'Sweet red bean dessert soup with coconut milk',
      time: '30 min',
      tags: ['Vietnamese', 'Dessert', 'Sweet', 'Traditional'],
      image: '🍮'
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    // Main filter (badges)
    if (selectedFilter !== 'Tất cả' && !recipe.badges?.includes(selectedFilter)) {
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
      if (selectedCalories === 'Dưới 300 calo' && calories >= 300) return false;
      if (selectedCalories === '300-500 calo' && (calories < 300 || calories > 500)) return false;
      if (selectedCalories === '500-700 calo' && (calories < 500 || calories > 700)) return false;
      if (selectedCalories === 'Trên 700 calo' && calories <= 700) return false;
    }

    // Price filter
    if (selectedPrice !== 'Tất cả giá') {
      const price = recipe.price || 0;
      if (selectedPrice === 'Dưới 50k' && price >= 50000) return false;
      if (selectedPrice === '50k-100k' && (price < 50000 || price > 100000)) return false;
      if (selectedPrice === '100k-200k' && (price < 100000 || price > 200000)) return false;
      if (selectedPrice === 'Trên 200k' && price <= 200000) return false;
    }

    // Time filter
    if (selectedTime !== 'Tất cả thời gian') {
      const timeMinutes = recipe.timeMinutes || 0;
      if (selectedTime === 'Dưới 15 phút' && timeMinutes >= 15) return false;
      if (selectedTime === '15-30 phút' && (timeMinutes < 15 || timeMinutes > 30)) return false;
      if (selectedTime === '30-45 phút' && (timeMinutes < 30 || timeMinutes > 45)) return false;
      if (selectedTime === 'Trên 45 phút' && timeMinutes <= 45) return false;
    }

    return true;
  });

  return (
    <div className="menus-page">
      <div className="container">

        {/* Main Filter Section */}
        <div className="filter-section">
          <h3>Bộ lọc</h3>
          <div className="filter-buttons">
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Chế độ ăn</label>
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

          <button 
            className="show-more-btn"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            {showMoreFilters ? 'Ẩn bớt' : 'Xem thêm'} ↓
          </button>
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

        {/* Bottom CTA */}
        <div className="menus-cta">
          <h2>Get cooking</h2>
          <p>Recipe archive - Check out our cookbook!</p>
          <button className="cta-button">View All Recipes</button>
        </div>
      </div>
    </div>
  );
};

export default MenusPage;

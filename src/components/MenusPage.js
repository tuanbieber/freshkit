import React, { useState, useEffect } from 'react';
import cartService from '../services/cart';
import toastService from '../services/toast';
import SpecialOfferModal from './SpecialOfferModal';
import OFFER_CONFIG from '../config/offerConfig';
import './MenusPage.css';

const MenusPage = () => {
  const [activeTab, setActiveTab] = useState('mon-le'); // 'mon-le', 'goi-tuan', 'san-pham-khac'
  const [selectedBadge, setSelectedBadge] = useState('Tất cả');
  const [selectedDiet, setSelectedDiet] = useState('Tất cả chế độ ăn');
  const [selectedCalories, setSelectedCalories] = useState('Tất cả calo');
  const [selectedPrice, setSelectedPrice] = useState('Tất cả giá');
  const [selectedTime, setSelectedTime] = useState('Tất cả thời gian');
  
  // Gói tuần filters
  const [soNgay, setSoNgay] = useState(7);
  const [soNguoiAn, setSoNguoiAn] = useState(2);
  const [tongSoMonAn, setTongSoMonAn] = useState(20);
  const [selectedMeals, setSelectedMeals] = useState(new Set());
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);

  useEffect(() => {
    if (!OFFER_CONFIG.AUTO_SHOW) {
      return;
    }

    const FREQUENCY = OFFER_CONFIG.FREQUENCY;
    
    const checkOfferFrequency = () => {
      // Handle numeric frequency (in seconds)
      if (typeof FREQUENCY === 'number') {
        const lastShown = localStorage.getItem('special_offer_last_shown');
        const now = new Date().getTime();
        
        if (lastShown) {
          const timeSinceLastShow = (now - parseInt(lastShown)) / 1000; // Convert to seconds
          if (timeSinceLastShow < FREQUENCY) {
            // Not enough time has passed
            return false;
          }
        }
        
        // Show and update last shown time
        localStorage.setItem('special_offer_last_shown', now.toString());
        return true;
      }
      
      // Handle string frequency options
      const offerDismissed = localStorage.getItem('special_offer_dismissed');
      const expiryTime = localStorage.getItem('special_offer_expiry');
      
      if (FREQUENCY === 'always') {
        // Always show, regardless of dismissal
        return true;
      }
      
      if (FREQUENCY === 'session') {
        // Show once per session (until page refresh)
        const sessionShown = sessionStorage.getItem('special_offer_shown');
        if (sessionShown) {
          return false;
        }
        sessionStorage.setItem('special_offer_shown', 'true');
        return true;
      }
      
      if (offerDismissed && expiryTime) {
        const now = new Date().getTime();
        const expiry = parseInt(expiryTime);
        
        if (now < expiry) {
          // Still within the frequency period, don't show
          return false;
        } else {
          // Period passed, clear the flag and show again
          localStorage.removeItem('special_offer_dismissed');
          localStorage.removeItem('special_offer_expiry');
          return true;
        }
      }
      
      // No previous dismissal, show the offer
      return true;
    };
    
    const showOffer = () => {
      if (checkOfferFrequency()) {
        setShowSpecialOffer(true);
      }
    };
    
    // Show immediately if conditions are met
    const initialTimer = setTimeout(() => {
      showOffer();
    }, OFFER_CONFIG.SHOW_DELAY);
    
    // If frequency is numeric (seconds), set up interval
    let intervalTimer = null;
    if (typeof FREQUENCY === 'number') {
      intervalTimer = setInterval(() => {
        showOffer();
      }, FREQUENCY * 1000); // Convert seconds to milliseconds
    }
    
    return () => {
      clearTimeout(initialTimer);
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, []);

  const handleCloseSpecialOffer = () => {
    setShowSpecialOffer(false);
    
    const FREQUENCY = OFFER_CONFIG.FREQUENCY;
    
    // For numeric frequency (seconds), just close - it will show again automatically
    if (typeof FREQUENCY === 'number') {
      // Don't save dismissal, it will show again after the interval
      return;
    }
    
    if (FREQUENCY === 'always') {
      // Don't save dismissal if always showing
      return;
    }
    
    if (FREQUENCY === 'session') {
      // Session already handled in useEffect
      return;
    }
    
    // Calculate expiry time based on frequency
    let expiryHours = 24; // Default: daily
    
    if (FREQUENCY === 'weekly') {
      expiryHours = 24 * 7; // 7 days
    } else if (FREQUENCY === 'daily') {
      expiryHours = 24; // 1 day
    }
    
    // Remember that user dismissed the offer
    localStorage.setItem('special_offer_dismissed', 'true');
    const expiryTime = new Date().getTime() + (expiryHours * 60 * 60 * 1000);
    localStorage.setItem('special_offer_expiry', expiryTime.toString());
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleAddToCart = (recipe) => {
    cartService.addItem({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      price: recipe.price,
      image: recipe.image,
      diet: recipe.diet,
      time: recipe.time,
      calories: recipe.calories
    });
    
    // Show beautiful toast notification
    toastService.success(`Đã thêm "${recipe.name}" vào giỏ hàng!`);
    closeModal();
  };

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
      image: '/menu/Salad cá hồi chanh dây.jpg',
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
      image: '/menu/Mì gà xá xíu.jpg',
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
      image: '/menu/Cải thảo cuộn gà chay.jpg',
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
      image: '/menu/Cá nướng sả, bún rau củ.jpg',
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
      image: '/menu/Hủ tiếu cá lóc.jpg'
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
      image: '/menu/Ức gà xào rau củ.jpg',
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
      image: '/menu/Salad bò sốt tiêu.jpg'
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
      image: '/menu/Đùi gà nướng sốt mù tạt.jpg'
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
      image: '/menu/Cá đối nướng muối hồng.jpg'
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
      image: '/menu/Đậu hũ bò băm sốt nấm.jpg'
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
      image: '/menu/Cơm cà ri chay.jpg'
    },
    {
      id: 12,
      name: 'Bánh mì ức gà nướng',
      category: 'GLOBAL FEAST',
      description: 'Vietnamese baguette with grilled chicken breast',
      time: '20 min',
      timeMinutes: 20,
      calories: 450,
      price: 45000,
      diet: ['Low Fat', 'Eat Clean'],
      tags: ['Sandwich', 'Chicken', 'Vietnamese'],
      image: '/menu/Bánh mì ức gà nướng.jpg',
      badges: ['Bán chạy']
    },
    {
      id: 13,
      name: 'Bún gạo lứt cá hấp',
      category: 'GLOBAL FEAST',
      description: 'Brown rice noodles with steamed fish',
      time: '25 min',
      timeMinutes: 25,
      calories: 380,
      price: 65000,
      diet: ['Eat Clean', 'Low Fat'],
      tags: ['Noodles', 'Seafood', 'Healthy'],
      image: '/menu/Bún gạo lứt cá hấp.jpg'
    },
    {
      id: 14,
      name: 'Cá hấp gừng hành, bún gạo',
      category: 'GLOBAL FEAST',
      description: 'Steamed fish with ginger and scallions, served with brown rice noodles',
      time: '30 min',
      timeMinutes: 30,
      calories: 350,
      price: 70000,
      diet: ['Eat Clean', 'Low Fat'],
      tags: ['Seafood', 'Steamed', 'Healthy'],
      image: '/menu/Cá hấp gừng hành, bún gạo.jpg',
      badges: ['Được yêu thích']
    },
    {
      id: 15,
      name: 'Cá hồi áp chảo sốt teriyaki',
      category: 'GLOBAL FEAST',
      description: 'Pan-seared salmon with teriyaki sauce',
      time: '20 min',
      timeMinutes: 20,
      calories: 420,
      price: 120000,
      diet: ['Keto', 'Low Carb', 'Flexitarian'],
      tags: ['Seafood', 'Japanese', 'Protein'],
      image: '/menu/Cá hồi áp chảo sốt teriyaki.jpg',
      badges: ['Được yêu thích']
    },
    {
      id: 16,
      name: 'Cơm gạo lứt đậu hũ chiên sốt chua ngọt',
      category: 'GLOBAL FEAST',
      description: 'Brown rice with fried tofu in sweet and sour sauce',
      time: '25 min',
      timeMinutes: 25,
      calories: 400,
      price: 50000,
      diet: ['Ăn chay', 'Low Fat'],
      tags: ['Vegetarian', 'Tofu', 'Rice'],
      image: '/menu/Cơm gạo lứt đậu hũ chiên sốt chua ngọt.jpg'
    },
    {
      id: 17,
      name: 'Cơm gạo lứt thịt bò xào nấm',
      category: 'GLOBAL FEAST',
      description: 'Brown rice with stir-fried beef and mushrooms',
      time: '20 min',
      timeMinutes: 20,
      calories: 480,
      price: 85000,
      diet: ['Keto', 'Low Carb'],
      tags: ['Beef', 'Mushroom', 'Stir-fry'],
      image: '/menu/Cơm gạo lứt thịt bò xào nấm.jpg'
    },
    {
      id: 18,
      name: 'Cơm trộn Hàn Quốc chay',
      category: 'GLOBAL FEAST',
      description: 'Korean-style vegetarian bibimbap',
      time: '25 min',
      timeMinutes: 25,
      calories: 420,
      price: 55000,
      diet: ['Ăn chay', 'Flexitarian'],
      tags: ['Vegetarian', 'Korean', 'Rice'],
      image: '/menu/Cơm trộn Hàn Quốc chay.webp',
      badges: ['Giá tốt']
    },
    {
      id: 19,
      name: 'Đậu hũ sốt sa tế rau củ',
      category: 'GLOBAL FEAST',
      description: 'Tofu in satay sauce with vegetables',
      time: '20 min',
      timeMinutes: 20,
      calories: 320,
      price: 45000,
      diet: ['Ăn chay', 'Low Fat'],
      tags: ['Vegetarian', 'Tofu', 'Spicy'],
      image: '/menu/Đậu hũ sốt sa tế rau củ.jpg'
    },
    {
      id: 20,
      name: 'Gà hấp lá chanh cơm nâu',
      category: 'GLOBAL FEAST',
      description: 'Steamed chicken with lemon leaves, served with brown rice',
      time: '30 min',
      timeMinutes: 30,
      calories: 380,
      price: 60000,
      diet: ['Low Fat', 'Eat Clean'],
      tags: ['Chicken', 'Steamed', 'Healthy'],
      image: '/menu/Gà hấp lá chanh cơm nâu.jpg'
    },
    {
      id: 21,
      name: 'Gỏi cuốn tôm thịt',
      category: 'GLOBAL FEAST',
      description: 'Fresh spring rolls with shrimp and pork',
      time: '15 min',
      timeMinutes: 15,
      calories: 180,
      price: 35000,
      diet: ['Low Fat', 'Low Carb'],
      tags: ['Vietnamese', 'Fresh', 'Low Calorie'],
      image: '/menu/Gỏi cuốn tôm thịt.jpg',
      badges: ['Nhanh gọn', 'Giá tốt']
    },
    {
      id: 22,
      name: 'Mì nấm rau củ',
      category: 'GLOBAL FEAST',
      description: 'Noodles with mushrooms and vegetables',
      time: '20 min',
      timeMinutes: 20,
      calories: 320,
      price: 40000,
      diet: ['Ăn chay', 'Low Fat'],
      tags: ['Vegetarian', 'Noodles', 'Mushroom'],
      image: '/menu/Mì nấm rau củ.jpg'
    },
    {
      id: 23,
      name: 'Salad đậu chickpeas rau củ',
      category: 'GLOBAL FEAST',
      description: 'Chickpea and vegetable salad',
      time: '15 min',
      timeMinutes: 15,
      calories: 280,
      price: 50000,
      diet: ['Ăn chay', 'Low Fat', 'Low Carb'],
      tags: ['Vegetarian', 'Salad', 'Protein'],
      image: '/menu/Salad đậu chickpeas rau củ.jpg',
      badges: ['Nhanh gọn']
    },
    {
      id: 24,
      name: 'Súp bí đỏ hạt chia',
      category: 'GLOBAL FEAST',
      description: 'Pumpkin soup with chia seeds',
      time: '25 min',
      timeMinutes: 25,
      calories: 250,
      price: 45000,
      diet: ['Ăn chay', 'Low Fat', 'Eat Clean'],
      tags: ['Vegetarian', 'Soup', 'Healthy'],
      image: '/menu/Súp bí đỏ hạt chia.jpg'
    },
    {
      id: 25,
      name: 'Thịt bò xào bông cải xanh',
      category: 'GLOBAL FEAST',
      description: 'Stir-fried beef with broccoli',
      time: '20 min',
      timeMinutes: 20,
      calories: 380,
      price: 90000,
      diet: ['Keto', 'Low Carb'],
      tags: ['Beef', 'Broccoli', 'Stir-fry'],
      image: '/menu/Thịt bò xào bông cải xanh.jpg'
    },
    {
      id: 26,
      name: 'Ức vịt áp chảo sốt cam',
      category: 'GLOBAL FEAST',
      description: 'Pan-seared duck breast with orange sauce',
      time: '30 min',
      timeMinutes: 30,
      calories: 450,
      price: 110000,
      diet: ['Keto', 'Low Carb'],
      tags: ['Duck', 'Protein', 'Gourmet'],
      image: '/menu/Ức vịt áp chảo sốt cam.jpg',
      badges: ['Được yêu thích']
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

  // Sản phẩm khác (nước ép, trái cây, etc.)
  const otherProducts = [
    {
      id: 'other-1',
      name: 'Nước ép cam tươi',
      category: 'Nước ép',
      description: 'Nước ép cam nguyên chất 100%',
      price: 35000,
      image: '🧃',
      type: 'juice'
    },
    {
      id: 'other-2',
      name: 'Nước ép táo',
      category: 'Nước ép',
      description: 'Nước ép táo tươi ngon',
      price: 35000,
      image: '🧃',
      type: 'juice'
    },
    {
      id: 'other-3',
      name: 'Nước ép dưa hấu',
      category: 'Nước ép',
      description: 'Nước ép dưa hấu mát lạnh',
      price: 30000,
      image: '🧃',
      type: 'juice'
    },
    {
      id: 'other-4',
      name: 'Trái cây mix',
      category: 'Trái cây',
      description: 'Hộp trái cây mix tươi ngon',
      price: 80000,
      image: '🍎',
      type: 'fruit'
    },
    {
      id: 'other-5',
      name: 'Dưa hấu',
      category: 'Trái cây',
      description: 'Dưa hấu tươi ngon',
      price: 45000,
      image: '🍉',
      type: 'fruit'
    },
    {
      id: 'other-6',
      name: 'Chuối',
      category: 'Trái cây',
      description: 'Chuối chín vàng',
      price: 25000,
      image: '🍌',
      type: 'fruit'
    },
    {
      id: 'other-7',
      name: 'Sinh tố bơ',
      category: 'Sinh tố',
      description: 'Sinh tố bơ béo ngậy',
      price: 40000,
      image: '🥑',
      type: 'smoothie'
    },
    {
      id: 'other-8',
      name: 'Sinh tố dâu',
      category: 'Sinh tố',
      description: 'Sinh tố dâu tây thơm ngon',
      price: 45000,
      image: '🥤',
      type: 'smoothie'
    }
  ];

  const handleMealToggle = (recipeId) => {
    if (activeTab !== 'goi-tuan') return;
    
    setSelectedMeals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        if (newSet.size < tongSoMonAn) {
          newSet.add(recipeId);
        } else {
          toastService.error(`Bạn chỉ có thể chọn tối đa ${tongSoMonAn} món ăn`);
        }
      }
      return newSet;
    });
  };

  const canCheckout = activeTab === 'goi-tuan' && selectedMeals.size === tongSoMonAn;

  return (
    <div className="menus-page">
      <div className="container">
        {/* Tab Navigation */}
        <div className="menu-tabs">
          <button
            className={`menu-tab ${activeTab === 'mon-le' ? 'active' : ''}`}
            onClick={() => setActiveTab('mon-le')}
          >
            Món lẻ
          </button>
          <button
            className={`menu-tab ${activeTab === 'goi-tuan' ? 'active' : ''}`}
            onClick={() => setActiveTab('goi-tuan')}
          >
            Gói tuần
          </button>
          <button
            className={`menu-tab ${activeTab === 'san-pham-khac' ? 'active' : ''}`}
            onClick={() => setActiveTab('san-pham-khac')}
          >
            Sản phẩm khác
          </button>
        </div>

        {/* Gói tuần specific filters */}
        {activeTab === 'goi-tuan' && (
          <div className="weekly-package-filters">
            <div className="filter-group">
              <label>Số ngày</label>
              <select 
                value={soNgay} 
                onChange={(e) => setSoNgay(parseInt(e.target.value))}
                className="filter-select"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <option key={day} value={day}>{day} ngày</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Số người ăn</label>
              <select 
                value={soNguoiAn} 
                onChange={(e) => setSoNguoiAn(parseInt(e.target.value))}
                className="filter-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} người</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Tổng số món ăn / tuần</label>
              <select 
                value={tongSoMonAn} 
                onChange={(e) => {
                  const newTotal = parseInt(e.target.value);
                  setTongSoMonAn(newTotal);
                  // Adjust selected meals if needed
                  setSelectedMeals(prev => {
                    const newSet = new Set(prev);
                    const arr = Array.from(newSet);
                    return new Set(arr.slice(0, newTotal));
                  });
                }}
                className="filter-select"
              >
                {[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map(num => (
                  <option key={num} value={num}>{num} món</option>
                ))}
              </select>
            </div>

            <div className="selected-meals-info">
              <span className="meals-count">
                Đã chọn: <strong>{selectedMeals.size}</strong> / {tongSoMonAn} món
              </span>
              {selectedMeals.size < tongSoMonAn && (
                <span className="meals-warning">
                  ⚠️ Vui lòng chọn đủ {tongSoMonAn} món để thanh toán
                </span>
              )}
              {selectedMeals.size === tongSoMonAn && (
                <span className="meals-success">
                  ✓ Đã chọn đủ số lượng món ăn
                </span>
              )}
            </div>
          </div>
        )}

        {/* Advanced Filters - Only show for Món lẻ and Gói tuần */}
        {(activeTab === 'mon-le' || activeTab === 'goi-tuan') && (
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
        )}

        {/* Recipes Grid */}
        <div className="recipes-grid">
          {activeTab === 'san-pham-khac' ? (
            // Show other products
            otherProducts.map((product) => (
              <div key={product.id} className="recipe-card">
                <div className="recipe-card-clickable" onClick={() => {
                  cartService.addItem({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    category: product.category
                  });
                  toastService.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
                }}>
                  <div className="recipe-image">
                    {product.image && (product.image.startsWith('/') || product.image.includes('.jpg') || product.image.includes('.webp')) ? (
                      <img src={product.image} alt={product.name} className="recipe-img" />
                    ) : (
                      <span className="recipe-emoji">{product.image}</span>
                    )}
                  </div>
                  
                  <div className="recipe-content">
                    <h3 className="recipe-name">{product.name}</h3>
                    <p className="recipe-description">{product.description}</p>
                    <div className="recipe-meta">
                      <div className="meta-row">
                        <span className="price">💰 {product.price?.toLocaleString('vi-VN')}đ</span>
                        <span className="diet-tag">{product.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="recipe-card-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      cartService.addItem({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        category: product.category
                      });
                      toastService.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
                    }}
                  >
                    🛒 Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Show recipes (Món lẻ or Gói tuần)
            filteredRecipes.map((recipe) => {
              const isSelected = activeTab === 'goi-tuan' && selectedMeals.has(recipe.id);
              
              return (
                <div key={recipe.id} className={`recipe-card ${isSelected ? 'selected-meal' : ''}`}>
                  <div className="recipe-card-clickable" onClick={() => {
                    if (activeTab === 'goi-tuan') {
                      handleMealToggle(recipe.id);
                    } else {
                      handleRecipeClick(recipe);
                    }
                  }}>
                    <div className="recipe-image">
                      {recipe.image && (recipe.image.startsWith('/') || recipe.image.includes('.jpg') || recipe.image.includes('.webp')) ? (
                        <img src={recipe.image} alt={recipe.name} className="recipe-img" />
                      ) : (
                        <span className="recipe-emoji">{recipe.image}</span>
                      )}
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
                  
                  {activeTab === 'mon-le' && (
                    <div className="recipe-card-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          cartService.addItem({
                            id: recipe.id,
                            name: recipe.name,
                            description: recipe.description,
                            price: recipe.price,
                            image: recipe.image,
                            diet: recipe.diet,
                            time: recipe.time,
                            calories: recipe.calories
                          });
                          toastService.success(`Đã thêm "${recipe.name}" vào giỏ hàng!`);
                        }}
                      >
                        🛒 Thêm vào giỏ hàng
                      </button>
                    </div>
                  )}
                  
                  {activeTab === 'goi-tuan' && isSelected && (
                    <div className="selected-badge-meal">
                      ✓ Đã chọn
                    </div>
                  )}
                </div>
            );
            })
          )}
        </div>

        {/* Checkout button for Gói tuần */}
        {activeTab === 'goi-tuan' && (
          <div className="weekly-package-checkout">
            <div className="checkout-info">
              <p>
                <strong>Số ngày:</strong> {soNgay} ngày | 
                <strong> Số người:</strong> {soNguoiAn} người | 
                <strong> Tổng món:</strong> {tongSoMonAn} món
              </p>
              <p className="selected-count">
                Đã chọn: <strong>{selectedMeals.size}</strong> / {tongSoMonAn} món
              </p>
            </div>
            <button 
              className={`checkout-package-btn ${canCheckout ? 'enabled' : 'disabled'}`}
              onClick={() => {
                if (!canCheckout) {
                  toastService.error(`Vui lòng chọn đủ ${tongSoMonAn} món ăn để thanh toán`);
                  return;
                }
                // Add all selected meals to cart
                const selectedRecipes = filteredRecipes.filter(r => selectedMeals.has(r.id));
                selectedRecipes.forEach(recipe => {
                  cartService.addItem({
                    id: `weekly-${recipe.id}`,
                    name: recipe.name,
                    description: recipe.description,
                    price: recipe.price,
                    image: recipe.image,
                    diet: recipe.diet,
                    time: recipe.time,
                    calories: recipe.calories,
                    weeklyPackage: true
                  });
                });
                toastService.success(`Đã thêm ${selectedMeals.size} món vào giỏ hàng!`);
                setSelectedMeals(new Set());
              }}
              disabled={!canCheckout}
            >
              {canCheckout ? `Thanh toán gói tuần (${selectedMeals.size} món)` : `Chọn đủ ${tongSoMonAn} món để thanh toán`}
            </button>
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {showModal && selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <div className="modal-image">
                {selectedRecipe.image && (selectedRecipe.image.startsWith('/') || selectedRecipe.image.includes('.jpg') || selectedRecipe.image.includes('.webp')) ? (
                  <img src={selectedRecipe.image} alt={selectedRecipe.name} className="modal-img" />
                ) : (
                  <span className="modal-emoji">{selectedRecipe.image}</span>
                )}
              </div>
              <div className="modal-title-section">
                <h2 className="modal-title">{selectedRecipe.name}</h2>
                <p className="modal-category">{selectedRecipe.category}</p>
                <p className="modal-description">{selectedRecipe.description}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-stats">
                <div className="stat-item">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-label">Thời gian nấu</span>
                  <span className="stat-value">{selectedRecipe.time}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🔥</span>
                  <span className="stat-label">Calories</span>
                  <span className="stat-value">{selectedRecipe.calories} calo</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">💰</span>
                  <span className="stat-label">Giá</span>
                  <span className="stat-value">{selectedRecipe.price?.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {selectedRecipe.diet && selectedRecipe.diet.length > 0 && (
                <div className="modal-section">
                  <h3>Chế độ ăn phù hợp</h3>
                  <div className="modal-tags">
                    {selectedRecipe.diet.map((diet, index) => (
                      <span key={index} className="modal-tag diet">{diet}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
                <div className="modal-section">
                  <h3>Thẻ</h3>
                  <div className="modal-tags">
                    {selectedRecipe.tags.map((tag, index) => (
                      <span key={index} className="modal-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedRecipe.badges && selectedRecipe.badges.length > 0 && (
                <div className="modal-section">
                  <h3>Đặc điểm</h3>
                  <div className="modal-tags">
                    {selectedRecipe.badges.map((badge, index) => (
                      <span key={index} className="modal-tag badge">{badge}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button 
                  className="modal-btn primary"
                  onClick={() => handleAddToCart(selectedRecipe)}
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="modal-btn secondary">Xem chi tiết</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SpecialOfferModal
        isOpen={showSpecialOffer}
        onClose={handleCloseSpecialOffer}
        frequency={OFFER_CONFIG.FREQUENCY}
      />
    </div>
  );
};

export default MenusPage;

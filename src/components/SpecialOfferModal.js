import React, { useState, useEffect } from 'react';
import cartService from '../services/cart';
import toastService from '../services/toast';
import './SpecialOfferModal.css';

const SpecialOfferModal = ({ isOpen, onClose, frequency = 'daily' }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const specialOffers = [
    {
      id: 'offer-1',
      name: 'P_10 gói Ức gà ăn liền 150gr',
      image: '🍗',
      originalPrice: 400000,
      discountedPrice: 370000,
      description: 'Ức gà ăn liền tiện lợi, giàu protein'
    },
    {
      id: 'offer-2',
      name: 'P_COMBO 04 GÓI ỨC GÀ VIÊN (MỚI)',
      image: '🍖',
      originalPrice: 200000,
      discountedPrice: 160000,
      description: 'Combo ức gà viên mới, thơm ngon'
    },
    {
      id: 'offer-3',
      name: 'P_FITFOOD JUICE SWEETIE',
      image: '🥤',
      originalPrice: 220000,
      discountedPrice: 200000,
      description: 'Combo nước ép trái cây tươi ngon'
    },
    {
      id: 'offer-4',
      name: 'P_GRANOLA Siêu hạt Premium',
      image: '🥣',
      originalPrice: 110000,
      discountedPrice: 90000,
      description: 'Granola siêu hạt cao cấp'
    }
  ];

  const handleAddToCart = (product) => {
    cartService.addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.discountedPrice,
      image: product.image,
      originalPrice: product.originalPrice
    });
    
    toastService.success(`Đã thêm "${product.name}" vào giỏ hàng với giá ưu đãi!`);
    setSelectedProduct(product.id);
    
    // Reset selection after animation
    setTimeout(() => {
      setSelectedProduct(null);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="special-offer-overlay" onClick={onClose}>
      <div className="special-offer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="offer-header">
          <h2>ƯU ĐÃI CHO BẠN</h2>
        </div>

        <div className="offer-content">
          <p className="offer-message">
            Ưu đãi giành riêng cho bạn
          </p>

          <div className="offers-grid">
            {specialOffers.map((product) => {
              const discount = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);
              const isSelected = selectedProduct === product.id;
              
              return (
                <div
                  key={product.id}
                  className={`offer-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="offer-image">
                    <span className="offer-emoji">{product.image}</span>
                    <span className="discount-badge">-{discount}%</span>
                  </div>
                  
                  <div className="offer-info">
                    <h3 className="offer-name">{product.name}</h3>
                    <div className="offer-prices">
                      <span className="original-price">
                        {product.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="discounted-price">
                        {product.discountedPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="added-indicator">
                      ✓ Đã thêm vào giỏ hàng
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="offer-footer">
          <button className="dismiss-btn" onClick={onClose}>
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferModal;


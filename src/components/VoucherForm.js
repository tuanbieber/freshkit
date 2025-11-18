import React, { useState } from 'react';
import voucherService from '../services/voucher';
import toastService from '../services/toast';
import './VoucherForm.css';

const VoucherForm = ({ orderTotal, isFirstOrder, onVoucherApplied }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      toastService.error('Vui lòng nhập mã giảm giá');
      return;
    }

    setIsApplying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = voucherService.validateVoucher(voucherCode, orderTotal, isFirstOrder);
      
      if (result.valid) {
        setAppliedVoucher({
          code: voucherCode.toUpperCase(),
          discount: result.discountAmount,
          voucher: result.voucher
        });
        toastService.success(`Áp dụng mã giảm giá thành công!`);
        if (onVoucherApplied) {
          onVoucherApplied({
            code: voucherCode.toUpperCase(),
            discount: result.discountAmount,
            voucher: result.voucher
          });
        }
      } else {
        toastService.error(result.error);
        setAppliedVoucher(null);
        if (onVoucherApplied) {
          onVoucherApplied(null);
        }
      }
      
      setIsApplying(false);
    }, 500);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    if (onVoucherApplied) {
      onVoucherApplied(null);
    }
    toastService.info('Đã xóa mã giảm giá');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyVoucher();
    }
  };

  return (
    <div className="voucher-form">
      <h3 className="section-title">Mã giảm giá / Ưu đãi</h3>

      {!appliedVoucher ? (
        <div className="voucher-input-section">
          <div className="voucher-input-group">
            <input
              type="text"
              className="voucher-input"
              placeholder="Nhập mã giảm giá"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={isApplying}
            />
            <button
              className="apply-voucher-btn"
              onClick={handleApplyVoucher}
              disabled={isApplying || !voucherCode.trim()}
            >
              {isApplying ? 'Đang xử lý...' : 'Áp dụng'}
            </button>
          </div>
          <p className="voucher-hint">
            💡 Một số mã phổ biến: WELCOME10, SAVE50K, FRESH20, NEWUSER
          </p>
        </div>
      ) : (
        <div className="applied-voucher">
          <div className="voucher-info">
            <div className="voucher-code-display">
              <span className="voucher-code">{appliedVoucher.code}</span>
              <button
                className="remove-voucher-btn"
                onClick={handleRemoveVoucher}
                title="Xóa mã giảm giá"
              >
                ×
              </button>
            </div>
            <div className="voucher-details">
              <p className="voucher-discount">
                Giảm: <strong>-{appliedVoucher.discount.toLocaleString('vi-VN')}đ</strong>
              </p>
              <p className="voucher-description">
                {appliedVoucher.voucher.description}
              </p>
              {appliedVoucher.voucher.firstOrderOnly && (
                <span className="voucher-condition">Áp dụng cho đơn hàng đầu tiên</span>
              )}
              {appliedVoucher.voucher.minOrder > 0 && (
                <span className="voucher-condition">
                  Đơn tối thiểu {appliedVoucher.voucher.minOrder.toLocaleString('vi-VN')}đ
                </span>
              )}
              {appliedVoucher.voucher.maxDiscount && appliedVoucher.voucher.type === 'percent' && (
                <span className="voucher-condition">
                  Tối đa {appliedVoucher.voucher.maxDiscount.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherForm;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cartService from '../services/cart';
import toastService from '../services/toast';
import ConfirmDialog from './ConfirmDialog';
import DeliveryForm from './DeliveryForm';
import VoucherForm from './VoucherForm';
import PaymentForm from './PaymentForm';
import deliveryService from '../services/delivery';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    itemId: null,
    itemName: ''
  });
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [companyInvoice, setCompanyInvoice] = useState(null);

  useEffect(() => {
    // Load cart items
    setCartItems(cartService.getItems());
    
    // Subscribe to cart changes
    const unsubscribe = cartService.subscribe((items) => {
      setCartItems([...items]);
    });

    // Select all items by default
    const allItemIds = cartService.getItems().map(item => item.id);
    setSelectedItems(new Set(allItemIds));

    return () => unsubscribe();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    cartService.updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    setConfirmDialog({
      isOpen: true,
      itemId: itemId,
      itemName: item?.name || 'sản phẩm này'
    });
  };

  const confirmRemove = () => {
    if (confirmDialog.itemId) {
      const itemName = cartItems.find(i => i.id === confirmDialog.itemId)?.name || '';
      cartService.removeItem(confirmDialog.itemId);
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(confirmDialog.itemId);
        return newSet;
      });
      toastService.success(`Đã xóa "${itemName}" khỏi giỏ hàng`);
      setConfirmDialog({ isOpen: false, itemId: null, itemName: '' });
    }
  };

  const cancelRemove = () => {
    setConfirmDialog({ isOpen: false, itemId: null, itemName: '' });
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const getSelectedItems = () => {
    return cartItems.filter(item => selectedItems.has(item.id));
  };

  const getSelectedTotal = () => {
    return getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSelectedCount = () => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      toastService.error('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }
    setShowDeliveryForm(true);
  };

  const handleDeliveryInfoChange = (info) => {
    setDeliveryInfo(info);
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleVoucherApplied = (voucher) => {
    setVoucherInfo(voucher);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCompanyInvoiceChange = (invoice) => {
    setCompanyInvoice(invoice);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !deliveryInfo) {
      toastService.error('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }
    if (!deliveryInfo.schedule.day || !deliveryInfo.schedule.timeSlot) {
      toastService.error('Vui lòng chọn ngày và khung giờ giao hàng');
      return;
    }
    if (!paymentMethod) {
      toastService.error('Vui lòng chọn phương thức thanh toán');
      return;
    }
    
    // Here you would typically send the order to your backend
    toastService.success('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    
    // Clear cart and reset
    cartService.clearCart();
    setShowDeliveryForm(false);
    setSelectedAddressId(null);
    setDeliveryInfo(null);
    setVoucherInfo(null);
    setPaymentMethod(null);
    setCompanyInvoice(null);
  };

  const getFinalTotal = () => {
    const subtotal = getSelectedTotal();
    const deliveryFee = deliveryInfo?.deliveryFee || 0;
    const voucherDiscount = voucherInfo?.discount || 0;
    return Math.max(0, subtotal + deliveryFee - voucherDiscount);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link to="/thuc-don" className="continue-shopping-btn">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {!showDeliveryForm ? (
          <>
            <div className="cart-header">
              <h1>Giỏ hàng của tôi</h1>
              <span className="cart-count">({cartItems.length} sản phẩm)</span>
            </div>

            <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-select-all">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                  onChange={handleSelectAll}
                />
                <span>Chọn tất cả</span>
              </label>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </label>

                  <div className="item-image">
                    <span className="item-emoji">{item.image}</span>
                  </div>

                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-meta">
                      {item.diet && item.diet.length > 0 && (
                        <div className="item-diet">
                          {item.diet.map((diet, index) => (
                            <span key={index} className="diet-badge">{diet}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="item-price">
                    <span className="price-value">{item.price.toLocaleString('vi-VN')}đ</span>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <span className="total-value">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Xóa sản phẩm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Tóm tắt đơn hàng</h3>
              
              <div className="summary-row">
                <span>Tạm tính ({getSelectedCount()} sản phẩm):</span>
                <span>{getSelectedTotal().toLocaleString('vi-VN')}đ</span>
              </div>
              
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span className="free-shipping">Miễn phí</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span className="total-price">{getSelectedTotal().toLocaleString('vi-VN')}đ</span>
              </div>

              <button 
                className="checkout-btn"
                disabled={selectedItems.size === 0}
                onClick={handleCheckout}
              >
                Mua hàng ({getSelectedCount()})
              </button>

              <Link to="/thuc-don" className="continue-shopping-link">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
          </>
        ) : (
          <>
            <div className="checkout-header">
              <button 
                className="back-to-cart-btn"
                onClick={() => setShowDeliveryForm(false)}
              >
                ← Quay lại giỏ hàng
              </button>
              <h1>Thông tin giao hàng</h1>
            </div>

            <DeliveryForm
              onAddressSelect={handleAddressSelect}
              selectedAddressId={selectedAddressId}
              onDeliveryInfoChange={handleDeliveryInfoChange}
            />

            {deliveryInfo && (
              <>
                <VoucherForm
                  orderTotal={getSelectedTotal() + (deliveryInfo?.deliveryFee || 0)}
                  isFirstOrder={true}
                  onVoucherApplied={handleVoucherApplied}
                />

                <PaymentForm
                  onPaymentMethodChange={handlePaymentMethodChange}
                  onCompanyInvoiceChange={handleCompanyInvoiceChange}
                />
              </>
            )}

            <div className="checkout-summary">
              <div className="summary-card">
                <h3>Tóm tắt đơn hàng</h3>
                
                <div className="summary-row">
                  <span>Sản phẩm ({getSelectedCount()}):</span>
                  <span>{getSelectedTotal().toLocaleString('vi-VN')}đ</span>
                </div>
                
                {deliveryInfo && (
                  <>
                    <div className="summary-row">
                      <span>Phí vận chuyển:</span>
                      <span>
                        {deliveryInfo.deliveryFee === 0 ? (
                          <span className="free-shipping">Miễn phí</span>
                        ) : (
                          <span>{deliveryInfo.deliveryFee.toLocaleString('vi-VN')}đ</span>
                        )}
                      </span>
                    </div>
                    
                    {voucherInfo && (
                      <div className="summary-row voucher-discount-row">
                        <span>Mã giảm giá ({voucherInfo.code}):</span>
                        <span className="discount-amount">
                          -{voucherInfo.discount.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    )}
                    
                    {deliveryInfo.schedule.day && deliveryInfo.schedule.timeSlot && (
                      <div className="delivery-schedule-info">
                        <p><strong>Ngày giao:</strong> {
                          deliveryService.getDeliveryDays().find(d => d.value === parseInt(deliveryInfo.schedule.day))?.label
                        }</p>
                        <p><strong>Khung giờ:</strong> {
                          deliveryService.getTimeSlots().find(s => s.id === deliveryInfo.schedule.timeSlot)?.label
                        }</p>
                      </div>
                    )}
                  </>
                )}
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span className="total-price">
                    {getFinalTotal().toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <button 
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddressId || !deliveryInfo?.schedule.day || !deliveryInfo?.schedule.timeSlot || !paymentMethod}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa "${confirmDialog.itemName}" khỏi giỏ hàng?`}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
};

export default CartPage;


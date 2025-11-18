import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = ({ onPaymentMethodChange, onCompanyInvoiceChange }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardholder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [showCompanyInvoice, setShowCompanyInvoice] = useState(false);
  const [companyInvoice, setCompanyInvoice] = useState({
    companyName: '',
    taxId: '',
    address: '',
    email: ''
  });

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (onPaymentMethodChange) {
      onPaymentMethodChange(method);
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    }

    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    }

    // Format CVV (only numbers, max 4 digits)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCompanyInvoiceChange = (e) => {
    const { name, value } = e.target;
    setCompanyInvoice(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (onCompanyInvoiceChange) {
      onCompanyInvoiceChange({
        ...companyInvoice,
        [name]: value
      });
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^35/.test(number)) return 'jcb';
    return 'unknown';
  };

  const cardType = getCardType(cardDetails.cardNumber);

  return (
    <div className="payment-form">
      <h3 className="section-title">Phương thức thanh toán</h3>

      <div className="payment-methods">
        <div className="payment-method-tabs">
          <button
            className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('card')}
          >
            💳 Thẻ tín dụng/Ghi nợ
          </button>
          <button
            className={`payment-tab ${paymentMethod === 'ewallet' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('ewallet')}
          >
            📱 Ví điện tử
          </button>
          <button
            className={`payment-tab ${paymentMethod === 'transfer' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('transfer')}
          >
            🏦 Chuyển khoản
          </button>
        </div>

        {paymentMethod === 'card' && (
          <div className="payment-method-content">
            <div className="card-types">
              <div className={`card-type ${cardType === 'visa' ? 'active' : ''}`}>
                <img src="/payment-visa.webp" alt="Visa" />
              </div>
              <div className={`card-type ${cardType === 'mastercard' ? 'active' : ''}`}>
                <img src="/payment-mastercard.jpg" alt="Mastercard" />
              </div>
              <div className={`card-type ${cardType === 'jcb' ? 'active' : ''}`}>
                <span>JCB</span>
              </div>
            </div>

            <div className="form-group">
              <label>Chủ thẻ *</label>
              <input
                type="text"
                name="cardholder"
                value={cardDetails.cardholder}
                onChange={handleCardInputChange}
                placeholder="NGUYEN VAN A"
                required
                maxLength="50"
              />
            </div>

            <div className="form-group">
              <label>Số thẻ *</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                required
                maxLength="19"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ngày hết hạn *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  required
                  maxLength="5"
                />
              </div>

              <div className="form-group">
                <label>CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  required
                  maxLength="4"
                />
              </div>
            </div>

            <div className="security-note">
              🔒 Thông tin thẻ được mã hóa và bảo mật theo tiêu chuẩn PCI DSS
            </div>
          </div>
        )}

        {paymentMethod === 'ewallet' && (
          <div className="payment-method-content">
            <div className="ewallet-options">
              <label className="ewallet-option">
                <input
                  type="radio"
                  name="ewallet"
                  value="momo"
                  defaultChecked
                />
                <div className="ewallet-card">
                  <img src="/payment-momo.webp" alt="MoMo" />
                  <span>Ví MoMo</span>
                </div>
              </label>

              <label className="ewallet-option">
                <input
                  type="radio"
                  name="ewallet"
                  value="zalopay"
                />
                <div className="ewallet-card">
                  <span className="ewallet-icon">ZaloPay</span>
                  <span>Ví ZaloPay</span>
                </div>
              </label>

              <label className="ewallet-option">
                <input
                  type="radio"
                  name="ewallet"
                  value="vnpay"
                />
                <div className="ewallet-card">
                  <span className="ewallet-icon">VNPay</span>
                  <span>Ví VNPay</span>
                </div>
              </label>
            </div>

            <div className="ewallet-note">
              Bạn sẽ được chuyển đến trang xác thực của ví điện tử để hoàn tất thanh toán
            </div>
          </div>
        )}

        {paymentMethod === 'transfer' && (
          <div className="payment-method-content">
            <div className="transfer-info">
              <h4>Thông tin chuyển khoản</h4>
              <div className="bank-info">
                <p><strong>Ngân hàng:</strong> Techcombank</p>
                <p><strong>Số tài khoản:</strong> 1234567890</p>
                <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH FRESHKIT</p>
                <p><strong>Nội dung chuyển khoản:</strong> [Mã đơn hàng của bạn]</p>
              </div>
              <div className="transfer-note">
                ⚠️ Vui lòng chuyển khoản đúng số tiền và ghi rõ nội dung để đơn hàng được xử lý nhanh nhất
              </div>
            </div>
          </div>
        )}

        <div className="save-payment-method">
          <label>
            <input
              type="checkbox"
              checked={savePaymentMethod}
              onChange={(e) => setSavePaymentMethod(e.target.checked)}
            />
            <span>Lưu phương thức thanh toán cho kỳ sau</span>
          </label>
        </div>
      </div>

      <div className="company-invoice-section">
        <label className="company-invoice-toggle">
          <input
            type="checkbox"
            checked={showCompanyInvoice}
            onChange={(e) => setShowCompanyInvoice(e.target.checked)}
          />
          <span>Xuất hóa đơn công ty</span>
        </label>

        {showCompanyInvoice && (
          <div className="company-invoice-form">
            <div className="form-group">
              <label>Tên đơn vị *</label>
              <input
                type="text"
                name="companyName"
                value={companyInvoice.companyName}
                onChange={handleCompanyInvoiceChange}
                placeholder="CÔNG TY TNHH ABC"
                required
              />
            </div>

            <div className="form-group">
              <label>Mã số thuế *</label>
              <input
                type="text"
                name="taxId"
                value={companyInvoice.taxId}
                onChange={handleCompanyInvoiceChange}
                placeholder="0123456789"
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ *</label>
              <input
                type="text"
                name="address"
                value={companyInvoice.address}
                onChange={handleCompanyInvoiceChange}
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                required
              />
            </div>

            <div className="form-group">
              <label>Email nhận hóa đơn *</label>
              <input
                type="email"
                name="email"
                value={companyInvoice.email}
                onChange={handleCompanyInvoiceChange}
                placeholder="accounting@company.com"
                required
              />
            </div>
          </div>
        )}
      </div>

      <div className="subscription-notice">
        <div className="notice-icon">ℹ️</div>
        <div className="notice-content">
          <p><strong>Lưu ý:</strong> Gói sẽ tự động gia hạn mỗi <strong>tuần</strong> vào <strong>ngày cắt</strong>.</p>
          <p>Bạn có thể <a href="/quan-ly-goi" className="manage-link">quản lý, hủy hoặc tạm dừng</a> gói đăng ký bất cứ lúc nào.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;


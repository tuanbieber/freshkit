import React, { useState, useEffect } from 'react';
import deliveryService from '../services/delivery';
import ConfirmDialog from './ConfirmDialog';
import toastService from '../services/toast';
import './DeliveryForm.css';

const DeliveryForm = ({ onAddressSelect, selectedAddressId, onDeliveryInfoChange }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    ward: '',
    district: '',
    province: 'TP. Hồ Chí Minh',
    deliveryNotes: '',
    addressType: 'home', // home or company
    isDefault: false
  });

  const [deliverySchedule, setDeliverySchedule] = useState({
    day: '',
    timeSlot: '',
    frequency: 'once' // once, weekly, biweekly
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    addressId: null,
    addressName: ''
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  useEffect(() => {
    if (selectedAddressId) {
      const address = addresses.find(a => a.id === selectedAddressId);
      if (address && onDeliveryInfoChange) {
        const fee = deliveryService.getDeliveryFee(address.district);
        onDeliveryInfoChange({
          address,
          deliveryFee: fee,
          schedule: deliverySchedule
        });
      }
    }
  }, [selectedAddressId, addresses, deliverySchedule, onDeliveryInfoChange]);

  const loadAddresses = () => {
    const loadedAddresses = deliveryService.getAddresses();
    setAddresses(loadedAddresses);
    
    // Set default address if available
    if (loadedAddresses.length > 0 && !selectedAddressId) {
      const defaultAddr = deliveryService.getDefaultAddress();
      if (defaultAddr && onAddressSelect) {
        onAddressSelect(defaultAddr.id);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setDeliverySchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert('Vui lòng nhập họ tên');
      return false;
    }
    if (!formData.phone.trim() || !/^[0-9]{10,11}$/.test(formData.phone)) {
      alert('Vui lòng nhập số điện thoại hợp lệ (10-11 số)');
      return false;
    }
    if (!formData.street.trim()) {
      alert('Vui lòng nhập đường/phố');
      return false;
    }
    if (!formData.ward.trim()) {
      alert('Vui lòng nhập phường/xã');
      return false;
    }
    if (!formData.district.trim()) {
      alert('Vui lòng nhập quận/huyện');
      return false;
    }
    
    // Check delivery availability
    if (!deliveryService.isDeliveryAvailable(formData.district)) {
      alert(`Chúng tôi chưa hỗ trợ giao hàng đến ${formData.district}. Vui lòng chọn địa chỉ khác.`);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingAddress) {
      deliveryService.updateAddress(editingAddress.id, formData);
    } else {
      const newAddress = deliveryService.addAddress(formData);
      if (onAddressSelect) {
        onAddressSelect(newAddress.id);
      }
    }

    loadAddresses();
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      ward: '',
      district: '',
      province: 'TP. Hồ Chí Minh',
      deliveryNotes: '',
      addressType: 'home',
      isDefault: false
    });
    setEditingAddress(null);
  };

  const handleEdit = (address) => {
    setFormData({
      fullName: address.fullName || '',
      phone: address.phone || '',
      street: address.street || '',
      ward: address.ward || '',
      district: address.district || '',
      province: address.province || 'TP. Hồ Chí Minh',
      deliveryNotes: address.deliveryNotes || '',
      addressType: address.addressType || 'home',
      isDefault: address.isDefault || false
    });
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = (addressId) => {
    const address = addresses.find(a => a.id === addressId);
    setConfirmDialog({
      isOpen: true,
      addressId: addressId,
      addressName: address ? `${address.street}, ${address.district}` : 'địa chỉ này'
    });
  };

  const confirmDelete = () => {
    if (confirmDialog.addressId) {
      deliveryService.deleteAddress(confirmDialog.addressId);
      toastService.success('Đã xóa địa chỉ thành công');
      loadAddresses();
      if (selectedAddressId === confirmDialog.addressId && addresses.length > 1) {
        const remainingAddresses = addresses.filter(a => a.id !== confirmDialog.addressId);
        if (remainingAddresses.length > 0 && onAddressSelect) {
          onAddressSelect(remainingAddresses[0].id);
        }
      }
      setConfirmDialog({ isOpen: false, addressId: null, addressName: '' });
    }
  };

  const cancelDelete = () => {
    setConfirmDialog({ isOpen: false, addressId: null, addressName: '' });
  };

  const handleSetDefault = (addressId) => {
    deliveryService.setDefaultAddress(addressId);
    loadAddresses();
  };

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);
  const deliveryFee = selectedAddress ? deliveryService.getDeliveryFee(selectedAddress.district) : 0;
  const districts = deliveryService.getDeliveryAreas();
  const timeSlots = deliveryService.getTimeSlots();
  const days = deliveryService.getDeliveryDays();

  return (
    <div className="delivery-form">
      <div className="delivery-section">
        <h3 className="section-title">Địa chỉ giao hàng</h3>
        
        {addresses.length > 0 && (
          <div className="address-list">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
                onClick={() => onAddressSelect && onAddressSelect(address.id)}
              >
                <div className="address-header">
                  <div className="address-type-badge">
                    {address.addressType === 'home' ? '🏠 Nhà' : '🏢 Công ty'}
                    {address.isDefault && <span className="default-badge">Mặc định</span>}
                  </div>
                  <div className="address-actions">
                    {!address.isDefault && (
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetDefault(address.id);
                        }}
                      >
                        Đặt mặc định
                      </button>
                    )}
                    <button 
                      className="action-btn edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(address);
                      }}
                    >
                      Sửa
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(address.id);
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="address-content">
                  <p><strong>{address.fullName}</strong> | {address.phone}</p>
                  <p>{address.street}, {address.ward}, {address.district}, {address.province}</p>
                  {address.deliveryNotes && (
                    <p className="delivery-notes">📝 Ghi chú: {address.deliveryNotes}</p>
                  )}
                  <p className="delivery-fee">
                    Phí giao hàng: {deliveryService.getDeliveryFee(address.district).toLocaleString('vi-VN')}đ
                    {deliveryService.getDeliveryFee(address.district) === 0 && ' (Miễn phí)'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="add-address-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Thêm địa chỉ mới
        </button>

        {showForm && (
          <div className="address-form-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}</h3>
                <button className="close-btn" onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}>×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="address-form">
                <div className="form-group">
                  <label>Loại địa chỉ</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="addressType"
                        value="home"
                        checked={formData.addressType === 'home'}
                        onChange={handleInputChange}
                      />
                      🏠 Nhà
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="addressType"
                        value="company"
                        checked={formData.addressType === 'company'}
                        onChange={handleInputChange}
                      />
                      🏢 Công ty
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Họ tên *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Số điện thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0901234567"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Đường/Phố *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="123 Đường ABC"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phường/Xã *</label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      placeholder="Phường 1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Quận/Huyện *</label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((area) => (
                        <option key={area.district} value={area.district}>
                          {area.district} {area.fee === 0 ? '(Miễn phí)' : `(+${area.fee.toLocaleString('vi-VN')}đ)`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tỉnh/Thành phố</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ghi chú giao hàng</label>
                  <textarea
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Bảo vệ, để trước cửa, gọi trước khi giao..."
                    rows="3"
                  />
                </div>

                {addresses.length === 0 && (
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                      />
                      Đặt làm địa chỉ mặc định
                    </label>
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}>
                    Hủy
                  </button>
                  <button type="submit" className="save-btn">
                    {editingAddress ? 'Cập nhật' : 'Lưu địa chỉ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {selectedAddress && (
        <div className="delivery-section">
          <h3 className="section-title">Thời gian giao hàng</h3>
          
          <div className="schedule-form">
            <div className="form-group">
              <label>Ngày giao hàng *</label>
              <select
                name="day"
                value={deliverySchedule.day}
                onChange={handleScheduleChange}
                required
              >
                <option value="">Chọn ngày</option>
                {days.map((day) => (
                  <option key={day.id} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Khung giờ giao hàng *</label>
              <div className="time-slot-grid">
                {timeSlots.map((slot) => (
                  <label 
                    key={slot.id}
                    className={`time-slot-option ${deliverySchedule.timeSlot === slot.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={deliverySchedule.timeSlot === slot.id}
                      onChange={handleScheduleChange}
                      required
                    />
                    <span>{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Tần suất giao hàng</label>
              <select
                name="frequency"
                value={deliverySchedule.frequency}
                onChange={handleScheduleChange}
              >
                <option value="once">Giao một lần</option>
                <option value="weekly">Giao hàng tuần</option>
                <option value="biweekly">Giao hàng 2 tuần/lần</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Xác nhận xóa địa chỉ"
        message={`Bạn có chắc chắn muốn xóa địa chỉ "${confirmDialog.addressName}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
};

export default DeliveryForm;


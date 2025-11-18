// Delivery service for managing delivery addresses and time slots
class DeliveryService {
  constructor() {
    this.deliveryAreas = [
      { district: 'Quận 1', fee: 0, available: true },
      { district: 'Quận 2', fee: 15000, available: true },
      { district: 'Quận 3', fee: 0, available: true },
      { district: 'Quận 4', fee: 10000, available: true },
      { district: 'Quận 5', fee: 0, available: true },
      { district: 'Quận 6', fee: 20000, available: true },
      { district: 'Quận 7', fee: 25000, available: true },
      { district: 'Quận 8', fee: 20000, available: true },
      { district: 'Quận 9', fee: 30000, available: true },
      { district: 'Quận 10', fee: 0, available: true },
      { district: 'Quận 11', fee: 15000, available: true },
      { district: 'Quận 12', fee: 25000, available: true },
      { district: 'Bình Thạnh', fee: 20000, available: true },
      { district: 'Tân Bình', fee: 15000, available: true },
      { district: 'Tân Phú', fee: 20000, available: true },
      { district: 'Phú Nhuận', fee: 15000, available: true },
      { district: 'Gò Vấp', fee: 25000, available: true },
      { district: 'Thủ Đức', fee: 30000, available: true },
    ];

    this.timeSlots = [
      { id: 'morning', label: '9:00 - 12:00', start: 9, end: 12 },
      { id: 'afternoon', label: '14:00 - 18:00', start: 14, end: 18 },
      { id: 'evening', label: '18:00 - 21:00', start: 18, end: 21 },
    ];

    this.deliveryDays = [
      { id: 'mon', label: 'Thứ 2', value: 1 },
      { id: 'tue', label: 'Thứ 3', value: 2 },
      { id: 'wed', label: 'Thứ 4', value: 3 },
      { id: 'thu', label: 'Thứ 5', value: 4 },
      { id: 'fri', label: 'Thứ 6', value: 5 },
      { id: 'sat', label: 'Thứ 7', value: 6 },
      { id: 'sun', label: 'Chủ nhật', value: 0 },
    ];

    this.addresses = [];
    this.loadAddresses();
  }

  loadAddresses() {
    try {
      const addressesData = localStorage.getItem('freshkit_delivery_addresses');
      if (addressesData) {
        this.addresses = JSON.parse(addressesData);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      this.addresses = [];
    }
  }

  saveAddresses() {
    try {
      localStorage.setItem('freshkit_delivery_addresses', JSON.stringify(this.addresses));
    } catch (error) {
      console.error('Error saving addresses:', error);
    }
  }

  getDeliveryFee(district) {
    const area = this.deliveryAreas.find(a => 
      a.district.toLowerCase() === district.toLowerCase()
    );
    return area ? area.fee : 30000; // Default fee if not found
  }

  isDeliveryAvailable(district) {
    const area = this.deliveryAreas.find(a => 
      a.district.toLowerCase() === district.toLowerCase()
    );
    return area ? area.available : false;
  }

  getDeliveryAreas() {
    return this.deliveryAreas;
  }

  getTimeSlots() {
    return this.timeSlots;
  }

  getDeliveryDays() {
    return this.deliveryDays;
  }

  addAddress(addressData) {
    const newAddress = {
      id: Date.now(),
      ...addressData,
      createdAt: new Date().toISOString(),
      isDefault: this.addresses.length === 0 // First address is default
    };

    // If this is set as default, unset others
    if (newAddress.isDefault) {
      this.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    this.addresses.push(newAddress);
    this.saveAddresses();
    return newAddress;
  }

  updateAddress(addressId, updates) {
    const index = this.addresses.findIndex(addr => addr.id === addressId);
    if (index !== -1) {
      // If setting as default, unset others
      if (updates.isDefault) {
        this.addresses.forEach(addr => {
          addr.isDefault = false;
        });
      }
      this.addresses[index] = { ...this.addresses[index], ...updates };
      this.saveAddresses();
      return this.addresses[index];
    }
    return null;
  }

  deleteAddress(addressId) {
    this.addresses = this.addresses.filter(addr => addr.id !== addressId);
    this.saveAddresses();
    return this.addresses;
  }

  getAddresses() {
    return this.addresses;
  }

  getDefaultAddress() {
    return this.addresses.find(addr => addr.isDefault) || this.addresses[0] || null;
  }

  setDefaultAddress(addressId) {
    this.addresses.forEach(addr => {
      addr.isDefault = addr.id === addressId;
    });
    this.saveAddresses();
  }
}

const deliveryService = new DeliveryService();

export default deliveryService;


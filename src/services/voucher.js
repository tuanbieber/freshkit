// Voucher/Discount code service
class VoucherService {
  constructor() {
    this.vouchers = [
      {
        code: 'WELCOME10',
        discount: 10,
        type: 'percent', // percent or fixed
        minOrder: 100000,
        maxDiscount: 50000,
        description: 'Giảm 10% cho đơn hàng đầu tiên',
        validFrom: '2024-01-01',
        validTo: '2025-12-31',
        firstOrderOnly: true,
        used: false
      },
      {
        code: 'SAVE50K',
        discount: 50000,
        type: 'fixed',
        minOrder: 200000,
        maxDiscount: 50000,
        description: 'Giảm 50.000đ cho đơn từ 200.000đ',
        validFrom: '2024-01-01',
        validTo: '2025-12-31',
        firstOrderOnly: false,
        used: false
      },
      {
        code: 'FRESH20',
        discount: 20,
        type: 'percent',
        minOrder: 300000,
        maxDiscount: 100000,
        description: 'Giảm 20% tối đa 100.000đ cho đơn từ 300.000đ',
        validFrom: '2024-01-01',
        validTo: '2025-12-31',
        firstOrderOnly: false,
        used: false
      },
      {
        code: 'NEWUSER',
        discount: 15,
        type: 'percent',
        minOrder: 0,
        maxDiscount: 75000,
        description: 'Giảm 15% cho người dùng mới',
        validFrom: '2024-01-01',
        validTo: '2025-12-31',
        firstOrderOnly: true,
        used: false
      }
    ];
  }

  validateVoucher(code, orderTotal, isFirstOrder = false) {
    const voucher = this.vouchers.find(v => v.code.toUpperCase() === code.toUpperCase());
    
    if (!voucher) {
      return {
        valid: false,
        error: 'Mã giảm giá không tồn tại'
      };
    }

    // Check expiration
    const now = new Date();
    const validFrom = new Date(voucher.validFrom);
    const validTo = new Date(voucher.validTo);
    
    if (now < validFrom || now > validTo) {
      return {
        valid: false,
        error: 'Mã giảm giá đã hết hạn'
      };
    }

    // Check minimum order
    if (orderTotal < voucher.minOrder) {
      return {
        valid: false,
        error: `Đơn hàng tối thiểu ${voucher.minOrder.toLocaleString('vi-VN')}đ để áp dụng mã này`
      };
    }

    // Check first order only
    if (voucher.firstOrderOnly && !isFirstOrder) {
      return {
        valid: false,
        error: 'Mã này chỉ áp dụng cho đơn hàng đầu tiên'
      };
    }

    // Calculate discount
    let discountAmount = 0;
    if (voucher.type === 'percent') {
      discountAmount = (orderTotal * voucher.discount) / 100;
      if (discountAmount > voucher.maxDiscount) {
        discountAmount = voucher.maxDiscount;
      }
    } else {
      discountAmount = voucher.discount;
    }

    return {
      valid: true,
      voucher: voucher,
      discountAmount: discountAmount,
      message: voucher.description
    };
  }

  getVoucher(code) {
    return this.vouchers.find(v => v.code.toUpperCase() === code.toUpperCase());
  }
}

const voucherService = new VoucherService();

export default voucherService;


// Cart service for managing shopping cart
class CartService {
  constructor() {
    this.cart = [];
    this.listeners = [];
    
    // Load cart from localStorage on initialization
    this.loadCart();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const cartData = localStorage.getItem('freshkit_cart');
      if (cartData) {
        this.cart = JSON.parse(cartData);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cart = [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('freshkit_cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Subscribe to cart changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of cart changes
  notify() {
    this.listeners.forEach(listener => listener(this.cart));
  }

  // Add item to cart
  addItem(item) {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      this.cart.push({
        ...item,
        quantity: item.quantity || 1
      });
    }
    
    this.saveCart();
    this.notify();
    return this.cart;
  }

  // Remove item from cart
  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
    this.notify();
    return this.cart;
  }

  // Update item quantity
  updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }
    
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.notify();
    }
    return this.cart;
  }

  // Get cart items
  getItems() {
    return this.cart;
  }

  // Get total items count
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.notify();
    return this.cart;
  }

  // Check if cart is empty
  isEmpty() {
    return this.cart.length === 0;
  }
}

// Create singleton instance
const cartService = new CartService();

export default cartService;


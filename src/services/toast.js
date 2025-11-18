// Toast notification service
class ToastService {
  constructor() {
    this.toasts = [];
    this.listeners = [];
    this.toastId = 0;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  show(message, type = 'success', duration = 3000) {
    const id = ++this.toastId;
    const toast = {
      id,
      message,
      type,
      duration
    };

    this.toasts.push(toast);
    this.notify();

    return id;
  }

  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 3000) {
    return this.show(message, 'error', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  remove(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

const toastService = new ToastService();

export default toastService;


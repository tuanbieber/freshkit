import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import toastService from '../services/toast';
import './Toast.css';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastService.subscribe((newToasts) => {
      setToasts(newToasts);
    });

    return () => unsubscribe();
  }, []);

  if (toasts.length === 0) return null;

  const handleClose = (id) => {
    toastService.remove(id);
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => handleClose(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;


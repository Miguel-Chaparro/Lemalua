import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ToastNotification() {
  const { toast, setToast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      
      const dismissTimer = setTimeout(() => {
        setVisible(false);
        // Wait for slide-out animation to complete before clearing state
        setTimeout(() => setToast(null), 300);
      }, 3000);

      return () => clearTimeout(dismissTimer);
    }
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-surface-container/90 backdrop-blur-xl border border-secondary/30 shadow-2xl p-4 rounded-lg flex items-center gap-4 pointer-events-auto"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="alert"
    >
      {toast.image && (
        <div className="w-12 h-12 flex-shrink-0 bg-background/50 border border-outline-variant/30 rounded p-1 flex items-center justify-center">
          <img src={toast.image} alt="" className="max-h-full max-w-full object-contain" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-secondary">
          <span className="material-symbols-outlined text-sm font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="font-label-sm text-[11px] uppercase tracking-wider font-semibold">Añadido con éxito</span>
        </div>
        <p className="font-body-md text-sm text-on-surface truncate mt-0.5">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => setToast(null), 300);
        }}
        className="text-on-surface-variant hover:text-secondary p-1 rounded-full transition-colors flex items-center justify-center"
        aria-label="Cerrar notificación"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}

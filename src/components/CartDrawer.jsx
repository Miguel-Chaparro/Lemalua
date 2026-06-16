import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-surface-container-low border-l border-outline-variant/30 flex flex-col z-10 shadow-2xl animate-[slideIn_0.3s_ease-out]">
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-sm text-on-surface uppercase tracking-wider">
            Su Bodega
          </h2>
          <button 
            onClick={onClose}
            className="hover:bg-surface-variant/20 p-2 rounded-full transition-all text-secondary flex items-center justify-center"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="material-symbols-outlined text-outline-variant text-5xl">
                shopping_bag
              </span>
              <p className="font-body-lg text-on-surface-variant">
                Su selección de compras está vacía.
              </p>
              <button 
                onClick={onClose}
                className="text-secondary font-label-md uppercase tracking-widest border-b border-secondary pb-1 hover:opacity-80 transition-opacity"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 bg-surface/50 border border-outline-variant/10 p-3 rounded-lg group"
                >
                  <div className="w-20 h-20 bg-surface flex-shrink-0 flex items-center justify-center p-2 rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-label-md text-on-surface truncate">{item.name}</h4>
                    <p className="text-secondary text-sm font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-outline-variant/30 text-on-surface-variant hover:text-secondary hover:border-secondary flex items-center justify-center rounded text-sm transition-all"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold select-none">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-outline-variant/30 text-on-surface-variant hover:text-secondary hover:border-secondary flex items-center justify-center rounded text-sm transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-outline hover:text-error transition-colors flex items-center justify-center p-1"
                    title="Eliminar producto"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-outline-variant/20 bg-surface-container-lowest/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-label-md text-on-surface-variant uppercase tracking-widest">Subtotal</span>
              <span className="font-headline-sm text-secondary">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={clearCart}
                className="py-3 border border-outline-variant text-on-surface-variant hover:text-error hover:border-error text-center font-label-md uppercase tracking-wider transition-all rounded active:scale-95"
              >
                Vaciar Carrito
              </button>
              <button 
                onClick={() => alert('¡Procesando pedido! Esta pasarela de pagos se integrará en la siguiente fase.')}
                className="py-3 bg-secondary text-primary-container hover:bg-secondary-fixed text-center font-label-md uppercase tracking-widest font-bold transition-all rounded active:scale-95 shadow-lg shadow-secondary/10"
              >
                Pagar
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant/40 text-center uppercase tracking-widest">
              Envío a domicilio gratis por compras mayores a $100
            </p>
          </div>
        )}
      </div>
      
      {/* Inject Keyframe animation into document */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

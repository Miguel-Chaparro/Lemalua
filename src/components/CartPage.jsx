import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 100;

export default function CartPage({ onClose }) {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const discountedSubtotal = cartTotal - discount;
  const taxes = discountedSubtotal * TAX_RATE;
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
  const orderTotal = discountedSubtotal + taxes + shipping;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === 'LEMALUA10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Código no válido. Intenta con LEMALUA10');
    }
  };

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 400);
  };

  const handleCheckout = () => {
    // Persist the final order snapshot to localStorage
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      subtotal: cartTotal.toFixed(2),
      discount: discount.toFixed(2),
      taxes: taxes.toFixed(2),
      shipping: shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`,
      total: orderTotal.toFixed(2),
    };
    const prevOrders = JSON.parse(localStorage.getItem('lemalua_orders') || '[]');
    localStorage.setItem('lemalua_orders', JSON.stringify([...prevOrders, order]));
    clearCart();
    setCheckoutDone(true);
  };

  // ─── Checkout Confirmation Screen ───────────────────────────────────────────
  if (checkoutDone) {
    return (
      <div className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="fade-in space-y-6 max-w-md">
          <span
            className="material-symbols-outlined text-secondary block"
            style={{ fontSize: 72, fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            ¡Pedido Confirmado!
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Tu selección ha sido registrada. Recibirás una confirmación en breve.
          </p>
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            Tu pedido ha sido guardado en el historial local.
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-transparent border border-secondary text-secondary px-10 py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-secondary/10 transition-all duration-300"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    );
  }

  // ─── Main Cart Page ──────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9998] bg-background overflow-y-auto">
      {/* Ambient top glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />

      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-5 md:px-margin-desktop py-base max-w-container-max mx-auto">
          <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase tracking-widest select-none">
            Lemalua
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-label-md uppercase tracking-widest"
            id="btn-back-to-shop"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Seguir comprando
          </button>
        </div>
      </nav>

      {/* ─── Page Content ─── */}
      <main className="pb-margin-desktop px-5 md:px-margin-desktop max-w-container-max mx-auto pt-10 relative z-10">
        {/* Page Header */}
        <div className="fade-in mb-10 border-b border-outline-variant/20 pb-4 flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Revisión de pedido</span>
            <h1 className="font-headline-md text-headline-md text-on-surface mt-1">Tu Selección</h1>
          </div>
          <span className="font-label-md text-label-md text-secondary uppercase tracking-widest hidden sm:block">
            {cart.reduce((t, i) => t + i.quantity, 0)} {cart.reduce((t, i) => t + i.quantity, 0) === 1 ? 'Elemento' : 'Elementos'}
          </span>
        </div>

        {/* ─── Empty state ─── */}
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-6 fade-in">
            <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: 64 }}>
              shopping_bag
            </span>
            <p className="font-body-lg text-on-surface-variant">Tu carrito está vacío.</p>
            <button
              onClick={onClose}
              className="border border-secondary text-secondary px-8 py-3 font-label-md uppercase tracking-widest hover:bg-secondary/10 transition-all duration-300"
            >
              Volver a la tienda
            </button>
          </div>
        )}

        {/* ─── Two Column Layout ─── */}
        {cart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-margin-desktop">

            {/* ── Left: Cart Items ── */}
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-6 max-h-[68vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row gap-6 group border-b border-outline-variant/10 pb-6 transition-all duration-400 ease-out ${
                      removingId === item.id
                        ? 'opacity-0 -translate-x-8'
                        : 'opacity-100 translate-x-0'
                    }`}
                    style={{
                      animation: `slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s both`,
                    }}
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-44 h-52 sm:h-44 bg-surface-container overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        style={{ opacity: 0, transition: 'opacity 0.8s ease' }}
                        onLoad={(e) => { e.target.style.opacity = '1'; }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-label-md text-label-md text-on-surface whitespace-nowrap">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                            {item.description}
                          </p>
                        )}

                        {/* Unit Price */}
                        <p className="font-label-sm text-label-sm text-secondary mt-1 uppercase tracking-wider">
                          ${item.price.toFixed(2)} / unidad
                        </p>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 border border-outline-variant text-[10px] uppercase font-label-sm text-on-surface-variant"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-6">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-outline-variant/30 rounded-lg bg-surface-container-low overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all active:bg-secondary/10"
                            id={`btn-dec-${item.id}`}
                            aria-label="Disminuir cantidad"
                          >
                            <span className="material-symbols-outlined text-base">remove</span>
                          </button>
                          <span className="px-5 font-label-md text-on-surface select-none min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all active:bg-secondary/10"
                            id={`btn-inc-${item.id}`}
                            aria-label="Aumentar cantidad"
                          >
                            <span className="material-symbols-outlined text-base">add</span>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-all duration-300 group/del"
                          id={`btn-remove-${item.id}`}
                        >
                          <span className="material-symbols-outlined text-base group-hover/del:rotate-12 transition-transform duration-300">delete</span>
                          <span className="font-label-sm text-label-sm hidden sm:inline">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear cart */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-on-surface-variant/60 hover:text-error font-label-sm text-label-sm uppercase tracking-widest transition-colors duration-200 flex items-center gap-1"
                  id="btn-clear-cart"
                >
                  <span className="material-symbols-outlined text-sm">delete_sweep</span>
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-4">
              <div
                className="sticky top-24 p-8 bg-surface-container border border-outline-variant/20 rounded-lg shadow-2xl fade-in space-y-6"
                style={{ animationDelay: '0.3s' }}
              >
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Resumen del Pedido
                </h2>

                {/* Line Items */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
                    <span className="font-body-md text-body-md text-on-surface">${cartTotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-secondary">
                      <span className="font-body-md text-body-md">Descuento (10%)</span>
                      <span className="font-body-md text-body-md">−${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">Envío</span>
                    <span className={`font-body-md text-body-md ${shipping === 0 ? 'text-secondary' : 'text-on-surface'}`}>
                      {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">Impuestos (8%)</span>
                    <span className="font-body-md text-body-md text-on-surface">${taxes.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-outline-variant/30 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Total</span>
                    <span className="font-headline-sm text-headline-sm text-secondary">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2" htmlFor="promo-input">
                    Código de Descuento
                  </label>
                  <div className="flex border-b border-outline-variant/50 focus-within:border-secondary transition-colors">
                    <input
                      id="promo-input"
                      type="text"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                      placeholder="Escribe tu código..."
                      className="bg-transparent border-none focus:ring-0 w-full py-2 font-body-md text-on-surface placeholder:text-outline/40 outline-none"
                    />
                    <button
                      onClick={handlePromo}
                      className="px-4 py-2 font-label-md text-label-md text-secondary hover:opacity-70 transition-all uppercase"
                      id="btn-apply-promo"
                    >
                      Aplicar
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-secondary font-label-sm text-label-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      10% aplicado
                    </p>
                  )}
                  {promoError && (
                    <p className="text-error font-label-sm text-label-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  id="btn-checkout"
                  className="w-full bg-[#1c1c1c] border border-secondary text-secondary py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-secondary/10 active:opacity-80 transition-all duration-300 relative group overflow-hidden rounded-sm"
                >
                  <span className="relative z-10">Finalizar Compra</span>
                  <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

                {/* Shipping Notice */}
                {shipping > 0 && (
                  <p className="text-center font-label-sm text-label-sm text-on-surface-variant/60">
                    Añade <span className="text-secondary">${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}</span> más para envío gratis.
                  </p>
                )}

                {/* Security Badge */}
                <p className="text-center font-label-sm text-label-sm text-on-surface-variant/50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Transacción Segura y Encriptada
                </p>

                {/* Product count summary */}
                <div className="border-t border-outline-variant/10 pt-4 space-y-2">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                    Resumen de productos
                  </p>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-1">
                      <div className="w-8 h-8 rounded overflow-hidden bg-surface-container flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="flex-1 font-label-sm text-label-sm text-on-surface-variant truncate">{item.name}</span>
                      <span className="font-label-sm text-label-sm text-secondary">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── Keyframe styles ─── */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e2020; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e9c176; border-radius: 2px; }
      `}</style>
    </div>
  );
}

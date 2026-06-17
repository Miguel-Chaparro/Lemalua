import React, { useEffect, useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';

/**
 * ProductModal — Premium animated product detail modal.
 * Props:
 *   product  — the product object to display (null = closed)
 *   onClose  — callback to close the modal
 */
export default function ProductModal({ product, onClose }) {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ── Determine if this product is already in the cart ──
  const cartItem = cart.find((i) => i.id === product?.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  // ── Animate in on mount ──
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdded(false);
      setImageLoaded(false);
      requestAnimationFrame(() => setVisible(true));
    }
  }, [product]);

  // ── Close on Escape key ──
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Lock body scroll ──
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [product]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return null;

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  // Build star icons
  const renderStars = (rating) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(rating);
      const half = !filled && i < rating;
      return (
        <span
          key={i}
          className="material-symbols-outlined text-secondary text-base"
          style={{ fontVariationSettings: filled ? "'FILL' 1" : half ? "'FILL' 0.5" : "'FILL' 0" }}
        >
          {filled ? 'star' : half ? 'star_half' : 'star_outline'}
        </span>
      );
    });
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-[9990] transition-all duration-350 ease-out"
        style={{
          backgroundColor: visible ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0)',
          backdropFilter: visible ? 'blur(12px)' : 'blur(0px)',
          WebkitBackdropFilter: visible ? 'blur(12px)' : 'blur(0px)',
        }}
        onClick={handleClose}
      />

      {/* ── Modal Panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${product.name}`}
        className="fixed inset-0 z-[9991] flex items-center justify-center p-4 md:p-8 pointer-events-none"
      >
        <div
          className="pointer-events-auto relative w-full max-w-4xl bg-surface-container border border-outline-variant/20 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
            transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            maxHeight: '90vh',
          }}
        >
          {/* ── Close button ── */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-secondary hover:bg-surface-variant transition-all duration-200"
            id="modal-close-btn"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          {/* ── Image Panel ── */}
          <div className="relative md:w-5/12 bg-surface-container-lowest flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[500px]">
            {/* Decorative glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-56 h-56 rounded-full bg-secondary/10 blur-3xl"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 1s ease',
                }}
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-5 left-5 z-10 bg-secondary text-primary-container font-label-sm text-label-sm px-3 py-1 uppercase tracking-widest">
                {product.badge}
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 max-h-full w-full object-cover md:object-contain p-0 md:p-10"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transform: imageLoaded ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none" />
          </div>

          {/* ── Details Panel ── */}
          <div className="flex-1 flex flex-col p-7 md:p-10 overflow-y-auto">

            {/* Category + Rating */}
            <div
              className="flex items-center justify-between mb-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.45s 0.1s ease, transform 0.45s 0.1s ease',
              }}
            >
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                {product.category || 'Espirituoso Premium'}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">
                    ({product.rating})
                  </span>
                </div>
              )}
            </div>

            {/* Product Name */}
            <h2
              className="font-headline-md text-headline-md text-on-surface mb-3 leading-tight"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.45s 0.15s ease, transform 0.45s 0.15s ease',
              }}
            >
              {product.name}
            </h2>

            {/* Description */}
            <p
              className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.45s 0.2s ease, transform 0.45s 0.2s ease',
              }}
            >
              {product.description || 'Un espirituoso excepcional, elaborado con los más altos estándares de artesanía.'}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mb-6"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.45s 0.25s ease',
                }}
              >
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border border-outline-variant/40 text-[11px] uppercase font-label-sm text-on-surface-variant tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div
              className="border-t border-outline-variant/20 mb-6"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.45s 0.3s ease' }}
            />

            {/* Price Block */}
            <div
              className="flex items-end gap-4 mb-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.45s 0.32s ease, transform 0.45s 0.32s ease',
              }}
            >
              <span className="font-headline-md text-headline-md text-secondary">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="font-body-md text-body-md text-on-surface-variant/50 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="bg-secondary/10 text-secondary font-label-sm text-label-sm px-2 py-0.5 uppercase tracking-wider">
                    −{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div
              className="mt-auto space-y-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.45s 0.35s ease, transform 0.45s 0.35s ease',
              }}
            >
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-outline-variant/40 rounded-lg bg-surface-container-low overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all active:bg-secondary/10"
                    id="modal-qty-dec"
                    aria-label="Disminuir cantidad"
                  >
                    <span className="material-symbols-outlined text-base">remove</span>
                  </button>
                  <span className="px-5 font-label-md text-on-surface select-none min-w-[3rem] text-center text-base font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all active:bg-secondary/10"
                    id="modal-qty-inc"
                    aria-label="Aumentar cantidad"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                  </button>
                </div>

                {/* Cart Badge (current qty in cart) */}
                {cartQty > 0 && (
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shopping_cart
                    </span>
                    {cartQty} en el carrito
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                id="modal-add-to-cart"
                className={`w-full py-4 font-label-md text-label-md uppercase tracking-widest border transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-3 ${
                  added
                    ? 'bg-secondary/15 border-secondary text-secondary'
                    : 'bg-transparent border-secondary text-secondary hover:bg-secondary/10 active:opacity-80'
                }`}
              >
                {/* Shimmer sweep animation */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-secondary/10 to-transparent pointer-events-none" />

                <span
                  className="material-symbols-outlined text-base relative z-10 transition-transform duration-300"
                  style={{ fontVariationSettings: added ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {added ? 'check_circle' : 'add_shopping_cart'}
                </span>
                <span className="relative z-10">
                  {added ? `¡${quantity > 1 ? `${quantity} unidades` : 'Producto'} añadido!` : `Añadir al carrito · $${(product.price * quantity).toFixed(2)}`}
                </span>
              </button>

              {/* Secure badge */}
              <p className="text-center font-label-sm text-label-sm text-on-surface-variant/40 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                Compra segura · Solo para mayores de 18 años
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes modalShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
}

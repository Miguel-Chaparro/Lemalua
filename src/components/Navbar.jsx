import React from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart, onOpenAuth }) {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl z-50 border-b border-outline-variant/30">
      <nav className="flex justify-between items-center px-4 md:px-margin-desktop py-base max-w-container-max mx-auto">
        <div className="flex items-center gap-12">
          <span 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase tracking-widest cursor-pointer select-none"
          >
            Lemalua
          </span>
          <div className="hidden md:flex gap-8 items-center">
            <a 
              className="font-label-md text-label-md text-secondary border-b border-secondary pb-1 transition-colors" 
              href="#shop"
            >
              Shop
            </a>
            <a 
              className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" 
              href="#promotions"
            >
              Promotions
            </a>
            <a 
              className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" 
              href="#most-wanted"
            >
              Top Sellers
            </a>
            <a 
              className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" 
              href="#story"
            >
              Our Heritage
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Auth Button */}
          <button 
            onClick={onOpenAuth}
            className="hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full flex items-center justify-center text-secondary"
            title="Iniciar sesión"
          >
            <span className="material-symbols-outlined">person</span>
          </button>
          
          <button className="hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined" data-icon="search">search</span>
          </button>
          
          <button 
            onClick={onOpenCart}
            className="hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full relative flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-secondary" data-icon="shopping_cart">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-primary-container text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-300 scale-100">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

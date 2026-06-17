import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lemalua.72',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61590489476352',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@lemalua72',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.89-.97-1.21-1.54v8.57c0 1.57-.44 3.14-1.33 4.43-1.64 2.44-4.8 3.42-7.51 2.37-2.73-1.07-4.37-3.95-3.91-6.86.37-2.37 2.1-4.36 4.46-4.87.8-.17 1.62-.17 2.42-.01v4.14c-.81-.23-1.74-.1-2.45.39-.93.63-1.25 1.87-.77 2.87.4 1.05 1.58 1.66 2.67 1.39.87-.21 1.52-.97 1.55-1.87V.02z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@Lemalua',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

const navLinks = [
  { label: 'Shop', to: '/catalogo', isRoute: true },
  { label: 'Promociones', to: '/promociones', isRoute: true },
  { label: 'Top Sellers', to: '/top-sellers', isRoute: true },
  { label: 'Nuestra Historia', to: '/historia', isRoute: true },
];

export default function Navbar({ onOpenCart, onOpenAuth }) {
  const { cartCount } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú cuando cambia la ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloquea scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl z-50 border-b border-outline-variant/30">
        <nav className="flex justify-between items-center px-4 md:px-margin-desktop py-4 md:py-base max-w-container-max mx-auto">

          {/* Logo */}
          <Link
            to="/"
            className="font-display-lg text-2xl md:text-display-lg text-on-surface uppercase tracking-widest cursor-pointer select-none"
          >
            Lemalua
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`font-label-md text-label-md transition-colors ${
                  isActive(link.to)
                    ? 'text-secondary border-b border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Auth — oculto en mobile */}
            <button
              onClick={onOpenAuth}
              className="hidden md:flex hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full items-center justify-center text-secondary"
              title="Iniciar sesión"
            >
              <span className="material-symbols-outlined">person</span>
            </button>

            {/* Search — oculto en mobile */}
            <button className="hidden md:flex hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full items-center justify-center text-secondary">
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Cart — siempre visible */}
            <button
              onClick={onOpenCart}
              className="hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full relative flex items-center justify-center"
              title="Carrito de compras"
            >
              <span className="material-symbols-outlined text-secondary">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary-container text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger — solo mobile */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden hover:bg-surface-variant/10 p-2 transition-all duration-300 rounded-full flex items-center justify-center text-secondary"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="material-symbols-outlined">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`absolute inset-0 flex flex-col justify-between px-8 pt-28 pb-12 transition-transform duration-300 ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {/* Navigation links */}
          <nav className="space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                className={`block py-4 border-b border-outline-variant/10 transition-all duration-200 group ${
                  isActive(link.to) ? 'text-secondary' : 'text-on-surface'
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display-lg text-3xl uppercase tracking-wide group-hover:text-secondary transition-colors">
                    {link.label}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Bottom section: acciones + redes */}
          <div className="space-y-8">
            {/* Auth + Search en mobile */}
            <div className="flex gap-4">
              <button
                onClick={() => { onOpenAuth(); setMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary transition-all font-label-md uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                Mi cuenta
              </button>
              <button
                onClick={() => { onOpenCart(); setMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-white transition-all relative"
              >
                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                Carrito
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 bg-background text-secondary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Separador */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-outline-variant/20" />
              <span className="text-on-surface-variant/40 text-xs uppercase tracking-widest">Síguenos</span>
              <div className="flex-1 h-px bg-outline-variant/20" />
            </div>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-8">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors group"
                >
                  <span className="p-3 rounded-full border border-outline-variant/20 group-hover:border-secondary/50 transition-colors">
                    {s.icon}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

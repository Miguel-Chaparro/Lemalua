import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const socialLinks = {
    instagram: 'https://www.instagram.com/lemalua.72',
    facebook: 'https://www.facebook.com/profile.php?id=61590489476352',
    tiktok: 'https://www.tiktok.com/@lemalua72',
    youtube: 'https://www.youtube.com/@Lemalua'
  };

  return (
    <footer className="bg-surface-container-lowest text-on-surface-variant border-t border-outline-variant/20 pt-margin-tablet pb-12">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-20">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <span className="font-headline-md text-headline-md text-on-surface block uppercase tracking-widest">
              Lemalua
            </span>
            <p className="font-body-md text-on-surface-variant">
              Destilando la esencia de lo extraordinario desde 1920. Nuestra pasión es la búsqueda incesante de la perfección en cada gota.
            </p>
            {/* Social Icons row */}
            <div className="flex gap-4">
              <a 
                className="hover:text-secondary text-on-surface-variant transition-colors" 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a 
                className="hover:text-secondary text-on-surface-variant transition-colors" 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a 
                className="hover:text-secondary text-on-surface-variant transition-colors" 
                href={socialLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.89-.97-1.21-1.54v8.57c0 1.57-.44 3.14-1.33 4.43-1.64 2.44-4.8 3.42-7.51 2.37-2.73-1.07-4.37-3.95-3.91-6.86.37-2.37 2.1-4.36 4.46-4.87.8-.17 1.62-.17 2.42-.01v4.14c-.81-.23-1.74-.1-2.45.39-.93.63-1.25 1.87-.77 2.87.4 1.05 1.58 1.66 2.67 1.39.87-.21 1.52-.97 1.55-1.87V.02z"/>
                </svg>
              </a>
              <a 
                className="hover:text-secondary text-on-surface-variant transition-colors" 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-6">Navegación</h4>
            <ul className="space-y-4">
              <li>
                <a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#story">
                  About Us
                </a>
              </li>
              <li>
                <a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#shop">
                  Shop All
                </a>
              </li>
              <li>
                <a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#promotions">
                  Gift Guide
                </a>
              </li>
              <li>
                <a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#help">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-6">Social</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  className="font-body-md text-on-surface-variant hover:text-secondary transition-colors inline-flex items-center gap-2" 
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>
              </li>
              <li>
                <a 
                  className="font-body-md text-on-surface-variant hover:text-secondary transition-colors inline-flex items-center gap-2" 
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>
              </li>
              <li>
                <a 
                  className="font-body-md text-on-surface-variant hover:text-secondary transition-colors inline-flex items-center gap-2" 
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tiktok <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>
              </li>
              <li>
                <a 
                  className="font-body-md text-on-surface-variant hover:text-secondary transition-colors inline-flex items-center gap-2" 
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="font-body-md text-on-surface-variant mb-4">Reciba noticias sobre lanzamientos exclusivos.</p>
            {submitted ? (
              <div className="text-secondary font-label-sm uppercase tracking-wider py-2 transition-opacity">
                ¡Gracias por suscribirse!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <input 
                  className="bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface px-0 py-2 placeholder:text-on-surface-variant/40 outline-none" 
                  placeholder="Correo electrónico" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="bg-secondary text-background font-label-md uppercase tracking-widest py-3 hover:bg-white hover:text-background transition-colors duration-300"
                >
                  Suscribirse
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="px-0 py-8 border-t border-outline-variant/10 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body-md text-body-md text-on-surface-variant">
            © 2024 Lemalua Spirits. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" href="#privacy">
              Privacy Policy
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" href="#terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

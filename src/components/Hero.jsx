import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lemalua.72',
    color: 'hover:text-[#E1306C]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61590489476352',
    color: 'hover:text-[#1877F2]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@lemalua72',
    color: 'hover:text-white',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.89-.97-1.21-1.54v8.57c0 1.57-.44 3.14-1.33 4.43-1.64 2.44-4.8 3.42-7.51 2.37-2.73-1.07-4.37-3.95-3.91-6.86.37-2.37 2.1-4.36 4.46-4.87.8-.17 1.62-.17 2.42-.01v4.14c-.81-.23-1.74-.1-2.45.39-.93.63-1.25 1.87-.77 2.87.4 1.05 1.58 1.66 2.67 1.39.87-.21 1.52-.97 1.55-1.87V.02z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@Lemalua',
    color: 'hover:text-[#FF0000]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Fondo parallax */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20 z-10" />
        <img
          alt="Premium Whiskey"
          className="w-full h-full object-cover select-none"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCteoCSSSYtgwAoih1kcgD0yA9RVDBiqLo7qKmqUjth6PryYHbu7-Hqs1t8ear6X_wfMaYirDThWRqnrzTMkqa6DNi-ICek94BJA-F6kBbOAL4i71lPiGD1pZLwq26_IDHkgoxxo-zb-RmDFqtdGFlQb0ygsnw1nfgA5R4zxiCVAnkJhYrSW5qs6cw-Yh79y3rE-4xTt5gf7n5tlAjFAnInii1h5bbF1tHdCdAh_sW0PCWD7bvq-pSObdZ0t0kNii9QrSg1daPWg8s"
        />
      </div>

      {/* ── DESKTOP: redes sociales fijas en el lado derecho ── */}
      <div className="hidden md:flex absolute right-0 top-0 h-full z-20 flex-col items-center justify-center gap-0 pr-6">
        {/* Línea decorativa superior */}
        <div className="w-px flex-1 max-h-24 bg-gradient-to-b from-transparent to-secondary/30" />

        {/* Label vertical */}
        <div
          className="my-4 text-on-surface-variant/40 text-[9px] uppercase tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Síguenos
        </div>

        {/* Íconos con tooltip */}
        <div className="flex flex-col gap-2">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background/30 backdrop-blur-sm text-white/60 ${s.color} hover:border-white/30 hover:bg-background/60 transition-all duration-300 hover:scale-110`}
            >
              {s.icon}
              {/* Tooltip a la izquierda */}
              <span className="absolute right-12 whitespace-nowrap bg-surface-container/90 backdrop-blur text-on-surface text-xs font-medium px-2.5 py-1 rounded border border-outline-variant/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {s.name}
              </span>
            </a>
          ))}
        </div>

        {/* Línea decorativa inferior */}
        <div className="w-px flex-1 max-h-24 bg-gradient-to-b from-secondary/30 to-transparent" />
      </div>

      {/* ── Contenido principal ── */}
      <div className="relative z-20 px-4 md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-2xl space-y-8">
          <span className="font-label-md text-label-md text-secondary tracking-[0.2em] uppercase block">
            Edición Limitada de Herencia
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
            La esencia del <br />
            <span className="italic text-secondary">tiempo destilado.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Descubra una selección curada de los espirituosos más finos del mundo, elegidos por su carácter excepcional y artesanía inigualable.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/catalogo"
              className="px-10 py-4 bg-transparent border border-secondary text-secondary font-label-md uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300 active:opacity-80 inline-block text-center"
            >
              Explorar Colección
            </Link>
            <Link
              to="/historia"
              className="px-10 py-4 text-secondary font-label-md uppercase tracking-widest flex items-center gap-2 group border-b border-transparent hover:border-secondary transition-all"
            >
              Nuestra Historia
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* ── MOBILE: redes sociales debajo de los CTAs ── */}
          <div className="flex md:hidden items-center gap-3 pt-2">
            <span className="text-on-surface-variant/40 text-[10px] uppercase tracking-widest shrink-0">
              Síguenos
            </span>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className={`flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-background/40 backdrop-blur-sm text-white/60 ${s.color} hover:border-white/40 transition-all duration-300`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-on-surface-variant/40 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
      </div>
    </section>
  );
}

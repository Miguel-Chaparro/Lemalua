import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Promotions from '../components/Promotions';
import ReservaModal from '../components/ReservaModal';

// Quick-access cards para las secciones principales
const sections = [
  {
    to: '/catalogo',
    label: 'Catálogo',
    sublabel: 'Whiskies · Ginebras · Ron · Vinos',
    icon: 'wine_bar',
  },
  {
    to: '/promociones',
    label: 'Promociones',
    sublabel: 'Ofertas exclusivas por tiempo limitado',
    icon: 'local_offer',
  },
  {
    to: '/top-sellers',
    label: 'Top Sellers',
    sublabel: 'Los favoritos de nuestra colección',
    icon: 'star',
  },
  {
    to: '/historia',
    label: 'Nuestra Historia',
    sublabel: 'Legado, pasión y maestría artesanal',
    icon: 'auto_stories',
  },
];

export default function HomePage({ onSelectProduct }) {
  const [showReserva, setShowReserva] = useState(false);

  return (
    <main>
      {/* Hero — pantalla completa */}
      <Hero />

      {/* Promociones — visibles directamente en la página principal */}
      <Promotions onSelectProduct={onSelectProduct} />

      {/* Grid de acceso rápido a secciones */}
      <section className="bg-surface-container-lowest py-16 px-4 md:px-margin-desktop border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto">

          {/* Encabezado */}
          <div className="text-center mb-12">
            <span className="font-label-md text-secondary tracking-[0.2em] uppercase block mb-3">
              Explora Lemalua
            </span>
            <h2 className="font-display-lg text-2xl md:text-4xl text-on-surface">
              ¿Qué deseas descubrir hoy?
            </h2>
          </div>

          {/* Cards de navegación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group relative overflow-hidden border border-outline-variant/20 bg-surface-container p-8 flex flex-col gap-6 hover:border-secondary/40 transition-all duration-500 hover:bg-surface-container-high"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-secondary/0 group-hover:border-secondary/30 transition-all duration-500" />

                <span
                  className="material-symbols-outlined text-4xl text-secondary/60 group-hover:text-secondary transition-colors duration-300"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {s.icon}
                </span>

                <div>
                  <h3 className="font-headline-sm text-on-surface group-hover:text-secondary transition-colors duration-300 mb-1">
                    {s.label}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {s.sublabel}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-secondary/60 group-hover:text-secondary transition-all duration-300 mt-auto">
                  <span className="font-label-sm text-xs uppercase tracking-widest">Ver sección</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sección de Reserva ─── */}
      <section
        id="reserva"
        className="relative overflow-hidden py-20 px-4 md:px-margin-desktop border-t border-outline-variant/10"
        style={{
          background: 'linear-gradient(135deg, #0f1010 0%, #1a1505 50%, #0f1010 100%)',
        }}
      >
        {/* Glow decorativo */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/8 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />

        <div className="relative max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <div className="space-y-6">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] block">
                Reserva de Sitio
              </span>
              <h2 className="font-display-lg text-3xl md:text-5xl text-on-surface leading-tight">
                Vive la experiencia{' '}
                <span className="text-secondary italic">Lemalua</span>
              </h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-lg">
                Reserva tu lugar en nuestro Pub & Boutique para una velada inigualable. Música en vivo, los mejores licores de la casa y una atmósfera única que no encontrarás en ningún otro lugar.
              </p>

              {/* Características */}
              <ul className="space-y-4">
                {[
                  { icon: 'groups', text: 'Capacidad para grupos de hasta 20 personas' },
                  { icon: 'restaurant', text: 'Menú exclusivo · Coctelería artesanal' },
                  { icon: 'music_note', text: 'Ambiente premium con música en vivo' },
                  { icon: 'star', text: 'Atención personalizada para tu evento' },
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-secondary flex-shrink-0"
                      style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}
                    >
                      {feat.icon}
                    </span>
                    <span className="font-body-md text-on-surface-variant">{feat.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                id="btn-open-reserva"
                onClick={() => setShowReserva(true)}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-secondary/90 transition-all duration-300 rounded-sm shadow-lg shadow-secondary/20 active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="material-symbols-outlined text-base relative z-10">event_available</span>
                <span className="relative z-10">Reservar Ahora</span>
              </button>
            </div>

            {/* Card visual */}
            <div className="relative">
              <div className="relative bg-surface-container border border-secondary/20 rounded-xl p-8 space-y-6 shadow-2xl">
                {/* Decoración */}
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-secondary/30 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-secondary/10 rounded-bl-xl" />

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      wine_bar
                    </span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Lemalua Pub</p>
                    <p className="font-body-md text-on-surface-variant text-sm">Reserva Premium</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-outline-variant/20 pt-5">
                  {[
                    { label: 'Horario', value: 'Lun – Dom · 12 PM – 11 PM' },
                    { label: 'Capacidad', value: 'Hasta 20 personas' },
                    { label: 'Reservas', value: 'Sujeto a disponibilidad' },
                    { label: 'Confirmación', value: 'En horario hábil de oficina' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide text-xs">
                        {item.label}
                      </span>
                      <span className="font-body-md text-on-surface text-sm text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowReserva(true)}
                  className="w-full py-3 border border-secondary text-secondary font-label-md uppercase tracking-widest hover:bg-secondary/10 transition-all rounded-sm text-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  Seleccionar Fecha
                </button>
              </div>

              {/* Badge flotante */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-secondary flex flex-col items-center justify-center shadow-lg shadow-secondary/30 animate-[pulse_3s_ease-in-out_infinite]">
                <span className="font-label-sm text-[10px] text-background uppercase tracking-wider leading-tight text-center">
                  Reserva<br />gratis
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Reserva */}
      {showReserva && (
        <ReservaModal onClose={() => setShowReserva(false)} />
      )}
    </main>
  );
}

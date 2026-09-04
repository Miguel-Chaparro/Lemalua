import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Promotions from '../components/Promotions';
import ReservaModal from '../components/ReservaModal';

const pubImages = [
  '/pub/Barra _Cocteleria.JPG',
  '/pub/Barra_Cocteleria_2.JPG',
  '/pub/Entrada.JPG',
  '/pub/Licorera.JPG',
  '/pub/Licorera_2.JPG',
  '/pub/Vinos_Licorera.JPG',
  '/pub/Vinos_Licorera_2.JPG',
  '/pub/Zona_Privada.JPG'
];

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

      {/* ─── Sección de Reserva — Versión Premium ─── */}
      <section
        id="reserva"
        className="relative overflow-hidden border-t border-outline-variant/10"
        style={{ background: 'linear-gradient(160deg, #0a0b0b 0%, #130f02 40%, #1a1505 60%, #0a0b0b 100%)' }}
      >
        {/* Glows ambientales */}
        <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/6 rounded-full blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/4 rounded-full blur-[80px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[80%] bg-gradient-to-b from-transparent via-secondary/10 to-transparent hidden lg:block" />

        {/* ── Encabezado principal ── */}
        <div className="relative max-w-container-max mx-auto px-4 md:px-margin-desktop pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-secondary uppercase tracking-[0.25em] mb-5">
            <span className="w-8 h-px bg-secondary/60" />
            Espacios & Eventos
            <span className="w-8 h-px bg-secondary/60" />
          </span>
          <h2 className="font-display-lg text-4xl md:text-6xl text-on-surface leading-tight mb-6">
            Un escenario único para<br />
            <span className="text-secondary italic">momentos extraordinarios</span>
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Lemalua Pub & Boutique es el destino perfecto para quienes buscan una experiencia diferente.
            Contamos con espacios diseñados para eventos privados, reuniones corporativas y celebraciones especiales
            en un ambiente de lujo, sofisticación y calidez incomparables.
          </p>

          {/* Dirección destacada */}
          <a
            href="https://maps.google.com/?q=Carrera+26+%2371b-30+Bogotá"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-secondary/30 rounded-full text-secondary hover:bg-secondary/10 transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <span className="font-label-md text-label-md uppercase tracking-widest">
              Carrera 26 # 71b – 30
            </span>
            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              north_east
            </span>
          </a>
        </div>

        {/* ── Stats de credibilidad ── */}
        <div className="relative border-y border-outline-variant/15 bg-surface-container-lowest/40 backdrop-blur-sm">
          <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '+500', label: 'Eventos Realizados', icon: 'celebration' },
                { value: '20', label: 'Personas por Reserva', icon: 'groups' },
                { value: '5★', label: 'Calificación Promedio', icon: 'star' },
                { value: '100%', label: 'Satisfacción Garantizada', icon: 'verified' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <span
                    className="material-symbols-outlined text-secondary/60 group-hover:text-secondary transition-colors duration-300"
                    style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>
                  <span className="font-display-lg text-3xl md:text-4xl text-secondary font-bold">{stat.value}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tipos de eventos ── */}
        <div className="relative max-w-container-max mx-auto px-4 md:px-margin-desktop py-16">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-[0.2em] text-center mb-10">
            Tipos de Eventos que Organizamos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: 'business_center',
                title: 'Reuniones Corporativas',
                desc: 'Espacios privados ideales para juntas directivas, team buildings, lanzamientos de producto y celebraciones empresariales de alto nivel.',
                tag: 'Empresarial',
              },
              {
                icon: 'celebration',
                title: 'Cumpleaños & Aniversarios',
                desc: 'Celebra los momentos más especiales rodeado de las personas que amas, con un servicio personalizado que supera todas las expectativas.',
                tag: 'Celebración',
              },
              {
                icon: 'groups',
                title: 'Eventos Privados',
                desc: 'Despedidas de soltero, reuniones de amigos, despedidas de año y cualquier celebración que merezca un espacio exclusivo e íntimo.',
                tag: 'Privado',
              },
              {
                icon: 'handshake',
                title: 'Networking Empresarial',
                desc: 'El ambiente perfecto para conectar con colegas y socios estratégicos en un entorno relajado, sofisticado y memorable.',
                tag: 'Networking',
              },
              {
                icon: 'wine_bar',
                title: 'Catas & Degustaciones',
                desc: 'Experiencias guiadas por nuestros expertos en destilados, vinos y coctelería premium. Una experiencia sensorial incomparable.',
                tag: 'Premium',
              },
              {
                icon: 'favorite',
                title: 'Fechas Especiales',
                desc: 'San Valentín, propuestas de matrimonio, graduaciones y toda ocasión que merece ser celebrada con elegancia y detalle.',
                tag: 'Especial',
              },
            ].map((ev, i) => (
              <div
                key={i}
                className="group relative bg-surface-container border border-outline-variant/15 rounded-xl p-7 hover:border-secondary/40 transition-all duration-500 hover:bg-surface-container-high cursor-default overflow-hidden"
              >
                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/0 group-hover:bg-secondary/5 rounded-bl-full transition-all duration-700" />
                {/* Tag */}
                <span className="inline-block px-3 py-1 border border-secondary/30 text-secondary font-label-sm text-[10px] uppercase tracking-widest rounded-full mb-5">
                  {ev.tag}
                </span>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}
                    >
                      {ev.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-on-surface group-hover:text-secondary transition-colors duration-300 mb-2 leading-tight">
                      {ev.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Galería del Pub (Marquee animado) ── */}
        <div className="relative py-10 overflow-hidden border-b border-outline-variant/10 mb-10 bg-surface-container-lowest/30">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-[0.2em] text-center mb-8">
            Nuestros Espacios
          </p>
          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] group/marquee px-4">
            {[...pubImages, ...pubImages].map((img, i) => (
              <div key={i} className="w-64 h-80 sm:w-80 sm:h-96 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/20 relative shadow-xl">
                <div className="absolute inset-0 bg-background/10 hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={img} alt="Lemalua Pub" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Principal + Info del sitio ── */}
        <div className="relative max-w-container-max mx-auto px-4 md:px-margin-desktop pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

            {/* Info del sitio — 2 columnas */}
            <div className="lg:col-span-2 bg-surface-container border border-outline-variant/20 rounded-xl p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4 pb-5 border-b border-outline-variant/20">
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    store
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Lemalua Pub & Boutique</p>
                  <p className="font-body-md text-on-surface-variant text-sm">Bogotá, Colombia</p>
                </div>
              </div>
              {/* Detalles */}
              <div className="space-y-4">
                {[
                  { icon: 'location_on', label: 'Ubicación', value: 'Cra. 26 # 71b – 30, Bogotá' },
                  { icon: 'schedule', label: 'Horario', value: 'Lun – Dom · 12:00 PM – 11:00 PM' },
                  { icon: 'groups', label: 'Aforo Máximo', value: 'Hasta 20 personas por reserva' },
                  { icon: 'phone', label: 'Contacto', value: '+57 301 219 3083' },
                  { icon: 'mark_email_read', label: 'Respuesta', value: 'Horario hábil · Lun – Vie 8am–6pm' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5"
                      style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">{item.label}</p>
                      <p className="font-body-md text-on-surface text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — 3 columnas */}
            <div className="lg:col-span-3 relative bg-surface-container border border-secondary/20 rounded-xl p-8 md:p-10 flex flex-col justify-between gap-8 overflow-hidden">
              {/* Fondo decorativo */}
              <div className="pointer-events-none absolute inset-0 opacity-5"
                style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #e9c176 0%, transparent 60%)' }}
              />
              <div className="relative space-y-4">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
                  ¿Listo para reservar?
                </span>
                <h3 className="font-display-lg text-3xl md:text-4xl text-on-surface leading-tight">
                  Asegura tu espacio<br />
                  <span className="text-secondary">hoy mismo</span>
                </h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  El proceso es simple y completamente gratuito. Completa el formulario con tus datos y nuestro equipo confirmará la disponibilidad del espacio y te contactará a la brevedad para coordinar todos los detalles de tu evento.
                </p>
                {/* Beneficios rápidos */}
                <ul className="space-y-2 pt-2">
                  {[
                    'Sin costo de reserva',
                    'Atención personalizada',
                    'Menú y coctelería a medida',
                    'Ambientación incluida',
                  ].map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex flex-col sm:flex-row gap-4">
                <button
                  id="btn-open-reserva"
                  onClick={() => setShowReserva(true)}
                  className="group flex-1 relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-secondary/90 transition-all duration-300 rounded-sm shadow-lg shadow-secondary/20 active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="material-symbols-outlined text-base relative z-10">event_available</span>
                  <span className="relative z-10">Solicitar Reserva</span>
                </button>
                <a
                  href="https://maps.google.com/?q=Carrera+26+%2371b-30+Bogotá"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none inline-flex items-center justify-center gap-2 px-6 py-4 border border-outline-variant/40 text-on-surface-variant hover:border-secondary/60 hover:text-secondary transition-all duration-300 rounded-sm font-label-md uppercase tracking-widest text-sm"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  Cómo Llegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showReserva && (
        <ReservaModal onClose={() => setShowReserva(false)} />
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </main>
  );
}

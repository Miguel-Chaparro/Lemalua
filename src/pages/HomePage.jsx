import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Promotions from '../components/Promotions';

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
    </main>
  );
}

import React from 'react';
import BrandStory from '../components/BrandStory';
import Newsletter from '../components/Newsletter';

const pubImages = [
  '/pub/Barra _Cocteleria.JPG',
  '/pub/Zona_Privada.JPG',
  '/pub/Entrada.JPG',
  '/pub/Licorera.JPG',
  '/pub/Licorera_2.JPG',
  '/pub/Vinos_Licorera.JPG',
  '/pub/Barra_Cocteleria_2.JPG',
  '/pub/Vinos_Licorera_2.JPG'
];

export default function HistoriaPage() {
  return (
    <main className="pt-20">
      <BrandStory />
      
      {/* ── Galería del Pub (Masonry) ── */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-20">
        <div className="text-center mb-12">
          <span className="font-label-md text-secondary tracking-[0.2em] uppercase block mb-3">
            El Pub
          </span>
          <h2 className="font-display-lg text-3xl md:text-5xl text-on-surface">
            Nuestro espacio, <span className="text-secondary italic">tu experiencia</span>
          </h2>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {pubImages.map((img, i) => (
            <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-2xl border border-outline-variant/20">
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={img} 
                alt={`Lemalua Pub ${i + 1}`} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

import React from 'react';

export default function BrandStory() {
  return (
    <section id="story" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[4/5] relative z-10">
            <img 
              alt="Distillery Heritage" 
              className="w-full h-full object-cover grayscale opacity-70 rounded-sm" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt6EQhW7jS1BPERdbtuWaRZNpDbBXyxYx31fWYRPLc2AWMp2BtjGRtIh7Q3IYDcxzrWq8ynkuVoleQJPEnjM9MR8JXwVm1PY9T2YcCzSVCLtLqpevcJhOrA2YEipPUoQvCJNDGcYVdOTzkeqpAOfekO0X7aj58xhLsZha2GOehRW5ivvgOHUaFR4WX2kUDebh_ycIHrfa-jzwBndtOtuWY9lGsZy8G6G2Kt3lb3ZGSK6ydnd5-_Lgvo-EhZq1SzC-A48KCD8ZJIoo"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-secondary/30 -z-0"></div>
        </div>
        <div className="space-y-8 order-1 lg:order-2">
          <span className="font-label-md text-secondary tracking-[0.3em] uppercase">Legado y Pasión</span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface">Acerca de Lemalua</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            En Lemalua, no solo vendemos espirituosos; preservamos historias. Nuestra curaduría nace de una búsqueda incansable por la perfección, desde las destilerías más remotas de las tierras altas hasta las bodegas familiares con siglos de tradición.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant/80">
            Cada botella en nuestra colección ha sido seleccionada por su integridad, complejidad y capacidad para elevar cualquier momento. Somos el punto de encuentro para quienes entienden que el lujo no es el precio, sino la experiencia de la maestría.
          </p>
          <div className="pt-4">
            <a className="inline-flex items-center gap-4 text-secondary font-label-md uppercase tracking-widest group" href="#story">
              Nuestros Valores 
              <div className="w-12 h-px bg-secondary group-hover:w-16 transition-all"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

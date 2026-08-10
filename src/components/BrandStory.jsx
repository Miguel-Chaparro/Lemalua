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
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface">Acerca de Lemalua Pub</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            En Lemalua, no solo servimos tragos; llevamos la auténtica experiencia de un pub a tu puerta. Nuestra curaduría combina licores de lujo de destilerías exclusivas con lo mejor de la comida de pub, ofreciendo entregas a domicilio para tus mejores momentos.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant/80">
            Cada producto en nuestra colección, desde una cerveza artesanal hasta un whisky de lujo o una picada, ha sido seleccionado para elevar tu experiencia. Somos el punto de encuentro para quienes buscan lo mejor del Pub, en la comodidad de su hogar.
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

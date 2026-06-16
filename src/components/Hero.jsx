import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>
        <img 
          alt="Premium Whiskey" 
          className="w-full h-full object-cover select-none" 
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCteoCSSSYtgwAoih1kcgD0yA9RVDBiqLo7qKmqUjth6PryYHbu7-Hqs1t8ear6X_wfMaYirDThWRqnrzTMkqa6DNi-ICek94BJA-F6kBbOAL4i71lPiGD1pZLwq26_IDHkgoxxo-zb-RmDFqtdGFlQb0ygsnw1nfgA5R4zxiCVAnkJhYrSW5qs6cw-Yh79y3rE-4xTt5gf7n5tlAjFAnInii1h5bbF1tHdCdAh_sW0PCWD7bvq-pSObdZ0t0kNii9QrSg1daPWg8s"
        />
      </div>
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
          <div className="flex flex-wrap gap-6 pt-4">
            <a 
              href="#shop"
              className="px-10 py-4 bg-transparent border border-secondary text-secondary font-label-md uppercase tracking-widest hover:bg-secondary/10 transition-all active:opacity-80 inline-block text-center"
            >
              Explorar Colección
            </a>
            <a 
              href="#story"
              className="px-10 py-4 text-secondary font-label-md uppercase tracking-widest flex items-center gap-2 group border-b border-transparent hover:border-secondary transition-all"
            >
              Nuestra Historia{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

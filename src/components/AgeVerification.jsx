import React, { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(true); // Default to true to prevent layout flash
  const [shouldRender, setShouldRender] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('lemalua_age_verified');
    if (verified !== 'true') {
      setIsVerified(false);
      setShouldRender(true);
      // Disable scrolling on the main page while the modal is up
      document.body.classList.add('overflow-hidden');
    }
  }, []);

  const handleConfirm = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      localStorage.setItem('lemalua_age_verified', 'true');
      setIsVerified(true);
      setShouldRender(false);
      // Re-enable scrolling on the main page
      document.body.classList.remove('overflow-hidden');
    }, 800); // matches the duration of the transition
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-20 grayscale contrast-125 scale-105"
          alt="Atmosphere"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCBB40FO5VbnyEzYzOMOsjSlnMZgYsumaMcieTPXqJLzbhB_338hzObjXGgEwlLuTjIi7XGeXooX7itFBtkH77Iz_WpjOb9hmAFrHY0Yu7JyfzWoMdPjvLtBCCEBxPtwo7lI27m1npFN3eGJ3lq8DGANCwg07CC7bWgC4NEe9yBmFwt_NZF3Fe3XAMmBdUICc88SyuR5RQ-c-hi1FgT2wtX9ilZwXXydq_2t3QfhfNQmd6uAfvbWfsZHMuCMbdKwDusxDAUU9p_XE"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-12 w-full">
        {/* Identity Logo */}
        <div className="mb-12 fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary uppercase tracking-[0.2em] text-center">
            LEMALUA
          </h1>
        </div>

        {/* Verification Modal / Banner */}
        <div 
          className="w-full max-w-lg bg-surface-container/40 backdrop-blur-md border border-outline-variant/30 p-8 md:p-12 text-center fade-in rounded-lg shadow-2xl"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="mb-6">
            <span 
              className="material-symbols-outlined text-secondary text-5xl mb-4 inline-block"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
            >
              wine_bar
            </span>
            <h2 className="font-headline-md text-headline-md text-secondary mb-4">
              ¿Eres mayor de 18 años?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
              Para acceder a nuestra selección exclusiva de espirituosos, debes confirmar que tienes la edad legal de consumo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button 
              onClick={handleConfirm}
              className="bg-transparent border border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 font-label-md text-label-md uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5"
              id="btn-enter"
            >
              Sí, soy mayor de edad
            </button>
            <button 
              onClick={handleReject}
              className="text-on-surface-variant hover:text-secondary px-8 py-4 font-label-md text-label-md uppercase tracking-widest underline underline-offset-4 transition-colors duration-200"
              id="btn-exit"
            >
              No, salir
            </button>
          </div>
        </div>

        {/* Responsible Consumption Footer Content */}
        <div className="mt-16 max-w-2xl text-center fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-4">
            Disfruta con responsabilidad
          </p>
          <p className="font-body-md text-label-md text-on-surface-variant/60 leading-relaxed italic">
            Lemalua promueve el consumo moderado. El abuso de alcohol es peligroso para la salud. 
            Al entrar, aceptas nuestros términos de servicio y políticas de privacidad.
          </p>
        </div>
      </main>

      {/* Global Footer Fragment */}
      <footer className="relative z-10 w-full mt-auto border-t border-outline-variant/10 bg-surface-container-lowest/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto text-xs text-on-surface-variant/50 gap-4">
          <span>
            © 2024 Lemalua Spirits. Todos los derechos reservados.
          </span>
          <div className="flex gap-6">
            <a className="hover:text-secondary transition-colors uppercase" href="#privacidad">Privacidad</a>
            <a className="hover:text-secondary transition-colors uppercase" href="#terminos">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

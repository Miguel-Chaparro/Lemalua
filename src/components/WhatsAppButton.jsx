import React from 'react';

const PHONE = '573044606679';
const WA_URL = `https://wa.me/${PHONE}?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos.`;

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 left-6 z-50 group"
    >
      {/* Anillo de pulso animado */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

      {/* Botón principal */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 group-hover:bg-[#1ebe5d] group-hover:scale-110 transition-all duration-300">
        {/* Ícono SVG oficial de WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.132 6.752 3.054 9.376L1.056 31.04l5.848-1.872A15.916 15.916 0 0 0 16.004 32C24.828 32 32 24.824 32 16S24.828 0 16.004 0zm9.28 22.596c-.384 1.08-1.908 1.976-3.12 2.236-.832.176-1.916.316-5.568-1.196-4.672-1.944-7.68-6.696-7.916-7.004-.228-.308-1.908-2.544-1.908-4.852s1.188-3.432 1.648-3.904c.38-.388.856-.532 1.272-.532l.464.008c.408.016.616.04.888.688l1.228 3c.128.312.256.74.048 1.08-.196.348-.308.564-.616.868s-.628.68-.896.916c-.308.26-.628.54-.272 1.068.356.52 1.58 2.596 3.404 4.216 2.336 2.08 4.268 2.74 4.876 3.04.46.224.724.188 1.0-.116l.908-1.072c.352-.42.704-.352 1.188-.14l3.308 1.556c.48.228.8.336.916.524.112.188.112 1.08-.272 2.16z"/>
        </svg>
      </span>

      {/* Tooltip flotante */}
      <span className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-surface-container text-on-surface text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-outline-variant/20">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
}

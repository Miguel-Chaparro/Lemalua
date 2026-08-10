import React from 'react';

export default function LoadingSpinner({ message = 'Cargando colección...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-background">
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        {/* Anillo exterior animado */}
        <div className="absolute inset-0 border-t-2 border-r-2 border-secondary rounded-full animate-spin"></div>
        {/* Anillo interior opaco */}
        <div className="absolute inset-2 border-2 border-outline-variant/20 rounded-full"></div>
        {/* Ícono central */}
        <span className="material-symbols-outlined text-secondary text-2xl animate-pulse">
          wine_bar
        </span>
      </div>
      <p className="font-label-md text-secondary uppercase tracking-widest animate-pulse">
        {message}
      </p>
    </div>
  );
}

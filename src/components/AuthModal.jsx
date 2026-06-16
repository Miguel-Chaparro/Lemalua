import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Autenticación Mock: ${isLogin ? 'Iniciando sesión' : 'Registrando'} a ${email}. Se conectará con Firebase en la siguiente fase.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-background/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-surface-container border border-outline-variant/30 p-8 rounded-lg shadow-2xl z-10 animate-[scaleUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-surface-variant/20 p-2 rounded-full text-secondary transition-all"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="font-display-lg text-headline-md text-on-surface uppercase tracking-wider">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h3>
          <p className="text-sm text-on-surface-variant mt-2">
            {isLogin ? 'Acceda a su cuenta selecta' : 'Únase a los apreciadores de Lemalua'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="flex flex-col">
              <label className="text-xs text-secondary font-label-md uppercase tracking-wider mb-2">Nombre completo</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface font-body-md py-2 outline-none transition-colors"
                placeholder="Su Nombre"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-xs text-secondary font-label-md uppercase tracking-wider mb-2">Correo electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface font-body-md py-2 outline-none transition-colors"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-secondary font-label-md uppercase tracking-wider mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface font-body-md py-2 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-secondary text-primary-container hover:bg-secondary-fixed text-center font-label-md uppercase tracking-widest font-bold transition-all rounded active:scale-95 shadow-lg shadow-secondary/10"
          >
            {isLogin ? 'Entrar' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-on-surface-variant hover:text-secondary border-b border-transparent hover:border-secondary pb-0.5 transition-all"
          >
            {isLogin ? '¿No tiene cuenta? Regístrese aquí' : '¿Ya tiene una cuenta? Inicie sesión'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

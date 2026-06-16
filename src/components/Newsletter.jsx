import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-surface-container px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">Únase al Club Lemalua</h2>
        <p className="font-body-md text-on-surface-variant">Reciba acceso anticipado a lanzamientos limitados y eventos de cata privados.</p>
        
        {submitted ? (
          <div className="text-secondary font-label-md uppercase tracking-widest animate-pulse py-4">
            ¡Gracias por suscribirse al Club Lemalua!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mt-8">
            <input 
              className="flex-grow bg-transparent border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface font-body-md py-4 outline-none transition-colors" 
              placeholder="Correo electrónico" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="px-12 py-4 bg-primary-container border border-secondary text-secondary font-label-md uppercase tracking-widest hover:bg-secondary/5 transition-all"
            >
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
